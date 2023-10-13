import { renderBasket } from "./app.js";
import { data } from "./data.js";


const itemsContainer = document.querySelector('#items');
const totalPrice = document.querySelector('#total-price')

//pobranie z pamięci id itemsów w koszyku
let items = JSON.parse(localStorage.getItem('basketIds')) || [];


//iterowanie po itemsach oraz wywołanie funkcji dodawania do koszyka
items.forEach(item => {
    data.filter(el => el.id === item).forEach(element => addItem(element))
});

function addItem(item) {
    itemsContainer.innerHTML += `<tr data-product-id="${item.id}">
            <td><button class="delete" data-id="${item.id}">x</button></td>
            <td>${item.title}</td>
            <td><input class="quantity" type="number" value="1"></td>
            <td><p class="basket-price">${item.price}</p></td>
          </tr>`;
}


//pobranie buttona do usuwania oraz niżej funkcja usuwająca wiersze
const deleteBtns = document.querySelectorAll(".delete")

function removeFromBasket(e) {
    if (e.target.tagName !== 'BUTTON') return;
    const id = Number(e.target.dataset.id);

    let updatedItems = items.filter(element => element !== id)
    console.log(items)
    console.log(updatedItems)
    localStorage.setItem('basketIds', JSON.stringify(updatedItems))

    renderBasket()
    location.reload();
}

deleteBtns.forEach(element => element.addEventListener("click", removeFromBasket))

//dodanie total-price
let totalPriceCounter = 0;
items.forEach(item => {
    data.filter(el => el.id === item).forEach(element => {
        totalPriceCounter += Number(element.price)
    })
});
totalPrice.innerText = totalPriceCounter

//dezaktywacja przycisku dalej
const goToSummaryButton = document.getElementById('go-to-summary');

goToSummaryButton.addEventListener('click', function (event) {
    if (totalPriceCounter === 0) {
        event.preventDefault();
        alert("Nie możesz przejść dalej, ponieważ Twój koszyk jest pusty.");
    }
});




//zmiana ilości powinna dodawać też te produkty do arraya, bo po długości tego arraya jest naliczany górny counter

//potrzebne jest ponowne renderowanie po usunięciu elementu oraz usuwanie tylko tego jednego elementu,
//a nie wszystkich o tym id 

