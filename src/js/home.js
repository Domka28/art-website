import { renderBasket } from "./app.js"
import { data } from "./data.js"

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
    <div class="img-container-home">
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

let basketMap = new Map();

const addToBasket = (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    const id = Number(e.target.dataset.id);
    let storedBasket = localStorage.getItem('basketIds');

    if (storedBasket === null) {
        basketMap.set(id, 1);
    } else {
        //jeśli istnieją już dane w local stroge to pobieram je i przekształcam w mapę
        basketMap = new Map(JSON.parse(storedBasket));
        // sprawdzam, czy obiekt o danym id już istnieje
        if (basketMap.has(id)) {
            // jeśli istnieje to zwiększam liczbę produktów 
            basketMap.set(id, basketMap.get(id) + 1);
        } else {
            // Jeśli nie, dodaję nowy produkt
            basketMap.set(id, 1);
        }
    }
    // Zapisuję zaktualizowaną mapę w localStorage jako obiekt JSON
    localStorage.setItem('basketIds', JSON.stringify([...basketMap]));
    renderBasket()
}

const boxButtons = document.querySelectorAll(".box-button")
boxButtons.forEach(button => {
    button.addEventListener("click", addToBasket)
})
