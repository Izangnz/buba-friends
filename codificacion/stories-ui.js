/* Stories UI: uses the existing app's navigation, dialogs, matches and chat. */
'use strict';
const storyAPI=globalThis.BubaStories;
let storyDatabase;try{storyDatabase=globalThis.indexedDB;}catch{}
const storyService=storyAPI.createService({repository:storyAPI.createRepository(storyDatabase)});
let storyRecords=[],storyReady=false,storyFailure='',storyTimer=null,storyViewer=null,storyOpenSequence=0;
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
function storyButton(s,featured=false){return `<button type="button" class="story-item ${s.seenAt!==null?'seen':'unseen'}" data-story-id="${esc(s.id)}" data-story-featured="${featured}"><span class="story-circle"><img src="${esc(storyURL(s))}" alt="" loading="lazy"></span><span>${esc(storyAuthor(s))}</span><small>${featured?'Destacada':s.example?'Ejemplo':''}</small><span class="sr-only">${s.seenAt!==null?'Historia vista':'Historia sin ver'}</span></button>`;}
function storiesConnectionsView(){
 const own=liveStories().find(s=>s.authorId==='self'),others=liveStories().filter(s=>s.authorId!=='self');
 const disabled=storyReady?'':'disabled';
 return `<section class="stories-section" aria-labelledby="stories-title"><h2 id="stories-title" class="section-title">Historias</h2><p class="stories-note">Ejemplos y publicaciones locales · 24 horas. El aro indica historias vistas, no lectura del chat.</p><div class="story-strip"><div class="story-own">${own?`<button type="button" class="story-item ${own.seenAt!==null?'seen':'unseen'}" data-story-id="${esc(own.id)}" data-story-featured="false"><span class="story-circle"><img src="${esc(storyURL(own))}" alt=""></span><span>Tu historia</span></button><button type="button" class="story-add" id="new-story" aria-label="Añadir una historia">+</button>`:`<button type="button" class="story-item" id="new-story" ${disabled}><span class="story-circle story-plus" aria-hidden="true">+</span><span>Tu historia</span></button>`}</div>${others.map(s=>storyButton(s)).join('')}${!others.length?'<p class="stories-empty">Las historias de ejemplo de tus coincidencias aparecerán aquí mientras estén activas.</p>':''}</div>${storyFailure?`<p class="form-error" role="status">${esc(storyFailure)} <button class="text-btn" id="retry-stories">Reintentar</button></p>`:!storyReady?'<p class="stories-note" role="status">Preparando historias locales…</p>':''}</section>`;
}
function storiesProfileView(){return `<section class="featured-section" aria-labelledby="featured-title"><h2 class="section-title" id="featured-title">Destacadas</h2><p class="stories-note">Tus historias guardadas aquí siguen disponibles después de 24 horas. Solo en este navegador.</p><div class="story-strip">${highlightedStories().map(s=>storyButton(s,true)).join('')||'<p class="stories-empty">Aún no tienes destacadas. Abre una historia propia para guardarla aquí.</p>'}</div></section>`;}
function storyReferenceInner(ref){
 const available=storyRecords.some(s=>s.id===ref.id&&s.authorId===ref.authorId&&storyAPI.active(s,Date.now()));
 return `<strong>${available?'Respuesta a historia de '+esc(profiles.find(p=>p.id===ref.authorId)?.name||'perfil ficticio'):'Historia no disponible'}</strong>${ref.caption?`<span>${esc(ref.caption)}</span>`:''}`;
}
function storyReference(ref){return ref?`<div class="story-reference" data-story-reference="${esc(ref.id)}">${storyReferenceInner(ref)}</div>`:'';}
function repaintStories(){
 if((page==='matches'&&!activeChat)||(page==='profile'&&!editingProfile))render();
 else if(page==='matches'&&activeChat)root.querySelectorAll('[data-story-reference]').forEach(el=>{
  const ref=state.messages[activeChat]?.find(m=>m.story?.id===el.dataset.storyReference)?.story;if(ref)el.innerHTML=storyReferenceInner(ref);
 });
}
async function refreshStories({paint=true}={}){
 try{
  storyRecords=await storyService.list();storyReady=true;storyFailure='';
  for(const [id,url] of storyURLs)if(!storyRecords.some(s=>s.id===id)){URL.revokeObjectURL(url);storyURLs.delete(id);}
  clearTimeout(storyTimer);
  const expiry=storyRecords.filter(s=>storyAPI.active(s,Date.now())).map(s=>s.expiresAt);
  if(expiry.length)storyTimer=setTimeout(()=>refreshStories(),Math.max(1,Math.min(...expiry)-Date.now()+1));
  if(storyViewer&&!storyRecords.some(s=>s.id===storyViewer.id&&(storyAPI.active(s,Date.now())||(storyViewer.featured&&s.authorId==='self'&&s.featured)))){
   storyViewer.dialog.close();storyViewer=null;toast('Historia no disponible.');
  }
 }catch(e){storyFailure=e.message||'No se pueden leer las historias en este navegador.';storyReady=false;}
 if(paint)repaintStories();
}
function bindStories(){
 const create=root.querySelector('#new-story');if(create)create.onclick=openStoryComposer;
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
async function openStory(id,featured=false){
 const sequence=++storyOpenSequence;
 try{
  await refreshStories({paint:false});
  if(!storyReady)throw new Error(storyFailure);
  const record=await storyService.get(id,{allowFeatured:featured});
  if(sequence!==storyOpenSequence)return;
  if(!record||(record.authorId!=='self'&&!state.matches.includes(record.authorId)))throw new Error('Historia no disponible.');
  await storyService.markSeen(id);await refreshStories({paint:false});
  const list=featured?highlightedStories():liveStories(),index=list.findIndex(s=>s.id===id);
  if(index<0||sequence!==storyOpenSequence)throw new Error('Historia no disponible.');
  const own=record.authorId==='self';
  const d=modal(`<h2>${esc(storyAuthor(record))}</h2><p class="story-time">${record.example?'Historia de ejemplo · ':''}${featured?'Destacada · ':''}${storyAge(record)} · ${index+1} de ${list.length}</p><img class="story-image" src="${esc(storyURL(record))}" alt="${record.example?'Ilustración de ejemplo: '+esc(record.caption):'Imagen de la historia de '+esc(storyAuthor(record))}">${record.caption?`<p class="story-caption">${esc(record.caption)}</p>`:''}<div class="story-controls"><button type="button" class="btn light" id="story-prev" ${index===0?'disabled':''} aria-label="Historia anterior">‹ Anterior</button><button type="button" class="btn light" id="story-next" ${index===list.length-1?'disabled':''} aria-label="Historia siguiente">Siguiente ›</button></div>${own?`<div class="panel-actions"><button type="button" class="btn light" id="feature-story">${record.featured?'Quitar de destacadas':'Guardar en destacadas'}</button><button type="button" class="danger" id="delete-story">Eliminar historia</button></div><p class="stories-note">Solo se guarda en este navegador. Eliminar también la quita de destacadas.</p>`:`<form id="story-reply" class="story-reply"><label class="story-field">Responder a esta historia<input id="story-reply-text" maxlength="1000" autocomplete="off" required></label><button class="btn" id="story-reply-send">Enviar respuesta</button><p class="stories-note">Mensaje local para esta coincidencia simulada. No se envía a nadie.</p></form>`}<p class="form-error" role="alert" id="story-view-error"></p>`);
  d.classList.add('story-viewer');storyViewer={id,featured,dialog:d};
  d.addEventListener('close',()=>{if(storyViewer?.dialog===d)storyViewer=null;});
  d.querySelector('#story-prev').onclick=()=>{if(index>0)openStory(list[index-1].id,featured);};
  d.querySelector('#story-next').onclick=()=>{if(index<list.length-1)openStory(list[index+1].id,featured);};
  const showError=e=>{d.querySelector('#story-view-error').textContent=e.message;};
  if(own){
   let changing=false;
   d.querySelector('#feature-story').onclick=async()=>{if(changing)return;changing=true;try{await storyService.feature(id,!record.featured);d.close();await refreshStories();toast(record.featured?'Historia retirada de destacadas.':'Historia guardada en Destacadas de Mi perfil.');}catch(e){changing=false;showError(e);}};
   d.querySelector('#delete-story').onclick=async()=>{if(changing)return;changing=true;try{await storyService.deleteOwn(id);d.close();await refreshStories();toast('Historia e imagen eliminadas de este navegador.');}catch(e){changing=false;showError(e);}};
  }else{
   let sent=false;
   d.querySelector('#story-reply').onsubmit=async e=>{
    e.preventDefault();if(sent)return;const text=d.querySelector('#story-reply-text').value.trim();if(!text)return;
    sent=true;d.querySelector('#story-reply-send').disabled=true;
    try{
     const reply=await storyService.reply(id,text,state.matches);
     if(!state.matches.includes(reply.authorId)||Date.now()>=record.expiresAt)throw new Error('Historia no disponible.');
     (state.messages[reply.authorId]??=[]).push(reply.message);
     const saved=save();d.close();page='matches';activeChat=reply.authorId;render();focusMain();
     if(saved)toast('Respuesta guardada en la conversación local.');
    }catch(e){sent=false;d.querySelector('#story-reply-send').disabled=false;showError(e);await refreshStories();}
   };
  }
  repaintStories();
 }catch(e){toast(e.message||'No se pudo abrir la historia.');}
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
