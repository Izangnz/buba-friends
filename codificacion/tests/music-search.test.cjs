// Isolated callback/DOM/clock simulations, not a browser or live Apple integration.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
module.exports=async function(){
 const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
 const timers=new Map(),scripts=[],policyListeners=new Map(),networkListeners=new Map();let seq=0;
 function node(){return {value:'',textContent:'',innerHTML:'',hidden:false,children:[],classList:{add(){}},focus(){this.focused=true;},append(x){this.children.push(x);},querySelector(){return this.children[0]?.children[0];}};}
 const context=vm.createContext({URL,URLSearchParams,Date,Math,Promise,Error,Number,JSON,window:{addEventListener:(name,fn)=>networkListeners.set(name,fn),removeEventListener:name=>networkListeners.delete(name)},navigator:{onLine:true},setTimeout(fn,ms){timers.set(++seq,{fn,ms});return seq;},clearTimeout(id){timers.delete(id);},document:{addEventListener:(name,fn)=>policyListeners.set(name,fn),removeEventListener:name=>policyListeners.delete(name),createElement(){return {...node(),remove(){this.removed=true;}};},head:{append(s){scripts.push(s);}}}});
 vm.runInContext(source.slice(source.indexOf('function catalogURL('),source.indexOf('function profileForm(')),context);
 const run=s=>vm.runInContext(s,context);
 const expire=ms=>{for(const [id,t] of [...timers])if(t.ms===ms){timers.delete(id);t.fn();}};
 run("var diagnostics=[];var request=searchCatalog('Rosalía & A+B? #日本','artists',d=>diagnostics.push(d))");
 let script=scripts.at(-1),url=new URL(script.src),callback=url.searchParams.get('callback');
 assert.equal(url.origin,'https://itunes.apple.com');assert.equal(url.searchParams.get('term'),'Rosalía & A+B? #日本');assert.equal(url.searchParams.get('limit'),'10');assert.equal(url.searchParams.get('entity'),'musicArtist');
 assert.equal(url.searchParams.has('media'),false,'media=music redirects iPhone user agents to musics://');
 context.window[callback]({resultCount:1,results:[{wrapperType:'artist',artistId:1,artistName:'ROSALÍA',artistLinkUrl:'https://music.apple.com/es/artist/1'}]});
 assert.equal((await run('request.promise'))[0].providerId,1);assert.equal(script.removed,true);assert.equal(context.window[callback],undefined);assert.equal(timers.size,0);
 assert.equal(run('diagnostics.at(-1).phase'),'results');assert.equal(run('diagnostics.at(-1).callbackReceived'),true);assert.doesNotMatch(run('JSON.stringify(diagnostics)'),/Rosalía|日本|music.apple.com|bubaMusic/);
 run("request=searchCatalog('Nada','songs')");script=scripts.at(-1);callback=new URL(script.src).searchParams.get('callback');assert.equal(new URL(script.src).searchParams.get('entity'),'song');context.window[callback]({resultCount:0,results:[]});assert.equal((await run('request.promise')).length,0);
 run("request=searchCatalog('Error','songs');var pending=request.promise.catch(e=>e)");scripts.at(-1).onerror();assert.equal((await run('pending')).code,'service');expire(30000);assert.equal(timers.size,0);
 run("request=searchCatalog('Tiempo','songs');pending=request.promise.catch(e=>e)");expire(10000);assert.equal((await run('pending')).code,'timeout');expire(30000);assert.equal(timers.size,0);
 run("request=searchCatalog('Cancelar','songs');pending=request.promise.catch(e=>e)");script=scripts.at(-1);const oldCallback=new URL(script.src).searchParams.get('callback');run('request.cancel()');assert.equal((await run('pending')).code,'cancelled');
 assert.equal(typeof context.window[oldCallback],'function');context.window[oldCallback]({resultCount:0,results:[]});expire(30000);assert.equal(context.window[oldCallback],undefined);assert.equal(timers.size,0);
 context.navigator.onLine=false;const before=scripts.length;run("request=searchCatalog('Offline','songs');pending=request.promise.catch(e=>e)");assert.equal((await run('pending')).code,'offline');assert.equal(scripts.length,before);context.navigator.onLine=true;
 run("request=searchCatalog('Loaded','artists');pending=request.promise.catch(e=>e)");scripts.at(-1).onload();assert.equal((await run('pending')).code,'service');expire(30000);
 run("request=searchCatalog('Malformed','artists');pending=request.promise.catch(e=>e)");callback=new URL(scripts.at(-1).src).searchParams.get('callback');context.window[callback]({error:'bad'});assert.equal((await run('pending')).code,'service');
 run("request=searchCatalog('Filtered','songs');pending=request.promise.catch(e=>e)");callback=new URL(scripts.at(-1).src).searchParams.get('callback');context.window[callback]({resultCount:1,results:[{kind:'song',trackId:3,trackName:'Fake',artistName:'Fake',trackViewUrl:'https://evil.test'}]});assert.equal((await run('pending')).code,'service','malformed results are not an empty search');
 run("request=searchCatalog('CSP','artists');pending=request.promise.catch(e=>e)");policyListeners.get('securitypolicyviolation')({blockedURI:'https://itunes.apple.com/search'});assert.equal((await run('pending')).code,'service');expire(30000);assert.equal(policyListeners.size,0);
 run("request=searchCatalog('Disconnect','songs');pending=request.promise.catch(e=>e)");context.navigator.onLine=false;networkListeners.get('offline')();assert.equal((await run('pending')).code,'offline');context.navigator.onLine=true;expire(30000);assert.equal(networkListeners.size,0);
 const append=context.document.head.append;context.document.head.append=()=>{throw Error('blocked');};run("request=searchCatalog('Setup','songs');pending=request.promise.catch(e=>e)");assert.equal((await run('pending')).code,'service');context.document.head.append=append;expire(30000);assert.equal(timers.size,0);
 // Concurrent transport requests have separate callbacks; cancelling one cannot remove the other.
 run("var one=searchCatalog('One','artists'),two=searchCatalog('Two','songs');pending=one.promise.catch(e=>e);one.cancel()");const cb1=new URL(scripts.at(-2).src).searchParams.get('callback'),cb2=new URL(scripts.at(-1).src).searchParams.get('callback');assert.notEqual(cb1,cb2);context.window[cb1]({resultCount:0,results:[]});context.window[cb2]({resultCount:0,results:[]});assert.equal((await run('two.promise')).length,0);await run('pending');expire(30000);assert.equal(timers.size,0);
 // Picker generations: even a transport that resolves after cancellation cannot replace new results.
 const nodes={},events={};const dialog={classList:{add(){}},querySelector(s){return nodes[s]??=node();},addEventListener(type,fn){events[type]=fn;},close(){events.close?.();}};
 context.modal=()=>dialog;context.root={};context.esc=s=>s;const pending=[];context.searchCatalog=(q,kind,report)=>{let resolve,reject;const promise=new Promise((yes,no)=>{resolve=yes;reject=no;});pending.push({q,kind,resolve,reject,report});return {promise,cancel(){}};};
 run("var selected=[];openMusicSearch('songs',i=>selected.push(i))");
 const input=nodes['#music-query'],status=nodes['#music-status'],results=nodes['#music-results'];
 const fire=()=>{const [id,t]=[...timers.entries()].at(-1);timers.delete(id);t.fn();};
 input.value='a';input.oninput();fire();assert.equal(pending.length,0);
 input.value='old';input.oninput();fire();assert.equal(pending.length,1);
 input.value='new';input.oninput();fire();assert.equal(pending.length,2);
 const item={provider:'itunes',providerId:4,type:'song',name:'New',artist:'Singer',album:'Album',url:'https://music.apple.com/es/album/4'};
 pending[1].report({phase:'results',version:'20261029-4'});pending[1].resolve([item]);await new Promise(resolve=>setImmediate(resolve));assert.match(status.textContent,/1 resultados/);assert.equal(results.children.at(-1).children[0].textContent,'New · Singer · Album');
 pending[0].report({phase:'script-error'});pending[0].resolve([]);await new Promise(resolve=>setImmediate(resolve));assert.match(status.textContent,/1 resultados/);
 assert.match(nodes['#music-diagnostic'].value,/phase=results/);assert.doesNotMatch(nodes['#music-diagnostic'].value,/old|new|Singer/);await nodes['#music-copy-diagnostic'].onclick();assert.match(nodes['#music-copy-status'].textContent,/copia/);results.children.at(-1).children[0].onclick();assert.equal(run('selected[0].providerId'),4);
 // Manual fallback remains independent of network and requires both song fields.
 run("openMusicSearch('songs',i=>selected.push(i))");dialog.querySelector('#music-manual-name').value='Manual';nodes['#music-manual-add'].onclick();assert.match(nodes['#music-add-error'].textContent,/Completa/);
 dialog.querySelector('#music-manual-artist').value='Artist';nodes['#music-manual-add'].onclick();assert.equal(run('selected[1].manual'),true);assert.equal(run('selected[1].url'),'');
 run("openMusicSearch('artists',i=>selected.push(i))");input.value='fail';input.oninput();fire();pending.at(-1).reject(new Error('Error de prueba'));await new Promise(resolve=>setImmediate(resolve));assert.equal(nodes['#music-retry'].hidden,false);assert.match(status.textContent,/manualmente/);
 nodes['#music-retry'].onclick();fire();pending.at(-1).resolve([]);await new Promise(resolve=>setImmediate(resolve));assert.match(status.textContent,/Sin resultados/);dialog.close();assert.equal(timers.size,0);
 console.log('Buscador musical: JSONP, limpieza, error, timeout, cancelación, consultas sucesivas, reintento, vacío, selección y alternativa manual verificados con simulaciones.');
};
