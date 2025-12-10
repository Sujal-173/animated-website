h1 = document.querySelector("h1")

function changecolor(color , delay){
    return new Promise ((resolve , reject)=> {
        setTimeout(() => {
            h1.style.color = color ;
            resolve("color changed")
        }, delay);
    })
}

changecolor("red" , 2000)
.then(()=>{
    console.log("color changes to red")
    return changecolor("orange" , 2000)
})
.then(()=>{
    console.log("color changes to orange")
    return changecolor("yellow",1000)
})

.then(()=>{
    console.log("color changed  to yellow")
})
.catch((err)=>{
    console.log(err)
})