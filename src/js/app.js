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

console.log("sdbdnf")