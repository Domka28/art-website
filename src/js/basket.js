import { renderBasket } from "./app.js";
import { data } from "./data.js";

const itemsContainer = document.querySelector('#items');
const totalPrice = document.querySelector('#total-price')

let items;
//pobranie z pamięci id itemsów w koszyku
function refreshLocalStorage() {
    items = JSON.parse(localStorage.getItem('basketIds')) || [];
}
//iterowanie po itemsach oraz wywołanie funkcji dodawania do koszyka
function renderBasketList() {
    refreshLocalStorage();
    items.forEach(item => {
        data.filter(el => el.id === item[0]).forEach(element => addItem(item[1], element))
    });
}

function addItem(quantity, item) {
    console.log('add item')
    itemsContainer.innerHTML += `<tr data-product-id="${item.id}">
            <td><button class="delete" data-id="${item.id}">x</button></td>
            <td>${item.title}</td>
            <td><div class="quantity">${quantity}</div></td>
            <td><p class="basket-price">${item.price}</p></td>
          </tr>`;
}

function removeFromBasket(e) {
    console.log(e.target)
    if (!e.target.classList.contains('delete')) return;
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
    itemsContainer.innerHTML = ``;
    render()
}

document.addEventListener("click", removeFromBasket);

//dodanie total-price
function updateTotalPrice() {
    let totalPriceCounter = 0;
    items.forEach(item => {
        data.filter(el => el.id === item[0]).forEach(element => {
            totalPriceCounter += Number(element.price * item[1])
        })
    });
    totalPrice.innerText = totalPriceCounter
    //ustawiam sobie tę cenę do localstorage
    localStorage.setItem('totalPrice', JSON.stringify(totalPriceCounter));
}

//dezaktywacja przycisku dalej
const goToSummaryButton = document.getElementById('go-to-summary');

goToSummaryButton.addEventListener('click', function (event) {
    if (totalPriceCounter === 0) {
        event.preventDefault();
        alert("Nie możesz przejść dalej, ponieważ Twój koszyk jest pusty.");
    }
});

function render() {
    renderBasketList()
    updateTotalPrice()
}

render()