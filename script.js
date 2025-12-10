function navAnimation() {
    let nav = document.querySelector("nav")
    nav.addEventListener("mouseenter", () => {
        let tl = gsap.timeline()
        tl.to("#nav-bottom", {
            height: "21vh",
            duration: 0.5,
        })
        tl.to(".nav-part2 h5", {
            display: "block",
            duration: 0.1,
        })
        tl.to(".nav-part2 h5 span", {
            y: 0,
            // duration: 0.3,
            stagger: {
                amount: 0.5
            }
        })
    })

    nav.addEventListener("mouseleave", () => {
        let tl = gsap.timeline()

        tl.to(".nav-part2 h5 span", {
            y: 25,
            // duration: 0.3,
            stagger: {
                amount: 0.2
            }
        })
        tl.to(".nav-part2 h5", {
            display: "none",
            duration: 0.1,
        })
        tl.to("#nav-bottom", {
            height: 0,
            duration: 0.2,
        })
    })
}

function mouseanimation() {
let relem = document.querySelectorAll(".right-elem");
let relemImg;

relem.forEach((element)=>{

    element.addEventListener("mouseenter", () => {
        relemImg = element.childNodes[3]
        gsap.to(relemImg,{
            opacity : 1 ,
            scale : 1 ,
        })
    })
    
    element.addEventListener("mouseleave", () => {
        gsap.to(relemImg,{
            opacity : 0 ,
            scale : 0 ,
        })
    })
    element.addEventListener("mousemove", (dets) => {
        // console.log(dets);
        gsap.to(relemImg,{
            x : dets.clientX - element.getBoundingClientRect().left - relemImg.width/2 ,
            y : dets.clientY - element.getBoundingClientRect().top - relemImg.height/2 - 50,
        })
    })
})
}

function Page3ShowReel(){
    let showreel = document.querySelector(".page-center");
    let vedio = document.querySelector("#page3 video");
    showreel.addEventListener("click",()=>{
        vedio.play();
        vedio.style.opacity = 1;
        vedio.style.transform = "scale(1)";
        vedio.style.boarderRadius = "0px";
    })
    vedio.addEventListener("click",()=>{
        vedio.pause();
        vedio.style.opacity = 0;
        vedio.style.transform = "scaleX(0.4) scaleY(0)";
        vedio.style.boarderRadius = "30px";
    }
)}

function videoAutoPlay(){
    let sections = document.querySelectorAll(".sec-right");

    sections.forEach((elem)=>{
        elem.addEventListener("mouseenter",()=>{
            let vedio = elem.querySelector("video");
            vedio.style.opacity = 1;
            vedio.play();
        })
        elem.addEventListener("mouseleave",()=>{
            let vedio = elem.querySelector("video");
            vedio.style.opacity = 0;
            vedio.currentTime = 0;
            vedio.pause();
        })
    })
}

function page6BottomAnimation(){
    gsap.from("#btm6-part2 h4", {
        x : 0 , 
        duration : 1 ,
        scrollTrigger : {
            trigger : "#btm6-part2 h4" ,
            start : "top 80%" , 
            end : "bottom 60%" ,
            scrub : 1 ,
        },
    })

    gsap.from("#btm6-part3 h4", {
        x : 0 , 
        duration : 1 ,
        scrollTrigger : {
            trigger : "#btm6-part3 h4" ,
            start : "top 90%" , 
            end : "bottom 60%" ,
            scrub : 1 ,
        },
    })

    gsap.from("#btm6-part4 h4", {
        x : 0 , 
        duration : 1 ,
        scrollTrigger : {
            trigger : "#btm6-part4 h4" ,
            start : "top 80%" , 
            end : "bottom 60%" ,
            scrub : 1 ,
        },
    })
}

videoAutoPlay();
mouseanimation(); 
navAnimation();
Page3ShowReel();
page6BottomAnimation();

