//A Classe das setas indicadoras
class Arrow{
  constructor(x, y, c){
    this.x = x;
    this.y = y;
    this.c = color(c);
  }
  draw(){
    let pos = virtualPos(this.x, this.y);
    let x1 = pos[0]-((windowWidth*cellPercent)/100)/2;
    let y1 = pos[1]-((windowWidth*cellPercent)/100)/2;
    let x2 = pos[0]-((windowWidth*cellPercent)/100)/2;
    let y2 = pos[1]+((windowWidth*cellPercent)/100)/2;
    let x3 = pos[0]+((windowWidth*cellPercent)/100)/2;
    let y3 = pos[1];
    fill(this.c);
    triangle(x1+3, y1, x2+3, y2, x3, y3);
  }
}
