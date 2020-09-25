//A Classe do jogador
class Player{
  //Construtor da classe
  constructor(x, y, c){
    this.redux = 4; //Reduz em uma quantidade os pixels do player para ele ficar um pouco menor que a célula do labirinto.
    this.x = x; //Define a posição X do player
    this.y = y; //Define a posição Y do player
    this.ofsetX = 0; //Variavel responsavel por mover o mapa
    this.ofsetY = 0; //Variavel responsavel por mover o mapa
    this.c = color(c); //Cor do personagem
    this.steps = 0; //Quantos passos o personagem deu
    this.infected = false; //Se o personagem está ou não infectado
    this.infected_steps = 0; //Quantos passos ele tinha quando foi infectado
    this.infected_bots = 0; //Quantos passos ele tinha quando foi infectado
    this.momentum = 2; //Contador para escurecer a tela
  }
  //Desenha o player
  draw(){
    let ballsize = (((windowWidth*cellPercent)/100) - this.redux)*0.7 + Math.abs((((windowWidth*cellPercent)/100) - this.redux)*0.3*Math.sin(frameCount*0.05)); //Tamanho da bola
    let posX = (windowWidth/2)+(((windowWidth*cellPercent)/100) * this.x); //Calcula a Posição X do player
    let posY = (windowHeight/2)+(((windowWidth*cellPercent)/100) * this.y); //Calcula a Posição Y do player
    //Rect para esconder as coisas após um tempo
    fill(COLOR_WALL, parseInt(255*(1-this.momentum)));
    rect(windowWidth/2, windowHeight/2, windowWidth, windowHeight);
    //Desenha o player
    fill(this.c);
    ellipse(posX, posY, ballsize, ballsize); //Draw the Player
    fill(color(COLOR_WALL));

    this.momentum -=0.01;
    if (this.momentum < 0) {
      this.momentum = 0;
    }
  }
  //Função para mover o player 1 bloco numa direção. Possibilita movimento diagonal
  move(x, y){
    if (!playable){
      return false;
    }
    this.momentum += 0.5;
    let i = this.x - (this.ofsetX + x);
    let j = this.y - (this.ofsetY + y);
    if((i >= 0 && i <= columns) && (j >= 0 && j <= rows)  && pause_game == false){
      let cell = board[i][j];
      if(cell.getState() == 1){
        this.ofsetX += x; //Modifica a Variavel de Ofset X
        this.ofsetY += y; //Modifica a Variavel de Ofset Y
        this.steps++;
      }
    }
    if(this.getX() == columns-1 && this.getY() == endY){
      let span = spanModel('', 'gameoverText color-floor');
      let p = createP();
      p.child(spanModel('VOCÊ FEZ UMA LONGA CAMINHADA DE ', 'color-floor'));
      p.child(spanModel(this.steps+(this.steps > 1 ? ' PASSOS' : ' PASSO'), 'color-bot'));
      p.child(spanModel('.', 'color-floor'));
      span.child(p);
      if(this.infected == true){
        p = createP();
        p.child(spanModel('INFELIZMENTE ', 'color-floor'));
        p.child(spanModel('VOCÊ FOI CONTAMINADO ', 'color-player'));
        p.child(spanModel('COM '+this.infected_steps+(this.infected_steps > 1 ? ' PASSOS' : ' PASSO'), 'color-floor'));
        p.child(spanModel('.\n', 'color-floor'));
        span.child(p);
        if(this.infected_bots <= 0){
          p = createP();
          p.child(spanModel('APESAR DISSO VOCÊ NÃO INFECTOU NINGUÉM.\n', 'color-floor'));
          span.child(p);
        }else{
          p = createP();
          p.child(spanModel('VOCÊ TAMBÉM ', 'color-floor'));
          p.child(spanModel('INFECTOU '+this.infected_bots+(this.infected_bots > 1 ? ' PESSOAS' : ' PESSOA'), 'color-player'));
          p.child(spanModel('.\n', 'color-floor'));
          span.child(p);
        }
      }else{
        p = createP();
        p.child(spanModel('APESAR DOS RISCOS VOCÊ ', 'color-floor'));
        p.child(spanModel('CHEGOU BEM ', 'color-bot'));
        p.child(spanModel('AO SEU DESTINO.', 'color-floor'));
        span.child(p);
      }
      p = createP();
      p.child(spanModel('QUER JOGAR ', 'color-floor'));
      p.child(spanModel('DE NOVO', 'color-player'));
      p.child(spanModel('?', 'color-floor'));
      span.child(p);
      endGame('VOCÊ CHEGOU!');
    }
    if (this.momentum > 2) {
      this.momentum = 2;
    }
  }
  //Infecta o player
  infect(){
    if(this.infected == false){
      this.infected = true;
      this.infected_steps = this.steps;
    }
  }
  //Retorna o estado de infecção do player
  getInfected(){
    return this.infected;
  }
  //Define um ofset X para o player. Possibilita definir uma posição inicial para o outros elementos com o player no centro sempre
  setInfectedBot(){
    this.infected_bots++;
  }
  //Retorna os status do player
  getStatus(){
    return [this.steps, this.infected, this.infected_steps, this.infected_bots];
  }
  //Retorna o ofset X do player. Ou Seja: Quantas casas o player andou para a direção X negativo ou positivo, possibilitando mover o mapa
  getOfsetX(){
    return this.ofsetX;
  }
  //Define um ofset X para o player. Possibilita definir uma posição inicial para outros elementos com o player no centro sempre
  setOfsetX(ofset){
    this.ofsetX = ofset;
  }
  //Retorna o ofset Y do player. Ou Seja: Quantas casas o player andou para a direção Y negativo ou positivo, possibilitando mover outros elementos com o player no centro da tela sempre
  getOfsetY(){
    return this.ofsetY;
  }
  //Define um ofset X para o player. Possibilita definir uma posição inicial para o outros elementos com o player no centro sempre
  setOfsetY(ofset){
    this.ofsetY = ofset;
  }
  //Retorna a posição X do player que é definida no setup
  getX(){
    return this.x - this.ofsetX;
  }
  //Retorna a posição Y do player que é definida no setup
  getY(){
    return this.y - this.ofsetY;
  }
}
