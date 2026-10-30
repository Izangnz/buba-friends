/* Only conversation rows. Does not share or modify discovery/gallery/story handlers. */
(function(global){
'use strict';
function createRowGesture(surface,{distance=112,clock=()=>Date.now(),onReveal=()=>{},onClose=()=>{}}={}){
 let gesture=null,opened=false,suppressUntil=0,disposed=false;
 const paint=dx=>{surface.style.transform=`translateX(${dx}px)`;};
 const settle=value=>{opened=value;surface.classList.remove('row-dragging');paint(value?-distance:0);};
 function close(){const id=gesture?.id;gesture=null;if(id!==undefined)release(id);settle(false);onClose();}
 function release(id){try{if(surface.hasPointerCapture?.(id))surface.releasePointerCapture(id);}catch{}}
 function cancel(){const id=gesture?.id,dragged=gesture?.horizontal;gesture=null;if(dragged)suppressUntil=clock()+600;settle(opened);if(opened)onReveal(true);else onClose();if(id!==undefined)release(id);}
 surface.onpointerdown=e=>{if(disposed||e.isPrimary===false||e.button>0)return;gesture={id:e.pointerId,x:e.clientX,y:e.clientY,start:opened?-distance:0,horizontal:false,last:opened?-distance:0};try{surface.setPointerCapture?.(e.pointerId);}catch{}};
 surface.onpointermove=e=>{
  if(!gesture||e.pointerId!==gesture.id)return;const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;
  if(Math.abs(dy)>Math.max(9,Math.abs(dx)*1.2)){cancel();return;}
  if(!gesture.horizontal){if(Math.abs(dx)<9||Math.abs(dx)<Math.abs(dy)*1.25)return;gesture.horizontal=true;suppressUntil=clock()+600;surface.classList.add('row-dragging');onReveal(false);}
  if(e.cancelable)e.preventDefault();gesture.last=Math.max(-distance,Math.min(0,gesture.start+dx));paint(gesture.last);
 };
 surface.onpointerup=e=>{if(!gesture||e.pointerId!==gesture.id)return;const g=gesture;gesture=null;release(g.id);if(!g.horizontal)return;suppressUntil=clock()+600;const reveal=-g.last>=Math.min(56,distance*.5);settle(reveal);if(reveal)onReveal(true);else onClose();};
 surface.onpointercancel=cancel;
 surface.onlostpointercapture=e=>{if(e.target===surface&&gesture?.id===e.pointerId)cancel();};
 surface.ondragstart=e=>{e.preventDefault();cancel();};
 // Capture phase consumes a drag-generated click before the normal open-chat handler.
 const click=e=>{if(clock()<suppressUntil||opened){e.preventDefault();e.stopImmediatePropagation();if(opened&&clock()>=suppressUntil)close();}};
 surface.addEventListener('click',click,true);
 return {get opened(){return opened;},close,cancel,dispose(){disposed=true;opened=false;cancel();surface.removeEventListener('click',click,true);surface.onpointerdown=surface.onpointermove=surface.onpointerup=surface.onpointercancel=surface.onlostpointercapture=surface.ondragstart=null;settle(false);}};
}
function bindList({root,document,window,onArchive,onError=()=>{}}){
 const rows=[];let active=null;
 const closeAll=except=>{for(const item of rows)if(item!==except){item.control.close();item.wrapper.classList.remove('swipe-open');item.wrapper.classList.remove('swipe-dragging');item.action.tabIndex=-1;item.action.setAttribute('aria-hidden','true');}if(!except)active=null;};
 for(const wrapper of root.querySelectorAll('[data-conversation-row]')){
  const surface=wrapper.querySelector('[data-chat]'),action=wrapper.querySelector('[data-row-archive]');if(!surface||!action)continue;
  const item={wrapper,surface,action};item.control=createRowGesture(surface,{onReveal:complete=>{closeAll(item);active=item;wrapper.classList[complete?'add':'remove']('swipe-open');wrapper.classList[complete?'remove':'add']('swipe-dragging');action.tabIndex=complete?0:-1;action.setAttribute('aria-hidden',String(!complete));},onClose:()=>{wrapper.classList.remove('swipe-open');wrapper.classList.remove('swipe-dragging');action.tabIndex=-1;action.setAttribute('aria-hidden','true');if(active===item)active=null;}});rows.push(item);
  action.onclick=e=>{e.stopPropagation();if(!item.control.opened)return;if(onArchive(wrapper.dataset.conversationRow)){closeAll();}else onError();};
 }
 const outside=e=>{if(active&&!active.wrapper.contains(e.target))closeAll();};
 const key=e=>{if(e.key==='Escape')closeAll();};const blur=()=>closeAll();
 document.addEventListener('pointerdown',outside,true);document.addEventListener('keydown',key);window.addEventListener('blur',blur);
 return ()=>{document.removeEventListener('pointerdown',outside,true);document.removeEventListener('keydown',key);window.removeEventListener('blur',blur);for(const item of rows)item.control.dispose();active=null;};
}
const api={createRowGesture,bindList};if(typeof module!=='undefined'&&module.exports)module.exports=api;else global.BubaConversationSwipe=api;
})(typeof globalThis!=='undefined'?globalThis:this);
