# Egg Splash na App Store

O app iOS é o mesmo `index.html` do site, empacotado com o Capacitor (pasta `ios/`). Tudo roda offline dentro do app. O site no GitHub Pages não muda.

**O que o app tem a mais que o site:** vibração (comer, bolada, coração perdido, rugido, nível, fim de jogo), Game Center (recorde no placar + botão PLACAR GAME CENTER no MENU), compartilhar do iOS para a imagem da pirâmide, tela cheia sem barra de status e sem o modo de teste/AJUSTES. Só iPhone (sem iPad), retrato e paisagem.

---

## 1. O que você faz uma vez (≈ 1 h, mais a espera da Apple)

### 1.1 Conta de desenvolvedor
1. Entre em <https://developer.apple.com/programs/enroll/> com o seu Apple ID e se inscreva como **pessoa física** (US$ 99/ano). A aprovação costuma levar de algumas horas a 2 dias.
2. Em <https://appstoreconnect.apple.com> → **Negócios** (Business): aceite o contrato de apps pagos/gratuitos. Para app gratuito não precisa de dados bancários.
3. Anote o **Team ID**: <https://developer.apple.com/account> → Membership details.

### 1.2 Criar o app no App Store Connect
App Store Connect → **Apps → + → Novo app**:
| Campo | Valor |
|---|---|
| Plataforma | iOS |
| Nome | Egg Splash (se estiver em uso: **Egg Splash: Raposa Faminta**) |
| Idioma principal | Português (Brasil) |
| ID do pacote (Bundle ID) | `com.igortorres.eggsplash` (se não aparecer na lista, crie em developer.apple.com → Identifiers → +, com **Game Center** marcado) |
| SKU | `eggsplash` |
| Acesso | Acesso total |

Se você trocar o Bundle ID, troque também em `capacitor.config.json` e no `ios/App/App.xcodeproj/project.pbxproj` (`PRODUCT_BUNDLE_IDENTIFIER`).

### 1.3 Placar do Game Center
No app → **Serviços → Game Center → Placares (Leaderboards) → +** → Placar clássico:
| Campo | Valor |
|---|---|
| Nome de referência | Pontos |
| ID do placar | `eggsplash.pontos` (tem que ser exatamente esse; está em `SceneDelegate.swift`) |
| Formato | Inteiro |
| Tipo de envio | Melhor pontuação |
| Ordenação | Maior para menor |
| Localização pt-BR | Nome: **Recorde** · Formato: inteiro · sufixo: " pontos" |

Depois, na página da versão 1.0, marque **Game Center** e adicione o placar.

### 1.4 Chave da API (para o GitHub mandar o app sozinho)
1. App Store Connect → **Usuários e acesso → Integrações → App Store Connect API → Chaves da equipe → +**.
2. Nome: `GitHub Actions` · Acesso: **Admin** (é o que deixa criar o certificado de distribuição na nuvem).
3. Baixe o arquivo `AuthKey_XXXXXXXXXX.p8` (só dá para baixar uma vez). Anote o **Key ID** e o **Issuer ID** (no topo da página).
4. No GitHub: repositório → **Settings → Secrets and variables → Actions → New repository secret**, e crie:
   - `APPLE_TEAM_ID` = Team ID (1.1)
   - `ASC_KEY_ID` = Key ID
   - `ASC_ISSUER_ID` = Issuer ID
   - `ASC_KEY_P8` = abra o .p8 num editor de texto e cole **tudo**, incluindo as linhas `-----BEGIN PRIVATE KEY-----` e `-----END PRIVATE KEY-----`

## 2. Mandar um build para o TestFlight
1. GitHub → **Actions → iOS → TestFlight → Run workflow** (ou crie uma tag `v1.0.0`). Leva ~10–15 min.
2. Em 10–30 min o build aparece em App Store Connect → **TestFlight**. Responda a pergunta de criptografia se aparecer (o app já declara que não usa: `ITSAppUsesNonExemptEncryption = NO`).
3. Em **Testes internos**, adicione você mesmo, instale o app **TestFlight** no iPhone e teste.
4. Para testar com outras pessoas (`roteiro-teste.md`): **Testes externos** → grupo → link público. O 1º build externo passa por uma revisão rápida.

Cada execução usa o número da execução do GitHub como número do build. Para uma versão nova da loja (1.1, 1.2...), mude `MARKETING_VERSION` no `project.pbxproj`.

## 3. Página da loja (copiar e colar)

### Português (Brasil)
- **Nome:** Egg Splash
- **Subtítulo (30):** Uma raposa faminta no celeiro
- **Texto promocional (170):** Coma os ovos, fuja das bolinhas do fazendeiro e solte o grito para a Chuva de Ovos. Um arcade 8-bit rápido, para jogar em um minuto ou numa hora.
- **Palavras-chave (100):** raposa,ovo,ovos,arcade,8 bit,pixel,retro,celeiro,fazenda,galinha,casual,reflexo,desviar,recorde
- **Descrição:**

