let searchInput = document.querySelector("#searchInput");
let searchBtn = document.querySelector(".searchBtn");
let div = document.createElement("div")
div.classList.add("details")
let divParent = document.querySelector(".text")
divParent.appendChild(div)
const final = (getDatas = async (SearchValue) => {
    let data = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${SearchValue}`
    );
    let finalData = await data.json();
    const meaning = finalData[0].meanings[0].definitions[0].definition;
    const word = finalData[0].word;
    const Synonyms = finalData[0].meanings[0].synonyms[0];
    const phonetics = finalData[0].phonetics[0].text
    const example = finalData[0].meanings[0].definitions[0].example ;
    const partsOfspeech = finalData[0].meanings[0].partOfSpeech 
    const url = finalData[0].sourceUrls[0]
    div.innerHTML = `
                <h2> Word : <span>${word}</span></h2>
                <p class = "POS">${partsOfspeech}</p>
                <p> Phonetic : <span>${phonetics == undefined ? "not available" : phonetics}</span></p>
                <p>Meaning : <span>${meaning}</span></p>
                <p>Example : <span>${example == undefined ? "not available" : example}</span></p>
                <p>Synonyms : <span>${Synonyms}</span></p>
                <a href="${url}" target="_blank">Read more</a>`          
    console.log(finalData);
    console.log(url);
});


searchBtn.addEventListener("click", () => {
    let SearchWord = searchInput.value;
    if (SearchWord === "") alert("Please Enter valid word ...!!");
    else {
        div.innerHTML = ""
        getDatas(SearchWord);
    }
});
