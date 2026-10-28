// Integration of handlers with isolated DOM/storage doubles. These are NOT browser/visual tests.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');

function harness(saved, {failSave = false} = {}) {
  const store = saved ? {'buba-friends-v1': JSON.stringify(saved)} : {};
  let html = '', nodes = {}, lastDialog, clock = 1000;
  const classList = () => ({add(){}, remove(){}});
  const element = () => ({
    value:'', disabled:false, isConnected:true, style:{}, classList:classList(),
    clientWidth:358, scrollHeight:200, scrollTop:0,
    focus(){document.activeElement=this;}, setAttribute(){},
    remove(){this.isConnected=false;}, scrollIntoView(){},
    setPointerCapture(id){this.capture=id;}, hasPointerCapture(id){return this.capture===id;},
    releasePointerCapture(){this.capture=null;},
    querySelector(){return {style:{},textContent:''};},
  });
  function select(markup, id) {
    const n=element();
    Object.defineProperty(n, 'innerHTML', {
      set(v){this.markup=v;this.value=v.match(/value="([^"]+)" selected/)?.[1] || v.match(/value="([^"]*)"/)?.[1] || '';},
      get(){return this.markup;},
    });
    n.innerHTML=markup.match(new RegExp(`<select[^>]*${id}[^>]*>([\\s\\S]*?)</select>`))?.[1]||'';
    return n;
  }
  function query(selector) {
    const exists=selector.startsWith('#') ? html.includes(`id="${selector.slice(1)}"`) :
      selector==='.send input' ? html.includes('id="send"') :
      selector==='.messages' ? html.includes('class="messages"') : false;
    return exists ? nodes[selector] ||= element() : null;
  }
  const root={
    get innerHTML(){return html;},
    set innerHTML(v){Object.values(nodes).forEach(n=>n.isConnected=false);html=v;nodes={};},
    querySelector:query,
    querySelectorAll(selector){
      const attr=selector.slice(1,-1);
      return [...html.matchAll(new RegExp(`${attr}="([^"]+)"`,'g'))].map(m=>{
        const n=element();n.dataset={[attr.replace('data-','')]:m[1]};nodes[`${selector}:${m[1]}`]=n;return n;
      });
    },
  };
  const document={
    activeElement:null,
    querySelector(s){return s==='#app'?root:s.startsWith('dialog')&&lastDialog&&!lastDialog.closed?lastDialog:null;},
    body:{append(){},classList:classList()}, addEventListener(){},
    createElement(tag){
      const n=element();
      if(tag==='dialog'){
        const controls={}, events={};
        Object.assign(n, {
          innerHTML:'',
          querySelector(s){
            if(s==='h2')return {textContent:this.innerHTML.match(/<h2>(.*?)<\/h2>/)?.[1]||'Diálogo'};
            if(!controls[s]){
              if(s==='#age-min'||s==='#age-max') controls[s]=select(this.innerHTML, `id="${s.slice(1)}"`);
              else controls[s]=element();
              if(s==='#filters')controls[s].elements={
                interest:{value:this.innerHTML.match(/<option selected>(.*?)<\/option>/)?.[1]||''},
                preference:{value:this.innerHTML.match(/name="preference" value="([^"]+)" checked/)?.[1]||''},
              };
            }
            return controls[s];
          },
          addEventListener(type,fn){events[type]=fn;},
          showModal(){lastDialog=this;this.closed=false;},
          close(){this.closed=true;events.close?.();},
        });
      }
      return n;
    },
  };
  class FormData {
    constructor(form){
      this.data=form.data||{min:lastDialog.querySelector('#age-min').value,max:lastDialog.querySelector('#age-max').value,
        interest:form.elements.interest.value,preference:form.elements.preference.value};
    }
    get(k){return this.data[k];}
    *[Symbol.iterator](){yield* Object.entries(this.data);}
  }
  const context=vm.createContext({document,localStorage:{getItem:k=>store[k]||null,setItem:(k,v)=>{if(failSave)throw Error('blocked');store[k]=v;}},
    window:{scrollTo(){}},setTimeout(){},Date:{now:()=>clock},FormData});
  vm.runInContext(source,context);
  return {
    run:code=>vm.runInContext(code,context),node:s=>nodes[s]||query(s),get dialog(){return lastDialog;},store,
    tick(ms=400){clock+=ms;},
    choose(choice){const b=nodes['[data-preference]:'+choice];assert.ok(b);b.onclick();},
    start(choice='both'){this.node('#adult').onchange({target:{checked:true}});this.node('#start').onclick();this.choose(choice);},
    submit(selector,data){const form=this.node(selector);form.data=data;form.onsubmit({preventDefault(){},target:form});},
    apply(data){const form=lastDialog.querySelector('#filters');form.data=data;form.onsubmit({preventDefault(){}});},
  };
}

