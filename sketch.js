var PLAY = 1;
var END = 0;

var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score=0;
var ground;
var invisibleGround;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage= loadImage("backgroundImg.png");  
}



function setup() {
  createCanvas(600,200);
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
  obstacleGroup = createGroup();
  foodGroup = createGroup();
  
  
  ground = createSprite(200,190,1500,20);
  //ground.addImage(backgroundImage);  
  ground.x = ground.width/2;
  ground.velocityX = -6;
  
  monkey = createSprite(50,180,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  monkey.setCollider('circle',0,0,350);
  monkey.scale = 0.1;
  
   text("OVER",30,30);
  
  
  
 
  //invisibleGround = createSprite(200,190,400,10);
  //invisibleGround.visible = false;
   
  
  
}

    

function draw() {
  background(255);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
    if((keyDown("SPACE")) && monkey.y >= 50) {
      //jumpSound.play( )
        monkey.velocityY = -10;
    
    } 
    monkey.velocityY = monkey.velocityY + 0.8
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    monkey.collide(invisibleGround);
    
    obstacles();
    foods();
    
        gameState = PLAY;if(monkey.isTouching(foodGroup)){
     //  collidedSound.play()
        score=score+10;
          textSize(24);
          
          text("ok",10,10);
         //banana.destroyEach();
         
  }
    
        // monkey.velocityX = 0;
  }
  else if (gameState === END) {
    
     gameState = END; if(obstacleGroup.isTouching(monkey)){
        //collidedSound.play()
          gameState = END;
          textSize(24);
         
          monkey.velocityX = 0;
    //gameOver.visible = true;
   // restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    
   // obstacleGroup.setVelocityXEach(0);
  // foodGroup.setVelocityXEach(0);
    
    
         // obstacle.setLifetime = 180;
    
    //set lifetime of the game objects so that they are never destroyed
    //obstacleGroup.setLifetimeEach(-1);
    //foodGroup.setLifetimeEach(-1);
    
  }   
  }
  
  drawSprites();
}

function obstacles(){
   if(frameCount %300 === 0) {
     obstacle = createSprite(600,height-40,20,30);
     obstacle.setCollider('circle',0,0,100);
     obstacle.debug = true;
      text("OVER",30,30);
  
    obstacle.velocityX = -6;
    
    //generate random obstacles
    obstacle.addImage(obstacleImage);
     
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
    //obstacle.depth = monkey.depth;
    //monkey.depth +=1;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}

function foods(){
  
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(width+20,height-300,40,10);
    banana.setCollider('circle',0,0,145)
    banana.debug = false;
  
    banana.y = Math.round(random(50,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 180;
    
    if(foodGroup.isTouching(monkey)){
        //gameState = END;
          }    
        
    
    //adjust the depth
   // banana.depth = monkey.depth;
   // monkey.depth +=1;
    
    //add each cloud to the group
    foodGroup.add(banana);
  }
  
}


