// Isolated callback/DOM/clock simulations, not a browser or live Apple integration.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
module.exports=async function(){
 const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
 const timers=new Map(),scripts=[];let seq=0;
 function node(){return {value:'',textContent:'',innerHTML:'',hidden:false,children:[],classList:{add(){}},focus(){this.focused=true;},append(x){this.children.push(x);},querySelector(){return this.children[0]?.children[0];}};}
 const context=vm.createContext({URL,URLSearchParams,Date,Math,Promise,Error,Number,JSON,window:{},setTimeout(fn,ms){timers.set(++seq,{fn,ms});return seq;},clearTimeout(id){timers.delete(id);},document:{createElement(){return {...node(),remove(){this.removed=true;}};},head:{append(s){scripts.push(s);}}}});
 vm.runInContext(source.slice(source.indexOf('function catalogURL('),source.indexOf('function profileForm(')),context);
 const run=s=>vm.runInContext(s,context);
 run("var request=searchCatalog('Rosalía','artists')");
 let script=scripts.at(-1),url=new URL(script.src),callback=url.searchParams.get('callback');
 assert.equal(url.origin,'https://itunes.apple.com');assert.equal(url.searchParams.get('term'),'Rosalía');assert.equal(url.searchParams.get('limit'),'10');assert.equal(url.searchParams.get('entity'),'musicArtist');
 context.window[callback]({results:[{wrapperType:'artist',artistId:1,artistName:'ROSALÍA',artistLinkUrl:'https://music.apple.com/es/artist/1'}]});
 assert.equal((await run('request.promise'))[0].providerId,1);assert.equal(script.removed,true);assert.equal(context.window[callback],undefined);assert.equal(timers.size,0);
 run("request=searchCatalog('Nada','songs')");script=scripts.at(-1);callback=new URL(script.src).searchParams.get('callback');context.window[callback]({results:[]});assert.equal((await run('request.promise')).length,0);
 run("request=searchCatalog('Error','songs'); var pending=request.promise.catch(e=>e.message)");scripts.at(-1).onerror();assert.match(await run('pending'),/conectar/);
 run("request=searchCatalog('Tiempo','songs'); pending=request.promise.catch(e=>e.message)");[...timers.values()][0].fn();assert.match(await run('pending'),/demasiado/);assert.equal(timers.size,0);
 run("request=searchCatalog('Cancelar','songs'); pending=request.promise.catch(e=>e.message);request.cancel()");assert.match(await run('pending'),/cancelada/);assert.equal(timers.size,0);
 // Picker generations: even a transport that resolves after cancellation cannot replace new results.
 const nodes={},events={};const dialog={classList:{add(){}},querySelector(s){return nodes[s]??=node();},addEventListener(type,fn){events[type]=fn;},close(){events.close?.();}};
 context.modal=()=>dialog;context.root={};context.esc=s=>s;const pending=[];context.searchCatalog=(q,kind)=>{let resolve,reject;const promise=new Promise((yes,no)=>{resolve=yes;reject=no;});pending.push({q,kind,resolve,reject});return {promise,cancel(){}};};
 run("var selected=[];openMusicSearch('songs',i=>selected.push(i))");
 const input=nodes['#music-query'],status=nodes['#music-status'],results=nodes['#music-results'];
 const fire=()=>{const [id,t]=[...timers.entries()].at(-1);timers.delete(id);t.fn();};
 input.value='a';input.oninput();fire();assert.equal(pending.length,0);
 input.value='old';input.oninput();fire();assert.equal(pending.length,1);
 input.value='new';input.oninput();fire();assert.equal(pending.length,2);
 const item={provider:'itunes',providerId:4,type:'song',name:'New',artist:'Singer',album:'Album',url:'https://music.apple.com/es/album/4'};
 pending[1].resolve([item]);await new Promise(resolve=>setImmediate(resolve));assert.match(status.textContent,/1 resultados/);assert.equal(results.children.at(-1).children[0].textContent,'New · Singer · Album');
 pending[0].resolve([]);await new Promise(resolve=>setImmediate(resolve));assert.match(status.textContent,/1 resultados/);
 results.children.at(-1).children[0].onclick();assert.equal(run('selected[0].providerId'),4);
 // Manual fallback remains independent of network and requires both song fields.
 run("openMusicSearch('songs',i=>selected.push(i))");dialog.querySelector('#music-manual-name').value='Manual';nodes['#music-manual-add'].onclick();assert.match(nodes['#music-add-error'].textContent,/Completa/);
 dialog.querySelector('#music-manual-artist').value='Artist';nodes['#music-manual-add'].onclick();assert.equal(run('selected[1].manual'),true);assert.equal(run('selected[1].url'),'');
 run("openMusicSearch('artists',i=>selected.push(i))");input.value='fail';input.oninput();fire();pending.at(-1).reject(new Error('Error de prueba'));await new Promise(resolve=>setImmediate(resolve));assert.equal(nodes['#music-retry'].hidden,false);assert.match(status.textContent,/manualmente/);
 nodes['#music-retry'].onclick();fire();pending.at(-1).resolve([]);await new Promise(resolve=>setImmediate(resolve));assert.match(status.textContent,/Sin resultados/);dialog.close();assert.equal(timers.size,0);
 console.log('Buscador musical: JSONP, limpieza, error, timeout, cancelación, consultas sucesivas, reintento, vacío, selección y alternativa manual verificados con simulaciones.');
};
