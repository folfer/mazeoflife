//Desenha a Logo do jogo
function drawLogo(s, x, y, letterC, backgroundC){
  rectMode(CORNER);
  var percent = 55;
  var space = 11;
  var weight = (s-((s*70)/100))/100;
  var lWidth = ((s*(space-2))/100);
  var lHeight = ((s*(space-2))/100);
  var yperc = ((length*20)/100)-weight;
  //M
  fill(letterC);
  rect(x-((s*percent)/100), y, lWidth, weight);
  rect(x-((s*percent)/100), y, weight, lHeight);
  rect((x-((s*percent)/100))+(lWidth/2), y, weight, lHeight-((lHeight*25)/100));
  rect((x-((s*percent)/100))+(lWidth-weight), y, weight, lHeight);
  //Effect M
  letterEffect(s, x, y, percent, weight, lHeight, lWidth, letterC);
  //A
  percent = percent-space;
  fill(letterC);
  rect(x-((s*percent)/100), y+(lHeight/2), lWidth, weight);
  rect(x-((s*percent)/100), y, lWidth, weight);
  rect(x-((s*percent)/100), y, weight, lHeight);
  rect((x-((s*percent)/100))+(lWidth-weight), y, weight, lHeight);
  //Effect A
  letterEffect(s, x, y, percent, weight, lHeight, lWidth, letterC);
  //Z
  percent = percent-space;
  fill(letterC);
  rect(x-((s*percent)/100), y+lHeight, lWidth, weight);
  stroke(255);
  strokeWeight(weight);
  line(x-((s*percent)/100)+weight/2, y+lHeight+weight/2, (x-((s*percent)/100) + lWidth)-weight/2, y+weight/2);
  noStroke();
  rect(x-((s*percent)/100), y, lWidth, weight);
  //Effect Z
  letterEffect(s, x, y, percent, weight, lHeight, lWidth, letterC);
  //E
  percent = percent-space;
  fill(letterC);
  rect(x-((s*percent)/100), y, lWidth, weight);
  rect(x-((s*percent)/100), y, weight, lHeight);
  rect(x-((s*percent)/100), y+lHeight, lWidth, weight);
  rect(x-((s*percent)/100), y+(lHeight/2), lWidth/2, weight);
  //Effect E
  letterEffect(s, x, y, percent, weight, lHeight, lWidth, letterC);
  //O
  percent = percent-space-5;
  noFill();
  stroke(color(COLOR_BOT));
  strokeWeight(weight);
  ellipse(x-((s*percent)/100), y+(lHeight/2), lWidth, lHeight);
  noStroke();
  //F
  percent = percent-space+4;
  fill(color(COLOR_PLAYER));
  rect(x-((s*percent)/100), y, lWidth, weight);
  rect(x-((s*percent)/100), y, weight, lHeight);
  rect(x-((s*percent)/100), y+(lHeight/2), lWidth/2, weight);
  //L
  percent = percent-space-1;
  fill(letterC);
  rect(x-((s*percent)/100), y, weight, lHeight);
  rect(x-((s*percent)/100), y+lHeight, lWidth, weight);
  //Effect L
  letterEffect(s, x, y, percent, weight, lHeight, lWidth, letterC);
  //I
  percent = percent-space;
  fill(letterC);
  rect(x-((s*percent)/100), y, lWidth, weight);
  rect(x-((s*percent)/100)+(lHeight/2), y, weight, lHeight);
  rect(x-((s*percent)/100), y+lHeight, lWidth, weight);
  //Effect I
  letterEffect(s, x, y, percent, weight, lHeight, lWidth, letterC);
  //F
  percent = percent-space;
  fill(letterC);
  rect(x-((s*percent)/100), y, lWidth, weight);
  rect(x-((s*percent)/100), y, weight, lHeight);
  rect(x-((s*percent)/100), y+(lHeight/2), lWidth/2, weight);
  //Effect F
  letterEffect(s, x, y, percent, weight, lHeight, lWidth, letterC);
  //E
  percent = percent-space;
  fill(letterC);
  rect(x-((s*percent)/100), y, lWidth, weight);
  rect(x-((s*percent)/100), y, weight, lHeight);
  rect(x-((s*percent)/100), y+lHeight, lWidth, weight);
  rect(x-((s*percent)/100), y+(lHeight/2), lWidth/2, weight);
  //Effect E
  letterEffect(s, x, y, percent, weight, lHeight, lWidth, letterC);
  rectMode(CENTER);
}
function letterEffect(s, x, y, percent, weight, lHeight, lWidth, letterC){
  letterC.setAlpha(80);
  fill(letterC);
  rect(x-((s*percent)/100), ((y+5)+lHeight)+weight, lWidth, weight);
  letterC.setAlpha(70);
  fill(letterC);
  rect(x-((s*percent)/100), ((y+5)+lHeight)+(weight*3), lWidth, weight);
  letterC.setAlpha(60);
  fill(letterC);
  rect(x-((s*percent)/100), ((y+5)+lHeight)+(weight*5), lWidth, weight);
  letterC.setAlpha(40);
  fill(letterC);
  rect(x-((s*percent)/100), ((y+5)+lHeight)+(weight*7), lWidth, weight);
  letterC.setAlpha(30);
  fill(letterC);
  rect(x-((s*percent)/100), ((y+5)+lHeight)+(weight*9), lWidth, weight);
  letterC.setAlpha(20);
  fill(letterC);
  rect(x-((s*percent)/100), ((y+5)+lHeight)+(weight*11), lWidth, weight);
  letterC.setAlpha(10);
  fill(letterC);
  rect(x-((s*percent)/100), ((y+5)+lHeight)+(weight*13), lWidth, weight);
  letterC.setAlpha(255);
}