> Uma raposa com fome entrou no celeiro. Lá em cima, as galinhas botam ovos e o fazendeiro, morrendo de medo, joga bolinhas de tênis para espantá-la.
>
> • Abra a boca na hora certa para comer os ovos que caem.
> • Desvie das bolinhas: cinco boladas e acabou.
> • Não deixe a barriga esvaziar: com fome a raposa fica lenta e perde corações.
> • Ovo no chão vira poça escorregadia. Passe por cima para limpar.
> • Comeu bastante? Solte o grito: as galinhas voam e começa a Chuva de Ovos, com chance de recuperar corações.
> • Ovo dourado deixa a raposa gigante. Ovo podre... dá para comer, mas ela passa mal.
>
> Cada galinha nova no poleiro é um nível, e o jogo vai ficando mais rápido. Faça combos para multiplicar os pontos, ganhe medalhas e dispute o recorde no Game Center.
>
> Pixel art, som 8-bit, vibração, funciona sem internet. Sem anúncios e sem compras.

### English (opcional: adicione o idioma Inglês (EUA) na página do app)
- **Name:** Egg Splash
- **Subtitle:** A hungry fox in the barn
- **Promotional text:** Eat the eggs, dodge the farmer's tennis balls and roar for an Egg Rain. A fast 8-bit arcade game you can play for a minute or an hour.
- **Keywords:** fox,egg,eggs,arcade,8 bit,pixel,retro,barn,farm,chicken,casual,reflex,dodge,high score
- **Description:**

> A hungry fox sneaked into the barn. Up in the loft, the hens are laying eggs, and the farmer, scared stiff, throws tennis balls to chase it away.
>
> • Open your mouth at the right moment to eat the falling eggs.
> • Dodge the balls: five hits and it's over.
> • Keep your belly full: a hungry fox slows down and loses hearts.
> • Eggs on the floor turn into slippery puddles. Run over them to clean up.
> • Ate enough? Roar! The hens fly off, the Egg Rain begins, and lost hearts may fall back.
> • Golden eggs make the fox giant. Rotten eggs... you can eat them, but it won't feel great.
>
> Every new hen on the perch is a new level, and the game keeps speeding up. Chain combos to multiply your score, earn medals and chase the Game Center leaderboard.
>
> Pixel art, 8-bit sound, haptics, plays offline. No ads, no purchases.

### Outros campos
| Campo | Valor |
|---|---|
| Categoria | Jogos · subcategorias Arcade e Casual |
| Preço | Gratuito |
| URL de suporte | https://github.com/itowers/egg-splash/issues |
| URL da política de privacidade | https://itowers.github.io/egg-splash/privacidade.html (confira se abre depois do merge) |
| Direitos autorais | 2026 Igor Torres |
| Screenshots (iPhone 6,9") | `store/screenshots/` (1320 × 2868), nesta ordem: 1-home, 2-jogo, 4-chuva, 5-fome, 3-jogo, 6-fim |
| Notas para a revisão | "Jogo arcade offline feito em HTML5/Canvas dentro do app. Recursos nativos: vibração (Core Haptics), placar do Game Center e compartilhar do iOS. Não precisa de login." |

## 4. Questionários da Apple

### Privacidade do app (App Privacy)
- **Você coleta dados deste app?** → **Não, não coletamos dados**. (Recorde e histórico ficam só no aparelho; o Game Center é dado da Apple, não do desenvolvedor.)

### Classificação etária
Responda **Nenhum / Não** para tudo, exceto:
- **Violência de desenho animado ou fantasia:** Rara/leve (a bolinha de tênis acerta a raposa, que fica tonta).
- Recursos: sem chat, sem conteúdo gerado por usuários, sem navegador web, sem compras, sem anúncios.

A Apple calcula a classificação; deve sair 4+ (no máximo 9+).

### Exportação / criptografia
Já respondido no app (`ITSAppUsesNonExemptEncryption = NO`).

## 5. Enviar para revisão
Na página da versão 1.0: selecione o build do TestFlight, confira os campos acima e toque em **Adicionar para revisão → Enviar**. A revisão costuma levar 1–3 dias.

**Se vier a recusa 4.2 (funcionalidade mínima):** responda no Resolution Center explicando que é um jogo completo, offline, com vibração e Game Center, e mande um vídeo curto jogando. Se não bastar, os próximos passos são widgets/ícone alternativo ou controle por gamepad.

---

## Desenvolver no Mac (opcional)
```
npm install
npm run ios:sync     # copia o jogo para www/ e para o projeto iOS
npm run ios:open     # abre no Xcode; escolha o seu iPhone e aperte ▶
```
Depois de mudar o `index.html`, rode `npm run ios:sync` de novo.

## A testar no iPhone
- Som: se a música de outro app (Spotify) continua com o som do jogo desligado, como no site (PR #40).
- Se a vibração na bolada e no rugido é forte demais ou de menos (mapa `HAPTIC` no `index.html`).
- Game Center: se o login aparece na 1ª abertura e se o recorde chega ao placar.
- Salvar a pirâmide: o compartilhar do iOS abre com "Salvar Imagem".
