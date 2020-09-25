//Função chamada pelo botão SOBRE
function about() {
  menuDiv.style('display', 'none');
  pause_game = true;
  show_modal = true;
  //Agrupadores
  let container = createDiv().addClass('container center-text');
  let span = spanModel('', 'spanAbout color-floor');
  //Paragrafo
  p = createP();
  p.child(spanModel('Um dos efeitos colaterais do isolamento social é o aumento do uso de plataformas e ferramentas digitais que impactam diretamente na quantidade de dados gerados e consumidos diariamente. Ao mesmo tempo, faltam dados e informações confiáveis, capazes de auxiliar a tomada de decisão e o combate/contenção da disseminação do novo coronavírus. Nesse contexto se faz importante refletir sobre qual o papel e o impacto desses dados na nossa percepção, afeto e decisões. De um ponto de vista metafórico, podemos compreender esse processo de tomada de decisão como um percurso em um labirinto escuro que não conhecemos, com um campo de visão limitado pelas informações que temos.', 'readable color-floor'));
  container.child(p);
  //Paragrafo
  p = createP();
  p.child(spanModel('Além disso, as janelas virtuais e reais talvez nunca tenham ocupado um lugar tão destacado quanto ocupam hoje. O uso das plataformas e ferramentas digitais é realizado através das interfaces gráficas que utilizam a metáfora das janelas (windows). Todos os jogos, sites, redes sociais, aplicativos de videoconferência se dão através da utilização destas janelas virtuais, que permitem que sejam criados e mantidos os laços afetivos de maneira remota. Por outro lado, as janelas reais tornaram-se também um espaço de convivência, manifestação e afeto passando a ocupar um espaço antes reservado às ruas.', 'readable color-floor'));
  container.child(p);
  //Paragrafo
  p = createP();
  p.child(spanModel('As relações físicas que envolvem contato interpessoal também ocupam um lugar importante no imaginário da pandemia pois determinam a taxa de disseminação do vírus. Esse contato entre diferentes agentes faz emergir, no sentido coletivo, uma nova composição social que pode, de certa forma, ser comparada ao ', 'readable color-floor'));
  p.child(urlModel('https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life', 'Game of Life','readable'));
  p.child(spanModel(', ou Jogo da Vida. Este jogo, criado pelo matemático John Conway, se baseia em regras simples para determinar se uma célula (indivíduo) que compõe uma espécie de tecido social deve morrer, permanecer viva ou nascer baseada na relação com seus vizinhos.', 'readable color-floor'));
  container.child(p);
  //Paragrafo
  p = createP();
  p.child(spanModel('Maze of Life é um gamearte que se debruça sobre estas questões, propondo ao jogador que encontre a saída em um labirinto gerado através da evolução de autômatos celulares baseados no Game of Life, uma ', 'readable color-floor'));
  p.child(urlModel('https://www.nytimes.com/2020/04/15/technology/john-horton-conway-dead-coronavirus.html', 'homenagem póstuma ao Conway','readable'));
  p.child(spanModel('. Durante o percurso o interator possui um campo de visão limitado, proporcional ao grau de transparência e a quantidade de dados disponíveis sobre os casos do coronavírus na região do jogador. Durante a sua caminhada o jogador pode encontrar outros agentes inteligentes que se deslocam no labirinto e são oriundos dos dados georreferenciados em tempo real do Twitter. Do ponto de vista sonoro, a trilha do jogo foi composta utilizando sons baseados na vida cotidiana pré-isolamento social e é processada de maneira dinâmica através do comportamento do jogador.', 'readable color-floor'));
  container.child(p);
  //Paragrafo
  p = createP();
  p.child(spanModel('Por fim, caberá ao jogador trilhar seu próprio caminho no labirinto e decidir se irá interagir com os outros agentes e, portanto, se expor à possibilidade de contaminar e ser contaminado com o vírus. Então, vamos jogar?', 'readable color-floor'));
  container.child(p);
    //ICON Logo
  div = createDiv('<a href="http://icon.ufba.br/"> <img class="logo" src="http://icon.ufba.br/img/logo-b.png" alt="ICON"> </a>');
  div.addClass('logoDiv');
  container.child(div);
  //Paragrafo
  p = createP();
  p.child(spanModel('O ', 'readable color-floor'));
  p.child(urlModel('http://icon.ufba.br/', 'ICON - Laboratório de Pesquisa, Desenvolvimento e Inovação em Interatividade, Computação e Novas Interfaces','readable'));
  p.child(spanModel(' - está localizado dentro do Instituto de Humanidades, Artes e Ciências Prof. Milton Santos (IHAC) na Universidade Federal da Bahia (UFBA) e tem como principal objetivo desenvolver pesquisas de relevância e impacto acadêmico, além de fomentar a inovação artística, científica e tecnológica nas áreas de arte computacional, criatividade computacional, inteligência artificial, interatividade, jogos e ambientes imersivos.', 'readable color-floor'));
  container.child(p);
  //Titulo
  p = createP();
  p.child(spanModel('EQUIPE', 'font-sub-title color-bot'));
  container.child(p);
  //Item
  p = createP();
  p.child(spanModel('Coordenação: ', 'readable color-player'));
  p.child(spanModel('Francisco Barretto.', 'readable color-floor'));
  container.child(p);
  //Item
  p = createP();
  p.child(spanModel('Desenvolvimento: ', 'readable color-player'));
  p.child(spanModel('Ramon Freire, Victor Calazans.', 'readable color-floor'));
  container.child(p);
  //Item
  p = createP();
  p.child(spanModel('Game Design: ', 'readable color-player'));
  p.child(spanModel('Fellipe Narde.', 'readable color-floor'));
  container.child(p);
  //Item
  p = createP();
  p.child(spanModel('Trilha Sonora: ', 'readable color-player'));
  p.child(spanModel('André Bahiense, Fellipe Narde.', 'readable color-floor'));
  container.child(p);

  //Cria o modal
  span.child(container);
  createModal('SOBRE', 'spanAbout', 'modalDiv', false, true, true);
  let buttom = select('.modalChild');
  buttom.addClass('screenButton');
}
//Função chamada pelo botão INSTRUÇÕES
function help() {
  menuDiv.style('display', 'none');
  pause_game = true;
  show_modal = true;
  //
  let container = createDiv().addClass('container center-text');
  let span = spanModel('', 'spanHelp color-floor');
  //
  //Computador
  let p = createP();
  p.child(spanModel('COMPUTADOR', 'color-bot font-sub-title'));
  container.child(p);
  //Elementos
  //Texto
  let divR = createDiv().addClass('textGroup left-text');
  let line = spanModel('- ', 'color-floor');
  line.child(spanModel('W', 'color-player'));
  line.child(spanModel(',', 'color-floor'));
  line.child(spanModel(' A', 'color-player'));
  line.child(spanModel(',', 'color-floor'));
  line.child(spanModel(' S', 'color-player'));
  line.child(spanModel(' e ', 'color-floor'));
  line.child(spanModel('D', 'color-player'));
  line.child(spanModel(' : CONTROLAM O PERSONAGEM', 'color-floor'));
  divR.child(line);
  let div = createDiv().addClass('key-line');
  div.child(divR);
  container.child(div);
  //2
  divR = createDiv().addClass('textGroup left-text');
  line = spanModel('- ', 'color-floor');
  line.child(spanModel('P', 'color-player'));
  line.child(spanModel(' OU ', 'color-floor'));
  line.child(spanModel('ESC', 'color-player'));
  line.child(spanModel(' : PAUSA O JOGO', 'color-floor'));
  divR.child(line);
  //Fecha Sessão
  div = createDiv().addClass('key-line');
  div.child(divR);
  container.child(div);
  //3
  divR = createDiv().addClass('textGroup left-text');
  line = spanModel('- ', 'color-floor');
  line.child(spanModel('R', 'color-player'));
  line.child(spanModel(' : REINICIAR O JOGO', 'color-floor'));
  divR.child(line);
  //Fecha Sessão
  div = createDiv().addClass('key-line');
  div.child(divR);
  container.child(div);
  //4
  divR = createDiv().addClass('textGroup left-text');
  line = spanModel('- ', 'color-floor');
  line.child(spanModel('Q', 'color-player'));
  line.child(spanModel(' : SAIR PARA O MENU', 'color-floor'));
  divR.child(line);
  //Fecha Sessão
  div = createDiv().addClass('key-line');
  div.child(divR);
  container.child(div);
  //
  //Celular
  p = createP();
  p.child(spanModel('CELULAR', 'color-bot font-sub-title'));
  container.child(p);
  //1
  //Texto
  divR = createDiv().addClass('textGroup left-text');
  line = spanModel('', 'color-floor');
  line.child(spanModel('- TOQUE NOS ', 'color-floor'));
  line.child(spanModel('BOTÕES NA TELA ', 'color-player'));
  line.child(spanModel('PARA ', 'color-floor'));
  line.child(spanModel('CIMA ', 'color-player'));
  line.child(spanModel(', PARA ', 'color-floor'));
  line.child(spanModel('BAIXO ', 'color-player'));
  line.child(spanModel(', PARA ', 'color-floor'));
  line.child(spanModel('ESQUERDA ', 'color-player'));
  line.child(spanModel('E PARA ', 'color-floor'));
  line.child(spanModel('DIREITA ', 'color-player'));
  line.child(spanModel('PARA CONTROLAR ', 'color-floor'));
  divR.child(line);
  //Fecha Sessão
  div = createDiv().addClass('key-line');
  div.child(divR);
  container.child(div);
  //2
  divR = createDiv().addClass('textGroup left-text');
  line = spanModel('', 'color-floor');
  line.child(spanModel('- DEIXE A ', 'color-floor'));
  line.child(spanModel('TELA ', 'color-player'));
  line.child(spanModel('EM ', 'color-floor'));
  line.child(spanModel('PAISAGEM ', 'color-player'));
  line.child(spanModel('PARA UMA MELHOR EXPERIÊNCIA ', 'color-floor'));
  divR.child(line);
  //Fecha Sessão
  div = createDiv().addClass('key-line');
  div.child(divR);
  container.child(div);
  //3
  divR = createDiv().addClass('textGroup left-text');
  line = spanModel('', 'color-floor');
  line.child(spanModel(' - O BOTÃO DE ', 'color-floor'));
  line.child(spanModel('PAUSE ', 'color-player'));
  line.child(spanModel('ENCONTRA-SE NO CANTO SUPERIOR ESQUERDO DA ', 'color-floor'));
  line.child(spanModel('TELA ', 'color-player'));
  divR.child(line);
  //Fecha Sessão
  div = createDiv().addClass('key-line');
  div.child(divR);
  container.child(div);
  //Cria a Modal
  span.child(container);
  createModal('INSTRUÇÕES', 'spanHelp');
  //Modifica o layout do botão para essa tela específica com base na Classe do HTML do botão
  let buttom = select('.modalChild');
  buttom.addClass('screenButton');
}
//Função que chama o modal EndGame
function endGame(title) {
  createModal(title, 'gameoverText', 'gameModal', startGame, false, true);
  pause_game = true; //Pausar o jogo
}
//Função chamada pelo botão pause e tecla P/p
function pauseScreen(){
  pause_game = true;
  show_modal = true;
  if(controlDiv != null){
    controlDiv.style('display', 'none');
  }
  if(pauseBt != null){
    pauseBt.style('display', 'none');
  }
  textAlign(CENTER);
  //Div que recebe o menu todo
  pauseDiv = createDiv().addClass('pauseDiv center-text width-quarter');
  pauseDiv.child(spanModel('JOGO PAUSADO', 'font-sub-title color-player'));
  pauseDiv.child(buttonModel('CONTINUAR', closepauseDiv, 'buttonModel width-max float-left'));
  pauseDiv.child(buttonModel('INSTRUÇÕES', help, 'buttonModel width-max float-left'));
  pauseDiv.child(buttonModel('COMPARTILHAR', shareFacebook, 'buttonModel width-max float-left'));
  pauseDiv.child(buttonModel('MENU', backToMenu, 'buttonModel width-max float-left'));
}
//Função chamada pela tecla R/r
function reset(){
  //Crie um SPAN com a classe resetText para gerar um texto que depois será chamado pelo modal com base na classe.
  let span = spanModel('', 'resetText color-floor');
  span.child(spanModel('O ', 'color-floor'));
  span.child(spanModel('JOGO ', 'color-player'));
  span.child(spanModel('SERÁ ', 'color-floor'));
  span.child(spanModel('REINICIADO ', 'color-player'));
  span.child(spanModel('TEM CERTEZA', 'color-bot'));
  span.child(spanModel('?', 'color-floor'));
  createModal('REINICIO', 'resetText', 'gameModal', startGame);
}
//Função chamada pela tecla Q/q
function quit(){
  //Crie um SPAN com a classe modalText para gerar um texto que depois será chamado pelo modal com base na classe.
  let span = spanModel('', 'quitText color-floor');
  span.child(spanModel('TEM ', 'color-floor'));
  span.child(spanModel('CERTEZA ', 'color-player'));
  span.child(spanModel('QUE DESEJA ', 'color-floor'));
  span.child(spanModel('SAIR ', 'color-player'));
  span.child(spanModel('PARA O MENU ', 'color-floor'));
  span.child(spanModel('?', 'color-floor'));
  createModal('SAIR', 'quitText', 'gameModal', backToMenu);
}
