const prevButtonEl = document.getElementById("-1");
const nextButtonEl = document.getElementById("1");

let counter = 0

prevButtonEl.addEventListener("click", slideshow_manual)
nextButtonEl.addEventListener("click", slideshow_manual)

const retter = [{navn: "Grooov Burger", bilde: "slideshow_burger.jpg"},
                {navn: "Syyykt Flatbrød", bilde: "slideshow_flatbrod.jpg"},
                {navn: "Heftig Kebab", bilde: "slideshow_kebab.jpg"}];

// Funksjon som tar inn klikket element som argument og caller slideshow med verdien
function slideshow_manual(e) {
    clicked_value = Number(e.target.value)
    slideshow(clicked_value)
}

// Funksjon som repeterer 
function slideshow_automatic() {
    slideshow(1)
    setTimeout("slideshow_automatic()", 4500);
}

// Funksjon som endrer bilde og tekst i header på index-siden basert på value
function slideshow(value) {
    let bakgrunnEl = document.getElementById("bakgrunn");
    let rettnavnEl = document.getElementById("rettnavn");

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