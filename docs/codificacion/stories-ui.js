/* Stories UI: uses the existing app's navigation, dialogs, matches and chat. */
'use strict';
const storyAPI=globalThis.BubaStories;
let storyDatabase;try{storyDatabase=globalThis.indexedDB;}catch{}
const storyService=storyAPI.createService({repository:storyAPI.createRepository(storyDatabase)});
let storyCollections=[],storyRecords=[],storyReady=false,storyFailure='',storyTimer=null,storyViewer=null,storyOpenSequence=0;
const storyURLs=new Map();
function storyURL(s){
 if(s.imagePath)return s.imagePath;
 if(!storyURLs.has(s.id))storyURLs.set(s.id,URL.createObjectURL(s.blob));
 return storyURLs.get(s.id);
}
function liveStories(){return storyRecords.filter(s=>storyAPI.active(s,Date.now())&&(s.authorId==='self'||state.matches.includes(s.authorId)));}
function highlightedStories(){return storyRecords.filter(s=>s.authorId==='self'&&s.featured);}
function storyAuthor(s){return s.authorId==='self'?state.me.name:profiles.find(p=>p.id===s.authorId)?.name||'Perfil ficticio';}
function storyAge(s){const minutes=Math.max(0,Math.floor((Date.now()-s.createdAt)/60000));return minutes<1?'Ahora':minutes<60?`Hace ${minutes} min`:`Hace ${Math.floor(minutes/60)} h`;}
function storyAvatar(authorId){
 if(authorId==='self'&&globalThis.BubaPhoto)return BubaPhoto.avatar();
 const profile=profiles.find(p=>p.id===authorId);
 if(profile&&typeof thumbnail==='function')return `<img src="${esc(thumbnail(profile))}" alt="" loading="lazy">`;
 return '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="34" r="17"/><path d="M17 91v-8a33 33 0 0 1 66 0v8z"/></svg>';
}
function storiesByAuthor(records){
 const groups=new Map();for(const record of records){if(!groups.has(record.authorId))groups.set(record.authorId,[]);groups.get(record.authorId).push(record);}
 return [...groups.values()].map(group=>group.sort((a,b)=>a.createdAt-b.createdAt||a.id.localeCompare(b.id)));
}
function storyButton(s,featured=false,group=[s]){const selected=group.find(item=>item.seenAt==null)||s,seen=group.every(item=>item.seenAt!=null);return `<button type="button" class="story-item ${seen?'seen':'unseen'}" data-story-id="${esc(selected.id)}" data-story-author="${esc(s.authorId)}" data-story-featured="${featured}"><span class="story-circle">${storyAvatar(s.authorId)}</span><span>${s.authorId==='self'?'Tu historia':esc(storyAuthor(s))}</span><small>${featured?'Destacada':group.some(item=>item.example)?'Ejemplo':''}</small><span class="sr-only">${group.length} ${group.length===1?'historia':'historias'} · ${seen?'Vistas':'Hay historias sin ver'}</span></button>`;}
function storiesConnectionsView(){
 const groups=storiesByAuthor(liveStories()),own=groups.find(group=>group[0].authorId==='self'),others=groups.filter(group=>group[0].authorId!=='self');
 const disabled=storyReady?'':'disabled';
 return `<section class="stories-section" aria-labelledby="stories-title"><h2 id="stories-title" class="section-title">Historias</h2><p class="stories-note">Demo local · Historias de 24 horas. El aro rosa indica historias sin ver, no lectura del chat.</p><div class="story-strip" aria-label="Historias por persona"><div class="story-own">${own?storyButton(own[0],false,own):`<button type="button" class="story-item no-story" data-new-story ${disabled}><span class="story-circle">${storyAvatar('self')}</span><span>Tu historia</span></button>`}<button type="button" class="story-add" id="new-story" aria-label="Añadir una historia" ${disabled}>+</button></div>${others.map(group=>storyButton(group[0],false,group)).join('')}</div>${!others.length?'<p class="stories-empty">Aún no hay historias activas de tus conexiones. <button class="text-btn" data-nav="discover">Descubrir perfiles</button></p>':''}${storyFailure?`<p class="form-error" role="status">${esc(storyFailure)} <button class="text-btn" id="retry-stories">Reintentar</button></p>`:!storyReady?'<p class="stories-note" role="status">Preparando historias locales…</p>':''}</section>`;
}
function storiesProfileView(){return collectionProfileView();}
function storyReferenceInner(ref){
 const available=storyRecords.some(s=>s.id===ref.id&&s.authorId===ref.authorId&&(storyAPI.active(s,Date.now())||s.featured===true));
 return `<strong>${available?'Respuesta a historia de '+esc(profiles.find(p=>p.id===ref.authorId)?.name||'perfil ficticio'):'Historia no disponible'}</strong>${ref.caption?`<span>${esc(ref.caption)}</span>`:''}`;
}
function storyReference(ref){return ref?`<div class="story-reference" data-story-reference="${esc(ref.id)}">${storyReferenceInner(ref)}</div>`:'';}
function repaintStories(){
 if(storyViewer?.dialog.open)return;
 if(page==='stories'||(page==='profile'&&!editingProfile))render();
 else if(page==='profile'&&editingProfile){const section=root.querySelector('.featured-section');if(section){section.outerHTML=storiesProfileView();bindCollections();}}
 else if(page==='matches'&&activeChat)root.querySelectorAll('[data-story-reference]').forEach(el=>{
  const ref=state.messages[activeChat]?.find(m=>m.story?.id===el.dataset.storyReference)?.story;if(ref)el.innerHTML=storyReferenceInner(ref);
 });
}
async function refreshStories({paint=true}={}){
 try{
  const library=await storyService.library();storyRecords=library.stories;storyCollections=library.collections;storyReady=true;storyFailure='';
  for(const [id,url] of storyURLs)if(!storyRecords.some(s=>s.id===id)){URL.revokeObjectURL(url);storyURLs.delete(id);}
  clearTimeout(storyTimer);
  const expiry=storyRecords.filter(s=>storyAPI.active(s,Date.now())).map(s=>s.expiresAt);
  if(expiry.length)storyTimer=setTimeout(()=>refreshStories(),Math.max(1,Math.min(...expiry)-Date.now()+1));
  if(storyViewer&&(!storyRecords.some(s=>s.id===storyViewer.id&&(storyAPI.active(s,Date.now())||(storyViewer.featured&&s.authorId==='self'&&s.featured)))||(typeof storyViewer.featured==='string'&&!storyCollections.some(c=>c.id===storyViewer.featured&&c.storyIds.includes(storyViewer.id))))){
   storyViewer.dialog.close();storyViewer=null;toast('Historia no disponible.');
  }
 }catch(e){storyFailure=e.message||'No se pueden leer las historias en este navegador.';storyReady=false;}
 if(paint)repaintStories();
}
function bindStories(){
 bindCollections();
 const create=root.querySelector('#new-story');if(create)create.onclick=openStoryComposer;
 root.querySelectorAll('[data-new-story]').forEach(b=>b.onclick=openStoryComposer);
 const retry=root.querySelector('#retry-stories');if(retry)retry.onclick=()=>refreshStories();
 root.querySelectorAll('[data-story-id]').forEach(b=>b.onclick=()=>openStory(b.dataset.storyId,b.dataset.storyFeatured==='true'));
}
async function openStoryComposer(){
 if(!storyReady){toast(storyFailure||'Las historias todavía se están preparando.');return;}
 const d=modal(`<h2>Tu historia</h2><p>Comparte una imagen y unas palabras. Caduca 24 horas después de confirmar.</p><form id="story-compose" novalidate><label class="story-field">Imagen del dispositivo<input id="story-file" type="file" accept="image/jpeg,image/png,image/webp" required aria-describedby="story-file-help story-compose-error"></label><p class="stories-note" id="story-file-help">JPEG, PNG o WebP · Hasta 8 MB. Se optimiza para móvil.</p><img id="story-preview" class="story-preview" alt="Vista previa de tu historia" hidden><label class="story-field">Texto breve (opcional)<textarea id="story-caption" maxlength="180" rows="3"></textarea></label><p id="story-compose-error" class="form-error" role="alert"></p><p class="stories-note" id="story-local-note">Solo se guarda en este navegador</p><div class="panel-actions"><button class="btn" id="publish-story" disabled aria-describedby="story-local-note">Publicar en la demo</button><button class="btn light" type="button" id="cancel-story">Cancelar</button></div></form>`);
 d.classList.add('story-composer');let blob=null,previewURL=null,selection=0,busy=false;
 const input=d.querySelector('#story-file'),preview=d.querySelector('#story-preview'),publish=d.querySelector('#publish-story'),error=d.querySelector('#story-compose-error');
 d.addEventListener('close',()=>{selection++;blob=null;if(previewURL)URL.revokeObjectURL(previewURL);});
 d.querySelector('#cancel-story').onclick=()=>d.close();
 input.onchange=async()=>{
  const token=++selection;blob=null;publish.disabled=true;error.textContent='';preview.hidden=true;
  if(previewURL){URL.revokeObjectURL(previewURL);previewURL=null;}
  const file=input.files?.[0];if(!file)return;
  try{const optimized=await storyAPI.optimizeImage(file);if(token!==selection||!d.open)return;blob=optimized;previewURL=URL.createObjectURL(blob);preview.src=previewURL;preview.hidden=false;publish.disabled=false;}
  catch(e){if(token===selection&&d.open)error.textContent=e.message;}
 };
 d.querySelector('#story-compose').onsubmit=async e=>{
  e.preventDefault();if(busy||!blob)return;busy=true;publish.disabled=true;input.disabled=true;
  try{await storyService.create(blob,d.querySelector('#story-caption').value);d.close();await refreshStories();toast('Historia guardada solo en este navegador. Dura 24 horas.');}
  catch(e){error.textContent=e.message;busy=false;publish.disabled=false;input.disabled=false;}
 };
}
function storyViewerMarkup(record,list,index,featured,collection=null){
 const own=record.authorId==='self';
 return `<header class="story-view-header"><ol class="story-segments" aria-label="${list.length} historias · Avance manual">${list.map((item,i)=>`<li class="${i===index?'is-selected':''}" ${i===index?'aria-current="step"':''}><span class="sr-only">Historia ${i+1}${i===index?', seleccionada':''}</span></li>`).join('')}</ol><div class="story-author-line"><span class="story-author-avatar">${storyAvatar(record.authorId)}</span><div><h2>${esc(collection?collection.name:storyAuthor(record))}</h2><p class="story-time">${collection?esc(storyAuthor(record))+' · ':''}${storyAge(record)} · Demo local${record.example?' · Ejemplo':''}${featured?' · Destacada':''}</p></div></div></header><div class="story-stage"><img class="story-image" src="${esc(storyURL(record))}" alt="${record.example?'Ilustración de ejemplo: '+esc(record.caption):'Imagen de la historia de '+esc(storyAuthor(record))}"><button type="button" class="story-tap-zone story-tap-prev" id="story-tap-prev" tabindex="-1" aria-hidden="true" ${index===0?'disabled':''}></button><button type="button" class="story-tap-zone story-tap-next" id="story-tap-next" tabindex="-1" aria-hidden="true" ${index===list.length-1?'disabled':''}></button></div><footer class="story-view-footer">${record.caption?`<p class="story-caption">${esc(record.caption)}</p>`:''}<div class="story-controls"><button type="button" id="story-prev" ${index===0?'disabled':''} aria-label="Historia anterior">‹ Anterior</button><span aria-live="polite">${index+1} de ${list.length} · Manual</span><button type="button" id="story-next" ${index===list.length-1?'disabled':''} aria-label="Historia siguiente">Siguiente ›</button></div>${collection?`<div class="panel-actions"><button type="button" class="btn light" id="manage-view-collection">Editar colección</button><button type="button" class="danger" id="remove-view-image">Quitar esta imagen</button></div><p class="stories-note">Destacada propia · Solo en este navegador.</p>`:own?`<div class="panel-actions"><button type="button" class="btn light" id="feature-story">Guardar en colección</button><button type="button" class="danger" id="delete-story">Eliminar historia activa</button></div><p class="stories-note">Solo en este navegador. Las imágenes guardadas en colecciones se conservan.</p>`:`<form id="story-reply" class="story-reply"><label class="story-field">Responder a esta historia<input id="story-reply-text" maxlength="1000" autocomplete="off" required></label><button class="btn" id="story-reply-send">Enviar respuesta</button><p class="stories-note">Mensaje local de demo. No se envía a nadie.</p></form>`}<p class="form-error" role="alert" id="story-view-error"></p></footer>`;
}
async function openStory(id,featured=false,session=null){
 if(session?.closed)return;
 const sequence=++storyOpenSequence;
 if(!session)session={restore:true,closed:false,busy:false,openerId:id,scrollX:window.scrollX||0,scrollY:window.scrollY||0,stripLeft:root.querySelector('.story-strip')?.scrollLeft||0};
 try{
  await refreshStories({paint:false});
  if(!storyReady)throw new Error(storyFailure);
  const record=await storyService.get(id,{allowFeatured:featured});
  if(sequence!==storyOpenSequence||session.closed)return;
  if(!record||(record.authorId!=='self'&&!state.matches.includes(record.authorId)))throw new Error('Historia no disponible.');
  await storyService.markSeen(id);await refreshStories({paint:false});
  const collection=typeof featured==='string'?storyCollections.find(c=>c.id===featured):featured?storyCollections.find(c=>c.storyIds.includes(id)):null;
  if(featured&&!collection)throw new Error('Esta colección ya no está disponible.');
  if(collection)featured=collection.id;
  const list=collection?collection.storyIds.map(id=>storyRecords.find(s=>s.id===id)).filter(Boolean):liveStories().filter(s=>s.authorId===record.authorId).sort((a,b)=>a.createdAt-b.createdAt||a.id.localeCompare(b.id)),index=list.findIndex(s=>s.id===id);
  if(sequence!==storyOpenSequence||session.closed)return;
  if(index<0)throw new Error('Historia no disponible.');
  const own=record.authorId==='self',markup=storyViewerMarkup(record,list,index,featured,collection);
  let d=session.dialog;
  if(!d){
   d=modal(`<div id="story-view-content">${markup}</div>`);session.dialog=d;
   d.classList.add('story-viewer');document.body.classList.add('story-view-open');
   const fit=()=>{const v=window.visualViewport,mobile=window.innerWidth<=600;if(mobile&&v){d.style.height=v.height+'px';d.style.maxHeight=v.height+'px';d.style.top=v.offsetTop+'px';d.style.setProperty('--story-height',v.height+'px');}else{d.style.height='';d.style.maxHeight='';d.style.top='';d.style.removeProperty('--story-height');}};
   fit();window.visualViewport?.addEventListener('resize',fit);window.visualViewport?.addEventListener('scroll',fit);window.addEventListener('resize',fit);
   d.addEventListener('keydown',e=>{if(e.target?.closest?.('input,textarea,select,button'))return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();session.move?.(e.key==='ArrowRight'?1:-1);}});
   d.addEventListener('close',()=>{
    session.closed=true;++storyOpenSequence;if(storyViewer?.dialog===d)storyViewer=null;
    document.body.classList.remove('story-view-open');window.visualViewport?.removeEventListener('resize',fit);window.visualViewport?.removeEventListener('scroll',fit);window.removeEventListener('resize',fit);
    if(session.restore){repaintStories();const strip=root.querySelector('.story-strip');if(strip)strip.scrollLeft=session.stripLeft;const openers=[...root.querySelectorAll('[data-story-author]')],collectionOpener=[...root.querySelectorAll('[data-collection-id]')].find(el=>el.dataset.collectionId===featured),opener=collectionOpener||openers.find(el=>el.dataset.storyId===session.openerId)||openers.find(el=>el.dataset.storyAuthor===record.authorId);opener?.focus({preventScroll:true});window.scrollTo?.(session.scrollX,session.scrollY);}
   });
  }else{d.querySelector('#story-view-content').innerHTML=markup;d.setAttribute('aria-label',collection?'Colección '+collection.name+' · '+storyAuthor(record):'Historia de '+storyAuthor(record));}
  storyViewer={id,featured,dialog:d};session.busy=false;
  const move=step=>{if(session.busy||session.closed)return;const next=index+step;if(next<0||next>=list.length)return;session.busy=true;session.focusSelector=document.activeElement?.id;return openStory(list[next].id,featured,session);};session.move=move;
  d.querySelector('#story-prev').onclick=()=>move(-1);d.querySelector('#story-next').onclick=()=>move(1);
  d.querySelector('#story-tap-prev').onclick=()=>move(-1);d.querySelector('#story-tap-next').onclick=()=>move(1);
  if(session.focusSelector==='story-prev'||session.focusSelector==='story-next'){const target=d.querySelector('#'+session.focusSelector);(target.disabled?d.querySelector(target.id==='story-prev'?'#story-next':'#story-prev'):target)?.focus({preventScroll:true});}
  const showError=e=>{d.querySelector('#story-view-error').textContent=e.message;};
  if(collection){
   d.querySelector('#manage-view-collection').onclick=()=>openCollectionManager(collection.id);
   d.querySelector('#remove-view-image').onclick=()=>confirmCollectionRemoval(collection.id,id);
  }else if(own){
   let changing=false;
   d.querySelector('#feature-story').onclick=()=>openCollectionPicker({storyId:id});
   d.querySelector('#delete-story').onclick=async()=>{if(changing||session.busy)return;changing=true;session.busy=true;try{await storyService.deleteOwn(id);await refreshStories({paint:false});d.close();toast('Historia e imagen eliminadas de este navegador.');}catch(e){changing=false;session.busy=false;showError(e);}};
  }else{
   let sent=false;
   d.querySelector('#story-reply').onsubmit=async e=>{
    e.preventDefault();if(sent||session.busy||session.closed)return;const text=d.querySelector('#story-reply-text').value.trim();if(!text)return;
    sent=true;session.busy=true;d.querySelector('#story-reply-send').disabled=true;
    try{
     const reply=await storyService.reply(id,text,state.matches);
     if(session.closed)return;
     if(!state.matches.includes(reply.authorId)||(Date.now()>=record.expiresAt&&!record.featured))throw new Error('Historia no disponible.');
     const saved=appendChatMessage(reply.authorId,reply.message);if(!saved)throw new Error('No se pudo guardar la respuesta. El texto sigue aquí; vuelve a intentarlo.');session.restore=false;d.close();chatOrigin=page==='stories'?'stories':'profile';page='matches';activeChat=reply.authorId;render();focusMain();
     if(saved)toast('Respuesta guardada en la conversación local.');
    }catch(e){sent=false;session.busy=false;d.querySelector('#story-reply-send').disabled=false;showError(e);await refreshStories();}
   };
  }
 }catch(e){session.busy=false;toast(e.message||'No se pudo abrir la historia.');}
}
async function resetStories(){
 ++storyOpenSequence;await storyService.reset();
 for(const url of storyURLs.values())URL.revokeObjectURL(url);storyURLs.clear();
 await refreshStories({paint:false});
}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')refreshStories();});
window.addEventListener('pageshow',()=>refreshStories());
window.addEventListener('focus',()=>refreshStories());
refreshStories();
