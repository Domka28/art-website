
const dateContianer = document.querySelector('#date');

const showOrderDate = (element) => {
    const d = new Date();
    element.innerHTML = d.toLocaleString();
}
showOrderDate(dateContianer);