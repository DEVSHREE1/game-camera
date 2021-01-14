var monkey , monkeyImage
var ground1,groundImage;
var banana ,bananaImage, stone, stoneImage
var bananaGroup, stoneGroup
var score = 0;
var bground;
var health = 1;
var play=0,end=1,gameState=0

function preload(){
  
  
monkeyImage= loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  groundImage = loadImage("jungle.jpg");
}

function setup() 
{
  createCanvas(600, 400);
  
  ground1 = createSprite(400,100,100,100);
  ground1.addImage(groundImage);
  ground1.x=ground1.width/2;
  ground1.velocityX=-4;
  
  
  monkey = createSprite(120, 315, 20, 20);
  monkey.addAnimation("running",monkeyImage);
  monkey.scale = 0.14;
 
  bground = createSprite(300, 340, 600, 60);
  bground.shapeColor = "lightgreen"
  bground.visible = false;
 
  bananaGroup = createGroup()
  stoneGroup = createGroup()
}

function draw() 
{
  background(180);
  
  if(gameState===play){
   
  if(ground1.x<150) {
    ground1.x=ground1.width/2;
  }
  if(bground.x<100){
    bground.x=ground1.width/2;
  } 
  
  text("Survival Time = " + score, monkey.x-200, monkey.y+50)
  
  monkey.collide(bground);
    
    console.log(monkey.y)
    
   //camera.position.x = monkey.x;
   camera.position.y = monkey.y;
  
  if (keyDown("space") && monkey.y >= 100)
    {
      monkey.velocityY = -20;
        }
    
          monkey.velocityY = monkey.velocityY + 0.9;

  if (monkey.isTouching(bananaGroup))
    {
      banana.destroy()
      score = score + 2;
    }
  
  
  if (monkey.isTouching(stoneGroup))
    {
      background(0);
      monkey.velocityX = 0;
      monkey.visible = false;
      banana.velocityX = 0;
      banana.visible = false;
      stone.velocityX = 0;
      stone.visible = false
      bground.visible = false;
      ground1.visible = false;
      ground1.velocityX = 0;
      
      if(health===0){
     gameState="end";
     }
    }
  
  else if(gameState==="end"){
     monkey.visible=false;
    stoneGroup.destroyEach();
    bananaGroup.destroyEach();
    ground1.setVelocity(0,0);
    ground1.visible = false;
      fill("red");
      stroke("white");
      textSize(40)
      text("GAME OVER", 200 , 200)

     }
      
      if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
     
    }
    
  spawnBananas()
  spawnstone()
  monkeyLife()
  drawSprites();
  
  stroke("pink");
  textSize(30);
  fill("white");
  text("Score: "+ score,monkey.x+320, monkey.y-160);
}
}

function spawnstone()
{
  if (frameCount % 125 === 0)
    {
  stone = createSprite(650, 315, 20, 10);
  stone.addImage(stoneImage);
  stone.scale = 0.16;
  stone.velocityX = -4;
  stoneGroup.add(stone)
    }
}

function spawnBananas()
{
  if (frameCount % 125 === 0)
    { 
  banana = createSprite(650, 98, 50, 50);
  banana.velocityX = -4;
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  bananaGroup.add(banana)
    }
}
  function monkeyLife(){
  if(monkey.isTouching(stoneGroup)){
  health=health-1;
  stoneGroup.destroyEach();
    ground1.visible = true;
    ground1.velocityX = -4;
    monkey .visible = true;
    monkey.scale = monkey.scale - 0.04;
  }

    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
    }
  
function reset(){
  gameState=play;
  monkey.visible=true;
  monkey.scale=0.09;
  gameOver.visible=false;
  restart.visible=false;
  ground.setVelocity(-5,0);
  score=0;
  health=2;
  
}