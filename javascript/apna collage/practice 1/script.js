let p = document.createElement("p")
let h3 = document.createElement('h3')
let body = document.querySelector('body')
h3.textContent = "hey i'am a blue."
document.querySelector('body').append(h3)
h3.classList.add('h3')
p.textContent = "Hey i'am red."
document.querySelector('body').append(p)
p.classList.add("p")

let div = document.createElement('div')
let heading = document.createElement('h1')
let para = document.createElement('p')
heading.textContent = "I'am in a div"
para.textContent = "ME TOO"
div.classList.add('div')
body.append(div)
div.append(heading,para)
