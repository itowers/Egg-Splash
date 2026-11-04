# Egg Splash

Jogo 8-bit para iPhone: a raposa come os ovos e desvia das bolas.

## Instalar no iPhone
1. Abra o link do site no **Safari**.
2. Toque em **Compartilhar → Adicionar à Tela de Início**.
3. Abra pelo ícone. Depois da primeira abertura, o jogo funciona sem internet.

**Logo e ícone (anos 90):** EGG em letras de bolha brancas com extrusão rosa e SPLASH em gema mole escorrendo (os pingos crescem, soltam uma gota e voltam na tela inicial; parados com `?anim=0`). Os ícones saem de `tools/icone/icone.html`, que usa o logo e a raposa do próprio jogo.

## Dificuldade
A curva segue o princípio de ensinar uma coisa por vez (*Design for How People Learn*, Julie Dirksen):
- **Queda:** 3,0 s → 1,6 s · **Intervalo:** 1,6 s → 0,7 s · **Bolas:** 0% → 50% (curvas exponenciais com teto)
- Na Chuva de Ovos, os corações perdidos caem espalhados pela chuva toda e pela tela inteira
- **Queda:** valores acima × 0,9 desde a versão da fazenda (ver abaixo)
- O 1º objeto é ovo e **o 2º já é a primeira bola do fazendeiro** (cai sozinha, 30% mais devagar, com o aviso DESVIE!); no máximo 3 bolas seguidas; objetos na tela limitados por faixa (1 → 4)
- **Primeira vez (nunca comeu um ovo):** o ovo que cai mostra **SEGURE A BOCA!**, o botão da boca fica pulando e o fazendeiro espera o 1º ovo comido para jogar a 1ª bola (no máximo 3 ovos). Fica salvo no aparelho; quem já tinha recorde não vê
- **Ovos = ovos comidos fora da Chuva de Ovos.** A curva, as medalhas e as galinhas do poleiro (nível) andam só por eles (a chuva conta só pontos, ver A fazenda)
- **Bola:** bola **vermelha** com a costura branca, igual em todas as fases. Quem joga é sempre o fazendeiro: ver A fazenda
- **Bola no chão:** fica quicando no mesmo lugar (sem correr para o lado) e pisca e some em ~1 s, estilo Mario (sem travar a raposa)
- **Engolir a bola:** se a raposa abre a boca e a bola cai nela, ela engole: fica tonta igual à pancada, mas não sobra bola no chão
- Só a **primeira bola da partida** é apresentada (DESVIE!). As apresentações aos 10, 30 e 50 ovos saíram: eram do tempo do disfarce e só quebravam o ritmo

## O jogo (modo BOLA)
O BOLA é o único modo desde 04/11/2026: o NORMAL e o CONSTANTE saíram do jogo e do código. A tela inicial mostra só o logo, o play e o recorde.
- **Vida:** 5 corações. A **bolinha de tênis** do fazendeiro tira um (pancada ou engolida) e a **fome** também: com a barriga vazia a raposa fica fraca (60% da velocidade), perde 1 coração depois de 6 s e mais 1 a cada 4 s até comer. A fome pode matar.
- **Barriga:** guarda 3 ovos, começa com 2 e esvazia sempre (0,14 / 0,16 / 0,18 ovo/s). Aparece em cima da raposa quando chega na metade. Ovo comido, da chuva, dourado e podre alimentam (o podre enjoa 1 s).
- **Ovo perdido** não tira vida: vira poça escorregadia, que some depois de 5 passadas completas da raposa.
- **A Chuva de Ovos não limpa o chão** (desde 04/11/2026): as poças ficam e os ovos da chuva no ar continuam caindo e viram poças coloridas, que somem com 3 passadas. Limpar não dá nada; só tira o escorregão. Ovo que cai em cima de uma poça não empilha outra. `?chao=0` volta a chuva que limpa.
- **Grito (rugido):** só comendo, 10 ovos no nível 1, +2 por nível. Chama a Chuva de Ovos, onde caem os corações perdidos (a chuva não limpa mais o chão); depois o fazendeiro fica bravo por 5 s.
- **Fazendeiro:** tem medo (gota de suor); ameaça desde o começo (pelo menos 35% de bolas).
- **Curva:** anda por ovos comidos + perdidos. Recorde em `eggsplash-pts-b`. Telemetria em `?stats=1`. `?bola=vinganca` troca a fome pela bola da vingança (teste). Bot em `tools/bot/`.

