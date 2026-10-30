// Isolated application/DOM/storage simulations. Not browser or iPhone verification.
const assert=require('node:assert/strict');
const {harness}=require('./interaction.test.cjs');
const seed={started:true,profileCompleted:true,preference:'both',me:{name:'Prueba',age:30,bio:'',interests:''},matches:['vega','nico'],messages:{vega:[{mine:false,text:'Mensaje anterior'},{mine:true,text:'Respuesta anterior',custom:'conservar'}],nico:[]}};
const h=harness(seed);
assert.equal(Object.keys(h.store).length,1);assert.equal(JSON.parse(h.store['buba-friends-v1']).messages.vega[0].id,undefined,'Read never writes migration');
assert.equal(h.run('state.messages.vega[0].id'),'legacy-vega-0');assert.equal(h.run('state.messages.vega[0].createdAt'),undefined);
assert.equal(h.run('state.messages.vega[1].custom'),'conservar');
h.run("commitChatChange(()=>{chatSettings('vega').draft='Borrador Vega';chatSettings('nico').draft='Borrador Nico';})");
const loaded=harness(JSON.parse(h.store['buba-friends-v1']));assert.equal(loaded.run("chatSettings('vega').draft"),'Borrador Vega');assert.equal(loaded.run("chatSettings('nico').draft"),'Borrador Nico');
h.run("appendChatMessage('vega',newChatMessage('Mensaje nuevo',{replyTo:'legacy-vega-0'}))");assert.equal(h.run('state.messages.vega.length'),3);
h.run("appendChatMessage('vega',state.messages.vega.at(-1))");assert.equal(h.run('state.messages.vega.length'),3);
h.run("appendChatMessage('nico',newChatMessage('Actividad posterior'))");assert.equal(h.run("conversationIds(false,'NÍCO')[0]"),'nico');
h.run("setChatArchived('vega',true)");assert.equal(h.run('conversationIds(true)[0]'),'vega');assert.equal(h.run('state.matches.length'),2);h.run("setChatArchived('vega',false)");
assert.equal(h.run("deleteChatMessage('vega','legacy-vega-0')"),false);assert.equal(h.run("deleteChatMessage('vega','legacy-vega-1')"),true);assert.equal(h.run('state.messages.vega.length'),2);
h.run("clearChat('vega')");assert.equal(h.run('state.messages.vega.length'),0);assert.equal(h.run('state.matches.length'),2);assert.equal(h.run("chatSettings('vega').draft"),'');
h.run("removeConnection('vega')");assert.equal(h.run('state.matches.includes("vega")'),false);assert.equal(h.run('state.messages.vega'),undefined);assert.equal(h.run("chatSettings('nico').draft"),'Borrador Nico');
const fail=harness(seed,{failSave:true});const before=fail.run('JSON.stringify(state)');assert.equal(fail.run("clearChat('vega')"),false);assert.equal(fail.run('JSON.stringify(state)'),before);
console.log('Conversaciones: compatibilidad, IDs estables sin fechas inventadas, borradores, actividad, archivo, borrado y rollback: PASS (simulado).');

