let userScore = 0 ;
let comScore = 0 ;
let draw = 0 ;
let computerChoice;
let UserChoice ;

const choices = document.querySelectorAll(".choice")
let msg = document.querySelector("#msg")
let playerScore = document.querySelector("#you-score")
let computerScore = document.querySelector("#computer-score")
let drawScore = document.querySelector("#draw")
let reset = document.querySelector("#reset")

// let refresh = 

let genratecomputerChoices = function(){
    let num = Math.floor(Math.random()*3)
    console.log(num)
    if(num ==1){
        computerChoice = "rock";
    } else if (num == 2){
        computerChoice = "paper";
    } else {
        computerChoice = "scissor";
    }
    return computerChoice;
    
}

let check = function(){
    console.log(UserChoice);
    console.log(computerChoice);
    
            if(UserChoice===computerChoice){
                msg.textContent = "Game is Draw";
                draw++;
                drawScore.textContent = draw ;

            } else if((UserChoice ==='rock' && computerChoice==='scissor') || (UserChoice ==='paper' && computerChoice==='rock')||(UserChoice ==='scissor' && computerChoice==='paper')){
                msg.textContent ="You won the game";
                userScore++;
                playerScore.textContent = userScore ;

            } else {
                msg.textContent = "Computer won the game";
                comScore++;
                computerScore.textContent = comScore ;
            }
        };

choices.forEach((choice)=>{
    
    choice.addEventListener("click",()=>{
        UserChoice = choice.getAttribute("id");
        computerChoice = genratecomputerChoices();
        check();
        setTimeout(()=>{
        msg.textContent = "Play your move"
        },2000) ;
    })
})


let gameReset = reset.addEventListener("click",()=>{
    userScore = 0 ;
    comScore = 0 ;
    draw = 0 ;
    msg.textContent = "Play your move";
    computerScore.textContent = comScore;
    playerScore.textContent = userScore ;
    drawScore.textContent = draw ;
})