As seções abaixo contam a história do jogo (curva, fazenda, rugido etc.); o que fala de cascas ou de ovo perdido tirando vida era do NORMAL.

## Aprender e continuar jogando (v2)
- **Uma novidade por vez:** entre uma regra nova e a próxima passam pelo menos **20 s**. Isso vale para a 1ª bola, o 1º pintinho/galinha, o 1º rugido, o 1º ovo podre e o 1º dourado. Se a próxima já pode chegar (pela pontuação), ela espera o intervalo; o botão do rugido fica quase cheio até lá
- **Galinha que bloqueia:** na primeira vez da partida aparece o aviso **EMPURRE!** em cima dela
- **Combo vale pontos:** com **10 ovos seguidos** cada ovo vale **x2**; com **20**, **x3** (aviso COMBO X2!/X3! e "X2" ao lado dos pontos). Ovo quebrado, ovo podre comido ou bola na raposa zeram o combo. **A Chuva de Ovos não mexe no combo:** quem ruge com x2 ou x3 ganha esse multiplicador nos ovos da chuva. A curva de dificuldade continua andando pelos **ovos**, não pelos pontos
- **Depois dos 100 ovos** a curva fica no piso e não entra regra nova: o jogo passa a ser de **resistência e atenção** (as bolas em dupla e a ventania foram retiradas)
- **Recorde em pontos:** o fim de jogo mostra PONTOS, ovos (+ os da chuva, à parte) e o maior combo. As medalhas continuam por ovos fora da chuva (10/25/50/100)

## A fazenda (por que as coisas acontecem)
- **Galinhas no poleiro** no topo da tela: cada ovo (e ovo podre) sai de uma galinha. A mais perto anda até o ponto, levanta e bota
- **O fazendeiro** joga as bolas para espantar a raposa. A bola é **vermelha** com costura branca. A tela inicial avisa: "FAZENDEIRO JOGA EM VOCÊ!". Ele anda com a bola erguida e joga lá de cima, uma por vez, o jogo todo. Começa a jogar logo no início e **nunca fica mais de 6 s sem jogar** (fora da Chuva de Ovos)
- **Mira:** o fazendeiro mira onde a raposa está quando pega a bola. No começo 1 em cada 3 bolas, com erro de ±30 px; vai até 2 em cada 3, com ±8 px. Mirada ou não, a bola nunca cai em cima de um ovo
- O tempo de queda conta a partir do momento em que o objeto é solto. Como a galinha e o fazendeiro avisam antes, a queda é **10% mais curta** que a da curva original (3,0 s → 2,7 s; piso 1,6 s → 1,44 s)
- **Cada galinha no poleiro é um nível:** o poleiro começa com **1 galinha (nível 1)** e vai até 7 (nível 2 aos 5 ovos, 3 aos 15, 4 aos 30, 5 aos 50, 6 aos 75, 7 aos 100). Quando a pontuação pede um nível novo, um ovo **choca**: o pintinho vira uma galinha que bloqueia e, quando a raposa encosta nela (ou ruge), ela voa para o poleiro e aparece **NÍVEL N**. Cada galinha permite mais um objeto caindo ao mesmo tempo (até o limite da curva)
- **Chuva de Ovos = rugido da raposa (7 s):** só acontece quando a raposa ruge (ver Rugido). As galinhas saem do poleiro voando doidas pela tela e os ovos coloridos caem de onde elas estiverem; o fazendeiro corre assustado de um lado para o outro e não joga bola. No fim, as galinhas voltam para o lugar delas no poleiro
- **A chuva conta só pontos:** cada ovo da chuva vale 1 ponto × o multiplicador do combo de quem entrou nela. Não conta como ovo (não acelera a curva nem conta para medalhas, galinhas do poleiro) e não mexe no combo. Na pirâmide, os ovos da chuva continuam aparecendo (coloridos)
- **Ovo dourado:** a galinha que vai botá-lo fica dourada
- **Erros:** os 5 ovos no topo. Cada ovo que quebra no chão esborracha um. Pegar um coração na Chuva de Ovos conserta um
- **Fim de jogo:** com os 5 esborrachados, **o fazendeiro acorda** e a raposa foge pela esquerda. A tela fica **1,5 s** parada e depois **tocar no jogo** começa outra partida; setas, boca e rugido não reiniciam (para ninguém pular a medalha, o recorde e a pirâmide apertando os botões no susto)
- **Telemetria local:** cada partida fica salva no aparelho (ovos, ovos da chuva, pontos, maior combo, se foi em 2X e causa de cada ovo perdido: ovo ou podre, fase, se a raposa estava tonta/parada, bolas que acertaram). Abra com **`?stats=1`** para ver o resumo na tela inicial (só partidas em que a chuva conta só pontos e sem 2X)

