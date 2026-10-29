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
 // Profile photo has a separate meta key, untouched by story/collection transactions.
 async function photoOperation(mode,blob){
  if(mode==='put'&&(!(blob instanceof Blob)||blob.type!=='image/jpeg'||!blob.size||blob.size>MAX_FILE))throw error('La foto preparada no es válida.');
  const db=await open();
  return new Promise((resolve,reject)=>{
   let result=null;const tx=db.transaction(['meta'],mode==='get'?'readonly':'readwrite'),store=tx.objectStore('meta');
   const request=mode==='get'?store.get('profile-photo'):mode==='put'?store.put({key:'profile-photo',blob}):store.delete('profile-photo');
   request.onsuccess=()=>{if(mode==='get')result=request.result?.blob||null;};
   tx.oncomplete=()=>resolve(result);
   tx.onabort=tx.onerror=()=>reject(error('No se pudo guardar o leer la foto. Revisa el espacio y los permisos del navegador.'));
  });
 }
 return {getPhoto:()=>photoOperation('get'),putPhoto:blob=>photoOperation('put',blob),deletePhoto:()=>photoOperation('delete'),async transact(transform){
  const db=await open();
  return new Promise((resolve,reject)=>{
   let result,failed=false;
   const tx=db.transaction(['stories','meta'],'readwrite'),store=tx.objectStore('stories'),meta=tx.objectStore('meta');
   const records=store.getAll(),marker=meta.get('seeded'),library=meta.get('highlight-collections-v1');let ready=0;
   function apply(){if(++ready!==3)return;try{
    const change=transform({stories:records.result,seeded:marker.result?.value===true,library:library.result?.value});
    for(const id of change.remove||[])store.delete(id);
    for(const story of change.put||[])store.put(story);
    if(change.seeded!==undefined)meta.put({key:'seeded',value:change.seeded});
    if(change.library)meta.put({key:'highlight-collections-v1',value:change.library});
    result=change.result;
   }catch(e){failed=true;tx.abort();reject(e);}}
   records.onsuccess=marker.onsuccess=library.onsuccess=apply;
   tx.oncomplete=()=>resolve(result);
   tx.onabort=tx.onerror=()=>{if(!failed){failed=true;reject(error('No se pudieron guardar las historias. Puede faltar espacio o estar bloqueado el almacenamiento.'));}};
  });
 }};
}
function createService({repository,clock=()=>Date.now(),idFactory=()=>global.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2)}){
 const nameOf=value=>{if(typeof value!=='string'||!value.trim()||value.trim().length>30)throw error('Escribe un nombre de entre 1 y 30 caracteres.');return value.trim();};
 const sorted=all=>[...all.values()].sort((a,b)=>b.createdAt-a.createdAt||a.id.localeCompare(b.id));
 function run(action,{reset=false}={}){
  return repository.transact(snapshot=>{
   const now=clock(),all=new Map(),changed=new Map(),deleted=new Set();
   for(const story of snapshot.stories)if(reset)deleted.add(story.id);else all.set(story.id,story);
   let collections=reset?[]:(snapshot.library?.collections||[]).map(c=>({...c,storyIds:[...new Set(c.storyIds)]}));
   // The marker and migrated collection commit atomically with the original blobs.
   if(!reset&&!snapshot.library?.migrated){const legacy=sorted(all).filter(s=>s.authorId==='self'&&s.featured);if(legacy.length)collections.push({id:'legacy-highlights-v1',name:'Mis destacadas',storyIds:legacy.map(s=>s.id),coverId:legacy[0].id,createdAt:now});}
   const set=story=>{all.set(story.id,story);changed.set(story.id,story);deleted.delete(story.id);};
   const remove=id=>{all.delete(id);changed.delete(id);deleted.add(id);};
   const referenced=id=>collections.some(c=>c.storyIds.includes(id));
   const collect=()=>{
    collections=collections.map(c=>{const storyIds=c.storyIds.filter(id=>all.get(id)?.authorId==='self');return {...c,storyIds,coverId:storyIds.includes(c.coverId)?c.coverId:storyIds[0]};}).filter(c=>c.storyIds.length);
    for(const s of all.values()){
     const featured=s.authorId==='self'&&referenced(s.id);
     if(!active(s,now)&&!featured)remove(s.id);
     else if(s.featured!==featured)set({...s,featured});
    }
   };
   collect();
   if(reset||!snapshot.seeded)for(const example of EXAMPLES)set({...example,example:true,featured:false,seenAt:null,createdAt:now,expiresAt:now+DAY});
   const findCollection=id=>{const c=collections.find(c=>c.id===id);if(!c)throw error('Esta colección ya no está disponible.');return c;};
   const ownIds=ids=>{if(!Array.isArray(ids)||!ids.length)throw error('Selecciona al menos una historia propia.');const unique=[...new Set(ids)];if(unique.some(id=>all.get(id)?.authorId!=='self'))throw error('Una historia propia seleccionada ya no está disponible.');return unique;};
   const createCollection=(name,ids)=>{const clean=nameOf(name),storyIds=ownIds(ids),id='collection-'+idFactory();if(collections.some(c=>c.id===id))throw error('No se pudo crear la colección. Reintenta.');const c={id,name:clean,storyIds,coverId:storyIds[0],createdAt:now};collections.push(c);return c;};
   const result=action({all,now,set,remove,referenced,findCollection,ownIds,createCollection,get collections(){return collections;},dropCollection:id=>{findCollection(id);collections=collections.filter(c=>c.id!==id);}});
   collect();return {put:[...changed.values()],remove:[...deleted],seeded:true,library:{migrated:true,collections},result};
  });
 }
 return {
  list(){return run(({all})=>sorted(all));},
  library(){return run(({all,collections})=>({stories:sorted(all),collections}));},
  listCollections(){return run(({collections})=>collections);},
  createCollection(name,ids){return run(c=>c.createCollection(name,ids));},
  addToCollection(id,ids){return run(c=>{const items=c.ownIds(ids),collection=c.findCollection(id);collection.storyIds=[...new Set([...collection.storyIds,...items])];return collection;});},
  renameCollection(id,name){return run(c=>{const clean=nameOf(name),collection=c.findCollection(id);collection.name=clean;return collection;});},
  setCollectionCover(id,storyId){return run(c=>{const collection=c.findCollection(id);if(!collection.storyIds.includes(storyId))throw error('La portada debe pertenecer a esta colección.');collection.coverId=storyId;return collection;});},
  removeFromCollection(id,storyId,{allowEmpty=true}={}){return run(c=>{const collection=c.findCollection(id),remaining=collection.storyIds.filter(item=>item!==storyId);if(!remaining.length&&!allowEmpty)throw error('Ahora es la última imagen. Cancela y vuelve a quitarla para confirmar que también se elimina la colección.');collection.storyIds=remaining;if(!collection.storyIds.length)c.dropCollection(id);});},
  deleteCollection(id){return run(c=>c.dropCollection(id));},
  get(id,{allowFeatured=false}={}){return run(({all,now})=>{const s=all.get(id);return s&&(active(s,now)||(allowFeatured&&s.authorId==='self'&&s.featured))?s:null;});},
  create(blob,caption=''){return run(({all,now,set})=>{
   if(!(blob instanceof Blob)||blob.type!=='image/jpeg'||!blob.size||blob.size>MAX_FILE)throw error('No se pudo preparar una imagen válida. Selecciona JPEG, PNG o WebP de hasta 8 MB.');
   if(typeof caption!=='string'||caption.trim().length>MAX_CAPTION)throw error('El texto admite hasta 180 caracteres.');
   const id='own-'+idFactory();if(all.has(id))throw error('No se pudo crear esta historia. Vuelve a intentarlo.');
   const story={id,authorId:'self',blob,caption:caption.trim(),createdAt:now,expiresAt:now+DAY,featured:false,seenAt:null,example:false};set(story);return story;
  });},
  markSeen(id){return run(({all,now,set})=>{const s=all.get(id);if(!s||!active(s,now))return null;if(s.seenAt===null||s.seenAt===undefined){s.seenAt=now;set(s);}return s;});},
  // Compatibility for older callers; the new UI always asks for a collection explicitly.
  feature(id,value){return run(c=>{c.ownIds([id]);if(value){let collection=c.collections.find(c=>c.name==='Mis destacadas');if(!collection)collection=c.createCollection('Mis destacadas',[id]);else collection.storyIds=[...new Set([...collection.storyIds,id])];}else for(const collection of [...c.collections]){collection.storyIds=collection.storyIds.filter(item=>item!==id);if(!collection.storyIds.length)c.dropCollection(collection.id);}return c.all.get(id);});},
  deleteOwn(id){return run(c=>{const s=c.all.get(id);if(s&&s.authorId!=='self')throw error('Solo puedes eliminar tus propias historias.');if(s&&c.referenced(id))c.set({...s,expiresAt:Math.min(s.expiresAt,c.now)});else c.remove(id);});},
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
