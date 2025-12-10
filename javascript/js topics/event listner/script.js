// let h1 = document.querySelector("h1")
// h1.addEventListener("click", function(){
//     h1.style.color = "red"
// })

// let p = document.querySelector("p")
// function changecolor(){
//     p.style.color="green"
// }
  
// p.addEventListener("click",changecolor)

// p.addEventListener("dblclick",function(){
//     p.style.color="";
// })

// let input = document.querySelector("input")

// const par = document.querySelector(".cls")
// input.addEventListener("input",function(event){
//     console.log(event.target.value);
//     if(event.data!=null || event.target.value.trim() !== ""){
//         par.innerHTML = " ";
//    par.innerHTML +=`<h3>${event.target.value} is pressed` }
// })

// let  h1 = document.querySelector("h1")
// let sel = document.querySelector("select");
// sel.addEventListener("change",function(event){
//     console.log(event.target.value);
//     h1.textContent = event.target.value + " is selected";
// });

// let h1 = document.querySelector("h1")
// window.addEventListener("keydown",function(event){
//     console.log(event.key);
//     h1.textContent = event.key;
// })

let input = document.querySelector("input")
let btn = document.querySelector("#btn")

input.addEventListener("change", function (event) { 
    let file = event.target.files[0];
    if(!file) {
        btn.textContent = "No file chosen";
    } else{
     btn.textContent = file.name;
    }
})

btn.addEventListener("click", function () {
    input.click();
})
