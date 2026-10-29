/* Optional local profile photo. Reuses story image validation/optimization and IndexedDB meta store. */
(function(global){
'use strict';
function cropGeometry(width,height,zoom=1,x=50,y=50){
 if(!Number.isFinite(width)||!Number.isFinite(height)||width<=0||height<=0)throw Error('No se puede leer la imagen.');
 const side=Math.min(width,height)/Math.max(1,Math.min(3,Number(zoom)||1));
 const clamp=v=>Math.max(0,Math.min(100,Number(v)||0))/100;
 return {x:(width-side)*clamp(x),y:(height-side)*clamp(y),side};
}
function drawCrop(canvas,image,zoom,x,y){
 const c=cropGeometry(image.naturalWidth||image.width,image.naturalHeight||image.height,zoom,x,y),ctx=canvas.getContext('2d');
 if(!ctx)throw Error('Este navegador no permite preparar el encuadre.');
 ctx.fillStyle='#FFF8FB';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(image,c.x,c.y,c.side,c.side,0,0,canvas.width,canvas.height);
}
function createController({repository,createURL=blob=>URL.createObjectURL(blob),revokeURL=url=>URL.revokeObjectURL(url)}){
 let url='',ready=false;
 const replace=next=>{const old=url;url=next;if(old)revokeURL(old);};
 return {get url(){return url;},get ready(){return ready;},async load(){const blob=await repository.getPhoto();const next=blob?createURL(blob):'';replace(next);ready=true;},
  async save(blob){const next=createURL(blob);try{await repository.putPhoto(blob);}catch(e){revokeURL(next);throw e;}replace(next);ready=true;},
  async remove(){await repository.deletePhoto();replace('');ready=true;},dispose(){replace('');},
 };
}
const api={cropGeometry,drawCrop,createController};
if(typeof module!=='undefined'&&module.exports){module.exports=api;return;}
let database;try{database=global.indexedDB;}catch{}
const controller=createController({repository:global.BubaStories.createRepository(database)});
let loading=null,failure='';
const silhouette='<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><circle cx="50" cy="34" r="17"/><path d="M17 91v-8a33 33 0 0 1 66 0v8z"/></svg>';
function imageMarkup(){return controller.url?`<img src="${controller.url}" alt="Tu foto de perfil">`:silhouette;}
function avatar(){return `<span class="profile-photo-avatar" data-profile-photo role="img" aria-label="${controller.url?'Tu foto de perfil':'Avatar neutro sin foto'}">${imageMarkup()}</span>`;}
function controlMarkup(){return `<div class="photo-actions"><button type="button" class="btn light" data-photo-add ${controller.ready?'':'disabled'}>${controller.url?'Cambiar foto':'Añadir foto'}</button>${controller.url?'<button type="button" class="text-btn" data-photo-delete>Eliminar foto</button>':''}</div><p class="muted">Foto opcional · Solo se guarda en este navegador.</p><p class="form-error" role="status" data-photo-error></p>${failure?'<button type="button" class="text-btn" data-photo-retry>Reintentar acceso a la foto</button>':''}`;}
function controls(){return `<div data-photo-controls>${controlMarkup()}</div>`;}
function repaint(){
 document.querySelectorAll('[data-profile-photo]').forEach(el=>{el.innerHTML=imageMarkup();el.setAttribute('aria-label',controller.url?'Tu foto de perfil':'Avatar neutro sin foto');});
 document.querySelectorAll('[data-photo-controls]').forEach(el=>{el.innerHTML=controlMarkup();el.querySelector('[data-photo-error]').textContent=failure||(!controller.ready?'Preparando foto…':'');});
 bind(document,false);
}
async function load(){if(loading)return loading;loading=(async()=>{try{await controller.load();failure='';}catch{failure='No se puede acceder a la foto guardada. Revisa el espacio y los permisos del navegador. Tu foto anterior no se ha borrado.';}finally{loading=null;repaint();}})();return loading;}
async function remove(){await controller.remove();failure='';repaint();}
function bind(scope,initialize=true){
 scope.querySelectorAll('[data-photo-add]').forEach(b=>b.onclick=openEditor);
 scope.querySelectorAll('[data-photo-delete]').forEach(b=>b.onclick=()=>{
  const d=modal('<h2>¿Eliminar tu foto de perfil?</h2><p>Volverás al avatar neutro. Tus historias y el resto del perfil se conservan.</p><p id="photo-delete-error" role="alert"></p><button type="button" class="btn" id="photo-confirm-delete">Eliminar foto</button><button type="button" class="btn light" id="photo-keep">Cancelar</button>');
  d.querySelector('#photo-keep').onclick=()=>d.close();let busy=false;d.addEventListener('cancel',e=>{if(busy)e.preventDefault();});
  d.querySelector('#photo-confirm-delete').onclick=async()=>{if(busy)return;busy=true;d.querySelectorAll('button').forEach(b=>b.disabled=true);try{await remove();d.close();document.querySelector('[data-photo-add]')?.focus();}catch{d.querySelector('#photo-delete-error').textContent='No se pudo eliminar la foto. La anterior se conserva.';busy=false;d.querySelectorAll('button').forEach(b=>b.disabled=false);}};
 });
 scope.querySelectorAll('[data-photo-retry]').forEach(b=>b.onclick=load);
 if(initialize&&!controller.ready&&!failure)void load();
}
function openEditor(){
 const d=modal('<h2>Tu foto de perfil</h2><label class="photo-file">Elegir imagen<input id="photo-file" type="file" accept="image/jpeg,image/png,image/webp" aria-describedby="photo-help photo-error"></label><p id="photo-help" class="muted">JPEG, PNG o WebP · Hasta 8 MB y 40 megapíxeles. La foto es opcional.</p><div id="photo-crop-controls" hidden><canvas id="photo-canvas" width="512" height="512" role="img" aria-label="Vista previa del encuadre de tu foto"></canvas><p class="muted">Ajusta el encuadre con los deslizadores. Así quedará tu avatar.</p><label>Acercar<input id="photo-zoom" type="range" min="1" max="3" step="0.01" value="1"></label><label>Mover horizontalmente<input id="photo-x" type="range" min="0" max="100" step="1" value="50"></label><label>Mover verticalmente<input id="photo-y" type="range" min="0" max="100" step="1" value="50"></label></div><p id="photo-error" class="form-error" role="alert"></p><p id="photo-status" role="status"></p><div class="panel-actions"><button type="button" class="btn" id="photo-save" disabled>Guardar foto</button><button type="button" class="btn light" id="photo-cancel">Cancelar</button></div>');
 d.classList.add('photo-dialog');
 const field=d.querySelector('#photo-file'),canvas=d.querySelector('#photo-canvas'),save=d.querySelector('#photo-save'),error=d.querySelector('#photo-error'),status=d.querySelector('#photo-status'),crop=d.querySelector('#photo-crop-controls');
 const zoom=d.querySelector('#photo-zoom'),x=d.querySelector('#photo-x'),y=d.querySelector('#photo-y');let image=null,previewURL='',sequence=0,closed=false,busy=false;
 const release=()=>{if(image){image.onload=image.onerror=null;image.src='';image=null;}if(previewURL){URL.revokeObjectURL(previewURL);previewURL='';}};
 const draw=()=>{try{if(!image)return false;drawCrop(canvas,image,zoom.value,x.value,y.value);return true;}catch(e){error.textContent=e.message;save.disabled=true;return false;}};
 const fit=()=>{const v=global.visualViewport;if(v){d.style.maxHeight=Math.max(120,v.height-24)+'px';d.style.top=(v.offsetTop+12)+'px';}};
 fit();global.visualViewport?.addEventListener('resize',fit);global.visualViewport?.addEventListener('scroll',fit);
 field.onchange=async()=>{const ticket=++sequence;release();save.disabled=true;crop.hidden=true;error.textContent='';status.textContent='Preparando imagen…';const file=field.files?.[0];if(!file){status.textContent='';return;}
  try{const blob=await global.BubaStories.optimizeImage(file);if(closed||ticket!==sequence)return;const url=URL.createObjectURL(blob),img=new Image();previewURL=url;image=img;
   await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=()=>reject(Error('No se pudo previsualizar la foto.'));img.src=url;});
   if(closed||ticket!==sequence)return;zoom.value='1';x.value=y.value='50';crop.hidden=false;save.disabled=!draw();status.textContent=save.disabled?'No se pudo preparar el encuadre.':'Vista previa lista. Ajusta el encuadre y guarda.';
  }catch(e){if(closed||ticket!==sequence)return;release();error.textContent=e.message;status.textContent='La foto guardada no ha cambiado.';}
 };
 for(const control of [zoom,x,y])control.oninput=()=>{save.disabled=!draw();};
 d.querySelector('#photo-cancel').onclick=()=>d.close();
 d.addEventListener('cancel',e=>{if(busy)e.preventDefault();});
 d.addEventListener('close',()=>{closed=true;sequence++;release();global.visualViewport?.removeEventListener('resize',fit);global.visualViewport?.removeEventListener('scroll',fit);});
 save.onclick=async()=>{if(busy||save.disabled||!image)return;busy=true;error.textContent='';status.textContent='Guardando foto…';d.querySelectorAll('button,input').forEach(b=>b.disabled=true);
  try{const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('No se pudo preparar la foto.')),'image/jpeg',.82));await controller.save(blob);failure='';repaint();d.close();document.querySelector('[data-photo-add]')?.focus();}
  catch{error.textContent='No se pudo guardar la foto. Revisa espacio y permisos y vuelve a intentarlo. La anterior se conserva.';status.textContent='';busy=false;d.querySelectorAll('button,input').forEach(b=>b.disabled=false);}
 };
 field.focus();
}
global.BubaPhoto={...api,avatar,controls,bind,remove};
})(typeof globalThis!=='undefined'?globalThis:this);