## Veterano (quem já jogou)
- Cada novidade (1ª bola, galinha do poleiro, rugido, ovo podre, dourado) fica salva no aparelho quando o jogador a vê pela primeira vez. **Nas partidas seguintes, o que ele já viu não espera os 20 s entre novidades**
- **Quem já levou uma galinha ao poleiro pula a espera do nível 1:** o 1º ovo já choca, o pintinho vira galinha em 1,5 s e a galinha **sobe sozinha** para o poleiro depois de 2,5 s (sem EMPURRE!; encostar nela continua valendo). Antes dos 5 ovos caem até 2 objetos juntos (no novato, 1). O nível 2 chega em ~8–10 s (antes ~45 s)
- A queda, o intervalo e as bolas continuam na curva de sempre: só sai a espera
- Telemetria: a partida grava `vet: 1` e `l2` (segundos até o nível 2)

## Menu
O botão de pausa abre o **MENU** (na partida, pausa o jogo):
- **CONTINUAR** (ou FECHAR fora da partida)
- **JOGO NOVO**: começa outra partida na hora (no meio de uma, desiste dela)
- **RESETAR RECORDE**: zera o recorde dos dois modos
- **JOGAR COMO 1ª VEZ**: zera o recorde, o SEGURE A BOCA! e as novidades já vistas, e volta para a tela inicial, para testar o jogo completo como um jogador novo
- Os dois resets pedem um 2º toque para confirmar. A telemetria e os ajustes não são apagados

## Rugido
A Chuva de Ovos não vem mais pelo relógio: é a raposa que chama, com o botão do rugido (entre as setas e a boca; em paisagem, em cima da boca).
- O botão é pixel art, da mesma família das setas e da boca, **sem texto**: um **trovão**. Começa bloqueado (cinza) e enche de **amarelo** de baixo para cima. Libera com **20 ovos comidos** desde a última chuva (o dourado vale 5, o ovo que choca vale 1) **ou com 45 s**, o que vier primeiro. O piso de tempo garante o respiro para quem está indo mal
- Cheio, o botão fica **vermelho** piscando (fácil de ver); ao tocar, afunda como os outros (o medidor fica só no botão; o HUD mostra apenas vidas e pontos). Na primeira vez da partida, a tela mostra **HORA DE RUGIR! APERTE O BOTÃO VERMELHO**
- Não acumula: cheio, para de encher até a raposa rugir. Os ovos da própria chuva não enchem
- **RAAAR!** a raposa agacha, pula esticando e treme de força, saem ondas da boca e a tela inteira **treme como num terremoto** (com poeira do chão e ronco grave). Depois começa a Chuva de Ovos, com ovos só coloridos (sem enfeite). Dá para rugir até tonta. As bolas e os ovos podres somem, como antes. A galinha que estava bloqueando se assusta e voa para o poleiro; o pintinho dá um pulo para longe
- Telemetria: cada rugido guarda os pontos, se a raposa estava tonta/parada e quanto tempo o botão ficou cheio antes do toque. O `?stats=1` mostra o total e a espera mediana