// Presentation starts with clean, isolated storage, for each preference.
for(const choice of ['women','men','both']){
  const h=harness();
  assert.equal(h.run('page'),'welcome');
  assert.equal(Object.keys(h.store).length,0,'Starting must not write storage');
  h.node('#adult').onchange({target:{checked:true}});h.node('#start').onclick();
  assert.equal(h.run('state.preference'),null);
  assert.doesNotMatch(h.run('content()'),/id="swipe-card"/);
  h.choose(choice);
  let attempts=0;
  while(!h.run('state.matches.length')&&attempts<3){h.tick();h.node('#like').onclick();attempts++;}
  assert.equal(h.run('state.matches.length'),1,`${choice}: easy simulated match`);
  assert.ok(attempts<=2);
  assert.match(h.dialog.innerHTML,/COINCIDENCIA SIMULADA/);
  h.dialog.querySelector('#open-chat').onclick();
  assert.equal(h.run('page'),'matches');
  const id=h.run('activeChat');
  assert.equal(h.run('state.messages[activeChat].length'),1);
  h.node('[data-suggestion]:0').onclick();
  assert.equal(h.run('state.messages[activeChat].length'),1,'Suggestion never sends itself');
  h.submit('#send',{message:'Hola <demo> & café'});
  assert.match(h.run('chat()'),/Hola &lt;demo&gt; &amp; café/);
  h.run("go('profile')");h.node('#edit-profile').onclick();
  assert.equal(h.run('editingProfile'),true);
  h.submit('#profile-form',{name:'Demo',age:'31',bio:'Una prueba local.',interests:'Café, Cine'});
  assert.equal(h.run('editingProfile'),false);assert.equal(h.run('state.me.age'),31);
  const loaded=harness(JSON.parse(h.store['buba-friends-v1']));
  assert.equal(loaded.run('state.preference'),choice);
  assert.equal(loaded.run(`state.messages[${JSON.stringify(id)}].at(-1).text`),'Hola <demo> & café');
  assert.equal(loaded.run('state.me.name'),'Demo');
  console.log(`Recorrido ${choice}: coincidencia en ${attempts} interés(es), mensaje, perfil y recarga correctos.`);
}

const h=harness();h.start();
assert.equal(h.run('profiles.length'),30);assert.equal(h.run('new Set(profiles.map(p=>p.id)).size'),30);
assert.ok(h.run('profiles.some(p=>!p.match)'),'Not everyone matches');
for(const p of h.run('profiles')){
  h.run(`state.decisions=[];state.preference=${JSON.stringify(p.gender==='woman'?'women':'men')};state.filters={min:${p.age},max:${p.age},interest:''}`);
  assert.equal(h.run(`remaining().some(p=>p.id===${JSON.stringify(p.id)})`),true);
}
for(const age of ['17','101','25.5','', '1e2','Infinity','abc'])assert.equal(h.run('parseAge('+JSON.stringify(age)+')'),null);
for(const age of [18,100])assert.equal(h.run('parseAge('+age+')'),age);

