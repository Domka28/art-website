import { renderBasket } from "./app.js"
import { data } from "./data.js"

//home 

const framesList = document.querySelector(".list-frames")
const portraitsList = document.querySelector(".list-portraits")
const animalsList = document.querySelector(".list-animals")

data.forEach(element => {
    if (element.category === "frames") {
        framesList.innerHTML += getBoxElement(element)
    }
    if (element.category === "portraits") {
        portraitsList.innerHTML += getBoxElement(element)
    }
    if (element.category === "animals") {
        animalsList.innerHTML += getBoxElement(element)
    }
})

function getBoxElement(element) {
    return `<div class="box">
    <div class="img-container">
        <img src="${element.image}" alt=${element.title}>
    </div>
    <div class="box-body">
        <p class="box-title">${element.title}</p>
        <p><b>Cena</b>: ${element.price}zł</p>
        <button class="button box-button" data-id="${element.id}" >Dodaj
            do koszyka</button>
    </div>
</div>`
}

let basketArray = [];

const addToBasket = (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    const id = Number(e.target.dataset.id);

    if (localStorage.getItem('basketIds') === null) {
        basketArray.push(id)
        localStorage.setItem('basketIds', JSON.stringify(basketArray));

    } else {
        let basketArrayFromLocalStorage = JSON.parse(localStorage.getItem("basketIds"))
        basketArrayFromLocalStorage.push(id)
        localStorage.setItem('basketIds', JSON.stringify(basketArrayFromLocalStorage));
    }



    renderBasket()
}



const boxButtons = document.querySelectorAll(".box-button")
boxButtons.forEach(button => {
    button.addEventListener("click", addToBasket)
})



//po kliknięciu w ten przycisk chcę dodać  coś takiego jak button.setAttribute('disabled', 'true');
//żeby nie było możliwości dodania drugi raz takiej samej rzeczy lub żeby po kliknięciu w dodanie zmieniał się też
//licznik w koszyku