## Pintinho e galinha
É o **nível novo chegando** (não vem mais do combo):
- Quando a pontuação pede mais uma galinha no poleiro, o próximo ovo é especial
- Esse ovo desce **balançando** (cada vez mais rápido) e vai rachando, avisando que vai chocar
- Quando esse ovo chega perto do chão, ele **choca** no ar, **com ou sem a raposa por perto** (não precisa abrir a boca): conta como pego (+1) e sai um **pintinho** que fica pulando pelo chão (não atrapalha) e sempre foge da raposa quando ela chega perto — encurralado na parede, pula por cima dela
- Depois de ~8 s o pintinho vira **galinha**, que anda até ficar colada do lado da raposa e bloqueia a passagem
- Se a raposa bater na galinha, **para** por ~0,4 s e a galinha **voa para o poleiro**: o nível sobe. Se ninguém encostar, ela vai embora sozinha depois de ~12 s (e não vai para o poleiro); ~6 s depois choca outra

## Ovo podre
Um ovo verde com manchas e **fedor subindo** (fiozinhos verdes ondulando; o splash verde no chão também fede). **Não coma!**
- Quando a raposa passa perto do fedor, fica **enjoada**: olhinhos em X e bochecha verde. É só visual, não muda nada no jogo
- Aparece a partir de **15 pontos** (5% dos ovos, subindo até 12%). O primeiro cai sozinho, 30% mais devagar e com o aviso NÃO COMA!
- **Se comer:** a raposa vomita e fica parada ~0,7 s. Não perde vida nem ganha ponto, mas o combo zera
- **Se cair no chão:** não tira vida, mas faz um **splash verde** que gruda: em cima dele a raposa anda **mais devagar** (menos da metade da velocidade, soltando gosma verde) em vez de escorregar. Fica lá até a Chuva de Ovos. Gigante não fica lenta
- Nunca cai em cima de um ovo
- Não aparece na Chuva de Ovos, e o fim da chuva limpa os splashes

## Ovo dourado
Um ovo de ouro que brilha. **Coma!**
- Aparece a partir de **20 pontos**, em 2% dos ovos (nunca enquanto a raposa já está gigante)
- **Vale +5** e deixa a raposa **2x maior e invencível por 5 s** (barrinha dourada embaixo dos corações)
- Gigante: a boca e o corpo ficam do dobro do tamanho; bolas que encostam saem voando sem tontura; o ovo podre se desfaz sem vômito nem cheiro; a galinha sai voando sem parar a raposa
- Ovos normais que caem no chão continuam tirando vida
- No último 1,5 s a raposa pisca entre os dois tamanhos, avisando que vai acabar
- Se o dourado cair no chão, não tira vida
- Na pirâmide de ovos, ele aparece dourado

## Pirâmide de ovos
No fim de jogo, o botão **PIRÂMIDE** (ou a tecla V) mostra todos os ovos que a raposa comeu empilhados numa pirâmide isométrica, com a raposa no topo:
- A quantidade de ovos na imagem é **exatamente** a que a raposa comeu (ovos da Chuva de Ovos aparecem coloridos)
- Pilha "bala de canhão": camadas quadradas completas embaixo e o que sobra centralizado no topo
- Ovos que chocaram viram pintinhos ao lado da pirâmide (contam nos pontos, mas não foram comidos)
- **SALVAR** abre o compartilhar do iPhone (Salvar Imagem, Mensagens etc.); no computador, baixa um PNG de ~1080 px. Segurar a imagem também salva

