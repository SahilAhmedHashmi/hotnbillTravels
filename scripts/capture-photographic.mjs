import { spawn } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const browserPath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const baseUrl = process.env.CAPTURE_URL || 'http://127.0.0.1:4180';
const output = new URL('../docs/visual-qa/', import.meta.url);
mkdirSync(output, { recursive: true });
const profile = mkdtempSync(join(tmpdir(), 'hornbill-photo-'));
const browser = spawn(browserPath, ['--headless=new','--no-sandbox','--disable-gpu-sandbox','--use-gl=swiftshader','--enable-unsafe-swiftshader','--remote-debugging-port=9231','--remote-allow-origins=*',`--user-data-dir=${profile}`,'about:blank'], { stdio:'ignore' });
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
let id = 0; const pending = new Map();
try {
  let target;
  for(let attempt=0;attempt<40&&!target;attempt++){try{target=(await fetch('http://127.0.0.1:9231/json').then(response=>response.json())).find(item=>item.type==='page');}catch{await wait(250);}}
  if(!target) throw new Error('Could not connect to Chrome.');
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{socket.addEventListener('open',resolve,{once:true});socket.addEventListener('error',reject,{once:true});});
  socket.addEventListener('message',({data})=>{const message=JSON.parse(data);if(!message.id||!pending.has(message.id))return;const job=pending.get(message.id);pending.delete(message.id);message.error?job.reject(new Error(message.error.message)):job.resolve(message.result);});
  const send=(method,params={})=>new Promise((resolve,reject)=>{const callId=++id;pending.set(callId,{resolve,reject});socket.send(JSON.stringify({id:callId,method,params}));});
  await send('Page.enable'); await send('Runtime.enable');
  await send('Page.navigate',{url:`${baseUrl}/?version=photographic&theme=light`}); await wait(2200);
  const captures=[
    {name:'desktop-hero',width:1440,height:1000,selector:'.photo-hero'},
    {name:'desktop-hero-kaziranga',width:1440,height:1000,selector:'.photo-hero',action:'document.querySelectorAll(".photo-hero__index button")[1]?.click()'},
    {name:'desktop-hero-root-bridge-dark',width:1440,height:1000,selector:'.photo-hero',theme:'dark',action:'document.querySelectorAll(".photo-hero__index button")[4]?.click()'},
    {name:'desktop-destinations',width:1440,height:1000,selector:'.photo-horizontal',progress:.42},
    {name:'desktop-experiences',width:1440,height:1000,selector:'[data-atlas-row][data-index="1"]'},
    {name:'desktop-fleet',width:1440,height:1000,selector:'.photo-fleet__stage',action:'document.querySelectorAll(".photo-fleet__tabs button")[1]?.click()'},
    {name:'desktop-journey',width:1440,height:1000,selector:'.photo-journey'},
    {name:'desktop-final-dark',width:1440,height:1000,selector:'.photo-final',theme:'dark'},
    {name:'mobile-hero',width:390,height:844,selector:'.photo-hero',action:'document.querySelectorAll(".photo-hero__index button")[2]?.click()'},
    {name:'mobile-destinations',width:390,height:844,selector:'.photo-horizontal'},
    {name:'mobile-fleet-dark',width:390,height:844,selector:'.photo-fleet__stage',theme:'dark'},
  ];
  for(const item of captures){
    await send('Emulation.setDeviceMetricsOverride',{width:item.width,height:item.height,deviceScaleFactor:1,mobile:item.width<500});
    await send('Page.navigate',{url:`${baseUrl}/?version=photographic&theme=${item.theme||'light'}`}); await wait(1800);
    const position = await send('Runtime.evaluate',{returnByValue:true,expression:`(() => { const element=document.querySelector(${JSON.stringify(item.selector)}); let top=element ? element.getBoundingClientRect().top+scrollY+40 : 0; ${item.progress ? `const track=document.querySelector('.photo-horizontal__track'); top += Math.max(0,(track?.scrollWidth-innerWidth)||0)*${item.progress};` : ''} scrollTo(0,top); return {top,found:Boolean(element)}; })()`});
    await wait(500); await send('Runtime.evaluate',{expression:`scrollTo(0,${position.result.value.top})`}); await wait(900);
    if(item.action){await send('Runtime.evaluate',{expression:item.action});await wait(1500);}
    if(item.selector==='.photo-hero'){
      const heroState=await send('Runtime.evaluate',{returnByValue:true,expression:`(() => { const scene=document.querySelector('.photo-hero__index button[aria-selected=true]')?.getAttribute('aria-controls'); const copy=document.querySelector('#'+scene+' .photo-scene__copy'); const style=copy?getComputedStyle(copy):null; return {scene,opacity:style?.opacity,visibility:style?.visibility,transform:style?.transform,rect:copy?.getBoundingClientRect().toJSON()}; })()`});
      console.log(item.name,'copy',heroState.result.value);
    }
    console.log(item.name, position.result.value, 'scrollY', (await send('Runtime.evaluate',{returnByValue:true,expression:'scrollY'})).result.value);
    const shot=await send('Page.captureScreenshot',{format:'jpeg',quality:84,fromSurface:true});
    writeFileSync(new URL(`${item.name}.jpg`,output),Buffer.from(shot.data,'base64'));
  }
  socket.close();
} finally { browser.kill(); await wait(250); try{rmSync(profile,{recursive:true,force:true,maxRetries:3});}catch{} }
