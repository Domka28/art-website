import { data } from "./data.js";

//walidacja inputów

const validateName = (value) => {
    if (!value) return 'Imię i nazwisko jest wymagane';
    if (value.length < 3) return 'Imię i nazwisko jest za krótkie';
}
const validateEmail = (value) => {
    if (!value) return 'Email jest wymagany';
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) return 'Email nie jest poprawny';
}
const validateEmailConfirm = (value, email) => {
    if (value !== email) return 'Emaile się nie zgadzają';
}
const validateTel = (value) => {
    console.log(value)
    if (!value) return 'Numer telefonu jest wymagany';
    if (value.length < 9) return 'Numer telefonu jest niepoprawny';
}

const validate = (key, value, allValues) => {
    switch (key) {
        case 'name': return validateName(value);
        case 'email': return validateEmail(value);
        case 'email-confirm': return validateEmailConfirm(value, allValues.email);
        case 'tel': return validateTel(value);
    }
}

const validateValues = (values) => {
    const errors = [];
    Object.entries(values).forEach(([key, value]) => {
        const error = validate(key, value, values);
        if (error) errors.push(error);
    })

    document.querySelector('#errors').innerHTML = errors
        .map(e => `<li>${e}</li>`)
        .join('');

    return errors.length > 0;
}

const onSubmit = (e) => {
    e.preventDefault();

    const elements = document.querySelector("form").elements;
    const values = {
        name: elements['name'].value,
        email: elements['email'].value,
        'email-confirm': elements['email-confirm'].value,
        tel: elements['tel'].value,

    };

    const hasErrors = validateValues(values);
    if (!hasErrors) {
        // czyszczenie localstorage czyli koszyka i totalprice
        localStorage.removeItem('basketIds');
        localStorage.removeItem('totalPrice');

        //przekierowanie na stronę podziękowań
        window.location.href = '/order-confirmation.html';
    }
}

// podpięcie formularza
document.querySelector('form').addEventListener('submit', onSubmit);


// wyswietlenie daty zamowienia
const dateContianer = document.querySelector('#date');

const showOrderDate = (element) => {
    const d = new Date();
    element.innerHTML = d.toLocaleString();
}
showOrderDate(dateContianer);

// wyświetl podsumowanie (produty)
const itemsContainer = document.querySelector('#items-list');

//pobranie z pamięci itemsów, które są w koszyku
let items = JSON.parse(localStorage.getItem('basketIds')) || [];
console.log("items", items)

let allItems = [];
//iterowanie po itemsach wyciągając z nich tytuł, ilośc i cenę 
items.forEach(item => {
    data.filter(el => el.id === item[0]).forEach(element => allItems.push({
        "quantity": item[1], "title": element.title, "price": element.price
    }))
});

//generowanie itemsów w podsumowaniu
const showProducts = (products, element) => {
    const html = products
        .map(p => `<li>${p.quantity} x "${p.title}"</li>`)
        .join('');
    element.innerHTML = html;
}
showProducts(allItems, itemsContainer);

// wyświetl cene całkowitą
const priceContainer = document.querySelector('#total-price-confirmation');
//pobieram z local storage cenę całkowitą i ustawiam
priceContainer.innerText = localStorage.getItem('totalPrice') || 0;

