const requstedUrl = "https://api.github.com/users/hiteshchoudhary" 
const xhr = new XMLHttpRequest();
xhr.open("GET", requstedUrl);
xhr.onreadystatechange = function() {
    
    if(xhr.readyState=== 4) {
        const data = JSON.parse(xhr.response);
        console.log(data.avatar_url);
    }
}
xhr.send();
