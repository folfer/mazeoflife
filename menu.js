//Cria os objetos do Menu
function createMenu(){
  textAlign(CENTER);
  //Span do Select
  let spanMenu = spanModel('SELECIONE O ESTADO', 'menuChild color-floor center-text');
  //INPUT SELECT
  selectList = createSelect().addClass('menuChild select color-floor background-wall border width-max');
  selectList.option('ESTADO');
  selectList.selected('ESTADO');

   //Preenchendo o select com os dados do JSON
   for (let [key] of Object.entries(data)) {
    // console.log(key);
    selectList.option(`${key}`);
  }
  
  selectList.changed(selectStates);
  //Div que recebe o menu todo
  menuDiv = createDiv().addClass('menuParent center-text width-quarter');
  menuDiv.child(spanMenu);
  menuDiv.child(selectList);
  menuDiv.child(buttonModel('JOGAR', play, 'buttonModel menuChild width-max disabled').attribute('disabled', ''));
  menuDiv.child(buttonModel('INSTRUÇÕES', help, 'buttonModel menuChild width-max'));
  menuDiv.child(buttonModel('SOBRE', about, 'buttonModel menuChild width-max'));
}
//Função que coleta o select input
function selectStates() {
  let item = selectList.value(); //Lê o valor do select
  let localParam; 

  if (item=='ESTADO') {
    // Desabilita o botão de jogar
    let playButton = select('button', '.enabled');
    playButton.attribute('disabled', '');
    playButton.removeClass('enabled');
    playButton.addClass('disabled');
  } else {
    // Habilita o botão de jogar
    let playButton = select('button', '.disabled');
    playButton.removeAttribute('disabled');
    playButton.removeClass('disabled');
    playButton.addClass('enabled');  

    localParam = getLocal(item); //busca no json os dados de lat e long
    userLocation = localParam;
    userState = item;
  }

  
}
//Função chamada pelo botão JOGAR
function play(){
    startGame(userLocation);
    menuDiv.style('display', 'none');
}
//Retorna pro Menu
function backToMenu(){
  menuDiv.style('display', 'block');
  //selectList.selected(`${userState}`);
  // Desabilita o botão de menu
  // let playButton = select('button', '.enabled');
  // playButton.attribute('disabled', '');
  // playButton.removeClass('enabled');
  // playButton.addClass('disabled');
  play_game = false;
  pause_game = false;
  sounds.stopSounds();
  closeModal();
  closeControls();
  closepauseControl();
  closepauseDiv();
}
function backTo(){
  if(play_game == true){
    closeModal();
  }else{
    backToMenu();
  }
}
