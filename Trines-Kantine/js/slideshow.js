const prevButtonEl = document.getElementById("-1");
const nextButtonEl = document.getElementById("1");

let counter = 0

prevButtonEl.addEventListener("click", slideshow_manual)
nextButtonEl.addEventListener("click", slideshow_manual)

const retter = [{navn: "Grooov Burger", bilde: "slideshow_burger.jpg"},
                {navn: "Syyykt Flatbrød", bilde: "slideshow_flatbrod.jpg"},
                {navn: "Heftig Kebab", bilde: "slideshow_kebab.jpg"}];

function slideshow_manual(e) {
    clicked_value = Number(e.target.value)
    slideshow(clicked_value)
}

function slideshow_automatic() {
    slideshow(1)
    setTimeout("slideshow_automatic()", 4500);
}

function slideshow(value) {
    let bakgrunnEl = document.getElementById("bakgrunn");
    let rettnavnEl = document.getElementById("rettnavn");
    if (value != 1 || value != -1) {
        value = 1
    }

    counter += value
    
    if (counter < 0) {
        counter = retter.length - 1;
    } else if (counter == retter.length) {
        counter = 0;
    }

    bakgrunnEl.style.background = `url('img/${retter[counter].bilde}') no-repeat center center/cover`;
    rettnavnEl.innerText = retter[counter].navn
}

window.onload = slideshow_automatic;