// Full UI handlers: search -> open -> drafts -> send/reply -> archive/restore/clear/remove.
const ui=harness(seed);ui.run("go('matches')");ui.node('#connection-search').value='véGA';ui.node('#connection-search').oninput();
assert.match(ui.node('#connection-results').innerHTML,/data-chat="vega"/);assert.doesNotMatch(ui.node('#connection-results').innerHTML,/data-chat="nico"/);
ui.node('[data-chat]:vega').onclick();assert.equal(ui.run('activeChat'),'vega');assert.equal(ui.run("chatSettings('vega').opened"),true);
let field=ui.node('#chat-message');field.value='Texto pendiente de Vega';field.oninput();assert.equal(ui.run("chatSettings('vega').draft"),'Texto pendiente de Vega');assert.equal(ui.node('#chat-send').disabled,false);
ui.run("openConversation('nico')");field=ui.node('#chat-message');field.value='Borrador de Nico';field.oninput();ui.run("openConversation('vega')");assert.match(ui.run('chat()'),/Texto pendiente de Vega/);
let box=ui.node('.messages');box.scrollHeight=1200;box.clientHeight=300;box.scrollTop=100;
const stale=ui.node('#send');ui.submit('#send',{message:'Mensaje con varias\nlíneas'});assert.equal(ui.run('state.messages.vega.at(-1).text'),'Mensaje con varias\nlíneas');assert.equal(ui.run('chatNewMessage'),true);assert.equal(ui.node('.messages').scrollTop,100,'Reading position is preserved on send');
stale.onsubmit({preventDefault(){}});assert.equal(ui.run('state.messages.vega.length'),3,'A stale double submit cannot duplicate the message');
ui.node('#chat-jump').onclick();assert.equal(ui.run('chatNewMessage'),false);assert.equal(ui.node('.messages').scrollTop,ui.node('.messages').scrollHeight);
ui.run("selectChatReply('legacy-vega-0')");assert.equal(ui.run("chatSettings('vega').replyTo"),'legacy-vega-0');assert.match(ui.node('#reply-composer').innerHTML,/Mensaje anterior/);
ui.run('render()');ui.node('#cancel-reply').onclick();assert.equal(ui.run("chatSettings('vega').replyTo"),null);
ui.run("selectChatReply('legacy-vega-1')");ui.submit('#send',{message:'Cito una respuesta'});assert.equal(ui.run('state.messages.vega.at(-1).replyTo'),'legacy-vega-1');assert.match(ui.run('chat()'),/data-jump-message="legacy-vega-1"/);
const replyId=ui.run('state.messages.vega.at(-1).id');ui.node('[data-delete-message]:legacy-vega-1').onclick();ui.dialog.querySelector('#cancel-chat-action').onclick();assert.equal(ui.run('state.messages.vega.length'),4);
ui.node('[data-delete-message]:legacy-vega-1').onclick();ui.dialog.querySelector('#confirm-chat-action').onclick();assert.equal(ui.run('state.messages.vega.length'),3);assert.match(ui.run('chat()'),/Mensaje original no disponible/);assert.equal(ui.run(`state.messages.vega.find(m=>m.id===${JSON.stringify(replyId)}).text`),'Cito una respuesta');
const original=ui.node('#message-legacy-vega-0');original.offsetTop=500;original.offsetHeight=60;ui.node('.messages').clientHeight=200;
// A second quoted message navigates within the conversation and focuses the original.
ui.run("selectChatReply('legacy-vega-0')");ui.submit('#send',{message:'Cita conservada'});const target=ui.node('#message-legacy-vega-0');target.offsetTop=500;target.offsetHeight=60;ui.node('.messages').clientHeight=200;ui.node('[data-jump-message]:legacy-vega-0').onclick();assert.equal(ui.node('.messages').scrollTop,430);
box=ui.node('.messages');box.scrollTop=77;ui.node('#chat-profile').onclick();assert.equal(ui.dialog.querySelector('#close-detail').textContent,'Volver a la conversación');ui.dialog.querySelector('#close-detail').onclick();assert.equal(box.scrollTop,77);assert.equal(ui.run("document.activeElement===root.querySelector('#chat-profile')"),true);
ui.node('#chat-menu').onclick();ui.dialog.querySelector('#archive-chat').onclick();assert.equal(ui.run("chatSettings('vega').archived"),true);assert.equal(ui.run('activeChat'),null);ui.node('#show-archived-chats').onclick();assert.match(ui.run('content()'),/data-chat="vega"/);ui.node('[data-chat]:vega').onclick();ui.node('#chat-menu').onclick();ui.dialog.querySelector('#archive-chat').onclick();assert.equal(ui.run("chatSettings('vega').archived"),false);
ui.run("openConversation('vega')");ui.node('#chat-menu').onclick();ui.dialog.querySelector('#clear-chat').onclick();assert.match(ui.dialog.innerHTML,/conexión se conserva/);ui.dialog.querySelector('#cancel-chat-action').onclick();assert.ok(ui.run('state.messages.vega.length')>0);
ui.node('#chat-menu').onclick();ui.dialog.querySelector('#clear-chat').onclick();ui.dialog.querySelector('#confirm-chat-action').onclick();assert.equal(ui.run('state.messages.vega.length'),0);assert.equal(ui.run('state.matches.length'),2);assert.equal(ui.run("chatSettings('nico').draft"),'Borrador de Nico');
const reloadUI=harness(JSON.parse(ui.store['buba-friends-v1']));assert.equal(reloadUI.run('state.messages.vega.length'),0);assert.equal(reloadUI.run("chatSettings('nico').draft"),'Borrador de Nico');
ui.node('#chat-menu').onclick();ui.dialog.querySelector('#remove-connection').onclick();assert.match(ui.dialog.innerHTML,/Historias/);ui.dialog.querySelector('#confirm-chat-action').onclick();assert.equal(ui.run('state.matches.includes("vega")'),false);assert.equal(ui.run('state.matches.includes("nico")'),true);
const blockedUI=harness(seed,{failSave:true});blockedUI.run("openConversation('vega')");blockedUI.node('#chat-message').value='Conservar en memoria';blockedUI.node('#chat-message').oninput();assert.equal(blockedUI.run("chatSettings('vega').draft"),'Conservar en memoria');blockedUI.submit('#send',{message:'No se puede guardar'});assert.equal(blockedUI.run('state.messages.vega.length'),2);assert.match(blockedUI.node('#chat-error').textContent,/No se pudo guardar/);
console.log('UI de conversaciones: búsqueda, borradores separados, envío/cita/cancelación sin duplicados, scroll/foco, referencia eliminada, archivo/recuperación/vaciado/eliminación, recarga y fallos: PASS (DOM simulado).');

