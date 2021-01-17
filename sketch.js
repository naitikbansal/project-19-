var PLAY=1;
var END=0;
var gameState=PLAY;
var corona,coronaImage;
var ground,background1;
var man1,man1Image,man1Group;
var man2,man2Image,man2Group;
var sanitizer,sanitizerImage,sanitizerGroup;
var Coronascore,Manscore;

function preload(){
coronaImage = loadImage("coronavirus.png");
groundImage = loadImage("buildings1.png");
man1Image = loadImage("man0.png");
man2Image = loadImage("man mask.png");
sanitizerImage = loadImage("sanitizer.png");
}

function setup() {
createCanvas(600,600);

  background1 = createSprite(400,400,600,600);
  background1.addImage(groundImage);
  background1.scale=1;
  background1.velocityX=-1.5;
  
  ground = createSprite(600,580,600,10);
  ground.velocityX=4;
  
  corona = createSprite(200,500,20,20);
  corona.addImage(coronaImage);
  corona.scale=0.1;
  
  Coronascore=0;
  Manscore=0;
  man1Group = new Group();
  man2Group = new Group();
  sanitizerGroup = new Group();
  
  }

function draw() {
 background("black");
  if(gameState === PLAY){
    
  if(background1.x<300){
  background1.x=background1.width/2;
  }
  
  if(ground.x>300){
    ground.x=ground.width/2;
    ground.visible=false;
  }
    
    
    
    ground.velocityX = -(4 + 3* Coronascore/100)
  
  if(keyDown("space")){
    corona.velocityY=-10;
  }
  
  if(man1Group.isTouching(corona)){
    Coronascore=Coronascore+2;
    man1Group.destroyEach();
  }
  if(man2Group.isTouching(corona)){
    Manscore=Manscore+2;
    man2Group.destroyEach();
    
  }
  if(sanitizerGroup.isTouching(corona)){
    gameState=END;
  }
  
  man01();
  man02();
  sanitizers();
      
   drawSprites();
  stroke("black");
  textSize(20);
  fill("yellow");
  text("CoronaVirusScore:"+Coronascore,50,100);
  
  stroke("black");
  textSize(20);
  fill("yellow");
  text("ManScore:"+Manscore,350,100);
  }
  if(gameState === END){
  background1.velocityX=0;
  man1Group.setVelocityXEach(0);
  man2Group.setVelocityXEach(0);
  sanitizerGroup.setVelocityXEach(0);
  man1Group.destroyEach();
  man2Group.destroyEach();
  sanitizerGroup.destroyEach();
  
  man1Group.setLifetimeEach(-1);
  man2Group.setLifetimeEach(-1);
  sanitizerGroup.setLifetimeEach(-1);
    
  stroke("black");
  textSize(20);
  fill("yellow");
  text("HURRAH!WE HAVE DEFEATED THE CORONAVIRUS",50,300);
     
  }
}

function man01(){
  if(frameCount%170 === 0){
  Math.round(random(1,100));
  man1 = createSprite(400,480,20,20);
  man1.addImage(man1Image);
  man1.scale=0.4;
  man1.velocityX=-3;
  man1.lifetime=400;
  man1.setCollider("circle",0,0,40);
  man1.debug=false
  man1Group.add(man1);
    
  }
  corona.velocityY = corona.velocityY +0.8;
  corona.collide(ground);
    
  
}

function man02(){
  if(frameCount%470 === 0){
  Math.round(random(5,100));
  man2 = createSprite(400,480,20,20);
  man2.addImage(man2Image);
  man2.scale=0.4;
  man2.velocityX=-3;
  man2.lifetime=400;
  man2.setCollider("circle",0,0,40);
  man2.debug=false
  man2Group.add(man2);
  
    }
}

function sanitizers(){
  if(frameCount%550 === 0){
  Math.round(random(10,100));
  sanitizer = createSprite(250,500,20,20);
  sanitizer.addImage(sanitizerImage);
  sanitizer.scale=0.5;
  sanitizer.velocityX=-3;
  sanitizer.lifetime=400;
  sanitizerGroup.add(sanitizer);
  
    }
}