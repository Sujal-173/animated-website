let counter = document.querySelector("#counter")
let container = document.querySelector("#container")
let coutn = 10 ;
setInterval (function(){
    if(coutn>=1){
        counter.textContent =`wait for ${coutn} sec .....`;
        coutn--;
    }
       else if(coutn == 0 ){
           let h1 = document.createElement('h1')
           h1.textContent = "welcome to my world"
           counter.remove();
           container.appendChild (h1)
           coutn--;
        }},1000) ; 
        