const {chromium,devices}=require('playwright');
// Bot perfeito (come todos os ovos, bolas removidas): confere que quem come tudo nunca fica fraco no BOLA.
// Uso: node tools/bot/perfeito.js  (FOME=max,start,rate para testar outros valores)
const FO=(process.env.FOME||'3,0.6667,0.18').split(',').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({...devices['iPhone 13']});
await ctx.addInitScript(()=>{window.requestAnimationFrame=()=>0;localStorage.setItem('eggsplash-boca','1');localStorage.setItem('eggsplash-modo','bola')});
const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('file://'+require('path').resolve(__dirname,'../../index.html'));await p.waitForTimeout(300);
const r=await p.evaluate((FO)=>{const E=__egg,res=[];E.FOME.max=FO[0];E.FOME.start=FO[1];E.FOME.rate=FO[2];
 for(let g=0;g<8;g++){E.reset();let minF=9,minT=0,weakF=0,f=0;
  while(E.state==='play'&&f<5*60*60){
   const its=E.items;for(let i=its.length-1;i>=0;i--)if(its[i].type==='ball'||its[i].type==='rotten')its.splice(i,1);
   const eg=its.filter(i=>i.type==='egg'&&!(i.wait>0)&&i.state==='fall').sort((a,b)=>b.y-a.y)[0];
   if(eg){E.fox.x=Math.max(0,Math.min(128,eg.x+4-8));}E.keys.m=!!eg&&eg.y>120;E.update();f++;
   if(E.full<minF){minF=E.full;minT=f/60;}if(E.full<=1e-6)weakF++;}
  res.push([+minF.toFixed(2),+minT.toFixed(0),weakF]);}
 return res;},FO);
console.log('fome '+FO.join(',')+' [barriga minima, segundo, frames fraca] por partida:',JSON.stringify(r),errs.join());await b.close();})();
