// Controlled clocks, isolated repositories and DOM doubles; not a browser/IndexedDB-device test.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const api=require('../stories.js');
function memoryRepository(){
 let records=new Map(),seeded=false,queue=Promise.resolve(),fail=false;
 return {
  get records(){return [...records.values()];},
  set fail(v){fail=v;},
  transact(transform){const work=queue.then(()=>{
   if(fail)throw Error('Almacenamiento bloqueado');
   const snapshot={stories:structuredClone([...records.values()]),seeded};
   const changes=transform(snapshot),next=new Map(records);
   for(const id of changes.remove||[])next.delete(id);
   for(const item of changes.put||[])next.set(item.id,structuredClone(item));
   records=next;if(changes.seeded!==undefined)seeded=changes.seeded;
   return structuredClone(changes.result);
  });queue=work.catch(()=>{});return work;},
 };
}
module.exports=async function runStoriesTests(){
 let now=1800000000000,counter=0;
 const repository=memoryRepository(),service=api.createService({repository,clock:()=>now,idFactory:()=>String(++counter)});
 const jpeg=new Blob([new Uint8Array([255,216,255,224,1,2,3])],{type:'image/jpeg'});
 const seeds=await service.list();assert.equal(seeds.length,3);assert.equal(new Set(seeds.map(s=>s.authorId)).size,3);
 const seedDate=seeds[0].createdAt;now+=1000;
 const reloaded=api.createService({repository,clock:()=>now,idFactory:()=>String(++counter)});
 assert.equal((await reloaded.list())[0].createdAt,seedDate,'Reload must not renew the examples');
 const own=await service.create(jpeg,'  Mi plan  ');assert.equal(own.caption,'Mi plan');assert.equal(own.expiresAt-own.createdAt,api.DAY);
 assert.ok(repository.records.find(s=>s.id===own.id).blob instanceof Blob);
 assert.ok(!JSON.stringify(own).includes('base64'));
 await assert.rejects(()=>service.create(jpeg,'x'.repeat(181)),/180/);
 await assert.rejects(()=>service.create(new Blob(['x'],{type:'image/png'}),'x'),/imagen/);
 await service.feature(own.id,true);
 await service.feature(own.id,false);assert.ok(await service.get(own.id),'Unfeature before expiry keeps the active story and its blob');
 assert.ok(repository.records.find(s=>s.id===own.id).blob);await service.feature(own.id,true);
 await service.markSeen(seeds[0].id);assert.equal((await service.get(seeds[0].id)).seenAt,now);
 const reply=await service.reply('example-vega-v1',' Hola ',['vega']);
 assert.equal(reply.authorId,'vega');assert.equal(reply.message.text,'Hola');assert.equal(reply.message.story.caption,seeds.find(s=>s.id==='example-vega-v1').caption);
 assert.ok(!('blob' in reply.message.story));assert.ok(!('imagePath' in reply.message.story));
 await assert.rejects(()=>service.reply('example-vega-v1',' ',['vega']),/respuesta/);
 await assert.rejects(()=>service.reply('example-vega-v1','Hola',[]),/disponible/);
 await assert.rejects(()=>service.reply(own.id,'Hola',['self']),/disponible/);
 now=seedDate+api.DAY-1;assert.ok(await service.get('example-vega-v1'));
 now=seedDate+api.DAY;assert.equal(await service.get('example-vega-v1'),null);
 await assert.rejects(()=>service.reply('example-vega-v1','Tarde',['vega']),/disponible/);
 assert.equal((await reloaded.list()).filter(s=>s.example).length,0,'No reseed after expiry');
 now=own.expiresAt-1;assert.ok(await service.get(own.id));
 now=own.expiresAt;assert.equal(await service.get(own.id),null);assert.ok(await service.get(own.id,{allowFeatured:true}));
 assert.ok(repository.records.some(s=>s.id===own.id&&s.blob));
 await service.feature(own.id,false);assert.equal(repository.records.some(s=>s.id===own.id),false,'Unfeature expired: remove blob and record');
 const disposable=await service.create(jpeg);await service.deleteOwn(disposable.id);assert.equal(await service.get(disposable.id),null);
 const expiring=await service.create(jpeg);now=expiring.expiresAt;await service.list();assert.equal(repository.records.some(s=>s.id===expiring.id),false);
 const keep=await service.create(jpeg);await service.feature(keep.id,true);await service.reset();
 assert.equal(repository.records.length,3);assert.ok(repository.records.every(s=>!s.blob&&s.example&&s.createdAt===now));
 repository.fail=true;await assert.rejects(()=>service.create(jpeg),/bloqueado/);repository.fail=false;
 assert.equal(repository.records.length,3);
 await assert.rejects(()=>api.createRepository(undefined).transact(()=>({})),/IndexedDB/);
 await api.validateFile(jpeg);
 await api.validateFile(new Blob([new Uint8Array([137,80,78,71,13,10,26,10,1])],{type:'image/png'}));
 await api.validateFile(new Blob(['RIFF0000WEBPVP8 '],{type:'image/webp'}));
 await assert.rejects(()=>api.validateFile(new Blob(['not jpeg'],{type:'image/jpeg'})),/contenido/);
 await assert.rejects(()=>api.validateFile(new Blob([new Uint8Array([255,216,255])],{type:'image/png'})),/contenido/);
 await assert.rejects(()=>api.validateFile(new Blob([new Uint8Array(api.MAX_FILE+1)],{type:'image/jpeg'})),/8 MB/);
 console.log('Historias core: creación, blobs, persistencia, reloj 24 h exactas, vistas, destacadas, borrado, respuestas y reinicio correctos.');

 // Exercise actual canvas optimization control flow with decode/canvas doubles.
 let drawn,closed=false;
 const compressionContext=vm.createContext({module:{exports:{}},Blob,Uint8Array,URL,
  createImageBitmap:async()=>({width:2400,height:1600,close(){closed=true;}}),
  document:{createElement(){return {getContext(){return {fillRect(){},drawImage(...args){drawn=args;}};},toBlob(callback,type,quality){assert.equal(type,'image/jpeg');assert.equal(quality,.82);callback(jpeg);}};}},
 });
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../stories.js'),'utf8'),compressionContext);
 await compressionContext.module.exports.optimizeImage(jpeg);assert.equal(drawn[3],1280);assert.equal(drawn[4],853);assert.equal(closed,true);
 console.log('Formato/tamaño y optimización a 1280 px verificados con decodificación/canvas simulados.');

 // UI sequences use the real stories UI, but isolated memory storage and a minimal DOM.
 now=1900000000000;counter=0;const uiRepo=memoryRepository(),revoked=[],saved=[],dialogs=[];
 const element=()=>({value:'',disabled:false,hidden:false,style:{},classList:{add(){},remove(){}},focus(){}});
 const ui={
  Blob,Date:{now:()=>now},URL:{createObjectURL:()=>`blob:test-${++counter}`,revokeObjectURL:url=>revoked.push(url)},
  BubaStories:{...api,createRepository:()=>uiRepo,createService:options=>api.createService({...options,clock:()=>now,idFactory:()=>String(++counter)}),optimizeImage:async()=>jpeg},
  state:{started:true,me:{name:'Demo'},matches:['vega','nico'],messages:{vega:[],nico:[]}},
  chatOrigin:'matches',page:'stories',activeChat:null,editingProfile:false,
  profiles:[{id:'vega',name:'Vega'},{id:'nico',name:'Nico'},{id:'alma',name:'Alma'}],
  esc:s=>String(s).replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'),
  document:{addEventListener(){}},window:{addEventListener(){}},root:{querySelector(){return null;},querySelectorAll(){return [];}},
  setTimeout:()=>1,clearTimeout(){},toast(){},render(){},focusMain(){},save(){saved.push(JSON.stringify(ui.state));return true;},
  modal(html){
   const controls={},events={};const dialog={innerHTML:html,open:true,classList:{add(){}},
    querySelector(s){if(!s.startsWith('#')||!html.includes(`id="${s.slice(1)}"`))return null;return controls[s]||=element();},
    addEventListener(type,fn){(events[type]||=[]).push(fn);},
    close(){this.open=false;for(const fn of events.close||[])fn();},
   };dialogs.push(dialog);return dialog;
  },
 };
 const context=vm.createContext(ui);vm.runInContext(fs.readFileSync(path.join(__dirname,'../stories-ui.js'),'utf8'),context);
 await vm.runInContext('refreshStories()',context);
 const markup=vm.runInContext('storiesConnectionsView()',context);
 assert.match(markup,/Tu historia/);assert.match(markup,/example-vega/);assert.match(markup,/example-nico/);assert.doesNotMatch(markup,/example-alma/);
 await vm.runInContext('openStoryComposer()',context);let d=dialogs.at(-1);
 d.querySelector('#story-file').files=[jpeg];await d.querySelector('#story-file').onchange();
 assert.equal(d.querySelector('#story-preview').hidden,false);
 d.querySelector('#cancel-story').onclick();assert.equal(uiRepo.records.some(s=>s.authorId==='self'),false);assert.ok(revoked.length);
 await vm.runInContext('openStoryComposer()',context);d=dialogs.at(-1);d.querySelector('#story-file').files=[jpeg];await d.querySelector('#story-file').onchange();
 d.querySelector('#story-caption').value='Mi historia de prueba';
 const publish=d.querySelector('#story-compose').onsubmit;
 await Promise.all([publish({preventDefault(){}}),publish({preventDefault(){}})]);
 assert.equal(uiRepo.records.filter(s=>s.authorId==='self').length,1,'Double confirmation creates one story');
 const mine=uiRepo.records.find(s=>s.authorId==='self');
 await vm.runInContext(`openStory(${JSON.stringify(mine.id)})`,context);d=dialogs.at(-1);
 assert.equal(d.querySelector('#story-reply'),null,'Own stories cannot be replied to');
 await d.querySelector('#feature-story').onclick();assert.equal(uiRepo.records.find(s=>s.id===mine.id).featured,true);
 await vm.runInContext("openStory('example-vega-v1')",context);d=dialogs.at(-1);
 d.querySelector('#story-reply-text').value='  ';await d.querySelector('#story-reply').onsubmit({preventDefault(){}});assert.equal(ui.state.messages.vega.length,0);
 d.querySelector('#story-reply-text').value='Qué buen plan';const submit=d.querySelector('#story-reply').onsubmit;
 await Promise.all([submit({preventDefault(){}}),submit({preventDefault(){}})]);
 assert.equal(ui.state.messages.vega.length,1);assert.equal(ui.state.messages.nico.length,0);assert.equal(ui.activeChat,'vega');
 assert.equal(ui.state.messages.vega[0].story.id,'example-vega-v1');assert.equal(ui.state.matches.length,2);assert.equal(saved.length,1);
 await vm.runInContext("openStory('example-nico-v1')",context);const lateDialog=dialogs.at(-1);lateDialog.querySelector('#story-reply-text').value='Demasiado tarde';
 now+=api.DAY;await vm.runInContext('refreshStories()',context);await lateDialog.querySelector('#story-reply').onsubmit({preventDefault(){}});assert.equal(ui.state.messages.nico.length,0,'No response accepted after expiry');
 assert.equal(vm.runInContext('liveStories().length',context),0);assert.equal(vm.runInContext('highlightedStories().length',context),1);
 ui.ref=ui.state.messages.vega[0].story;assert.match(vm.runInContext('storyReference(ref)',context),/Historia no disponible/);
 await vm.runInContext(`openStory(${JSON.stringify(mine.id)},true)`,context);d=dialogs.at(-1);await d.querySelector('#delete-story').onclick();
 assert.equal(uiRepo.records.some(s=>s.id===mine.id),false);assert.equal(vm.runInContext('storyURLs.size',context),0);
 await vm.runInContext('resetStories()',context);assert.equal(uiRepo.records.length,3);assert.ok(uiRepo.records.every(s=>s.createdAt===now));
 uiRepo.fail=true;await vm.runInContext('refreshStories()',context);assert.equal(vm.runInContext('storyReady',context),false);assert.match(vm.runInContext('storiesConnectionsView()',context),/Reintentar/);
 console.log('UI simulada: cancelar/confirmar sin duplicados, ver, destacar, borrar, respuesta al chat correcto, caducidad, referencias y reinicio correctos.');
};
if(require.main===module)module.exports().catch(e=>{console.error(e);process.exitCode=1;});