// Viewport fixtures check only classes/measurements, never actual mobile appearance.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
const values={},classes=new Set();const classList={add:n=>classes.add(n),remove:n=>classes.delete(n)};
const geometry=vm.createContext({page:'matches',activeChat:'vega',root:{querySelector:()=>null},window:{innerHeight:844,visualViewport:{height:420,offsetTop:22}},document:{body:{classList},documentElement:{classList,style:{setProperty:(k,v)=>values[k]=v}}}});
vm.runInContext(source.slice(source.indexOf('function updateChatViewport('),source.indexOf('function bindConversations(')),geometry);vm.runInContext('updateChatViewport()',geometry);assert.equal(values['--chat-height'],'420px');assert.equal(values['--chat-top'],'22px');assert.equal(classes.has('chat-screen'),true);
geometry.page='discover';vm.runInContext('updateChatViewport()',geometry);assert.equal(classes.has('chat-screen'),false);
module.exports=async function(){const copy=harness(seed);copy.run("openConversation('vega')");await copy.node('[data-copy-message]:legacy-vega-1').onclick();assert.equal(copy.dialog.querySelector('#copy-message-text').value,'Respuesta anterior');
 // Sending at the bottom follows the user's own new message, unlike the old-reading case above.
const bottom=harness(seed);bottom.run("openConversation('vega')");bottom.node('.messages').clientHeight=200;bottom.node('.messages').scrollHeight=500;bottom.node('.messages').scrollTop=300;bottom.submit('#send',{message:'Al final'});assert.equal(bottom.run('chatNewMessage'),false);assert.equal(bottom.run("chatSettings('vega').scrollTop"),null);
const freshIds=harness({...seed,messages:{vega:[{mine:true,text:'A',id:'same'},{mine:true,text:'B',id:'same'}]}});assert.equal(freshIds.run('new Set(state.messages.vega.map(m=>m.id)).size'),2);
console.log('Copia alternativa, envío al final, IDs duplicados y viewport visual: PASS (simulaciones).');};
