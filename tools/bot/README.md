# Bot de testes do Egg Splash

Simula partidas no Chromium (tamanho de iPhone 13) para calibrar a dificuldade do BOLA (o único modo). Precisa de Node e Playwright (`npm i playwright`).

```sh
node tools/bot/bot.js 40 600 > saida.json   # 40 partidas por perfil, até 600 s
python3 tools/bot/analise.py saida.json                        # duração, ovos, 1ª vida, perdas em sequência
node tools/bot/perfeito.js                                     # BOLA: quem come todos os ovos nunca fica fraco?
```

- **Perfis:** `bom`, `medio`, `desvia` (não come, só desvia), `desviaBom`.
- **Limite:** o bot sabe onde a bola vai cair, então desvia melhor que uma pessoa, e não mede se o jogo é entendido. Use para comparar versões, não para decidir sozinho.
- `FOME=max,start,rate` sobrescreve a fome do BOLA (ex.: `FOME=3,0.6667,0.18`).
