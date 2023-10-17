import { renderBasket } from "./app.js";
import { data } from "./data.js";

const itemsContainer = document.querySelector('#items');
const totalPrice = document.querySelector('#total-price')

//pobranie z pamięci id itemsów w koszyku
let items = JSON.parse(localStorage.getItem('basketIds')) || [];
console.log("items", items)


//iterowanie po itemsach oraz wywołanie funkcji dodawania do koszyka
items.forEach(item => {
    data.filter(el => el.id === item[0]).forEach(element => addItem(item[1], element))
});

function addItem(quantity, item) {
    console.log('add item')
    itemsContainer.innerHTML += `<tr data-product-id="${item.id}">
            <td><button class="delete" data-id="${item.id}">x</button></td>
            <td>${item.title}</td>
            <td><div class="quantity">${quantity}</div></td>
            <td><p class="basket-price">${item.price}</p></td>
          </tr>`;
}

//pobranie buttona do usuwania oraz niżej funkcja usuwająca wiersze
const deleteBtns = document.querySelectorAll(".delete")

function removeFromBasket(e) {
    if (e.target.tagName !== 'BUTTON') return;
    const id = Number(e.target.dataset.id);

    // Dane, które są aktualnie w local storage
    let storedBasket = localStorage.getItem('basketIds');

    if (storedBasket) {
        // Przerobienie danych, by można było użyć map()
        let basketMap = new Map(JSON.parse(storedBasket));

        // Sprawdzenie, czy dany przedmiot istnieje w koszyku
        if (basketMap.has(id)) {
            if (basketMap.get(id) > 1) {
                // Zmniejsz ilość danego przedmiotu o 1
                basketMap.set(id, basketMap.get(id) - 1);
            } else {
                // Usuń wiersz z koszyka, jeśli ilość spadnie do zera
                basketMap.delete(id);
            }
            // Zaktualizuj dane w local storage
            localStorage.setItem('basketIds', JSON.stringify([...basketMap]));
            renderBasket()
        }
    }

    // Przeładuj stronę i zaktualizuj koszyk
    location.reload();
}


// document.addEventListener("click", function (evnt) {
//     console.log(evnt.target);
// });

deleteBtns.forEach(element => element.addEventListener("click", removeFromBasket))

//dodanie total-price
let totalPriceCounter = 0;
items.forEach(item => {
    data.filter(el => el.id === item[0]).forEach(element => {
        totalPriceCounter += Number(element.price * item[1])
    })
});
totalPrice.innerText = totalPriceCounter
//ustawiam sobie tę cenę do localstorage
localStorage.setItem('totalPrice', JSON.stringify(totalPriceCounter));



//dezaktywacja przycisku dalej
const goToSummaryButton = document.getElementById('go-to-summary');

goToSummaryButton.addEventListener('click', function (event) {
    if (totalPriceCounter === 0) {
        event.preventDefault();
        alert("Nie możesz przejść dalej, ponieważ Twój koszyk jest pusty.");
    }
});




//odświeżanie/renderowanie poszczególnych elementów zamiast ładowania całej strony z każdą zmianą 
