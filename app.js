const BASE_URL =
  "https://api.frankfurter.app/latest?amount=1&from=USD&to=INR";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".submitButton");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const fMsg = document.querySelector(".resultMessage");
const ikon = document.querySelector("i");



window.addEventListener("load", () => {
    updateExchangeRate();
})

for(let select of dropdowns){
    for ( currencyCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        select.append(newOption);
        if(select.name === "from" && currencyCode === "USD"){
            newOption.selected = "selected";
        }
        if(select.name === "to" && currencyCode === "INR"){
            newOption.selected = "selected";
        }

        
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    console.log(element.value);
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",  (evt) => {
    evt.preventDefault();
    updateExchangeRate();
    

});


const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }


    // console.log(fromCurr.value.toLowerCase() , toCurr.value);
    const URL = `https://api.frankfurter.app/latest?amount=${amtVal}&from=${fromCurr.value.toLowerCase()}&to=${toCurr.value.toLowerCase()}`;
    let response = await fetch(URL);    
    let data = await response.json();
    let rate = data['rates'][toCurr.value]
    console.log(data);
    console.log(rate);


    fMsg.innerText = `${amtVal}${fromCurr.value}=${rate}${toCurr.value}`;

}

ikon.addEventListener("click", () =>{
    const tempValue = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tempValue;

    updateFlag(fromCurr);
    updateFlag(toCurr);

    updateExchangeRate();
    
})


