let gameSeq = [] ; 
let userSeq = [] ;

let btns = ["yellow" , "blue" , "red" , "green"]

let started = false;
let isAnimating = true;
let level = 0;

let h2 = document.querySelector("h2")
let score = document.querySelector("h3")
let highScore = document.querySelector(".highScore")
let body = document.querySelector("body")
let resetBtn = document.getElementById("reset");

resetBtn.addEventListener("click", function() {
    localStorage.removeItem("highScore");
    highScore.textContent = `High Score - 0`;
});

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started")
        started = true ;
        levelup();
    }
})

function showSequence(){
    let i = 0;
    isAnimating = true; 
    let interval = setInterval(function(){
        let currentColor = gameSeq[i];
        let currentBtn = document.querySelector(`.${currentColor}`);
        btnFlash(currentBtn)

        i++;
        if(i >= gameSeq.length){
            clearInterval(interval);
            isAnimating = false;
        }
    }, 600 - (level*20)); 
}

let scores = 0 ;
let highScores = localStorage.getItem("highScore") ||0 ;
highScore.textContent = `High Score - ${highScores}`;

function levelup(){
    userSeq = [] ;
    level++;
    score.textContent =`your score - ${scores}`
    scores += 50;
    h2.textContent = `level ${level}`;
    let randomNum = Math.floor(Math.random()*4);
    let randomClass = btns[randomNum];
    let randomBtn = document.querySelector(`.${randomClass}`);
    gameSeq.push(randomClass)
    console.log(gameSeq);
    showSequence(); 
}

function btnFlash(btn){
    btn.classList.add("flash")
    setTimeout(function(){
        btn.classList.remove("flash")
    },400)
} 

function UserFlash(btn){
    btn.classList.add("Userflash")
    setTimeout(function(){
        btn.classList.remove("Userflash")
    },150)
} 

let allBtns = document.querySelectorAll(".btn") 

function BtnPress(){
    let btn = this;
    UserFlash(btn); 
    let userColor = btn.getAttribute('id')
    userSeq.push(userColor)
    checking(userSeq.length-1);
}

for(btn of allBtns){
    btn.addEventListener("click",BtnPress);  
}

function checking(index){
    if(userSeq[index] === gameSeq[index]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelup,100)
        }
    } else {
        h2.textContent = "Game Over ! press any key to Restart"
        body.style.backgroundColor = "red"
        setTimeout(function(){
            body.style.backgroundColor = "#fff"
        },150)
         if (scores > highScores) {
            highScores = scores;
            localStorage.setItem("highScore", highScores);
            highScore.textContent = `High Score - ${highScores}`;
        } 
        Restart();
      }
}
  
function Restart(){
    userSeq=[];
    gameSeq=[];
    level = 0;
    scores = 0;
    started = false;
    highScore.textContent = `High Score - ${highScores}`;

}

