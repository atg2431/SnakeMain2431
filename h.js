const playboard=document.querySelector(".board");
const Score=document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls=document.querySelectorAll(".arrow button");
const backgroundMusic= new Audio('backgroundmain.mp3');
const overAudio= new Audio('over.wav');
const food= new Audio('eat.mp3');
const snakeMove=new Audio('move.mp3');
const highScoreAudio=new Audio('highscore.mp3');

//Declarations
let gameOver=false;
let foodX,foodY;
let snakeX=13,snakeY=15;
let velocityX=0,velocityY=0;
let score=0;
let snakeArr=[];
let Interval;
let specialX,specialY;

//special food position function
function specialFoodPosition(){
  //Give random coordinates
  specialX =Math.floor(Math.random()*20)+1;
  specialY =Math.floor(Math.random()*20)+1;
}



// Getting high score from the local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `HighScore: ${highScore}`;

//Food position
function foodPos(){
    //Give random coordinates
    foodX =Math.floor(Math.random()*20)+1;
    foodY =Math.floor(Math.random()*20)+1;
}

//Game over function
function Over(){
  if(gameOver=true)
  {
    backgroundMusic.pause();
    overAudio.play();

    clearInterval(Interval);
    alert("GAME OVER!! Press Ok To Restart...");
    location.reload();

  }

}

//Changing Direction of the snake
function changeDirection(e){
    //Changing velocity on key presses
   if(e.key === "ArrowUp" && velocityY !=1 ){

    velocityX=0;
    velocityY=-1;
    snakeMove.play();
   }
   else if(e.key === "ArrowDown" && velocityY !=-1){
    velocityX=0;
    velocityY=+1;
    snakeMove.play();
   }
  else if(e.key === "ArrowRight" && velocityX !=1){
    velocityX=1;
    velocityY=0;
    snakeMove.play();
   }
  else if(e.key === "ArrowLeft" && velocityX !=-1){
    velocityX=-1;
    velocityY=0;
    snakeMove.play();
   }

   
}
// Calling changeDirection on each key click and passing key dataset value as an object
controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));


//game Engine
function gameEngine(){
  document.addEventListener("keydown", backgroundMusic.play());
  // backgroundMusic.play();  
  
  if(gameOver){
        return Over();
        
     }

    //displaying food
    let html= `<div class="snakeFood" style="grid-area: ${foodY}/${foodX}" ></div>`;

//If snake hits the food
    if(snakeX===foodX && snakeY===foodY)
    {
      food.play();
      foodPos();
      snakeArr.push([foodX,foodY]);
      score++;//Increment point by1
      if(score>highScore){
        highScoreAudio.play();
        highScore=score;
        
      }
     
      localStorage.setItem("high-score", highScore);
      Score.innerText = `Score: ${score}`;
      highScoreElement.innerText = `High Score: ${highScore}`;

    }


    //Snake head
    //Updating snake head position on current velocity
    snakeX += velocityX;
    snakeY += velocityY;

    // If snake collides with the wall
    if(snakeX>20 || snakeX<=0 || snakeY>20 || snakeY<=0)
    {
      gameOver=true;
    }
    //Adding snake elements after the head
    for(i=snakeArr.length - 1;i>0;i--)
    {
        snakeArr[i]=snakeArr[i-1];
    }

   snakeArr[0]=[snakeX,snakeY];//setting firstelement of snake body to current position

   //Addiing each element to snake
    for(i=0;i<snakeArr.length;i++)
    {
        //Adding Division to each part of the snake
        html+= `<div class="snakeHead" style="grid-area: ${snakeArr[i][1]}/${snakeArr[i][0]}" ></div>`;

    }

    //If snake Collides itself
    for(i=0;i<snakeArr.length;i++)
    {
        if(i!=0 && snakeArr[0][1]===snakeArr[i][1] && snakeArr[0][0]===snakeArr[i][0])
        {
          gameOver=true;
        }
    }



    playboard.innerHTML= html;
}
foodPos();
Interval = setInterval(gameEngine, 200);

document.addEventListener("keydown", changeDirection);



