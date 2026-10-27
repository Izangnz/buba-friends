// Pruebas de lógica y manejadores con DOM/almacenamiento simulados. No son pruebas visuales.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(require('node:path').join(__dirname, '../app.js'), 'utf8');
function harness(saved) {
 const store = saved ? {'buba-friends-v1': JSON.stringify(saved)} : {};
 let nodes = {}, html = '', lastDialog;
 const element = () => ({value:'',disabled:false,scrollHeight:200,scrollTop:0,focus(){this.focused=true;},setAttribute(){},remove(){}});
 function query(selector) {
  let exists = selector.startsWith('#') ? html.includes(`id="${selector.slice(1)}"`) : selector === '.send input' ? html.includes('id="send"') : selector === '.messages' && html.includes('class="messages"');
  return exists ? (nodes[selector] ||= element()) : null;
 }
 const root = {get innerHTML(){return html;},set innerHTML(value){html=value;nodes={};}, querySelector:query,querySelectorAll(selector){
  const attr = selector.slice(1,-1);
  return [...html.matchAll(new RegExp(`${attr}="([^"]+)"`,'g'))].map(m=>{const n=element();n.dataset={[attr.replace('data-','').replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]:m[1]};nodes[`${selector}:${m[1]}`]=n;return n;});
 }};
 const document={querySelector:s=>s==='#app'?root:null,body:{append(){}},createElement(tag){const e=element();if(tag==='dialog'){const buttons={};Object.assign(e,{innerHTML:'',querySelector:s=>s==='h2'?{textContent:'Diálogo'}:(buttons[s] ||= element()),addEventListener(){},showModal(){lastDialog=e;},close(){this.closed=true;}});}return e;}};
 class FormData {constructor(form){this.data=form.data;}get(k){return this.data[k];}*[Symbol.iterator](){yield* Object.entries(this.data);}}
 const context=vm.createContext({document,localStorage:{getItem:k=>store[k]||null,setItem:(k,v)=>store[k]=v},window:{scrollTo(){}},setTimeout(){},FormData});
 vm.runInContext(source,context);
 return {run:code=>vm.runInContext(code,context),node:s=>nodes[s]||query(s),get dialog(){return lastDialog;},store,submit(selector,data){const target=nodes[selector]||query(selector);target.data=data;target.onsubmit({preventDefault(){},target});}};
}
const h=harness();
assert.equal(h.run('profiles.length'),10);
assert.equal(h.run('new Set(profiles.map(p=>p.id)).size'),10);
assert.equal(h.run('profiles.every(p=>p.age>=18 && p.question && p.tags.length>=2)'),true);
assert.equal(h.run('page'), 'welcome');
assert.match(h.run('content()'),/18 años/);
h.node('#adult').onchange({target:{checked:true}});
assert.equal(h.node('#start').disabled,false);
h.node('#start').onclick();
assert.equal(h.run('state.started'),true);
h.node('#detail').onclick();assert.match(h.dialog.innerHTML,/librería/);
h.node('#pass').onclick();assert.equal(h.run('current().id'),'leo');
h.node('#undo').onclick();assert.equal(h.run('current().id'),'vega');assert.equal(h.run('state.lastPass'),null);
h.node('#like').onclick();assert.equal(h.run('state.matches[0]'),'vega');assert.match(h.dialog.innerHTML,/COINCIDENCIA SIMULADA/);
h.dialog.querySelector('#open-chat').onclick();assert.equal(h.run('activeChat'),'vega');
assert.equal(h.run('suggestions(profiles[0]).length'),3);
const before=h.run('state.messages.vega.length');
h.node('[data-suggestion]:0').onclick();assert.match(h.node('.send input').value,/librería/);assert.equal(h.run('state.messages.vega.length'),before);
h.submit('#send',{message:'Hola <Buba> & café'});assert.match(h.run('chat()'),/Hola &lt;Buba&gt; &amp; café/);
h.run("go('profile')");
h.submit('#profile-form',{name:'Lucía',age:'31',bio:'Una peli y un paseo.',interests:'Cine, Café'});
assert.match(h.run('ownPreview()'),/Lucía, 31/);
for(const invalid of [{name:' ',age:'31'},{name:'A',age:'31'},{name:'Lucía',age:'17'},{name:'Lucía',age:'25.5'},{name:'Lucía',age:'121'},{name:'x'.repeat(36),age:'31'}]){
 h.submit('#profile-form',{bio:'bio',interests:'Cine',...invalid});assert.equal(h.run('state.me.name'),'Lucía');assert.equal(h.run('state.me.age'),31);
}
h.submit('#profile-form',{name:'No guardar',age:'31',bio:'x'.repeat(351),interests:'Cine'});assert.equal(h.run('state.me.name'),'Lucía');
const loaded=harness(JSON.parse(h.store['buba-friends-v1']));assert.equal(loaded.run('state.me.name'),'Lucía');assert.equal(loaded.run('state.messages.vega.at(-1).text'),'Hola <Buba> & café');assert.equal(loaded.run('state.matches[0]'),'vega');
h.run("go('discover')");assert.match(h.run('content()'),/Cine, Café/);
h.submit('#filters',{min:'28',max:'32',interest:'Arte'});assert.equal(h.run('current().id'),'lara');assert.equal(h.run('remaining().length'),1);
h.node('#pass').onclick();assert.equal(h.run('remaining().length'),0);assert.match(h.run('content()'),/No hay perfiles con estos filtros/);
h.node('#undo').onclick();assert.equal(h.run('current().id'),'lara');
h.submit('#filters',{min:'50',max:'20',interest:''});assert.equal(h.run('state.filters.min'),28);
h.node('#clear-filters').onclick();assert.equal(h.run('state.filters.min'),18);assert.equal(h.run('current().id'),'leo');
h.node('#like').onclick();assert.equal(h.run('state.lastPass'),null);assert.equal(h.run('state.matches.length'),1); // Leo no genera coincidencia.
h.node('#pass').onclick();const passed=h.run('state.lastPass');const reloadPass=harness(JSON.parse(h.store['buba-friends-v1']));reloadPass.run('undoPass()');assert.equal(reloadPass.run(`state.decisions.includes('${passed}')`),false);
h.node('#like').onclick();assert.equal(h.run('state.lastPass'),null);const decisions=h.run('state.decisions.length');h.run('undoPass()');assert.equal(h.run('state.decisions.length'),decisions);
h.run('while(current()) decide(false)');assert.match(h.run('content()'),/Has llegado al último perfil/);
h.run("go('profile')");h.node('#reset').onclick();h.dialog.querySelector('#cancel').onclick();assert.equal(h.run('state.me.name'),'Lucía');
h.node('#reset').onclick();h.dialog.querySelector('#confirm-reset').onclick();assert.equal(h.run('page'),'welcome');assert.equal(h.run('state.matches.length'),0);assert.equal(h.run('state.decisions.length'),0);assert.equal(h.run('state.filters.min'),18);
h.run("go('matches')");assert.match(h.run('content()'),/Tu próxima historia/);
const old={started:true,decisions:['vega','leo'],matches:['vega'],messages:{vega:[{mine:true,text:'Mensaje antiguo'}]},me:{name:'Perfil antiguo',age:29,bio:'Mi bio',interests:'Café'}};
const migrated=harness(old);assert.equal(migrated.run('state.me.name'),'Perfil antiguo');assert.equal(migrated.run('state.filters.max'),120);assert.equal(migrated.run('state.lastPass'),null);assert.equal(migrated.run('state.messages.vega[0].text'),'Mensaje antiguo');assert.equal(migrated.run('current().id'),'alma');assert.equal(migrated.store['buba-friends-v1'],JSON.stringify(old));
console.log('OK: catálogo, recorrido, manejadores, filtros, deshacer, validación, escape HTML, persistencia, compatibilidad y reinicio. DOM simulado; revisión visual pendiente.');
const extra=harness();extra.run("state.started=true;go('discover')");
extra.submit('#filters',{min:'28',max:'32',interest:'Arte'});
const filteredReload=harness(JSON.parse(extra.store['buba-friends-v1']));assert.equal(filteredReload.run('current().id'),'lara');
extra.submit('#filters',{min:'90',max:'100',interest:''});assert.equal(extra.run('remaining().length'),0);assert.match(extra.run('content()'),/No hay perfiles/);
extra.run("go('profile')");extra.submit('#profile-form',{name:'Alex',age:'25',bio:'bio',interests:'x'.repeat(151)});assert.equal(extra.run('state.me.interests'),'Café, música, paseos');
extra.submit('#profile-form',{name:'<Alex>',age:'25',bio:'<b>bio</b>',interests:'Arte'});assert.match(extra.run('ownPreview()'),/&lt;Alex&gt;/);assert.match(extra.run('ownPreview()'),/&lt;b&gt;bio/);
assert.equal(extra.run('new Set(profiles.map(p=>portrait(p))).size'),10);
module.exports = {passed:true,scope:'Lógica y manejadores con DOM simulado; no revisión visual'};
