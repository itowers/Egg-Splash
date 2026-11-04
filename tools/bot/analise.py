# Resumo da saida do bot.js: duracao, ovos, 1a vida, % de vidas perdidas com menos de 5 s da anterior.
# Uso: python3 tools/bot/analise.py saida.json
import json,statistics as st,sys
def M(v):
  return st.median(v) if v else float('nan')
d=json.load(open(sys.argv[1]))['out']
for m in ['bola']:
  for p in ['bom','medio','desvia']:
    G=[x for x in d if x['perfil']==p and x['modo']==m]
    if not G:continue
    first=[g['lossTimes'][0] for g in G if g['lossTimes']]
    gaps=[]
    for g in G:t=g['lossTimes'];gaps+=[t[i+1]-t[i] for i in range(len(t)-1)]
    q=sum(x<5 for x in gaps)/max(1,len(gaps))
    gm=[st.median([t[i+1]-t[i] for i in range(len(t)-1)]) for t in [g['lossTimes'] for g in G] if len(t)>2]
    print(f"{m:6} {p:6} dur={st.median([g['secs'] for g in G]):.0f} ovos={st.median([g['score'] for g in G])} 1a={M(first):.0f}s gapMed={M(gaps):.0f}s <5s={100*q:.0f}% sd-gaps={(st.pstdev(gaps) if gaps else 0):.0f}")
