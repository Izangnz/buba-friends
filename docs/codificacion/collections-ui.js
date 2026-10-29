/* Highlight collections: metadata references existing story blobs; no uploads or copied images. */
'use strict';
function collectionCover(c){return storyRecords.find(s=>s.id===c.coverId)||storyRecords.find(s=>c.storyIds.includes(s.id));}
function collectionProfileView(){return `<section class="featured-section" aria-labelledby="featured-title"><h2 class="section-title" id="featured-title">Destacadas</h2><p class="stories-note">Una colección, varias imágenes · Solo en este navegador.</p><div class="story-strip" aria-label="Colecciones de destacadas">${storyCollections.map(c=>{const cover=collectionCover(c);return `<div class="highlight-collection"><button type="button" class="story-item seen" data-collection-id="${esc(c.id)}"><span class="story-circle">${cover?`<img src="${esc(storyURL(cover))}" alt="">`:storyAvatar('self')}</span><span>${esc(c.name)}</span><small>${c.storyIds.length} ${c.storyIds.length===1?'imagen':'imágenes'}</small></button><button type="button" class="text-btn collection-edit" data-edit-collection="${esc(c.id)}" aria-label="Editar colección ${esc(c.name)}">Editar</button></div>`;}).join('')}<button type="button" class="story-item no-story" id="new-collection" ${storyReady?'':'disabled'}><span class="story-circle" aria-hidden="true">+</span><span>Nueva colección</span></button></div>${!storyCollections.length?'<p class="stories-empty">Aún no hay colecciones. Selecciona tus historias para crear la primera.</p>':''}${storyFailure?'<p class="form-error" role="status">No se pudieron leer las destacadas. <button class="text-btn" id="retry-collections">Reintentar</button></p>':''}</section>`;}
function bindCollections(){
 root.querySelectorAll('[data-collection-id]').forEach(b=>b.onclick=()=>openCollection(b.dataset.collectionId));
 root.querySelectorAll('[data-edit-collection]').forEach(b=>b.onclick=()=>openCollectionManager(b.dataset.editCollection));
 const add=root.querySelector('#new-collection');if(add)add.onclick=()=>openCollectionPicker({createOnly:true});
 const retry=root.querySelector('#retry-collections');if(retry)retry.onclick=()=>refreshStories();
}
function collectionDialog(html){
 if(storyViewer?.dialog.open)storyViewer.dialog.close();
 const y=window.scrollY||0,x=window.scrollX||0,left=root.querySelector('.featured-section .story-strip')?.scrollLeft||0,opener=document.activeElement;
 const d=modal(html);d.classList.add('collection-dialog');
 const fit=()=>{const v=window.visualViewport;if(v&&window.innerWidth<=600){d.style.maxHeight=Math.max(120,v.height-24)+'px';d.style.top=(v.offsetTop+12)+'px';d.style.bottom='auto';}else{d.style.maxHeight='';d.style.top='';d.style.bottom='';}};fit();window.visualViewport?.addEventListener('resize',fit);window.visualViewport?.addEventListener('scroll',fit);
 d.addEventListener('cancel',e=>{if(d.collectionBusy)e.preventDefault();});
 d.addEventListener('close',()=>{window.visualViewport?.removeEventListener('resize',fit);window.visualViewport?.removeEventListener('scroll',fit);const strip=root.querySelector('.featured-section .story-strip');if(strip)strip.scrollLeft=left;const next=opener?.isConnected?opener:[...root.querySelectorAll('[data-collection-id]')].find(el=>el.dataset.collectionId===opener?.dataset?.collectionId)||root.querySelector('#new-collection');next?.focus({preventScroll:true});window.scrollTo?.(x,y);});
 return d;
}
async function collectionAction(d,action){
 if(d.collectionBusy)return;d.collectionBusy=true;d.querySelectorAll('button,input,select').forEach(el=>el.disabled=true);
 d.querySelector('#collection-error').textContent='';
 try{await action();}catch(e){d.querySelector('#collection-error').textContent=e.message||'No se pudo guardar. Tus colecciones anteriores se conservan.';}
 finally{d.collectionBusy=false;if(d.open)d.querySelectorAll('button,input,select').forEach(el=>el.disabled=false);}
}
async function openCollection(id){
 try{await refreshStories({paint:false});const c=storyCollections.find(c=>c.id===id);if(!c)throw Error('La colección ya no está disponible.');await openStory(c.storyIds[0],c.id);}catch(e){toast(e.message);}
}
async function openCollectionPicker({storyId=null,collectionId=null,createOnly=false}={}){
 try{
  await refreshStories({paint:false});if(!storyReady)throw Error(storyFailure);
  const own=storyRecords.filter(s=>s.authorId==='self'),selected=storyId?own.filter(s=>s.id===storyId):own;
  if(!selected.length)throw Error('Publica una historia propia para poder guardarla en una colección.');
  const existing=collectionId?storyCollections.find(c=>c.id===collectionId):null;
  if(collectionId&&!existing)throw Error('La colección ya no está disponible.');
  const targets=existing?`<p>Añadir a <strong>${esc(existing.name)}</strong></p>`:createOnly?'':`<fieldset><legend>Elige una colección</legend>${storyCollections.map(c=>{const cover=collectionCover(c);return `<label class="collection-target"><input type="radio" name="collection-target" value="${esc(c.id)}">${cover?`<img src="${esc(storyURL(cover))}" alt="">`:''}<span>${esc(c.name)}</span></label>`;}).join('')}<label class="collection-target"><input type="radio" name="collection-target" value="new" ${storyCollections.length?'':'checked'}><span>Nueva colección</span></label></fieldset>`;
  const d=collectionDialog(`<h2>${existing?'Añadir imágenes':createOnly?'Nueva colección':'Guardar en colección'}</h2><form id="collection-picker-form" novalidate>${targets}${!existing?'<label class="story-field">Nombre de la nueva colección<input id="collection-new-name" maxlength="30" placeholder="Hasta 30 caracteres"></label>':''}${storyId?`<p>Guardarás esta historia: ${esc(selected[0].caption||'Sin texto')}</p>`:`<fieldset><legend>Selecciona historias propias</legend><div class="collection-choices">${selected.map(s=>`<label class="collection-choice"><input type="checkbox" data-pick-story value="${esc(s.id)}" ${existing?.storyIds.includes(s.id)?'checked':''}><img src="${esc(storyURL(s))}" alt=""><span>${esc(s.caption||'Historia sin texto')}<small>${storyAPI.active(s,Date.now())?'Activa · 24 h':'Guardada en destacadas'}</small></span></label>`).join('')}</div></fieldset>`}<p class="stories-note">Las imágenes se reutilizan, sin crear copias. Solo se guarda al confirmar.</p><p id="collection-error" class="form-error" role="alert"></p><div class="panel-actions"><button class="btn" id="collection-confirm">Confirmar</button><button type="button" class="btn light" id="collection-cancel">Cancelar</button></div></form>`);
  d.querySelector('#collection-cancel').onclick=()=>d.close();
  d.querySelector('#collection-picker-form').onsubmit=e=>{e.preventDefault();return collectionAction(d,async()=>{
   const ids=storyId?[storyId]:[...d.querySelectorAll('[data-pick-story]:checked')].map(el=>el.value);
   const target=existing?.id||(createOnly?'new':d.querySelector('[name="collection-target"]:checked')?.value);
   if(!target)throw Error('Selecciona una colección o Nueva colección.');
   if(target==='new')await storyService.createCollection(d.querySelector('#collection-new-name').value,ids);else await storyService.addToCollection(target,ids);
   await refreshStories({paint:false});repaintStories();d.close();toast('Imágenes guardadas en la colección.');
  });};
 }catch(e){toast(e.message);}
}
async function openCollectionManager(id){
 try{
  await refreshStories({paint:false});if(!storyReady)throw Error(storyFailure);const c=storyCollections.find(c=>c.id===id);if(!c)throw Error('La colección ya no está disponible.');
  const items=c.storyIds.map(id=>storyRecords.find(s=>s.id===id)).filter(Boolean);
  const d=collectionDialog(`<h2>Editar colección</h2><label class="story-field">Nombre<input id="collection-name" maxlength="30" value="${esc(c.name)}"></label><button type="button" class="btn light" id="collection-rename">Guardar nombre</button><label class="story-field">Portada<select id="collection-cover">${items.map((s,i)=>`<option value="${esc(s.id)}" ${s.id===c.coverId?'selected':''}>${i+1} · ${esc(s.caption||'Sin texto')}</option>`).join('')}</select></label><button type="button" class="btn light" id="collection-save-cover">Guardar portada</button><h3>Imágenes</h3><ul class="collection-members">${items.map((s,i)=>`<li><img src="${esc(storyURL(s))}" alt="Imagen ${i+1} de la colección"><span>${esc(s.caption||'Sin texto')}</span><button type="button" class="text-btn" data-remove-collection-image="${esc(s.id)}" aria-label="Quitar imagen ${i+1}">Quitar</button></li>`).join('')}</ul><div class="panel-actions"><button type="button" class="btn light" id="collection-add-images">Añadir imágenes</button><button type="button" class="danger" id="collection-delete">Eliminar colección</button><button type="button" class="btn light" id="collection-done">Cerrar</button></div><p id="collection-error" class="form-error" role="alert"></p>`);
  d.querySelector('#collection-done').onclick=()=>d.close();
  const save=action=>collectionAction(d,async()=>{await action();await refreshStories({paint:false});repaintStories();d.close();toast('Colección actualizada.');});
  d.querySelector('#collection-rename').onclick=()=>save(()=>storyService.renameCollection(id,d.querySelector('#collection-name').value));
  d.querySelector('#collection-save-cover').onclick=()=>save(()=>storyService.setCollectionCover(id,d.querySelector('#collection-cover').value));
  d.querySelector('#collection-add-images').onclick=()=>openCollectionPicker({collectionId:id});
  d.querySelector('#collection-delete').onclick=()=>confirmCollectionRemoval(id);
  d.querySelectorAll('[data-remove-collection-image]').forEach(b=>b.onclick=()=>confirmCollectionRemoval(id,b.dataset.removeCollectionImage));
 }catch(e){toast(e.message);}
}
function confirmCollectionRemoval(id,storyId=null){
 const c=storyCollections.find(c=>c.id===id);if(!c){toast('La colección ya no está disponible.');return;}
 const last=storyId&&c.storyIds.length===1;
 const d=collectionDialog(`<h2>${storyId?'¿Quitar esta imagen?':'¿Eliminar la colección?'}</h2><p>${last?'Es su última imagen: también se eliminará la colección vacía. ':''}${storyId?'La imagen se quitará de esta colección.':'Se eliminará «'+esc(c.name)+'».'} Las historias activas y las imágenes utilizadas en otras colecciones se conservan.</p><p id="collection-error" class="form-error" role="alert"></p><button type="button" class="btn" id="collection-confirm-remove">${last?'Quitar imagen y colección':storyId?'Quitar imagen':'Eliminar colección'}</button><button type="button" class="btn light" id="collection-cancel-remove">Cancelar</button>`);
 d.querySelector('#collection-cancel-remove').onclick=()=>{d.close();return openCollectionManager(id);};
 d.querySelector('#collection-confirm-remove').onclick=()=>collectionAction(d,async()=>{
  if(storyId)await storyService.removeFromCollection(id,storyId,{allowEmpty:!!last});else await storyService.deleteCollection(id);
  await refreshStories({paint:false});repaintStories();d.close();toast(storyId?'Imagen retirada de la colección.':'Colección eliminada.');
 });
}
