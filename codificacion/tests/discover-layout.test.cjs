// Viewport/DOM geometry doubles: verify mode selection, not actual CSS rendering or Safari touch.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
module.exports=async function(){
 const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
 const classes=()=>({values:new Set(),add(n){this.values.add(n);},remove(n){this.values.delete(n);},has(n){return this.values.has(n);}});
 const style=()=>({values:{},setProperty(k,v){this.values[k]=v;},removeProperty(k){delete this.values[k];}});
 const measured=(height=100)=>({clientHeight:height,scrollHeight:height});
 let imageHeight=210,fontSize=16,dialog=false,cancelled=0,observer;
 const portrait={getBoundingClientRect:()=>{assert.equal(context.document.body.classList.has('discover-expanded'),false,'Remove expanded-mode content before measuring the compact candidate');return {height:imageHeight};}},info=measured(58),card={...measured(270),querySelector:s=>s==='.portrait'?portrait:info},main=measured(460),layout=measured(550),nav=measured(90),toggle={setAttribute(k,v){this[k]=v;}};
 const nodes={'.main':main,'.layout':layout,'.nav':nav,'#swipe-card':card,'#discover-view-toggle':toggle,'.discover-type-probe':{}};
 const context=vm.createContext({Number,Math,parseFloat,getComputedStyle:()=>({fontSize:fontSize+'px'}),page:'discover',discoverScrollPreferred:false,discoverObserver:null,cardGesture:{cancel(){cancelled++;}},
  root:{querySelector:s=>nodes[s]||null},document:{documentElement:{classList:classes(),style:style()},body:{classList:classes()},querySelector:()=>dialog?{}:null},
  window:{innerWidth:375,innerHeight:667,visualViewport:{height:550,offsetTop:0,scale:1,addEventListener(){}},addEventListener(){}},ResizeObserver:class{constructor(fn){this.notify=fn;observer=this;}observe(el){this.element=el;}}});
 vm.runInContext(source.slice(source.indexOf('function updateDiscoverViewport()'),source.indexOf('function keepEditorVisible()')),context);
 const update=()=>vm.runInContext('updateDiscoverViewport()',context),body=context.document.body.classList,html=context.document.documentElement.classList;
 // Representative measured geometry for 375x667 with Safari bars and 390x844 standalone.
 update();assert.equal(body.has('discover-fit'),true);assert.equal(html.has('discover-fit'),true);assert.equal(context.document.documentElement.style.values['--discover-height'],'550px');
 context.window.innerWidth=390;context.window.innerHeight=844;context.window.visualViewport.height=844;update();assert.equal(body.has('discover-fit'),true);assert.equal(context.document.documentElement.style.values['--discover-height'],'844px');
 context.window.visualViewport.height=664;update();assert.equal(body.has('discover-fit'),true);assert.equal(context.document.documentElement.style.values['--discover-height'],'664px');
 // No clipped layout is accepted when measured content overflows or the portrait is too short.
 main.scrollHeight=main.clientHeight+10;update();assert.equal(body.has('discover-fit'),false);assert.equal(body.has('discover-expanded'),true);main.scrollHeight=main.clientHeight;
 imageHeight=150;update();assert.equal(body.has('discover-fit'),false);imageHeight=210;
 fontSize=32;update();assert.equal(body.has('discover-fit'),false);fontSize=16;
 context.discoverScrollPreferred=true;update();assert.equal(body.has('discover-fit'),false);assert.equal(toggle['aria-pressed'],'true');context.discoverScrollPreferred=false;
 context.window.visualViewport.scale=2;update();assert.equal(body.has('discover-fit'),false);assert.equal(body.has('discover-zoomed'),true);context.window.visualViewport.scale=1;
 context.window.visualViewport.height=350;update();assert.equal(body.has('discover-fit'),false);context.window.visualViewport.height=664;
 update();dialog=true;context.window.visualViewport.height=300;update();assert.equal(body.has('discover-fit'),true,'Keep background stable while dialog keyboard resizes viewport');assert.equal(context.document.documentElement.style.values['--discover-height'],'664px');assert.equal(context.document.documentElement.style.values['--discover-dialog-height'],'300px');dialog=false;context.window.visualViewport.height=664;update();
 for(const page of ['profile','stories','matches','welcome']){context.page=page;update();assert.equal(body.has('discover-screen'),false);assert.equal(body.has('discover-fit'),false);assert.equal(html.has('discover-fit'),false);}
 context.page='discover';context.window.innerWidth=1024;update();assert.equal(body.has('discover-fit'),false,'Desktop remains scrollable');
 context.window.innerWidth=390;vm.runInContext('setupDiscoverViewport()',context);observer.notify();assert.ok(cancelled>0);assert.equal(body.has('discover-fit'),true);
 console.log('Descubrir: selección del modo por viewport/overflow, alternativa accesible, zoom, diálogos y restauración de scroll comprobados con geometría simulada.');
};
