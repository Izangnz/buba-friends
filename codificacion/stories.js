/* Local stories: fixed expiry, IndexedDB blobs and injectable clock/storage for tests. */
(function(global){
'use strict';
const DAY=24*60*60*1000, MAX_FILE=8*1024*1024, MAX_CAPTION=180;
const EXAMPLES=[
 {id:'example-vega-v1',authorId:'vega',caption:'Una exposición pequeña, sin mirar el reloj.',imagePath:'codificacion/assets/stories/gallery.svg'},
 {id:'example-nico-v1',authorId:'nico',caption:'Un sendero tranquilo y vistas para compartir.',imagePath:'codificacion/assets/stories/trail.svg'},
 {id:'example-alma-v1',authorId:'alma',caption:'La última canción, con las luces encendidas.',imagePath:'codificacion/assets/stories/music.svg'},
];
function error(message){return new Error(message);}
function active(story,now){return Number.isFinite(story.createdAt)&&Number.isFinite(story.expiresAt)&&story.createdAt<=now&&now<story.expiresAt;}
function createRepository(indexedDB){
 let opening;
 function open(){
  if(!indexedDB)return Promise.reject(error('Este navegador no permite guardar historias con IndexedDB. Las citas y el chat siguen disponibles.'));
  if(!opening)opening=new Promise((resolve,reject)=>{
   let request,blocked=false;try{request=indexedDB.open('buba-friends-stories-v1',1);}catch{reject(error('El navegador ha bloqueado el almacenamiento de historias. Revisa sus permisos.'));return;}
   request.onupgradeneeded=()=>{const db=request.result;db.createObjectStore('stories',{keyPath:'id'});db.createObjectStore('meta',{keyPath:'key'});};
   request.onerror=()=>{opening=null;reject(error('No se pudo abrir el guardado de historias. Comprueba el espacio y los permisos del navegador.'));};
   request.onblocked=()=>{blocked=true;opening=null;reject(error('Cierra otras pestañas de Buba Friends y vuelve a intentarlo para abrir las historias.'));};
   request.onsuccess=()=>{const db=request.result;if(blocked){db.close();return;}db.onversionchange=()=>{db.close();opening=null;};resolve(db);};
  });
  return opening;
 }
 return {async transact(transform){
  const db=await open();
  return new Promise((resolve,reject)=>{
   let result,failed=false;
   const tx=db.transaction(['stories','meta'],'readwrite'),store=tx.objectStore('stories'),meta=tx.objectStore('meta');
   const records=store.getAll(),marker=meta.get('seeded');let ready=0;
   function apply(){if(++ready!==2)return;try{
    const change=transform({stories:records.result,seeded:marker.result?.value===true});
    for(const id of change.remove||[])store.delete(id);
    for(const story of change.put||[])store.put(story);
    if(change.seeded!==undefined)meta.put({key:'seeded',value:change.seeded});
    result=change.result;
   }catch(e){failed=true;tx.abort();reject(e);}}
   records.onsuccess=marker.onsuccess=apply;
   tx.oncomplete=()=>resolve(result);
   tx.onabort=tx.onerror=()=>{if(!failed){failed=true;reject(error('No se pudieron guardar las historias. Puede faltar espacio o estar bloqueado el almacenamiento.'));}};
  });
 }};
}
function createService({repository,clock=()=>Date.now(),idFactory=()=>global.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2)}){
 function run(action,{reset=false}={}){
  return repository.transact(snapshot=>{
   const now=clock(),all=new Map(),changed=new Map(),deleted=new Set();
   const set=story=>{all.set(story.id,story);changed.set(story.id,story);deleted.delete(story.id);};
   const remove=id=>{all.delete(id);changed.delete(id);deleted.add(id);};
   for(const story of snapshot.stories){
    if(reset||(!active(story,now)&&!(story.authorId==='self'&&story.featured)))deleted.add(story.id);
    else all.set(story.id,story);
   }
   if(reset||!snapshot.seeded)for(const example of EXAMPLES)set({...example,example:true,featured:false,seenAt:null,createdAt:now,expiresAt:now+DAY});
   const result=action({all,now,set,remove});
   return {put:[...changed.values()],remove:[...deleted],seeded:true,result};
  });
 }
 return {
  list(){return run(({all})=>[...all.values()].sort((a,b)=>b.createdAt-a.createdAt||a.id.localeCompare(b.id)));},
  get(id,{allowFeatured=false}={}){return run(({all,now})=>{const s=all.get(id);return s&&(active(s,now)||(allowFeatured&&s.authorId==='self'&&s.featured))?s:null;});},
  create(blob,caption=''){return run(({all,now,set})=>{
   if(!(blob instanceof Blob)||blob.type!=='image/jpeg'||!blob.size||blob.size>MAX_FILE)throw error('No se pudo preparar una imagen válida. Selecciona JPEG, PNG o WebP de hasta 8 MB.');
   if(typeof caption!=='string'||caption.trim().length>MAX_CAPTION)throw error('El texto admite hasta 180 caracteres.');
   const id='own-'+idFactory();if(all.has(id))throw error('No se pudo crear esta historia. Vuelve a intentarlo.');
   const story={id,authorId:'self',blob,caption:caption.trim(),createdAt:now,expiresAt:now+DAY,featured:false,seenAt:null,example:false};set(story);return story;
  });},
  markSeen(id){return run(({all,now,set})=>{const s=all.get(id);if(!s||!active(s,now))return null;if(s.seenAt===null||s.seenAt===undefined){s.seenAt=now;set(s);}return s;});},
  feature(id,value){return run(({all,now,set,remove})=>{const s=all.get(id);if(!s||s.authorId!=='self')throw error('Esta historia propia ya no está disponible.');s.featured=!!value;if(!s.featured&&!active(s,now)){remove(id);return null;}set(s);return s;});},
  deleteOwn(id){return run(({all,remove})=>{const s=all.get(id);if(s&&s.authorId!=='self')throw error('Solo puedes eliminar tus propias historias.');remove(id);});},
  reset(){return run(()=>undefined,{reset:true});},
  async reply(id,text,matches){
   const story=await this.get(id);
   if(!story||story.authorId==='self'||!matches.includes(story.authorId)||!active(story,clock()))throw error('Esta historia ya no está disponible para responder.');
   const clean=String(text||'').trim();if(!clean||clean.length>1000)throw error('Escribe una respuesta de entre 1 y 1000 caracteres.');
   return {authorId:story.authorId,message:{mine:true,text:clean,story:{id:story.id,authorId:story.authorId,caption:story.caption}}};
  },
 };
}
async function validateFile(file){
 if(!file||!file.size||file.size>MAX_FILE)throw error('Selecciona una imagen JPEG, PNG o WebP de hasta 8 MB.');
 let bytes;try{bytes=new Uint8Array(await file.slice(0,16).arrayBuffer());}catch{throw error('No se pudo leer el archivo. Selecciónalo de nuevo.');}
 const type=bytes[0]===255&&bytes[1]===216&&bytes[2]===255?'image/jpeg':
  [137,80,78,71,13,10,26,10].every((v,i)=>bytes[i]===v)?'image/png':
  String.fromCharCode(...bytes.slice(0,4))==='RIFF'&&String.fromCharCode(...bytes.slice(8,12))==='WEBP'?'image/webp':null;
 if(!type||(file.type&&file.type!==type))throw error('El contenido no es un JPEG, PNG o WebP válido. No se admite HEIC, GIF ni SVG.');
 return type;
}
async function optimizeImage(file){
 await validateFile(file);let image,url;
 try{
  if(global.createImageBitmap)image=await global.createImageBitmap(file,{imageOrientation:'from-image'});
  else image=await new Promise((resolve,reject)=>{url=URL.createObjectURL(file);const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(error('No se pudo abrir esta imagen. Prueba con otro JPEG, PNG o WebP.'));img.src=url;});
  const width=image.width||image.naturalWidth,height=image.height||image.naturalHeight;
  if(!width||!height||width*height>40000000)throw error('La imagen es demasiado grande o no se puede leer. Usa una imagen de hasta 40 megapíxeles.');
  const scale=Math.min(1,1280/Math.max(width,height)),canvas=document.createElement('canvas');
  canvas.width=Math.max(1,Math.round(width*scale));canvas.height=Math.max(1,Math.round(height*scale));
  const context=canvas.getContext('2d');if(!context)throw error('No se puede optimizar la imagen en este navegador.');
  context.fillStyle='#FFF8FB';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(image,0,0,canvas.width,canvas.height);
  const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(error('No se pudo optimizar la imagen. Prueba con otra.')),'image/jpeg',.82));
  if(blob.size>MAX_FILE)throw error('La imagen sigue siendo demasiado grande después de optimizarla.');
  return blob;
 }catch(e){throw error(/^(No se|La imagen|Este navegador)/.test(e.message)?e.message:'No se pudo leer u optimizar la imagen. Prueba con otro JPEG, PNG o WebP.');}
 finally{image?.close?.();if(url)URL.revokeObjectURL(url);}
}
const api={DAY,MAX_FILE,MAX_CAPTION,EXAMPLES,active,createRepository,createService,validateFile,optimizeImage};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else global.BubaStories=api;
})(typeof globalThis!=='undefined'?globalThis:this);
