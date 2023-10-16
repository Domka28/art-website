// navbar

let mobileMenuBtn = document.querySelector("#mobile-menu-btn");
let mobileMenu = document.querySelector(".mobile-menu");
mobileMenuBtn.addEventListener("click", () => {
    if (mobileMenu.style.display === "none") {
        mobileMenu.style.display = "flex";
        mobileMenuBtn.innerHTML = '<i class="gg-close"></i>';
    }
    else {
        mobileMenu.style.display = "none";
        mobileMenuBtn.innerHTML = '<i class="gg-menu"></i>';
    }
});

export function renderBasket() {
    const basketCounter = document.querySelector(".counter")
    let items = JSON.parse(localStorage.getItem('basketIds')) || [];
    let counter = 0;
    items.forEach(element => {
        counter += element[1]
    });
    basketCounter.innerText = counter;
}

renderBasket()