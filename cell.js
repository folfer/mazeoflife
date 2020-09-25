//A Classe das Células
class Cell {
  //Constructor da classe
  constructor(x, y, state){
    this.state = state; //The Cell State. Alive, Dead...
    this.x = x; //Set Cell Position X
    this.y = y; //Set Cell Position Y
    if(this.state == 1){
      this.c = color(COLOR_WALL);
    }else if(this.state == 0){
      this.c = color(COLOR_FLOOR);
    }
  }
  //Draw the cell function
  draw(){
    fill(this.c);
    let pos = virtualPos(this.x, this.y);
    rect(pos[0], pos[1], (windowWidth*cellPercent)/100, (windowWidth*cellPercent)/100); //Draw the Cell
  }
  //Define o Estado de uma Célula
  setState(state){
    if(state == 1){
      this.c = color(COLOR_WALL);
    }else if(state == 0){
      this.c = color(COLOR_FLOOR);
    }
    this.state = state;
  }
  //Retorna o estado de uma célula
  getState(){
    return this.state;
  }
  //Retorna a posição X de uma Célula
  getX(){
    return this.x;
  }
  //Retorna a posição Y de uma Célula
  getY(){
    return this.y;
  }
}