## Visual
- Ovo branquinho, sem pintas, com um brilho no alto (a bola é vermelha)
- Depois de comer um ovo, a raposa fica **gordinha** por 1 s (a barriga incha e desincha)
- O nome **CHUVA DE OVOS!** aparece só no começo da chuva (~1,7 s) e some
- **Microanimações** (só visual): a raposa respira (ofega depois de correr, com a língua para fora), pisca, abana o rabo, levanta as orelhas quando o fazendeiro ergue a bola, ronca de fome, fica de cabeça baixa quando fraca, abre os braços escorregando, lambe o focinho depois de comer e achata soltando poeira ao virar ou frear. O fazendeiro treme de medo, a gota de suor escorre e cai, os olhos seguem a raposa e ele respira fundo antes de jogar. As galinhas bicam, se arrumam, piscam e soltam uma peninha ao botar. Ovos balançam caindo, a gema da poça treme com a raposa em cima, cai feno do palheiro, as luminárias balançam com poeira brilhando na luz, o último coração bate e os pontos dão um pop. `?anim=0` desliga tudo para comparar

## Controles
- ◀ ▶ andar (dá para **deslizar o dedo** de uma seta para a outra sem levantar) · botão redondo (segurar) abrir a boca · botão do trovão quando estiver **vermelho**
- **Som:** o botão de som no topo. Com o som do jogo **desligado**, a música de outro app (Spotify, Apple Music) continua tocando; com ele ligado, o jogo toca mesmo com a chave de silencioso
- Teclado: setas / A D, ↑ ou espaço para a boca, R rugir, P pausa, Esc menu, M som, Enter jogar de novo (X = 2X, só no modo de teste)

## Ajustes de teste
Menu para testar a jogabilidade e comparar versões. Só aparece no **modo de teste**; fora dele o jogo usa sempre o padrão.
- **Ligar:** abrir com `?debug=1` (fica salvo no aparelho; `?debug=0` desliga) ou, pelo ícone da Tela de Início, abrir o MENU (botão de pausa) e **tocar 5 vezes no título MENU** (o mesmo gesto desliga). Aparecem o botão de ajustes e o **1X/2X** (fora do modo de teste o jogo roda sempre em 1X) e a tela inicial mostra o ajuste em uso
- **Os valores só mudam entre partidas.** Abrir o menu no meio pausa o jogo, e o que mudar vale na próxima (controles constantes durante a partida)
- **Controle:** tipo (setas, **arrastar** = o dedo em qualquer lugar da tela move a raposa como um trackpad, **lados** = segurar a metade esquerda/direita da tela), boca (segurar ou alternar), velocidade, velocidade de boca aberta, aceleração, frenagem, boca mais generosa (px a mais na área de pegar) e tamanho dos botões
- **Punições:** tontura da bola, parada na galinha, vômito do ovo podre, velocidade no splash verde
- **Curva:** queda (× a curva, padrão 0,9), teto de bolas, máximo sem bola, bolas miradas e erro da mira
- **Ritmo:** rugido (ovos e tempo), intervalo entre novidades, combo x2/x3
- **Presets:** ATUAL, ÁGIL, PESADA, SUAVE. A regra de alcance acompanha a velocidade da raposa (raposa mais lenta = ovos sorteados mais perto)
- **Comparar:** cada partida guarda na telemetria o que estava diferente do padrão (`cfg`). O fim do menu mostra uma tabela por ajuste: partidas, mediana de ovos e pontos, % acima de 50, bolas na raposa por partida e % dos ovos perdidos com a raposa tonta/parada. Partidas em 2X aparecem separadas (2X) e as de antes da chuva só contar pontos aparecem como (ANTES)
