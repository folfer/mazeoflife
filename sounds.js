//A Classe dos sons
class Sounds{
  constructor(percent){
    this.percent = percent; //Porcentagem de atuação de cada area de som. Note que as diagonais são percente*2.
    this.volumes = [1,0,0,0,0,0,0,0,0];
    this.soundPosition = [];
    this.maxDistance = 0;
  }
  //Faz play em todos os sons, baixando para 0 o volume dos que não podem começar tocando de imediato
  playSounds(){
    for(var i = 0; i < loadedSound.length; i++){
      if(loadedSound[i].isPlaying() == false){
        loadedSound[i].setVolume(this.volumes[i]);
        loadedSound[i].loop();
      }
    }
  }
  //Faz todos os son pararem
  stopSounds(){
    for(var i = 0; i < loadedSound.length; i++){
      if(loadedSound[i].isPlaying() == true){
        loadedSound[1].setVolume(0,0.5);
        loadedSound[i].stop();
      }
    }
  }

  initSoundPositions() {
    this.maxDistance = columns*this.percent/100;

    //Constant Pad
    let pos = [columns/2,rows/2];
    this.soundPosition[0] = pos;

    //QuadTop
    pos = [columns/2,0];
    this.soundPosition[1] = pos;

    //QuadBot
    pos = [columns/2,rows-1];
    this.soundPosition[2] = pos;

    //QuadLeft
    pos = [0,rows/2];
    this.soundPosition[3] = pos;

    //QuadRight
    pos = [columns-1,rows/2];
    this.soundPosition[4] = pos;

    //QuadTL
    pos = [0,0];
    this.soundPosition[5] = pos;

    //QuadTR
    pos = [columns-1,0];
    this.soundPosition[6] = pos;

    //QuadBL
    pos = [0,rows-1];
    this.soundPosition[7] = pos;

    //QuadBR
    pos = [columns-1,rows-1];
    this.soundPosition[8] = pos;

    //Center Position
    pos = [columns/2,rows/2];
    this.soundPosition[9] = pos;
  }

  update(debug = false) {
    let playerX = player.getX();
    let playerY = player.getY();

    this.quadTop(playerY, debug);
    this.quadBottom(playerY, debug);
    this.quadLeft(playerX, debug);
    this.quadRight(playerX, debug);
    this.quadCorners(playerX, playerY, debug)
    this.quadCenter(playerX,playerY, debug);

    for(var i = 0; i < loadedSound.length; i++){
      loadedSound[i].setVolume(this.volumes[i],0.1);
    }
  }

  //Parte superior do labirinto inteira
  quadTop(playerY, debug){
    //QuadTop[1]
    let index = 1;
    let d = dist(this.soundPosition[index][0], playerY, this.soundPosition[index][0],this.soundPosition[index][1]);
    
    if (d < this.maxDistance) {
      this.volumes[index]+=0.05;
      this.volumes[index] = (this.volumes[index]>1)?1:this.volumes[index];
    } else {
      this.volumes[index]-=0.01;
      this.volumes[index] = (this.volumes[index]<0)?0:this.volumes[index];
    }

    if (debug) {
      fill(255,0,0,100);
      let posX = (width/2)+(((windowWidth*cellPercent)/100) * (this.soundPosition[index][0] + player.getOfsetX()));
      let posY = (height/2)+(((windowWidth*cellPercent)/100) * (this.soundPosition[index][1] + player.getOfsetY()));
      rect(posX,posY,((windowWidth*cellPercent)/100)*columns,((windowWidth*cellPercent)/100)*this.maxDistance);
    }

  }

  quadBottom(playerY, debug){
    //QuadBot[2]
    let index = 2;
    let d = dist(this.soundPosition[index][0], playerY, this.soundPosition[index][0],this.soundPosition[index][1]);
    
    if (d < this.maxDistance) {
      this.volumes[index]+=0.05;
      this.volumes[index] = (this.volumes[index]>1)?1:this.volumes[index];
    } else {
      this.volumes[index]-=0.01;
      this.volumes[index] = (this.volumes[index]<0)?0:this.volumes[index];
    }

    if (debug) {
      fill(255,0,0,100);
      let posX = (width/2)+(((windowWidth*cellPercent)/100) * (this.soundPosition[index][0] + player.getOfsetX()));
      let posY = (height/2)+(((windowWidth*cellPercent)/100) * (this.soundPosition[index][1] + player.getOfsetY()));
      rect(posX,posY,((windowWidth*cellPercent)/100)*columns,((windowWidth*cellPercent)/100)*this.maxDistance);
    }
  }

