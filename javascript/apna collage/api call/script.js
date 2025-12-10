const dropDown = document.querySelectorAll(".dropDown select");
let FromFlag = document.querySelector("#from");
let ToFlag = document.querySelector("#to");
let button = document.querySelector("form button");
let input = document.querySelector("form input");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg")

for (let select of dropDown) {
  for (code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    if (select.name === "from" && code === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && code === "INR") {
      newOption.selected = "selected";
    }
    select.appendChild(newOption);
  }
  select.addEventListener("change", (e) => {
    UpdateFlag(e.target);
  });
}

const UpdateFlag = (element) => {
  let CurrCode = element.value;
  let countryCode = countryList[CurrCode];
  let NewSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = NewSrc;
};

button.addEventListener("click", async (e) => {
  e.preventDefault();
  let amount = input.value;
  if (amount === "" || amount <= 0) {
    amount = 1;
    input.value = "1";
  }
  getRate(`${fromCurr.value.toLowerCase()}`, `${toCurr.value.toLowerCase()}`);
});

async function getRate(from,to) {
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`;

  let response = await fetch(url);
  let data = await response.json();
  // console.log(data.from.to)
  let rate = data[from][to];
  let finalRate = rate*input.value
  msg.textContent = input.value + ` ${from.toUpperCase()}` + " → " + Number(finalRate.toFixed(3))+ ` ${to.toUpperCase()}`
}