// Full filters lifecycle, including real dialog handlers (with DOM doubles).
h.run("state=fresh();state.started=true;state.preference='both';page='discover';render()");
h.node('#open-filters').onclick();
h.dialog.querySelector('#age-min').value='28';h.dialog.querySelector('#age-max').value='28';
h.dialog.querySelector('.dialog-close').onclick();
assert.equal(h.run('state.filters.min'),18);
h.node('#open-filters').onclick();h.apply({min:'28',max:'28',interest:'',preference:'men'});
assert.equal(h.run('current().id'),'gabriel');assert.equal(h.run('state.preference'),'men');
h.node('#open-filters').onclick();
h.dialog.querySelector('#clear-filters').onclick();
assert.equal(h.dialog.querySelector('#age-min').value,'18');assert.equal(h.dialog.querySelector('#age-max').value,'100');
assert.equal(h.run('state.filters.min'),28,'Clear stays provisional');
assert.equal(h.dialog.querySelector('#filters').elements.preference.value,'men');
h.dialog.querySelector('.dialog-close').onclick();assert.equal(h.run('state.filters.min'),28);
h.node('#open-filters').onclick();h.dialog.querySelector('#clear-filters').onclick();
h.dialog.querySelector('#filters').onsubmit({preventDefault(){}});
assert.equal(h.run('state.filters.min'),18);assert.equal(h.run('state.filters.max'),100);assert.equal(h.run('state.preference'),'men');
h.node('#open-filters').onclick();
for(const data of [{min:'50',max:'20',interest:'',preference:'men'},{min:'17',max:'100',interest:'',preference:'men'},
  {min:'18',max:'100',interest:'',preference:''},{min:'18',max:'100',interest:'unknown',preference:'men'}]){
  h.apply(data);assert.equal(h.run('state.filters.min'),18);assert.equal(h.dialog.closed,false);
}
h.dialog.querySelector('.dialog-close').onclick();
h.node('#open-filters').onclick();h.apply({min:'28',max:'28',interest:'Arte',preference:'both'});
assert.equal(h.run('current().id'),'lara');
const filteredReload=harness(JSON.parse(h.store['buba-friends-v1']));assert.equal(filteredReload.run('current().id'),'lara');
h.node('#pass').onclick();assert.equal(h.run('remaining().length'),0);
assert.ok(h.node('#undo'),'Undo must remain reachable on an empty result set');h.node('#undo').onclick();assert.equal(h.run('current().id'),'lara');
console.log('Catálogo, 18–100, filtros aplicar/cancelar/limpiar/validar, persistencia y deshacer en vacío: correctos.');

// Decisions, details, duplicates, simulation labels and messages stay consistent.
h.run("state=fresh();state.started=true;state.preference='both';page='discover';render()");h.tick();
const beforeDetail=h.run('current().id');h.node('#detail').onclick();assert.match(h.dialog.innerHTML,/Mi plan favorito/);
assert.match(h.dialog.innerHTML,/Qué busco/);assert.match(h.dialog.innerHTML,/Para romper el hielo/);
h.dialog.querySelector('.dialog-close').onclick();assert.equal(h.run('current().id'),beforeDetail);
h.node('#pass').onclick();h.node('#pass').onclick();assert.equal(h.run('state.decisions.length'),1);
h.node('#undo').onclick();assert.equal(h.run('state.decisions.length'),0);
h.tick();h.node('#like').onclick();assert.equal(h.run('state.matches.length'),1);
h.run('undoPass()');assert.equal(h.run('state.matches.length'),1);assert.equal(h.run('state.lastPass'),null);
h.dialog.querySelector('#keep').onclick();
h.tick();h.node('#like').onclick();assert.equal(h.run('state.matches.length'),1,'Leo does not match');
h.run("go('matches')");assert.match(h.run('content()'),/Coincidencias simuladas/);assert.match(h.run('content()'),/Conversaciones/);

