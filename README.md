# Egg Splash

Jogo 8-bit para iPhone: a raposa come os ovos e desvia das bolas.

## Instalar no iPhone
1. Abra o link do site no **Safari**.
2. Toque em **Compartilhar → Adicionar à Tela de Início**.
3. Abra pelo ícone. Depois da primeira abertura, o jogo funciona sem internet.

## Dificuldade
A curva segue o princípio de ensinar uma coisa por vez (*Design for How People Learn*, Julie Dirksen):
- **Queda:** 3,0 s → 1,6 s · **Intervalo:** 1,6 s → 0,7 s · **Bolas:** 0% → 50% (curvas exponenciais com teto)
- Na Chuva de Ovos, os corações perdidos caem espalhados pela chuva toda e pela tela inteira
- **Queda:** valores acima × 0,9 desde a versão da fazenda (ver abaixo)
- O 1º objeto é ovo e **o 2º já é a primeira bola do fazendeiro** (cai sozinha, 30% mais devagar, com o aviso DESVIE!); no máximo 3 bolas seguidas; objetos na tela limitados por faixa (1 → 4)
- **Bola:** bola **vermelha** com a costura branca, igual em todas as fases. Quem joga é sempre o fazendeiro: ver A fazenda
- **Bola no chão:** fica quicando no mesmo lugar (sem correr para o lado) e pisca e some em ~1 s, estilo Mario (sem travar a raposa)
- **Engolir a bola:** se a raposa abre a boca e a bola cai nela, ela engole: fica tonta igual à pancada, mas não sobra bola no chão
- A primeira bola de cada fase cai sozinha e 30% mais devagar

## A fazenda (por que as coisas acontecem)
- **Galinhas no poleiro** no topo da tela: cada ovo (e ovo podre) sai de uma galinha. A mais perto anda até o ponto, levanta e bota
- **O fazendeiro** joga as bolas para espantar a raposa. A bola é **vermelha** com costura branca. A tela inicial avisa: "FAZENDEIRO JOGA EM VOCÊ!". Ele anda com a bola erguida e joga lá de cima, uma por vez, o jogo todo. Começa a jogar logo no início e **nunca fica mais de 6 s sem jogar** (fora da Chuva de Ovos)
- **Mira:** o fazendeiro mira onde a raposa está quando pega a bola. No começo 1 em cada 3 bolas, com erro de ±30 px; vai até 2 em cada 3, com ±8 px. Mirada ou não, a bola nunca cai em cima de um ovo
- O tempo de queda conta a partir do momento em que o objeto é solto. Como a galinha e o fazendeiro avisam antes, a queda é **10% mais curta** que a da curva original (3,0 s → 2,7 s; piso 1,6 s → 1,44 s)
- **Mais galinhas com a dificuldade:** o poleiro começa com 2 galinhas e vai até 7 (3 aos 5 pts, 4 aos 15, 5 aos 30, 6 aos 50, 7 aos 100). Se faltam galinhas, o próximo ovo choca sem precisar de combo; o pintinho cresce em metade do tempo e vira uma galinha que bloqueia, como a do combo. Ela **só vai para o poleiro quando a raposa encosta nela**. Cada galinha a mais permite mais um objeto caindo ao mesmo tempo (até o limite da curva)
- **Chuva de Ovos = rugido da raposa (7 s):** só acontece quando a raposa ruge (ver Rugido). As galinhas saem do poleiro voando doidas pela tela e os ovos coloridos caem de onde elas estiverem; o fazendeiro corre assustado de um lado para o outro e não joga bola. No fim, as galinhas voltam para o lugar delas no poleiro
- **Ovo dourado:** a galinha que vai botá-lo fica dourada
- **Erros:** os 5 ovos no topo. Cada ovo que quebra no chão esborracha um. Pegar um coração na Chuva de Ovos conserta um
- **Fim de jogo:** com os 5 esborrachados, **o fazendeiro acorda** e a raposa foge pela esquerda
- **Telemetria local:** cada partida fica salva no aparelho (pontos e causa de cada ovo perdido: ovo ou podre, fase, se a raposa estava tonta/parada, bolas que acertaram). Abra com **`?stats=1`** para ver o resumo na tela inicial

## Rugido
A Chuva de Ovos não vem mais pelo relógio: é a raposa que chama, com o botão **RUGIR** (entre as setas e a boca; em paisagem, em cima da boca).
- O botão é pixel art, da mesma família das setas e da boca: tem o rostinho da raposa e a palavra RUGIR. Começa bloqueado (cinza) e enche de dourado de baixo para cima. Libera com **20 ovos comidos** desde a última chuva (o dourado vale 5, o ovo que choca vale 1) **ou com 45 s**, o que vier primeiro. O piso de tempo garante o respiro para quem está indo mal
- Cheio, o botão fica amarelo piscando, a raposa do botão abre a boca e saem ondinhas do rugido; ao tocar, o botão afunda como os outros (o medidor fica só no botão; o HUD mostra apenas vidas e pontos). Na primeira vez da partida, a tela mostra **APERTE RUGIR!**
- Não acumula: cheio, para de encher até a raposa rugir. Os ovos da própria chuva não enchem
- **RAAAR!** a raposa abre a boca, saem ondas e começa a Chuva de Ovos. Dá para rugir até tonta. As bolas e os ovos podres somem, como antes. A galinha que estava bloqueando se assusta e voa para o poleiro; o pintinho dá um pulo para longe
- Telemetria: cada rugido guarda os pontos, se a raposa estava tonta/parada e quanto tempo o botão ficou cheio antes do toque. O `?stats=1` mostra o total e a espera mediana

## Pintinho e galinha
Recompensa para quem está indo muito bem:
- Com **8 ovos seguidos** sem quebrar nenhum, cada ovo novo tem 30% de chance de ser especial (um por vez)
- Esse ovo desce **balançando** (cada vez mais rápido) e vai rachando, avisando que vai chocar
- Quando esse ovo chega perto do chão, ele **choca** no ar, **com ou sem a raposa por perto** (não precisa abrir a boca): conta como pego (+1) e sai um **pintinho** que fica pulando pelo chão (não atrapalha) e sempre foge da raposa quando ela chega perto — encurralado na parede, pula por cima dela
- Depois de ~8 s o pintinho vira **galinha**, que anda até ficar colada do lado da raposa e bloqueia a passagem
- Se a raposa bater na galinha, **para** por ~0,4 s e a galinha **voa para o poleiro** (se tiver lugar). Se ninguém encostar, ela vai embora sozinha depois de ~12 s (e não vai para o poleiro)
- Depois que a galinha vai embora, há 20 s de intervalo até o próximo pintinho

## Ovo podre
Um ovo verde com manchas e cheirinho subindo. **Não coma!**
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

## Controles
- ◀ ▶ andar · botão redondo (segurar) abrir a boca · **RUGIR** quando estiver cheio
- Teclado: setas / A D, ↑ ou espaço para a boca, R rugir, P pausa, M som
