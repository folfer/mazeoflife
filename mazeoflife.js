//****Valores da Grade****
let columns; //Número de colunas da grade
let rows; //Numéro de linhas da grande
let cellPercent = 4; //Porcentagem que cada célula tem em relação ao tamanho da tela
//****Configurações do Jogo****
let generations; //Quantidade de gerações para gerar o labirinto
let birth = []; //Regra para celulas automatas "Birth"
let survival = []; //Regra para celulas automatas "Survival"
let startY; //Ponto de Inicio
let endY; //Ponto de Final
let userLocation; //Lat long da posição do usuário no formato "lab,long,raio"
let userState; //user selected state
let play_game = false; //Se foi dado play na partida
let pause_game = false; //Se o jogo foi pausado
var mask; //Lanterna
let maskOpacity = 1; //Opacidade da lanterna
let playable = false; //Se o Labirinto for jogável
var viewSize; //Tamanho da lanterna
let maxBots = 20; //Quantidade máximo de bots
const CIRCLE = Object.freeze([0, 0, 0]);
const HOLE = Object.freeze([1, 1, 1]);
//****Layout****
let font;
let modalDiv = null;
let show_modal = false;
let controlDiv = null;
let pauseDiv = null;
let pauseBt = null;
let menuDiv = null;
let selectList;
let data = {};
let icon_logo = 'assets/icon_logo.jpg';
//****Cores****
const COLOR_PLAYER = '#f94263'; //Rosa
const COLOR_BOT = '#005d95'; //Azul
const COLOR_FLOOR = 255; //Branco
const COLOR_WALL = 0; //Preto
//****Grade****
board = []; //A board
boardBuffer = []; // O Buffer da Board
grid = [];
Stack=[];
arrow = []; //Direcionáveis para mobile
//****Agentes (Player e Bots)****
let player; //Player
let bots = []; // Bots
//****Sounds****
let loadedSound = []; //Vetor com os sons carregados
let sounds; //Objeto que controla todo o som do jogo
//****Chaves Twitter****
var consumerKey = 'jJKwYVKkqnSkbr63NpK7Vzvkx';
var consumerSecret = 'lTMfwMs7rDxz8vPcxBD7Gy5lDO8GXnlIzPw2d8xVhqa1L4xOTw';
var cb = new Codebird(); //Classe que faz as chamadas na API Twitter
let callTwitter;
//****Loader****
let totalAssets = 9;
let assetsCounter = 0;
let loading = true;
//Inicia antes do setup
function preload() {
  //JSON
  data = loadJSON("assets/states.json");
  //Fontes
  font = loadFont('assets/font/uni0553-webfont.ttf');
}
//Setup. Inicia Primeiro, seguido da função preload() tudo que estiver nessa função
function setup(){
  //Configure css para o body
  var body = select('body');
  body.style('font-family', 'uni0553-webfont');
  //Canvas
  var canvas = createCanvas(windowWidth, windowHeight);
  sounds = new Sounds(40);
  //Regras do Sistema
  frameRate(15);
  rectMode(CENTER);
  noStroke();
  smooth();
  //Carrega o sons e faz o Load
  soundFormats('mp3');
  loadSoundFile(0,'sounds/PadPrincipal');
  loadSoundFile(1,'sounds/Percussao1');
  loadSoundFile(2,'sounds/Percussao2');
  loadSoundFile(3,'sounds/BaixoEsquerdo');
  loadSoundFile(4,'sounds/BaixoDireito');
  loadSoundFile(5,'sounds/MelodiaEsquerdo');
  loadSoundFile(6,'sounds/Voz1');
  loadSoundFile(7,'sounds/Voz2');
  loadSoundFile(8,'sounds/MelodiaDireito');
}
//Função de desenho. Executada a cada frame
function draw(){
  background(color(COLOR_WALL)); //Todo frame precisa ter seu background renovado
  if (loading) {
    drawLogo((windowWidth*80)/100, (windowWidth*50)/100, (windowHeight*14)/100, color(COLOR_FLOOR), color(COLOR_WALL)); //Exibe logo superior
    createLoader(assetsCounter/totalAssets);
  } 
  else {
    if(play_game == false && show_modal == false){
      drawLogo((windowWidth*80)/100, (windowWidth*50)/100, (windowHeight*14)/100, color(COLOR_FLOOR), color(COLOR_WALL)); //Exibe logo superior
    }else if(play_game == true && pause_game == false){
      runGame();
    }else if(show_modal == true){
      drawLogo((windowWidth*50)/100, (windowWidth*50)/100, (windowHeight*87)/100, color(COLOR_FLOOR), color(COLOR_WALL));  //Exibe logo inferior
    }
  }
}
// Executa sempre que uma tecla for pressionada. Os if/else internos procuram qual a tecla foi pressionada.
function keyPressed() {
  if ((key == "q" || key == "Q") && pause_game == false) { //Returna pro Menu
    if(play_game == true){
      quit();
      pause_game = true;
    }
  }else if (((key == "p" || key == "P") || keyCode == ESCAPE) && pause_game == false) { //Pause no Jogo
    if(play_game == true){
      pauseScreen();
      pause_game = true; //Pausar o jogo
    }
  }else if ((key == "r" || key == "R") && pause_game == false) { //Reseta o jogo
    if(play_game == true){
      reset();
      pause_game = true;
    }
  }
}
