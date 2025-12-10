let inp = document.querySelector("input")
let ul = document.querySelector("ul") 
let btn = document.querySelector("button")
let addtask = document.querySelector(".addtsk")

function todo(){
    let li = document.createElement("li")
    li.textContent = `${inp.value}`
    ul.appendChild(li)
    inp.value = ""
    
    let delbtn = document.createElement("button")
    delbtn.textContent = "DELETE"
    li.appendChild(delbtn)
}

btn.addEventListener("click",todo)

ul.addEventListener("click", function(e){
    console.log(e);
    
    if(e.target.nodeName == 'BUTTON'){
        e.target.parentElement.remove()
    }
})
inp.addEventListener("keydown",function(e){
    // console.dir(e)
    if(e.key === "Enter"){
        todo()
    }
})

