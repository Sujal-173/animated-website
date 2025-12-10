function getData(data){
    setTimeout(()=>{
        console.log(data)
    },2000)
}

// callback hell
// getData("sujal",()=>{
//     getData(2,()=>{
//         getData(3,()=>{
//             getData(4)
//         })
//     })
// })

//promises
let promise = new Promise((resolve,reject)=>{
    resolve(123)
})

promise
.then(() => {
    getData("sujal")
}).then(()=>{
    getData("jayu")
})
.catch((err) => {
    console.log(err)
});