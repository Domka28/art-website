import { data } from "./data.js";

//walidacja inputów
const validateName = (value) => {
    if (!value) return 'Imię i nazwisko jest wymagane';
    if (value.length < 3) return 'Imię i nazwisko jest za krótkie';
}
const validateEmail = (value) => {
    if (!value) return 'E-mail jest wymagany';
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) return 'E-mail nie jest poprawny';
}
const validateEmailConfirm = (value, email) => {
    if (value !== email) return 'E-maile się nie zgadzają';
}
const validateTel = (value) => {
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

function getAllItems() {
    let allItems = [];
    //iterowanie po itemsach wyciągając z nich tytuł, ilośc i cenę 
    items.forEach(item => {
        data.filter(el => el.id === item[0]).forEach(element => allItems.push({
            "quantity": item[1], "title": element.title, "price": element.price
        }))
    });
    return allItems;
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
    let price = localStorage.getItem('totalPrice') || 0;

    const hasErrors = validateValues(values);
    if (!hasErrors) {
        const items = getAllItems();
        const orderedItems = items.map(item => {
            return `zamówiony produkt: ${item.title}, ilość: ${item.quantity}`;
        });

        const summaryTable = `${orderedItems.join('\n')}`;
        const templateParams = {
            form_name: values.name,
            form_email: values.email,
            form_tel: values.tel,
            form_add_info: elements['textarea'].value,
            summary: summaryTable,
            price: price,
            order_date: new Date().toLocaleString(),
        }
        sendOrderEmail(templateParams)
    }
}

function sendOrderEmail(templateParams) {
    var data = {
        service_id: 'service_rr2lidm',
        template_id: 'template_6k29gab',
        user_id: 'JheUf4saOvQd_DdBq',
        template_params: templateParams
    }

    fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(resp => {
            if (resp.status === 200) {
                // czyszczenie localstorage czyli koszyka i totalprice
                localStorage.removeItem('basketIds');
                localStorage.removeItem('totalPrice');
                window.location.href = '/order-confirmation.html'
            }
        }).catch(e => console.log(e))
}

// podpięcie formularza
document.querySelector('form').addEventListener('submit', onSubmit);

// wyświetl podsumowanie (produty)
const itemsContainer = document.querySelector('#items-list');

//pobranie z pamięci itemsów, które są w koszyku
let items = JSON.parse(localStorage.getItem('basketIds')) || [];

//generowanie itemsów w podsumowaniu
const showProducts = (element) => {
    let products = getAllItems();
    const html = products
        .map(p => `<li>${p.quantity} x "${p.title}"</li>`)
        .join('');
    element.innerHTML = html;
}
showProducts(itemsContainer);

// wyświetl cene całkowitą
const priceContainer = document.querySelector('#total-price-confirmation');
//pobieram z local storage cenę całkowitą i ustawiam
priceContainer.innerText = localStorage.getItem('totalPrice') || 0;

