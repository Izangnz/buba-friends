/* Cover draft: local square JPEG in collection metadata; never a story record. */
'use strict';
function collectionCoverEditorMarkup(){return `<section id="collection-cover-editor" class="collection-cover-editor"><h3>Portada</h3><div class="collection-cover-circle"><img id="cover-current" alt="Portada actual"><canvas id="cover-preview" width="512" height="512" role="img" aria-label="Vista previa circular de la portada" hidden></canvas><span id="cover-empty" hidden>Sin portada</span></div><button type="button" class="btn light" id="cover-change">Cambiar portada</button><div id="cover-options" hidden><p>Elige una imagen de la colección o sube una portada independiente.</p><button type="button" class="text-btn" id="cover-adjust-current">Ajustar portada actual</button><div id="cover-thumbnails" class="cover-thumbnails" aria-label="Imágenes para la portada"></div><label class="story-field">Subir portada desde el dispositivo<input id="cover-file" type="file" accept="image/jpeg,image/png,image/webp"></label><p class="stories-note">JPEG, PNG o WebP · Hasta 8 MB. La imagen subida será solo la portada, no una historia ni una imagen del recorrido.</p><div id="cover-crop" hidden><label>Zoom<input id="cover-zoom" type="range" min="1" max="3" value="1" step="0.01"></label><label>Encuadre horizontal<input id="cover-x" type="range" min="0" max="100" value="50"></label><label>Encuadre vertical<input id="cover-y" type="range" min="0" max="100" value="50"></label></div><button type="button" class="text-btn" id="cover-cancel-change">Cancelar cambio de portada</button></div><p id="cover-status" class="stories-note" role="status">La portada solo cambia al guardar o confirmar la colección.</p><p id="cover-error" class="form-error" role="alert"></p></section>`;}
function createCollectionCoverEditor(d,{collection=null,getItems}){
 const $=s=>d.querySelector(s),canvas=$('#cover-preview'),current=$('#cover-current'),empty=$('#cover-empty'),options=$('#cover-options'),crop=$('#cover-crop'),error=$('#cover-error'),status=$('#cover-status');
 const zoom=$('#cover-zoom'),x=$('#cover-x'),y=$('#cover-y');let image=null,pending=null,ownedURL='',sequence=0,closed=false,loading=false;
 const release=()=>{if(image){image.onload=image.onerror=null;image.src='';image=null;}if(ownedURL){URL.revokeObjectURL(ownedURL);ownedURL='';}};
 function baseline(){const cover=collection?collectionCover(collection):getItems()[0];current.hidden=!cover;empty.hidden=!!cover;canvas.hidden=true;crop.hidden=true;$('#cover-adjust-current').hidden=!cover?.blob;if(cover)current.src=storyURL(cover);else current.removeAttribute('src');}
 function draw(){if(!image)return;try{BubaPhoto.drawCrop(canvas,image,zoom.value,x.value,y.value);error.textContent='';}catch(e){error.textContent=e.message;pending=null;}}
 async function select(sourceId,file=null){
  const ticket=++sequence;loading=true;error.textContent='';status.textContent='Preparando portada…';let url='',nextImage;
  try{
   const item=sourceId?getItems().find(s=>s.id===sourceId):null;if(sourceId&&!item)throw Error('Selecciona una imagen que siga en la colección.');
   const blob=file?await BubaStories.optimizeImage(file):item?.blob;
   if(closed||ticket!==sequence)return;
   url=blob?URL.createObjectURL(blob):storyURL(item);nextImage=new Image();
   await new Promise((resolve,reject)=>{nextImage.onload=resolve;nextImage.onerror=()=>reject(Error('No se pudo leer la portada.'));nextImage.src=url;});
   if(closed||ticket!==sequence){if(blob)URL.revokeObjectURL(url);nextImage.src='';return;}
   release();image=nextImage;ownedURL=blob?url:'';pending={storyId:sourceId||null};zoom.value='1';x.value=y.value='50';current.hidden=true;empty.hidden=true;canvas.hidden=false;crop.hidden=false;draw();paintChoices();status.textContent='Ajusta el encuadre. Guarda para confirmar; cancelar conserva la portada anterior.';
  }catch(e){if(url&&url!==ownedURL&&(!sourceId||getItems().find(s=>s.id===sourceId)?.blob))URL.revokeObjectURL(url);if(closed||ticket!==sequence)return;error.textContent=e.message||'No se pudo cargar la portada.';status.textContent='La portada guardada no ha cambiado.';}
  finally{if(ticket===sequence)loading=false;}
 }
 function paintChoices(){const items=getItems();$('#cover-thumbnails').innerHTML=items.map((s,i)=>`<button type="button" class="cover-choice" data-cover-story="${esc(s.id)}" aria-pressed="${pending?.storyId===s.id}" aria-label="Elegir como portada: ${esc(s.caption||'Imagen '+(i+1))}"><img src="${esc(storyURL(s))}" alt=""><span>${esc(s.caption||'Imagen '+(i+1))}</span></button>`).join('')||'<p>Selecciona imágenes para la colección o sube una portada.</p>';d.querySelectorAll('[data-cover-story]').forEach(b=>b.onclick=()=>select(b.dataset.coverStory));}
 function cancel(){sequence++;loading=false;release();pending=null;options.hidden=true;$('#cover-file').value='';error.textContent='';status.textContent='Cambio cancelado. Se conserva la portada anterior.';baseline();paintChoices();}
 $('#cover-change').onclick=()=>{options.hidden=false;paintChoices();};$('#cover-adjust-current').onclick=()=>{const cover=collection?collectionCover(collection):getItems()[0];if(cover?.blob)return select(collection?null:cover.id,collection?cover.blob:null);};$('#cover-cancel-change').onclick=cancel;
 $('#cover-file').onchange=()=>{const file=$('#cover-file').files?.[0];return file?select(null,file):undefined;};
 for(const field of [zoom,x,y])field.oninput=draw;
 d.addEventListener('close',()=>{closed=true;sequence++;release();});
 baseline();paintChoices();
 return {refresh(){if(!pending)baseline();paintChoices();},async value(){
  if(closed)throw Error('La edición de portada está cerrada.');if(loading)throw Error('Espera a que termine la carga de la portada.');if(!pending)return null;
  if(pending.storyId&&!getItems().some(s=>s.id===pending.storyId))throw Error('La imagen elegida ya no forma parte de la colección. Elige otra portada.');
  if(!image)throw Error('Selecciona una portada válida.');const ticket=sequence;const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('No se pudo preparar la portada.')),'image/jpeg',.82));if(closed||ticket!==sequence)throw Error('La portada ha cambiado. Revisa el encuadre y guarda de nuevo.');return {...pending,blob};
 }};
}
