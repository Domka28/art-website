let navigation = document.querySelector(".navigation-container")
navigation.innerHTML = `<nav>
<div class="logo-name">
<a href="index.html">
<img class="logo" src="src/img/logo2.png" alt="logo">
</a>
<a class="logo-text" href="index.html">ruda wiewiórka art</a>
</div>
<div class="links">
    <li class="navigation-item">
        <a class="link" href="index.html">strona główna</a>
    </li>
    <li class="navigation-item">
        <a class="link" href="gallery.html">galeria</a>
    </li>
    <li class="navigation-item">
        <a class="link" href="contact.html">kontakt</a>
    </li>
    <li class="navigation-item nav-basket">
        <a class="link" href="basket.html">koszyk</a>
        <span class="counter">0</span>
    </li>
 
    <strong id="mobile-menu-btn"><i class="gg-menu"></i></strong>
</div>
</nav>

<div class="mobile-menu" style="display: none;"> 
<li class="navigation-item">
    <a href="index.html">strona główna</a>
</li>
<li class="navigation-item">
    <a href="gallery.html">galeria</a>
</li>
<li class="navigation-item">
    <a href="contact.html">kontakt</a>
</li>
<li class="navigation-item nav-basket">
    <a href="basket.html">koszyk</a>
    <span class="counter">0</span>
</li>
</div>`

let mobileMenuBtn = document.querySelector("#mobile-menu-btn");
let mobileMenu = document.querySelector(".mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
    if (mobileMenu.style.display === "none" || mobileMenu.style.display === "") {
        mobileMenu.style.display = "flex";
        mobileMenuBtn.innerHTML = '<i class="gg-close""></i>';
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
