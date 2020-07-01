//Global Variables
var gameOver, restart
var PLAY=1
var END=0;
var gameState=1;
var invisibleGround
var bannanaImage
var BannanaGroup
var obstacleImage, ObstacleGroup
var jungle
var score=0;
var player
var Lives=2;

function preload(){
  backGround=loadImage("jungle.jpg");
  monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bannanaImage=loadImage("Banana.png");
  obstacleImage=loadImage("stone.png");
  
  GameOver=loadImage("gameOver.png");
  re_start=loadImage("restart.png"); 
  
  
}


function setup() {
  createCanvas(600,300);
  
  
   
 
  
  // Creating Groups 
   BannanaGroup=new  Group();
   ObstacleGroup=new Group();
  
  
  
  // Creating the background
   jungle=createSprite(200,100,200,10);
   jungle.addImage("jungle", backGround);
   jungle.velocityX=-4;
   jungle.x=jungle.width/2; 
  
  // creating gameOver and retsart sprite and not making them visible during gamestate PLAY
  
  gameOver=createSprite(300,100);
  gameOver.addImage("game over", GameOver);
  
  restart=createSprite(300,200);
  restart.addImage("restart", re_start);
  restart.scale=0.7;
  
  gameOver.visible=false;
  restart.visible=false;
   

  // Creating the monkey
    player= createSprite(100,300,20,50);
    player.addAnimation("monkey", monkey_running);
    player.scale=0.1;
  
  // Creating invisible ground
   invisibleGround=createSprite(400,300,800,10);
   invisibleGround.visible= false;
  
}  
  




function draw(){
 background(255);
  
  if (gameState===PLAY){
  
  // Making the monkey jump
  if(keyDown("space") && player.collide(invisibleGround)){
  player.velocityY=-10;  
  
  }
  
  player.velocityY=player.velocityY+0.5;
  
  // resetting the ground
   if(jungle.x<100){
   jungle.x=jungle.width/2  
   
   }
    
    jungle.velocityX=-4;
    
  // making the monkey collide with invisibleGround

    player.collide(invisibleGround);
    //player.visible=true;
    //BannanaGroup.visible=true;
    //ObstacleGroup.visible=true;
  
  
  //  increasing score
  
  if (player.isTouching(BannanaGroup)){
   score=score+2;
    BannanaGroup.destroyEach();
  }
  
  
  // Calling functions
  spawnBannana();
  spawnObstacles();
  
  
  
  // increasing size of monkey after certain score
  
  switch(score){
      
    case 10: player.scale=0.12;
      break;
   case 20: player.scale=0.14;
      break;
   case 30: player.scale=0.16;
      break;
      case 40: player.scale=0.18;
      break;
   default : break;
   }
}
  
   if (ObstacleGroup.isTouching(player)){
  gameState=END  
   }
  
  else if (gameState===END){
    
    gameOver.visible = true;
    restart.visible = true;
    player.collide(invisibleGround);
    
    //set velcity of each game object to 0
    jungle.velocityX = 0;
    player.velocityY = 0;
    ObstacleGroup.setVelocityXEach(0);
    BannanaGroup.setVelocityXEach(0);
    

    
    //set lifetime of the game objects so that they are never destroyed
    ObstacleGroup.setLifetimeEach(-1);
    BannanaGroup.setLifetimeEach(-1);
    
    
  }
  
  // Game state END
  /*if (gameState===END){
    
    jungle.velocityX=0;
    player.visible=false;
   
   ObstacleGroup.destroyEach();
   BannanaGroup.destroyEach();    
    
    gameOver.visible=true;
    restart.visible=true;
    score=0;
    
  }*/
  
  
  
  
  // condition for restarting the game 
  if (mousePressedOver(restart) && gameState===END){
    
   
    reset();
  }
 /*  if (ObstacleGroup.isTouching(player)){
  Lives=Lives-1;
    
    // giving 1 extra life
     switch(Lives){
      
    case 1: player.scale=0.1;
      break;
      case 0: gameState=END;
  }*/
  
  

  
  
  
 drawSprites();
  
  // Displaying Score
  stroke("white");
   textSize(20);
   fill("white");
  text("Score: " + score,400,50);
  
  // Displaying Lives
  
  stroke("red");
  textSize(20);
  fill("red");
  text("Lives: " + Lives,100,50); 
}


  function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  
  ObstacleGroup.destroyEach();
  BannanaGroup.destroyEach();
  
  score=0;
  }
    
    
  
  

  
// Spawning bannanas 
function spawnBannana(){
  
  if (World.frameCount %80===0){
    var bannana=createSprite(600,350,40,10);
    bannana.addImage("bannana", bannanaImage);
    bannana.y=random(100,150);
    bannana.scale=0.1;
    bannana.velocityX=-7;
    bannana.lifetime=150;
    
    BannanaGroup.add(bannana);
  }
}

// spawning obstacles 
function spawnObstacles(){
  
   if(World.frameCount % 300===0){
    var obstacle=createSprite(600,300,40,10);
    obstacle.addImage("obstace", obstacleImage);
    obstacle.velocityX=-7;
    obstacle.lifetime=150;
    obstacle.scale=0.1;
    
    obstacle.collide(invisibleGround);
     player.collide(obstacle);
    
   /* if(player.isTouching(ObstacleGroup)){
      playSound("sound://category_hits/retro_game_simple_impact_1.mp3");
    }*/
    
    
    
    ObstacleGroup.add(obstacle);
    
  }
}



