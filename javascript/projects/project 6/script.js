let count = 0;
let h2 = document.querySelector('h2');
let progressBar = document.getElementById('progressbar');
let percentText = document.getElementById('percentText');

setInterval(function(){
    if(count <100){
        count++;
        progressBar.style.width = count + '%';
        percentText.textContent = count + '%';
    }
    else if(count === 100){
        h2.textContent = 'Download Completed';
    }
}, 30);