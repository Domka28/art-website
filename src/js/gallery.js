import { gallery } from "./data.js"

const galleryPortraits = document.querySelector(".gallery-portraits")
const galleryAnimals = document.querySelector(".gallery-animals")
const galleryWatercollor = document.querySelector(".gallery-watercolor")

gallery.forEach(element => {
    if (element.category === "gallery-portraits") {
        galleryPortraits.innerHTML += getGalleryElement(element)
    }
    if (element.category === "gallery-animals") {
        galleryAnimals.innerHTML += getGalleryElement(element)
    }
    if (element.category === "gallery-watercolor") {
        galleryWatercollor.innerHTML += getGalleryElement(element)
    }
})

function getGalleryElement(element) {
    return `<div class="img-container img-border">
    <img src=${element.image} alt=${element.title}>
</div>`
}
