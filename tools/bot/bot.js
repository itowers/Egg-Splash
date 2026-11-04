// Bot para calibrar o jogo (BOLA, o unico modo). Uso: node tools/bot/bot.js <partidas> <maxSeg> > saida.json
// Perfis: bom, medio, desvia (nao come, so desvia), desviaBom. O bot sabe onde a bola vai cair, entao desvia melhor que uma pessoa.
// FOME=max,start,rate sobrescreve a fome do BOLA para calibrar.
let PW;try{PW=require('playwright')}catch(e){PW=require('playwright-core')}const {chromium,devices}=PW;
// CLEAN_Y=70: o bot so vai limpar poca quando o ovo mais baixo esta acima dessa altura (maior = limpa mais)
const FO=process.env.FOME?process.env.FOME.split(',').map(Number):null;const MODES=['bola'],CLEAN_Y=+process.env.CLEAN_Y||70;const N=+process.argv[2]||10,MAXS=+process.argv[3]||360;
const path=require('path');const URL='file://'+path.resolve(__dirname,'../../index.html')+(process.env.CHAO==='0'?'?chao=0':process.env.CHAO_N?'?chaoN='+process.env.CHAO_N:''); // CHAO=0: a chuva volta a limpar o chao (o padrao e nao limpar) // a chuva nao limpa o chao
const PROFILES={
  bom:  {react:10,err:3,missBall:.08,mouthLate:.05},
  medio:{react:18,err:6,missBall:.22,mouthLate:.12},
  desvia:{react:18,err:6,missBall:.22,mouthLate:.12,lazy:true},
  desviaBom:{react:10,err:3,missBall:.08,mouthLate:.05,lazy:true},
};
(async()=>{
  const b=await chromium.launch(process.env.CHROME?{executablePath:process.env.CHROME}:{});
  const ctx=await b.newContext({...devices['iPhone 13']});
  await ctx.addInitScript(()=>{window.requestAnimationFrame=()=>0;try{localStorage.setItem('eggsplash-boca','1');localStorage.setItem('eggsplash-mute','1')}catch(e){}});
  const page=await ctx.newPage();
  const errs=[];page.on('pageerror',e=>errs.push(String(e)));page.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  await page.goto(URL);await page.waitForTimeout(300);
  const out=[];
  for(const modo of MODES)for(const [pn,P] of Object.entries(PROFILES))for(let g=0;g<N;g++){
    const r=await page.evaluate(({modo,P,MAXS,seed,FO,CLEAN_Y})=>{
      const E=window.__egg;if(FO){E.FOME.max=FO[0];E.FOME.start=FO[1];E.FOME.rate=FO[2];}E.reset();
      const GROUND=E.fox?null:null;
      let f=0,dirL=0,mouth=false,ballLife0=E.lives,firstLoss=null,hitsByDirt=[0,0,0,0,0,0],framesByDirt=[0,0,0,0,0,0],lostEggs=0,maxDirt=0;
      let pzN=0,slipF=0,onPF=0,pudSum=0;let TL={eat:[],ball:[],lvl:[],roar:[],weak:[],dirt:[],ballP:[]},prevS=0,prevL=1,roarsN=0,weakF=0,lastLives=E.lives,lastScore=0,lossTimes=[],hits=0;
      const G=GROUND_Y();function GROUND_Y(){return 192-24;} // aproximado (so para limiares)
      while(E.state==='play'&&f<MAXS*60){
        if(f%P.react===0){
          const fx=E.fox.x+8,its=E.items.filter(i=>i.state==='fall'&&!(i.wait>0&&!i.rain));
          // ovo alvo: o que chega primeiro (podre/bola fora)
          const eggs=its.filter(i=>i.type==='egg').map(i=>({i,x:(i.land!=null&&!i.rain?i.land:i.x)+4,y:i.y})).sort((a,b)=>b.y-a.y);
          let tx=P.lazy?fx:eggs.length?eggs[0].x+(Math.random()*2-1)*P.err:fx;
          // bola perto: foge (as vezes nao ve)
          const danger=its.filter(i=>(i.type==='ball'||i.type==='rotten')&&i.y>105&&Math.abs((i.land!=null?i.land:i.x)+4.5-fx)<15);
          if(danger.length&&Math.random()>P.missBall){const d=danger[0],dx=(d.land!=null?d.land:d.x)+4.5;tx=dx<fx?Math.min(140,dx+22):Math.max(4,dx-22);}
          // sem ovo para pegar logo: atravessa a poca mais perto para limpar o chao (como uma pessoa faria)
          if(!P.lazy&&(!eggs.length||eggs[0].y<CLEAN_Y)&&!danger.length){const ps=E.puddles.filter(p=>!p.rain&&p.w>0);
            if(ps.length){const p=ps.sort((a,b)=>Math.abs(a.x+a.w/2-fx)-Math.abs(b.x+b.w/2-fx))[0],c=p.x+p.w/2;
              tx=p.from==='L'?c+p.w/2+4:p.from==='R'?c-p.w/2-4:(fx<c?c+p.w/2+4:c-p.w/2-4);}}
          dirL=Math.abs(tx-fx)<3?0:tx<fx?-1:1;
          if(E.roarP()>=1&&(E.lives<5||(E.dirt||0)>=2||Math.random()<.3)){E.doRoar();roarsN++;TL.roar.push(f/60);}
        }
        if(f%4===0){const fx=E.fox.x+8,its=E.items.filter(i=>i.state==='fall'&&!(i.wait>0));
          const near=its.find(i=>i.type==='egg'&&i.y>118&&Math.abs(i.x+4-fx)<9),rotNear=its.some(i=>i.type!=='egg'&&i.y>118&&Math.abs(i.x+4-fx)<10);
          mouth=!P.lazy&&!!near&&!rotNear&&Math.random()>P.mouthLate;}
        E.keys.l=dirL<0;E.keys.r=dirL>0;E.keys.m=mouth;
        E.update();f++;
        if(E.score>prevS){TL.eat.push(f/60);prevS=E.score;} if(E.lvl!==prevL){TL.lvl.push([f/60,E.lvl]);prevL=E.lvl;}
        for(const it of E.items)if(it.type==='ball'&&it.t===1&&!it._c){it._c=1;TL.ball.push(f/60);}
        if(f%60===0){{const c=new Uint8Array(144);for(const p of E.puddles)if(!p.rain)for(let x=Math.max(0,p.x);x<Math.min(144,p.x+p.w);x++)c[x]=1;TL.cov=TL.cov||[];TL.cov.push(c.reduce((a,b)=>a+b,0)/144);}TL.dirt.push(E.dirt||0);TL.weak.push(E.full<=1e-6?1:0);TL.ballP.push(+E.level().ballP.toFixed(3));}
        {const n=E.puddles.filter(p=>!p.rain).length;pudSum+=n;if(E.fox.onP)onPF++;if(E.fox.slip)slipF++;}
        const d=E.dirt||0;framesByDirt[d]++;if(E.full<=1e-6)weakF++;maxDirt=Math.max(maxDirt,d);
        if(E.lives<lastLives){lossTimes.push(f/60);hitsByDirt[d]++;if(firstLoss===null)firstLoss=f/60;}
        lastLives=E.lives;
      }
      const over=E.state==='over',LL=E.lostLog;
      return{modo,secs:f/60,over,score:E.score,pts:E.pts,balls:E.ballHits,lostEgg:LL.filter(x=>x.c==='egg').length,
        firstLoss,lossTimes,hitsByDirt,rev:E.rev,fome:0,weak:weakF,bolaL:E.lostLog.filter(x=>x.c==='ball').length,missed:E.lostLog.filter(x=>x.c==='egg').length,maxDirt,framesByDirt,mc:E.maxCombo,rains:roarsN,pud:pudSum/Math.max(1,f),onP:onPF/Math.max(1,f),slip:slipF/Math.max(1,f),TL};
    },{modo,P,MAXS,seed:g,FO,CLEAN_Y});
    r.perfil=pn;out.push(r);process.stderr.write('.');
  }
  // tira prints do modo BOLA
  await page.evaluate(()=>{const E=__egg;E.reset();for(let i=0;i<600;i++)E.update();for(let i=0;i<3;i++)E.puddle(20+i*40);E.render();});
  await b.close();
  console.log(JSON.stringify({out,errs}));
})();
