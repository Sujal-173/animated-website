let input = document.querySelectorAll("input")
let x = document.querySelector("form")    
let main = document.querySelector("#main")
let data = x.addEventListener("submit",function(event){
    event.preventDefault();
    
    let card = document.createElement("div")
    card.classList.add("card") 

    let profile = document.createElement("div")
    profile.classList.add("profile")

    card.appendChild(profile)
    profile.classList.add("profile")

    let img = document.createElement("img")
    
    let file = input[3].files[0]
    if(file){
        let reader = new FileReader()
        reader.onload = function(event){
            img.setAttribute("src", event.target.result)
        }
        reader.readAsDataURL(file)
    }

    let h3 = document.createElement("h3")
    h3.innerText = input[0].value
    let h5 = document.createElement("h5")
    h5.innerText = input[1].value
    let p = document.createElement("p")
    p.innerText = input[2].value

    profile.appendChild(img)
    card.appendChild(profile)
    card.appendChild(h3)
    card.appendChild(h5)
    card.appendChild(p)
    main.appendChild(card)
})