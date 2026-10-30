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