// Pointer sequences: reset below threshold, vertical movement, exclusions, both directions and cancellation.
const swipeTest=harness();swipeTest.start();
const start={isPrimary:true,button:0,pointerId:1,clientX:200,clientY:100,target:{closest(){return null;}}};
function swipe(dx,dy=2){const card=swipeTest.node('#swipe-card');card.onpointerdown(start);card.onpointermove({pointerId:1,clientX:200+dx,clientY:100+dy});card.onpointerup({pointerId:1});return card;}
swipe(-30);assert.equal(swipeTest.run('state.decisions.length'),0);
swipe(10,70);assert.equal(swipeTest.run('state.decisions.length'),0);
let card=swipeTest.node('#swipe-card');card.onpointerdown({...start,target:{closest(){return {};}}});card.onpointerup({pointerId:1});assert.equal(swipeTest.run('state.decisions.length'),0);
card.onpointerdown(start);card.onpointermove({pointerId:1,clientX:80,clientY:102});card.onpointercancel();card.onpointerup({pointerId:1});assert.equal(swipeTest.run('state.decisions.length'),0);
card=swipe(-120);card.onpointerup({pointerId:1});assert.equal(swipeTest.run('state.decisions.length'),1);assert.equal(swipeTest.run('state.lastPass'),'vega');
swipeTest.tick();swipeTest.node('#undo').onclick();swipeTest.tick();swipe(120);assert.equal(swipeTest.run('state.matches[0]'),'vega');
assert.equal(swipeTest.run('state.decisions.length'),1);
console.log('Botones y gestos simulados: pasar/interés, umbral, vertical, información excluida, cancelar y final duplicado correctos.');

// Migration and invalid old data do not wipe historical conversations or write on startup.
const old=harness({started:true,decisions:['vega','unknown'],matches:['vega'],messages:{vega:[{mine:true,text:'Mensaje anterior'}]},
  me:{name:'Demo anterior',age:'31',bio:'Guardado',interests:'Café'},filters:{min:18,max:100,interest:'Conciertos'}});
assert.equal(old.run('state.preference'),null);assert.equal(old.run('state.messages.vega[0].text'),'Mensaje anterior');
assert.equal(old.run('state.filters.interest'),'Música en directo');assert.equal(old.run('state.me.age'),31);
const originalStored=old.store['buba-friends-v1'];old.run('render()');assert.equal(old.store['buba-friends-v1'],originalStored);
const malformed=harness({started:true,me:{age:17},filters:{min:100,max:18}});assert.equal(malformed.run('state.me.age'),25);assert.equal(malformed.run('state.filters.min'),18);
const failedSave=harness(null,{failSave:true});failedSave.start();assert.equal(failedSave.run('state.preference'),'both');assert.equal(Object.keys(failedSave.store).length,0);

h.run("go('profile')");
for(const data of [{name:'A',age:'31',bio:'Texto',interests:'Café'},{name:'Demo',age:'17',bio:'Texto',interests:'Café'},
  {name:'Demo',age:'31',bio:'x'.repeat(351),interests:'Café'},{name:'Demo',age:'31',bio:'Texto',interests:'x'.repeat(151)}]){
  h.submit('#profile-form',data);assert.equal(h.run('state.me.name'),'Alex');
}
h.node('#reset').onclick();h.dialog.querySelector('#cancel').onclick();assert.equal(h.run('state.started'),true);
h.node('#reset').onclick();h.dialog.querySelector('#confirm-reset').onclick();
assert.equal(h.run('state.started'),false);assert.equal(h.run('state.preference'),null);assert.equal(h.run('state.matches.length'),0);
assert.equal(h.run('state.decisions.length'),0);assert.equal(h.run('editingProfile'),false);assert.equal(h.run('decisionUntil'),0);
assert.equal(h.run('page'),'welcome');assert.equal(h.run('state.filters.max'),100);
console.log('Compatibilidad anterior, guardado bloqueado, validación, cancelar reinicio y reinicio confirmado: correctos.');

// Story reply references survive the existing v1 normalization, without images in localStorage.
const withStory=harness({started:true,preference:'both',matches:['vega'],messages:{vega:[{mine:true,text:'Respuesta anterior',story:{id:'example-vega-v1',authorId:'vega',caption:'Texto original',image:'data:never-copy'}}]}});
assert.equal(withStory.run('state.messages.vega[0].story.id'),'example-vega-v1');
assert.equal(withStory.run('state.messages.vega[0].story.caption'),'Texto original');
assert.equal(withStory.run("'image' in state.messages.vega[0].story"),false);
console.log('Referencias de historias compatibles con el guardado v1, sin copiar imágenes al chat.');
