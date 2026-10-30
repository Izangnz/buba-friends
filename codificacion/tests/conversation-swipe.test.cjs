// Pointer/DOM/storage doubles exercise actual row controller; not mobile/visual tests.
const assert=require('node:assert/strict'),{createRowGesture,bindList}=require('../conversation-swipe.js');
const {harness}=require('./interaction.test.cjs');
function target(){const classes=new Set(),events={};return {style:{},classes,events,classList:{add:c=>classes.add(c),remove:c=>classes.delete(c)},addEventListener(t,fn){(events[t]??=new Set()).add(fn);},removeEventListener(t,fn){events[t]?.delete(fn);},setAttribute(k,v){this[k]=v;},setPointerCapture(id){this.capture=id;},hasPointerCapture(id){return this.capture===id;},releasePointerCapture(){this.capture=null;},fire(t,e={}){for(const fn of events[t]||[])fn(e);}};}
function click(surface){const e={prevented:false,stopped:false,preventDefault(){this.prevented=true;},stopImmediatePropagation(){this.stopped=true;}};surface.fire('click',e);return e;}
const down={pointerId:1,isPrimary:true,button:0,clientX:200,clientY:100};
function drag(surface,dx,dy=0){surface.onpointerdown(down);const e={pointerId:1,clientX:200+dx,clientY:100+dy,cancelable:true,preventDefault(){this.prevented=true;}};surface.onpointermove(e);surface.onpointerup({pointerId:1});return e;}
module.exports=async function(){
 let now=1000,revealed=0,closed=0;const row=target(),control=createRowGesture(row,{clock:()=>now,onReveal:complete=>{if(complete)revealed++;},onClose:()=>closed++});
 assert.equal(click(row).prevented,false,'Normal taps remain normal clicks');drag(row,-25);assert.equal(control.opened,false);assert.equal(row.style.transform,'translateX(0px)');assert.equal(click(row).stopped,true,'Short drag cannot open the chat');
 now+=1000;assert.equal(click(row).prevented,false);const vertical=drag(row,12,85);assert.equal(vertical.prevented,undefined);assert.equal(control.opened,false,'Vertical scroll never reveals an archive action');
 drag(row,-90);assert.equal(control.opened,true);assert.equal(row.style.transform,'translateX(-112px)');assert.equal(click(row).stopped,true);now+=1000;assert.equal(click(row).stopped,true);assert.equal(control.opened,false,'Tap on open surface closes it');
 drag(row,-100);assert.equal(control.opened,true);drag(row,90);assert.equal(control.opened,false,'Rightward drag closes the revealed row');
 row.onpointerdown(down);row.onpointermove({pointerId:1,clientX:100,clientY:101});row.onpointercancel();assert.equal(control.opened,false);assert.equal(row.style.transform,'translateX(0px)');
 row.onpointerdown(down);row.onpointermove({pointerId:1,clientX:110,clientY:100});row.onpointermove({pointerId:1,clientX:190,clientY:210});row.onpointerup({pointerId:1});assert.equal(control.opened,false,'Turning vertical cancels the horizontal drag');
 row.onpointerdown(down);row.onpointermove({pointerId:1,clientX:100,clientY:100});row.onlostpointercapture({pointerId:1,target:{}});row.onpointerup({pointerId:1});assert.equal(control.opened,true,'Child capture transfer is ignored');control.close();
 row.onpointerdown(down);row.onpointermove({pointerId:1,clientX:100,clientY:100});row.onlostpointercapture({pointerId:1,target:row});assert.equal(control.opened,false);control.dispose();assert.equal(row.onpointerdown,null);
 const seed={started:true,profileCompleted:true,preference:'both',me:{name:'Ensayo',age:30,bio:'',interests:''},matches:['vega','nico'],messages:{vega:[{mine:true,text:'Conservar'}],nico:[]},chatMeta:{vega:{opened:true,draft:'Borrador',archived:false},nico:{opened:true,draft:'Otro'}}};
 const app=harness(seed),document=target(),window=target();
 function wrapper(id){const surface=target(),action=target(),wrap=target();wrap.dataset={conversationRow:id};wrap.surface=surface;wrap.action=action;wrap.querySelector=s=>s==='[data-chat]'?surface:action;wrap.contains=t=>t===surface||t===action||t===wrap;return wrap;}
 const one=wrapper('vega'),two=wrapper('nico'),root={querySelectorAll:()=>[one,two]};let calls=0;const dispose=bindList({root,document,window,onArchive:id=>{calls++;return app.run(`setChatArchived(${JSON.stringify(id)},true)`);}});
 drag(one.surface,-90);assert.equal(one.classes.has('swipe-open'),true);assert.equal(one.action.tabIndex,0);assert.equal(one.action['aria-hidden'],'false');
 drag(two.surface,-90);assert.equal(one.classes.has('swipe-open'),false);assert.equal(two.classes.has('swipe-open'),true);assert.equal(one.action.tabIndex,-1);
 document.fire('pointerdown',{target:{}});assert.equal(two.classes.has('swipe-open'),false);drag(one.surface,-90);assert.equal(click(one.surface).stopped,true);
 one.action.onclick({stopPropagation(){}});assert.equal(calls,1);assert.equal(app.run("chatSettings('vega').archived"),true);assert.equal(app.run("chatSettings('vega').draft"),'Borrador');assert.equal(app.run('state.messages.vega[0].text'),'Conservar');assert.equal(app.run('state.matches.length'),2);
 dispose();const restore=bindList({root,document,window,onArchive:id=>app.run(`setChatArchived(${JSON.stringify(id)},false)`)});drag(one.surface,-90);one.action.onclick({stopPropagation(){}});assert.equal(app.run("chatSettings('vega').archived"),false);assert.equal(app.run("chatSettings('vega').draft"),'Borrador');
 drag(two.surface,-90);document.fire('keydown',{key:'Escape'});assert.equal(two.classes.has('swipe-open'),false);drag(two.surface,-90);window.fire('blur');assert.equal(two.classes.has('swipe-open'),false);restore();assert.equal(document.events.pointerdown.size,0);
 const failed=bindList({root,document,window,onArchive:()=>false});drag(one.surface,-90);one.action.onclick({stopPropagation(){}});assert.equal(one.classes.has('swipe-open'),true,'A save failure leaves the action available for retry');failed();
 console.log('Archivo por gesto: umbral, scroll vertical, cancelaciones, captura, clic suprimido, una fila, fuera/Escape, archivo/recuperación y borrador conservado: PASS (simulado).');
};
