const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const green = document.getElementById("green");
const autobtn = document.querySelector("#autoBtn");
const manualbtn = document.querySelector("#manualBtn");
const manualControls = document.querySelector("#manualControls");
const emergency = document.getElementById("emergencyBtn");
const counter = document.querySelector("#counter");
const car = document.querySelector(".car");
const signal = document.querySelectorAll('[data-light]');
let autoInterval = null;
let count = 5;

function AutoMode(){
  clearInterval(autoInterval);
  let LightInterval = ["red" , "yellow" , "green"]
  let Index = 0 ;
  SetColor(LightInterval[Index]);
   autoInterval = setInterval(()=>{
   Index = ( Index + 1 ) % LightInterval.length;
    SetColor(LightInterval[Index]);
  },3000)
}

function SetColor(color){
  red.classList.remove("red")
  yellow.classList.remove("yellow")
  green.classList.remove("green")

  if(color==='red'){
    red.classList.add("red")
  }
  if(color==='yellow'){
    yellow.classList.add("yellow")
  }
  if(color==='green'){
    green.classList.add("green")
    movecar();
  } else{
    stopcar();
  }
}

manualbtn.addEventListener("click",()=>{
  manualControls.style.display = "initial"
  clearInterval(autoInterval);
})

autobtn.addEventListener("click",()=>{
  manualControls.style.display = "none"
  AutoMode();
})

emergency.addEventListener("click",()=>{
  manualControls.style.display = "none"
  clearInterval(autoInterval);
  SetColor("green");
})

signal.forEach(btn =>{
  btn.addEventListener("click",()=>{
    const light = btn.getAttribute("data-light");
    SetColor(light);
  })
})

function movecar(){
  car.style.left = "85%";
}

function stopcar(){
  car.style.left = "0%";
}