//Função que cria um modal para exibir telas gráficas similares umas às outras
function createModal(title, textClass, modalClass = 'modalDiv', buttom = false, back = true, share = false){
  if(controlDiv != null){
    controlDiv.style('display', 'none');
  }
  if(pauseBt != null){
    pauseBt.style('display', 'none');
  }
  if(pauseDiv != null){
    pauseDiv.style('display', 'none');
  }
  textAlign(CENTER);
  closeModal();
  modalDiv = createDiv().addClass(modalClass+' center-text width-half-quarter');
  //Adicionando Filhos
  let p = createP().addClass();
  p.child(spanModel(title, 'titleModal font-title color-player'));
  modalDiv.child(p);
  p = createP();
  p.child(select('.'+textClass));
  modalDiv.child(p);
  //If que recebe função do botão extra
  if(back == true){
    modalDiv.child(buttonModel('VOLTAR', backTo, 'modalChild'));
  }
  //If que recebe função do botão extra
  if(buttom != false){
    modalDiv.child(buttonModel('OK', buttom, 'modalChild'));
  }
  //If que recebe função do botão extra
  if(share == true){
    modalDiv.child(buttonModel('COMPARTILHAR', shareFacebook, 'modalChild'));
  }
  show_modal = true;
}
//Função para Fechar o Modal
function closeModal(){
  if(modalDiv != null){
    modalDiv.remove();
    modalDiv = null;
    if(pauseDiv != null){
      pauseDiv.style('display', 'block');
    }else{
      pause_game = false;
      show_modal = false;
      if(controlDiv != null){
        controlDiv.style('display', 'block');
      }
      if(pauseBt != null){
        pauseBt.style('display', 'block');
      }
    }
  }
}
//Função para criar os controles do touch
function createControls(){
  createpauseControl();
  //Verifique se você está em um celular
  if(isMobileDevice() && controlDiv == null){
    controlDiv = createDiv().addClass('controlContent width-half-quarter');
    //W S -> ↑ ↓
    let p = createP().addClass('float-left controlLeftPad');
    p.child(buttonModel('', function() { player.move(0, 1);}, 'controlModel float-left margin-10 arrow up'));
    p.child(buttonModel('', function() { player.move(0, -1);}, 'controlModel float-left margin-10 arrow down'));
    controlDiv.child(p);
    //A D -> ← →
    p = createP().addClass('float-right controlRighPad');
    p.child(buttonModel('', function() { player.move(1, 0);}, 'controlModel float-left margin-10 arrow left'));
    p.child(buttonModel('', function() { player.move(-1, 0);}, 'controlModel float-left margin-10 arrow right'));
    controlDiv.child(p);
  }else if(!isMobileDevice()){
    closeControls();
  }
}
function closeControls(){
  if(controlDiv != null){
    controlDiv.remove();
    controlDiv = null;
  }
}
function createLoader(p){
  rectMode(CORNER);
      
  noStroke();
  fill(COLOR_BOT);
  rect(windowWidth*0.2, windowHeight/2-20, windowWidth*0.6*p, 40);

  stroke(COLOR_FLOOR);
  strokeWeight(4);
  noFill();
  rect(windowWidth*0.2, windowHeight/2-20, windowWidth*0.6, 40);

  noStroke();
  fill(COLOR_FLOOR);
  textFont(font);
  textAlign(CENTER);
  text((p*100).toFixed(0) + '% CARREGADO', windowWidth*0.5, windowHeight*0.5);
}
//Cria um botão dispensando ter que modificar um por um, mantendo o layout.
function buttonModel(text, onClick, className){
  textAlign(CENTER);
  button = createButton(text.toUpperCase()).addClass(className);
  button.addClass('color-floor background-wall border');
  button.mousePressed(onClick);
  return button;
}
function spanModel(text, className){
  textAlign(CENTER);
  span = createSpan(text).addClass(className);
  return span;
}
function imageModel(url, className, w = 'auto', h = 'auto'){
  let htmlTag = '<img src="'+url+'" alt="imagem" width="'+w+'" height="'+h+'">';
  let img = createDiv(htmlTag).addClass(className);
  return img;
}
function urlModel(url, text, className){
  let htmlTag;
  if (className==null) {
    htmlTag = '<a href="'+url+'">'+text+'</a>';
  } else {
    htmlTag = '<a class="'+className+'" href="'+url+'">'+text+'</a>';
  }
  let a = spanModel(htmlTag, 'color-player');
  return a;
}
function keyModel(text, className){
  textAlign(CENTER);
  let div = createDiv().addClass('keyModel border '+className);
  div.child(spanModel(text, 'color-floor '));
  return div;
}
function shareFacebook() {
  let url = "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ficon.ufba.br%2Fmazeoflife&amp;src=sdkpreparse";
  window.open(url, "Compartilhar/Share", 'width=520,height=320,menubar=no,location=yes,resizable=no,scrollbars=yes,status=no');
}
function createpauseControl(){
  if(pauseBt == null){
    pauseBt = createDiv().addClass('pauseButton');
    pauseBt.child(buttonModel('', pauseScreen, 'pauseSignal'));
  }
}
function closepauseControl(){
  if(pauseBt != null){
    pauseBt.remove();
    pauseBt = null;
  }
}
function closepauseDiv(){
  pause_game = false;
  show_modal = false;
  if(pauseDiv != null){
    pauseDiv.remove();
    pauseDiv = null;
  }
  if(controlDiv != null){
    controlDiv.style('display', 'block');
  }
  if(pauseBt != null){
    pauseBt.style('display', 'block');
  }
}
