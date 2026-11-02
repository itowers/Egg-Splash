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
- Os 3 primeiros objetos são sempre ovos; no máximo 3 bolas seguidas; objetos na tela limitados por faixa (1 → 4)
- **Disfarce da bola:** vermelha (0–9) → cor do ovo com listra vermelha (10–29) → listra sutil (30–49) → sem listra, só a forma (50+)
- A primeira bola de cada fase cai sozinha e 30% mais devagar

## A fazenda (por que as coisas acontecem)
- **Galinhas no poleiro** no topo da tela: cada ovo (e ovo podre) sai de uma galinha. A mais perto anda até o ponto, levanta e bota
- **O fazendeiro** joga as bolas para espantar a raposa. Na fase da bola vermelha ele anda com a bola erguida e joga lá de cima (uma por vez). Quando as bolas passam a ser **pintadas** (disfarce), ele se esconde atrás da tábua (só aparecem o chapéu e os olhos) e põe as bolas nos ninhos: elas saem da galinha **igual a um ovo**, sem pista. A lata de tinta do lado dele mostra a cor do disfarce da fase. Na variante B as bolas são sempre vermelhas e jogadas por ele
- **Mira:** o fazendeiro mira onde a raposa está quando pega a bola. No começo 1 em cada 3 bolas, com erro de ±30 px; vai até 2 em cada 3, com ±8 px. Mirada ou não, a bola nunca cai em cima de um ovo
- O tempo de queda conta a partir do momento em que o objeto é solto. Como a galinha e o fazendeiro avisam antes, a queda é **10% mais curta** que a da curva original (3,0 s → 2,7 s; piso 1,6 s → 1,44 s)
- **Mais galinhas com a dificuldade:** o poleiro começa com 2 galinhas e vai até 7 (3 aos 5 pts, 4 aos 15, 5 aos 30, 6 aos 50, 7 aos 100). Se faltam galinhas, o próximo ovo choca sem precisar de combo; o pintinho cresce em metade do tempo e a galinha **voa direto para o poleiro, sem bloquear**. O bloqueio fica só para o pintinho do combo de 8. Cada galinha a mais permite mais um objeto caindo ao mesmo tempo (até o limite da curva)
- **Chuva de Ovos = festa das galinhas (7 s):** o fazendeiro cochila (Zzz), desce um globo de festa, a tela pisca em cores de balada (fraco, 3 trocas por segundo) e as galinhas dançam pelo poleiro botando os ovos coloridos
- **Ovo dourado:** a galinha que vai botá-lo fica dourada
- **Pontos** = ovos levados para a **toca** (canto esquerdo; a pilha cresce a cada 10 ovos, até 10)
- **Erros:** os 5 ovos no topo. Cada ovo que quebra no chão esborracha um (verde se foi um ovo podre comido, na variante B). Pegar um coração na festa conserta um
- **Fim de jogo:** com os 5 esborrachados, **o fazendeiro acorda** e a raposa foge para a toca
- **Telemetria local:** cada partida fica salva no aparelho (pontos e causa de cada ovo perdido: ovo ou podre, fase, se a raposa estava tonta/parada, bolas que acertaram). Abra com **`?stats=1`** para ver o resumo na tela inicial

## Pintinho e galinha
Recompensa para quem está indo muito bem:
- Com **8 ovos seguidos** sem quebrar nenhum, cada ovo novo tem 30% de chance de ser especial (um por vez)
- Quando esse ovo chega perto da raposa, ele **choca** no ar: conta como pego (+1) e sai um **pintinho** que fica pulando pelo chão (não atrapalha) e sempre foge da raposa quando ela chega perto — encurralado na parede, pula por cima dela
- Depois de ~8 s o pintinho vira **galinha**, que anda até ficar colada do lado da raposa e bloqueia a passagem
- Se a raposa bater na galinha, **para** por ~0,4 s e a galinha **sai voando** da tela. Se ninguém encostar, ela voa sozinha depois de ~12 s
- Depois que a galinha vai embora, há 20 s de intervalo até o próximo pintinho

## Ovo podre
Um ovo verde com manchas e cheirinho subindo. **Não coma!**
- Aparece a partir de **15 pontos** (5% dos ovos, subindo até 12%). O primeiro cai sozinho, 30% mais devagar e com o aviso NÃO COMA!
- **Se comer:** a raposa vomita e fica parada ~0,7 s. Não perde vida nem ganha ponto, mas o combo zera
- **Se cair no chão:** não tira vida, mas deixa uma nuvem de **cheiro ruim** por ~6 s. Passando por ela, a raposa anda devagar (~55% da velocidade)
- Nunca cai em cima de um ovo; enquanto há cheiro no chão, os ovos caem mais perto do anterior para continuar alcançáveis
- Não aparece na Chuva de Ovos, e o fim da chuva limpa o cheiro

## Variante B: ovo podre no lugar da bola (teste)
Abra o jogo com **`?variante=b`** no fim do link (fica salvo; `?variante=a` volta ao normal). A tela inicial mostra VARIANTE B.
- O **ovo podre vira o obstáculo principal**, com a mesma curva da bola (0% → 50%) e as mesmas regras de sequência e de apresentação de fase
- **Disfarce por cor:** verde-oliva (0–9) → cor de ovo com manchas (10–29) → 2 manchinhas (30–49) → só cor de ovo, com tremidinha (50+). Os **fiozinhos de cheiro nunca somem**
- **Encostar no corpo:** a raposa fica 1 s parada vomitando (mesmo peso da bola)
- **Comer:** perde 1 vida, vomita e o combo zera
- **Cheiro no chão:** só 1 de cada 5 que caem, por 2 s, um de cada vez
- **A bola volta a partir de 50 pts** como novidade (vermelha, sem disfarce), até 30% dos objetos ruins

## Ovo dourado
Um ovo de ouro que brilha. **Coma!**
- Aparece a partir de **20 pontos**, em 2% dos ovos (nunca enquanto a raposa já está gigante)
- **Vale +5** e deixa a raposa **2x maior e invencível por 5 s** (barrinha dourada embaixo dos corações)
- Gigante: a boca e o corpo ficam do dobro do tamanho; bolas que encostam saem voando sem tontura; o ovo podre se desfaz sem vômito nem cheiro; o cheiro no chão não deixa lenta; a galinha sai voando sem parar a raposa
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

## Controles
- ◀ ▶ andar · botão redondo (segurar) abrir a boca
- Teclado: setas / A D, ↑ ou espaço para a boca, P pausa, M som