  quadLeft(playerX, debug){
  //QuadLeft[3]
  let index = 3;
  let d = dist(playerX, this.soundPosition[index][1], this.soundPosition[index][0],this.soundPosition[index][1]);

  if (d < this.maxDistance/2) {
    this.volumes[index]+=0.05;
    this.volumes[index] = (this.volumes[index]>1)?1:this.volumes[index];
  } else {
    this.volumes[index]-=0.01;
    this.volumes[index] = (this.volumes[index]<0)?0:this.volumes[index];
  }

  if (debug) {
    fill(255,0,0,100);
    let posX = (width/2)+(((windowWidth*cellPercent)/100) * (this.soundPosition[index][0] + player.getOfsetX()));
    let posY = (height/2)+(((windowWidth*cellPercent)/100) * (this.soundPosition[index][1] + player.getOfsetY()));
    rect(posX,posY,((windowWidth*cellPercent)/100)*this.maxDistance,((windowWidth*cellPercent)/100)*rows);
  }
}

quadRight(playerX, debug){
    //QuadRight[4]
    let index = 4;
    let d = dist(playerX, this.soundPosition[index][1], this.soundPosition[index][0],this.soundPosition[index][1]);

    if (d < this.maxDistance/2) {
      this.volumes[index]+=0.05;
      this.volumes[index] = (this.volumes[index]>1)?1:this.volumes[index];
    } else {
      this.volumes[index]-=0.01;
      this.volumes[index] = (this.volumes[index]<0)?0:this.volumes[index];
    }

    if (debug) {
      fill(255,0,0,100);
      let posX = (width/2)+(((windowWidth*cellPercent)/100) * (this.soundPosition[index][0] + player.getOfsetX()));
      let posY = (height/2)+(((windowWidth*cellPercent)/100) * (this.soundPosition[index][1] + player.getOfsetY()));
      rect(posX,posY,((windowWidth*cellPercent)/100)*this.maxDistance,((windowWidth*cellPercent)/100)*rows);
    }
  }

  quadCorners(playerX, playerY, debug){
    //TL[5], TR[6], BL[7], BR[8] 
    for (let index = 5; index < 9; index++) {
      let d = dist(playerX, playerY, this.soundPosition[index][0],this.soundPosition[index][1]);

      if (d < this.maxDistance) {
        this.volumes[index]+=0.05;
        this.volumes[index] = (this.volumes[index]>1)?1:this.volumes[index];
      } else {
        this.volumes[index]-=0.01;
        this.volumes[index] = (this.volumes[index]<0)?0:this.volumes[index];
      }

      if (debug) {
        fill(255,0,0,100);
        let posX = (width/2)+(((windowWidth*cellPercent)/100) * (this.soundPosition[index][0] + player.getOfsetX()));
        let posY = (height/2)+(((windowWidth*cellPercent)/100) * (this.soundPosition[index][1] + player.getOfsetY()));
        ellipse(posX,posY,((windowWidth*cellPercent)/100)*this.maxDistance*2,((windowWidth*cellPercent)/100)*this.maxDistance*2);
      }
    }
  }

  quadCenter(playerX, playerY, debug){
    //Center[9]
    let index = 9
    let d = dist(playerX, playerY, this.soundPosition[index][0],this.soundPosition[index][1]);
    for (let i=1; i<this.volumes.length; i++) {
      if (d < this.maxDistance/2) {
        this.volumes[i]+=0.05;
        this.volumes[i] = (this.volumes[i]>1)?1:this.volumes[i];
      } else {
        this.volumes[i]-=0.01;
        this.volumes[i] = (this.volumes[i]<0)?0:this.volumes[i];
      }
    }

    if (debug) {
      fill(255,0,0,100);
      let posX = (width/2)+(((windowWidth*cellPercent)/100) * (this.soundPosition[index][0] + player.getOfsetX()));
      let posY = (height/2)+(((windowWidth*cellPercent)/100) * (this.soundPosition[index][1] + player.getOfsetY()));
      ellipse(posX,posY,((windowWidth*cellPercent)/100)*this.maxDistance,((windowWidth*cellPercent)/100)*this.maxDistance);
    }
  }
}
