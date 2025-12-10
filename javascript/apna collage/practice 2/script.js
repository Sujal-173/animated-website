let btn = document.querySelector('button')
let div = document.querySelector('div')
btn.addEventListener('click',function(){
    let randomcolor = getrandomcolor()
    div.style.backgroundColor = randomcolor
    console.log(randomcolor)
})


function getrandomcolor(){
    let red = Math.floor(Math.random()* 255)
    let green = Math.floor(Math.random()* 255)
    let blue = Math.floor(Math.random()* 255)
    let color = `rgb(${red},${green},${blue})`
    return color;
}