//Funções para
function startGame(location = userLocation){
  sounds.playSounds(); //Inicia os sons
  closeModal(); //Fecha qualquer tela aberta
  prepareGame((windowWidth*0.15), 50, 50, location); //Prepara a partida
  createControls(); //Verifica disponibilidade dos controles
}
//Prepara o jogo, executa as funções e define variávels que precisam ser definidas para o jogo funcionar
function prepareGame(view, rowSize, columnSize, location){
  rows = rowSize; //Define as linhas do board na variável global
  columns = columnSize; //Define as colunas do board na variável global
  birth = [2, 4]; //Define as regras da celula automata na variável global
  survival = [1, 2, 3, 4, 5, 6]; //Define as regras da celula automata na variável global
  startY = int(random(2, rows - 2)); //Calcula o ponto de inicio
  endY = int(random(2, rows - 2)); //Calcula o ponto de fim
  viewSize = view; //Define o tamanho da view da lanterna
  //Player
  player = new Player(0, 0, COLOR_PLAYER); //Cria o jogador
  player.setOfsetY(-startY); //Ajusta o cenário para que o jogador e o board fiquei alinhados com o ponto de partida
  //Grade
  board = []; //A board
  boardBuffer = []; // O Buffer da Board
  //Células
  initCellularAutomaton();//Inicia as Celulas
  apitwitter(location); //Chama a API do Twitter
  play_game = true; //Permite que o jogo seja Iniciado
  playable = false; //Aguarda o labirinto ser solucionado pelo algoritmo
  //Mascara
  maskOpacity = 1; //Força a definição da opacidade da mascara
  imageMode(CENTER);
  mask = maskedCircle(viewSize, CIRCLE, HOLE);
  mask = setAllColorAlpha(mask, HOLE, 0);
  //Gera os indicadores visuais de inicio e fim
  arrow[0] = new Arrow(board[1][startY].getX(), board[1][startY].getY(), COLOR_BOT);
  arrow[1] = new Arrow(board[columns - 1][endY].getX(), board[columns - 2][endY].getY(), COLOR_PLAYER);
  //Defini as posições iniciais dos sons no vetor de sons
  sounds.initSoundPositions();
}
//Roda o jogo
function runGame(beta = false){
  //Checka as teclas para movimento continuo ao pressionar
  if (frameCount%2==0) {
    keyCheck();  
  }
  //Verifica se o labirinto está solucionável - Cria o labirinto
  if (frameCount%2==0 && !playable) {
    if (iterateCellularAutomaton(beta)) {
      if (isSolvable(board)) {
        playable = true; //Escapa do primeiro if se o labirinto está pronto para jogar
        boardBuffer = []; //Libera a memória
      } else {
        initCellularAutomaton();//Reinicia as Celulas
      }  
    }
  }
  maskOpacity = (maskOpacity<255)?maskOpacity*1.2:255;  //Calcula a opacidade da mascara como crescente
  //Se a partida tiver sido iniciada e o jogo não estiver interrompido, então os bots e colisões vão funcionar
  if(play_game == true && pause_game == false){
    colisionBots();
    moveBots();
  }
  //Desenha os elementos do jogo
  drawMaze(); //Desenha o Labirinto
  drawBots(); //Desenha os Bots
  player.draw(); //Desenha 0 Player
  //Desenha a mascara
  tint(255, maskOpacity);
  drawMask();
  //Faz os sons tocarem, mesmo quando o jogo está interrompido, basta só a partida ser criada
  //se passar true como parametro, habilita o debug dos sons
  sounds.update();
}
//***Labirinto***
//Desenha o labirinto
function drawMaze(){
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      board[x][y].draw();
    }
  }
  arrow[0].draw();
  arrow[1].draw();
}
//Seleciona uma célula aleatoriamente com base no seu state
function randomCell(state){
  var x = int(random(1, columns - 2));
  var y = int(random(1, rows - 2));
  return board[x][y].getState() == state ? board[x][y] : randomCell(state);
}
//Inicia as células do labirinto. Primeiro todo em branco, depois com um valor randomico e por ultimo cria o ponto de inicio e fim do labirinto em suas extremidades
function initCellularAutomaton(){
  for (let x = 0; x < columns; x++) {
    board[x] = [];
    for (let y = 0; y < rows; y++) {
      board[x][y] = new Cell(x, y, 0);
    }
  }
  for (let x = 10; x < columns - 10; x+=10) {
    for (let y = 10; y < rows - 10; y+=10) {
      board[x][y].setState(random() < 0.5 ? 1 : 0);
      board[x][y+1].setState(1);
      board[x-1][y+1].setState(1);
      board[x+1][y].setState(random() < 0.5 ? 1 : 0);
      board[x-1][y].setState(random() < 0.5 ? 1 : 0);
    }
  }
  board[0][startY].setState(1);
  board[columns - 1][endY].setState(1);
  boardBuffer = board;
}
//Executa a iteração das celulas automatas
function iterateCellularAutomaton(beta = false){
  let newGrid = JSON.stringify(board);
  let stable = true;
  for(let i = 1; i < columns - 1; i++){
    for(let j = 1; j < rows - 1; j++){
      if(beta == false){
        var sum = neighborSum(i, j);
        if (birth.indexOf(sum) > -1 && survival.indexOf(sum) > -1) { // birth > -1 and survival > -1
          board[i][j].setState(1); // Alive no matter what
        } else if (birth.indexOf(sum) > -1) {
          board[i][j].setState(boardBuffer[i][j].getState() == 0 ? 1 : 0); // Born
        } else if (survival.indexOf(sum) > -1) {
          board[i][j].setState(boardBuffer[i][j].getState() == 1 ? 1 : 0); // Survive
        } else {
          board[i][j].setState(0); // Die
        }
      }else if(beta == true){
        board[i][j].setState(1);
      }
    }
  }
  board[1][startY+1].setState(1);
  board[1][startY].setState(1);
  board[1][startY-1].setState(1);
  board[columns - 2][endY+1].setState(1);
  board[columns - 2][endY].setState(1);
  board[columns - 2][endY-1].setState(1);

  boardBuffer = board; //Mantém o buffer de memória da grade

  stable = JSON.stringify(board) == newGrid;

  return stable;
}
//Verifica quantos vizinhos uma célula automata tem
function neighborSum(x, y){
  var sum = 0;
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      sum += boardBuffer[x+i][y+j].getState();
    }
  }
  return sum;
}
//Verifica se o labirinto é solucionável
function isSolvable(mazeGrid) {
  var xdim = mazeGrid.length;
  var ydim = mazeGrid[0].length;
  grid  = []; //is solvable
  Stack=[];

  for (let i = 0; i < xdim; i++) {
    grid[i] = [];
    for (let j = 0; j < ydim; j++) {
        grid[i][j] = mazeGrid[i][j].state; // Space
      }
    }

    for (let i = 0; i < xdim; i++) {
      for (let j = 0; j < ydim; j++) {
        if (grid[i][j]== 0) {
        grid[i][j] = -Infinity; // Wall
      } else {
        grid[i][j] = Infinity; // Space
      }
    }
  }

  floodFill(0, startY, 0, xdim, ydim);
  let steps =  grid[xdim - 1][endY];
  let solvable = (steps == Infinity)?false:true;
  console.log("Solvable: " + solvable + ", Steps: " + steps);

  //Free the memory
  grid  = []; //is solvable
  Stack=[];

  return solvable;
}
function floodFill(x, y, val, xdim, ydim) {
  fillPixel(x, y, val, xdim, ydim);
  while (Stack.length > 0) {
    var toFill = Stack.pop();
    fillPixel(toFill[0], toFill[1], toFill[2], xdim, ydim);
  }
}
function fillPixel(x, y, val, xdim, ydim) {
  if (!alreadyFilled(x, y, val)) {
    grid[x][y] = val;
  } 

  if (y > 1 && !alreadyFilled(x, y-1, val+1)) {Stack.push([x, y-1, val+1]);}
  if (x < xdim-1 && !alreadyFilled(x+1, y, val+1)) {Stack.push([x+1, y, val+1]);}
  if (y < ydim-1 && !alreadyFilled(x, y+1, val+1)) {Stack.push([x, y+1, val+1]);}
  if (x > 1 && !alreadyFilled(x-1, y, val+1)) {Stack.push([x-1, y, val+1]);}
}
function alreadyFilled(x, y, val) {
  return (grid[x][y] == -Infinity || grid[x][y] <= val);
}
//****Bots****
//Desenha os Bots
function drawBots(){
  for (let x = 0; x < bots.length; x++) {
    bots[x].draw();
  }
}
//Executa a colisão dos bots
function colisionBots(){
  for (let x = 0; x < bots.length; x++) {
    bots[x].colisionPlayer();
  }
}
//Move os bots
function moveBots(){
  if(frameCount%4==0){
    for (let x = 0; x < bots.length; x++) {
      bots[x].move();
    }
  }
}
//Inicia os bots em suas devidas posições aleatoriamente
function createBots(botNum){
  for (let x = 0; x < botNum; x++) {
    let cell = randomCell(1);
    let bot = new Bot(cell.getX(), cell.getY(), COLOR_BOT);
    bots[x] = bot;
  }
}
//****Máscara/Lanterna****
//Exibe a mascara completa
function drawMask(){
  //At the end, draw mask on top of everything.
  image(mask, width/2, height/2, mask.width, mask.height);
}
//Cria a Mascara
function maskedCircle(w, circle, hole) {
  const pg = createGraphics(width, height, P2D);
  // Not working as expected:
  pg.smooth(); 
  pg.noStroke();
  pg.ellipseMode(CENTER);
  pg.rectMode(CENTER);
  
  pg.fill(circle);
  pg.rect(width/2, height/2, width+2*(w + data[userState].transparency*0.01*windowWidth*0.20), height+2*(w + data[userState].transparency*0.01*windowWidth*0.20));
  pg.fill(hole);
  pg.ellipse(width/2, height/2, (w + data[userState].transparency*0.01*windowWidth*0.20), (w + data[userState].transparency*0.01*windowWidth*0.20));

  return pg.get();
}
//Desenha a Mascara
function setAllColorAlpha(mask, ink, alpha) {
  mask.loadPixels();
  const pix = mask.pixels;

  outer: for (var i = 0, j = 0; i != pix.length; i += 4, j = 0) {
    while (j != 3) {
      if (pix[i+j] != ink[j++]) {
        continue outer;
      }
    }
    pix[i+3] = alpha;
  }

  mask.updatePixels();
  return mask;
}
//***Twitter***
//Coleta os dados do twitter
function apitwitter(location) {
  console.log(location);
  if(bots.length <= 0){
    cb.setConsumerKey(consumerKey, consumerSecret);
    
    var params = {
      q: "",
      result_type: 'recent',
      count: 100,
      geocode: location
    };

    cb.__call("search_tweets", params, function(reply) {
      var statuses = reply.statuses;
      size = statuses.length;
      nBots = size*0.01*maxBots;
      createBots(nBots);
    }
    );
  }else{
    createBots(maxBots);
  }
}
//Seleciona a socalização com base no select input
function getLocal(state) {
  let local = "";
  local = local.concat(data[state].lat, ",", data[state].long, ",2km");
  return local;
}
//****Funções Secundárias****
//Verifica se o dispositivo é um celular. Funciona tambem no navegador em modo mobile do inspecionar.
function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}
function keyCheck() {
  //W
  if ((keyIsDown(87) || keyIsDown(UP_ARROW)) && pause_game == false) {
    player.move(0, 1); //Cima
  }
  //A
  if ((keyIsDown(65) || keyIsDown(LEFT_ARROW)) && pause_game == false) {    
    player.move(1, 0); //Esquerda
  }
  //S
  if ((keyIsDown(83) || keyIsDown(DOWN_ARROW)) && pause_game == false) {
    player.move(0, -1); //Baixo
  }
  //D
  if ((keyIsDown(68) || keyIsDown(RIGHT_ARROW)) && pause_game == false) {
    player.move(-1, 0); //Direita
  }
}
//Faz recalculos caso a tela seja alterada de tamanho.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //Mascara
  if (play_game) {
    mask = maskedCircle(viewSize, CIRCLE, HOLE);
    mask = setAllColorAlpha(mask, HOLE, 0);
  }

}
//Função que controla o carregamento dos sons para Load do game
function loadSoundFile(index, fileName) {
  loadSound(fileName, assetLoaded);
  //callback function
  function assetLoaded(sound) {
    loadedSound[index] = sound;
    assetsCounter++;
    if (assetsCounter==totalAssets) {
      createMenu(); //Cria Menu
      loading = false;
    }
  }
}
//Seleciona a posição virtual em relação ao ofSet do player. Mantém as coisas em movimento enquanto o player "anda".
function virtualPos(x, y){
  return [(windowWidth/2)+((windowWidth*cellPercent)/100) * (x + player.getOfsetX()), (windowHeight/2)+((windowWidth*cellPercent)/100) * (y + player.getOfsetY())];
}
