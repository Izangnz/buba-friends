// Isolated repository, canvas and DOM simulations. No personal files/browser storage.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {cropGeometry,drawCrop,createController}=require('../profile-photo.js');
const stories=require('../stories.js');
const flush=()=>new Promise(resolve=>setImmediate(resolve));
module.exports=async function(){
 const first=new Blob([new Uint8Array([255,216,255,1])],{type:'image/jpeg'}),second=new Blob([new Uint8Array([255,216,255,2])],{type:'image/jpeg'});
 let stored=null,fail=false,counter=0;const revoked=[];
 let galleryStored=[];
 const repository={async getGallery(){if(fail)throw Error('blocked');return galleryStored;},async putGallery(items){if(fail)throw Error('quota');galleryStored=Array.from(items);stored=galleryStored[0]||null;},async getPhoto(){if(fail)throw Error('blocked');return stored;},async putPhoto(b){if(fail)throw Error('quota');stored=b;},async deletePhoto(){if(fail)throw Error('blocked');stored=null;}};
 const options={repository,createURL:()=>`blob:test-${++counter}`,revokeURL:u=>revoked.push(u)};
 const photo=createController(options);await photo.load();assert.equal(photo.url,'');assert.equal(photo.ready,true);
 await photo.save(first);const oldURL=photo.url;assert.equal(stored,first);
 // A failed replacement never changes the persisted image or current URL.
 fail=true;await assert.rejects(photo.save(second),/quota/);assert.equal(stored,first);assert.equal(photo.url,oldURL);assert.equal(revoked.includes(oldURL),false);
 await assert.rejects(photo.remove());assert.equal(photo.url,oldURL);fail=false;
 const reload=createController(options);await reload.load();assert.notEqual(reload.url,'');assert.equal(stored,first);
 await photo.save(second);assert.equal(stored,second);assert.equal(revoked.includes(oldURL),true);
 await photo.remove();assert.equal(stored,null);assert.equal(photo.url,'');await reload.load();assert.equal(reload.url,'');
 assert.deepEqual(cropGeometry(1200,800,1,50,50),{x:200,y:0,side:800});
 assert.deepEqual(cropGeometry(800,1200,2,100,100),{x:400,y:800,side:400});
 assert.throws(()=>cropGeometry(0,100));
 let drawn;drawCrop({width:512,height:512,getContext:()=>({fillRect(){},drawImage(...args){drawn=args;}})},{width:1200,height:800},2,0,100);assert.deepEqual(drawn.slice(1),[0,400,400,400,0,0,512,512]);
 await assert.rejects(stories.validateFile(new Blob(['fake'],{type:'image/png'})));
 await assert.rejects(stories.validateFile({size:9*1024*1024}));
 await assert.rejects(stories.validateFile(new Blob([new Uint8Array([255,216,255,1])],{type:'image/png'})));
 assert.equal(await stories.validateFile(first),'image/jpeg');
 // Exercise actual repository photo methods with transaction completion/abort doubles.
 const meta=new Map([['seeded',{key:'seeded',value:true}]]);let abort=false,db;
 const indexedDB={open(name,version){assert.equal(name,'buba-friends-stories-v1');assert.equal(version,1);const r={};queueMicrotask(()=>{r.result=db;r.onsuccess();});return r;}};
 db={close(){},transaction(stores,mode){assert.deepEqual(stores,['meta']);const next=new Map(meta),tx={objectStore(){return {get(key){const r={};queueMicrotask(()=>{r.result=next.get(key);r.onsuccess?.();});return r;},put(record){next.set(record.key,record);return {};},delete(key){next.delete(key);return {};}};}};setImmediate(()=>{if(abort){tx.onabort();return;}if(mode==='readwrite'){meta.clear();for(const [k,v] of next)meta.set(k,v);}tx.oncomplete();});return tx;}};
 const actual=stories.createRepository(indexedDB);await actual.putPhoto(first);assert.equal(await actual.getPhoto(),first);assert.equal(meta.get('seeded').value,true);
 abort=true;await assert.rejects(actual.putPhoto(second));abort=false;assert.equal(await actual.getPhoto(),first);
 await actual.deletePhoto();assert.equal(await actual.getPhoto(),null);assert.equal(meta.get('seeded').value,true);
 await assert.rejects(actual.putPhoto(new Blob(['bad'],{type:'text/plain'})));
 // Gallery uses a separate key, with atomic legacy-main synchronization and tombstone.
 await actual.putPhoto(first);assert.deepEqual(await actual.getGallery(),[first]);
 await actual.putGallery([first,second]);assert.deepEqual(await actual.getGallery(),[first,second]);
 await actual.putGallery([second,first]);assert.equal(await actual.getPhoto(),second);
 abort=true;await assert.rejects(actual.putGallery([first]));abort=false;assert.deepEqual(await actual.getGallery(),[second,first]);
 await actual.putGallery(Array(6).fill(first));await assert.rejects(actual.putGallery(Array(7).fill(first)));assert.equal((await actual.getGallery()).length,6);
 await actual.putGallery([]);assert.deepEqual(await actual.getGallery(),[]);assert.equal(await actual.getPhoto(),null);assert.equal(meta.get('seeded').value,true);
 const {createGalleryController}=require('../profile-photo.js');let gallery=[first],block=false,serial=0;const dead=[];
 const galleryRepo={async getGallery(){return gallery;},async putGallery(items){if(block)throw Error('quota');gallery=items.slice();}};
 const gc=createGalleryController({repository:galleryRepo,createURL:()=>`blob:gallery-${++serial}`,revokeURL:u=>dead.push(u)});
 await gc.load();assert.equal(gc.photos[0],first);await gc.save(second);assert.deepEqual(gc.photos,[first,second]);
 await gc.commit([second,first]);assert.equal(gc.photos[0],second);const previousURLs=gc.urls;block=true;await assert.rejects(gc.save(first,0));assert.deepEqual(gc.urls,previousURLs);assert.deepEqual(gc.photos,[second,first]);block=false;
 await gc.save(first,0);assert.deepEqual(gc.photos,[first,first]);for(let i=2;i<6;i++)await gc.save(second);await assert.rejects(gc.save(first));assert.equal(gc.photos.length,6);
 await gc.commit(gc.photos.slice(1));assert.equal(gc.photos.length,5);await gc.remove();assert.equal(gc.photos.length,0);await gc.load();assert.equal(gc.url,'');assert.ok(dead.length>0);
 // UI workflow: select/crop/save, cancel replacement, failed replacement, delete, reload.
 stored=null;fail=false;let lastDialog;const uiRevoked=[],draws=[];
 function node(){return {value:'',disabled:false,hidden:false,files:[],style:{},innerHTML:'',textContent:'',classList:{add(){}},setAttribute(){},focus(){},querySelector(){return node();},querySelectorAll(){return [];}};}
 function modal(){const nodes={},events={};lastDialog={nodes,style:{},classList:{add(){}},querySelector(s){if(!nodes[s]){nodes[s]=node();if(s==='#photo-canvas')Object.assign(nodes[s],{width:512,height:512,getContext:()=>({fillRect(){},drawImage(...a){draws.push(a);}}),toBlob(fn){fn(second);}});}return nodes[s];},querySelectorAll(){return Object.values(nodes);},addEventListener(e,f){(events[e]??=[]).push(f);},close(){this.closed=true;for(const f of events.close||[])f();}};return lastDialog;}
 class ImageDouble{constructor(){this.width=1200;this.height=800;}set src(value){if(value)queueMicrotask(()=>this.onload?.());}}
 const add=node(),scope={querySelectorAll(s){return s==='[data-photo-add]'?[add]:[];}};
 const context=vm.createContext({console,Blob,Image:ImageDouble,URL:{createObjectURL:()=>`blob:ui-${++counter}`,revokeObjectURL:u=>uiRevoked.push(u)},document:{querySelectorAll(){return [];},querySelector(){return null;}},BubaStories:{createRepository:()=>repository,optimizeImage:async file=>{await stories.validateFile(file);return first;}},modal});
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../profile-photo.js'),'utf8'),context);
 context.BubaPhoto.bind(scope);await flush();assert.match(context.BubaPhoto.controls(),/Añadir foto/);assert.match(context.BubaPhoto.avatar(),/Avatar neutro sin foto/);assert.doesNotMatch(context.BubaPhoto.avatar(),/<img/);
 add.onclick();let d=lastDialog;d.querySelector('#photo-file').files=[first];await d.querySelector('#photo-file').onchange();assert.equal(d.querySelector('#photo-save').disabled,false);
 d.querySelector('#photo-zoom').value='2';d.querySelector('#photo-x').value='100';d.querySelector('#photo-y').value='0';d.querySelector('#photo-zoom').oninput();assert.deepEqual(Array.from(draws.at(-1).slice(1)),[800,0,400,400,0,0,512,512]);
 await d.querySelector('#photo-save').onclick();assert.equal(stored,second);assert.equal(d.closed,true);assert.match(context.BubaPhoto.controls(),/Sustituir/);assert.match(context.BubaPhoto.controls(),/Eliminar/);assert.match(context.BubaPhoto.avatar(),/<img/);
 const savedMarkup=context.BubaPhoto.avatar();
 add.onclick();d=lastDialog;d.querySelector('#photo-file').files=[first];await d.querySelector('#photo-file').onchange();d.querySelector('#photo-cancel').onclick();assert.equal(context.BubaPhoto.avatar(),savedMarkup);assert.equal(stored,second);
 add.onclick();d=lastDialog;d.querySelector('#photo-file').files=[new Blob(['invalid'])];await d.querySelector('#photo-file').onchange();assert.equal(d.querySelector('#photo-save').disabled,true);assert.match(d.querySelector('#photo-error').textContent,/válido/);assert.equal(stored,second);d.close();
 add.onclick();d=lastDialog;d.querySelector('#photo-file').files=[first];await d.querySelector('#photo-file').onchange();fail=true;await d.querySelector('#photo-save').onclick();assert.match(d.querySelector('#photo-error').textContent,/anterior se conserva/);assert.equal(context.BubaPhoto.avatar(),savedMarkup);assert.equal(d.closed,undefined);fail=false;d.close();
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../profile-photo.js'),'utf8'),context);context.BubaPhoto.bind(scope);await flush();assert.match(context.BubaPhoto.avatar(),/<img/,'reload retains photo');
 const del=node();context.BubaPhoto.bind({querySelectorAll(s){return s==='[data-photo-delete]'?[del]:[];}});del.onclick();d=lastDialog;d.querySelector('#photo-keep').onclick();assert.equal(stored,second);
 del.onclick();d=lastDialog;fail=true;await d.querySelector('#photo-confirm-delete').onclick();assert.match(d.querySelector('#photo-delete-error').textContent,/anterior se conserva/);assert.equal(stored,second);fail=false;await d.querySelector('#photo-confirm-delete').onclick();assert.equal(stored,null);assert.doesNotMatch(context.BubaPhoto.avatar(),/<img/);assert.equal(uiRevoked.length>0,true);
 // Multiple selection advances through individual crop dialogs without DataTransfer support.
 add.onclick();d=lastDialog;d.querySelector('#photo-file').files=[first,second];await d.querySelector('#photo-file').onchange();assert.match(d.querySelector('#photo-status').textContent,/1 foto/);
 await d.querySelector('#photo-save').onclick();await flush();d=lastDialog;assert.equal(d.querySelector('#photo-save').disabled,false);await d.querySelector('#photo-save').onclick();assert.equal(galleryStored.length,2);
 const main=node();main.getAttribute=()=> '1';context.BubaPhoto.bind({querySelectorAll(s){return s==='[data-photo-main]'?[main]:[];}});await main.onclick();assert.equal(galleryStored.length,2);
 const edit=node();edit.dataset={photoEdit:'1'};context.BubaPhoto.bind({querySelectorAll(s){return s==='[data-photo-edit]'?[edit]:[];}});edit.onclick();d=lastDialog;d.querySelector('#photo-file').files=[first,second];await d.querySelector('#photo-file').onchange();assert.match(d.querySelector('#photo-error').textContent,/Selecciona una imagen/);d.close();
 await context.BubaPhoto.remove();assert.equal(galleryStored.length,0);
 // Closing while decoding/optimizing cannot publish a late photo.
 let resolveOptimization;context.BubaStories.optimizeImage=()=>new Promise(resolve=>{resolveOptimization=resolve;});
 context.BubaPhoto.bind(scope);add.onclick();d=lastDialog;d.querySelector('#photo-file').files=[first];const preparing=d.querySelector('#photo-file').onchange();d.querySelector('#photo-cancel').onclick();const countBefore=counter;resolveOptimization(first);await preparing;assert.equal(counter,countBefore);assert.equal(stored,null);
 console.log('Foto de perfil: añadir, encuadrar, guardar, recargar, cambiar, cancelar, fallar y eliminar; límites de archivo y aislamiento de meta verificados con simulaciones.');
};
