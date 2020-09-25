//A Classe dos BOTS
class Bot{
  constructor(x, y, c){
    this.redux = 4; //Reduz em uma quantidade os pixels do bot para ele ficar um pouco menor que a célula do labirinto.
    this.x = x; //Define a posição X do bot
    this.y = y; //Define a posição Y do bot 
    this.ofsetX = 0; //Variavel responsavel por mover o mapa
    this.ofsetY = 0; //Variavel responsavel por mover o mapa
    this.c = color(c); //Cor do bot
    this.infected = random() < 0.5 ? true : false;
    this.offSet = Math.random();
    this.direction = random([1, 2, 3, 4]);
  }
  draw(){
    let ballsize = (((windowWidth*cellPercent)/100) - this.redux)*0.7 + Math.abs((((windowWidth*cellPercent)/100) - this.redux)*0.3*Math.sin(frameCount*0.1+this.offSet));
    let pos = virtualPos(this.x, this.y);
    fill(this.c);
    ellipse(pos[0], pos[1], ballsize, ballsize); //Desenha o Bot
  }
  //Move o bot em uma direção. Não possibilita movimento diagonal
  move(){
    if(this.direction == 1  && pause_game == false){ //Para Cima
      let newpos = this.y - 1;
      if(this.colisionCell(this.x, newpos) == false){
        this.y = newpos;
      }else {
        this.direction = random([2, 3, 4]);
      }
    }else if(this.direction == 2  && pause_game == false){ //Para Baixo
      let newpos = this.y + 1;
      if(this.colisionCell(this.x, newpos) == false){
        this.y = newpos;
      }else {
        this.direction = random([1, 3, 4]);
      }
    }else if(this.direction == 3  && pause_game == false){ //Para Direita
      let newpos = this.x + 1;
      if(this.colisionCell(newpos, this.y) == false){
        this.x = newpos;
      }else {
        this.direction = random([1, 2, 4]);
      }
    }else if(this.direction == 4  && pause_game == false){ //Para Esquerda
      let newpos = this.x - 1;
      if(this.colisionCell(newpos, this.y) == false){
        this.x = newpos;
      } else {
        this.direction = random([1, 2, 3]);
      }
    }
  }
  //Verifica se o bot colidiu com uma parede
  colisionCell(x, y){
    if((x > 1 && x < columns - 1) && (y > 1 && y < rows - 1)){
      if(board[x][y].getState() == 0){
        return true;
      }else{
        return false;
      }
    }else{
      return true;
    }
  }
  //Verifica se o bot colidiu com o player
  colisionPlayer(){
    if(this.x == player.getX() && this.y == player.getY()){
      this.infect();
    }
  }
  //Infecta um bot
  infect(){
    if(this.infected == false && player.getInfected() == true){
      this.infected = true;
      player.setInfectedBot();
    }else if(this.infected == true && player.getInfected() == false){
      player.infect();
    }
  }
  //Retorna a posição X do bot
  getX(){
    return this.x;
  }
  //Retorna a posição Y do bot
  getY(){
    return this.y;
  }
}
