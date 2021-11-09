let prevButtonEl = document.getElementById("-1");
let nextButtonEl = document.getElementById("1");

let counter = 0

prevButtonEl.addEventListener("click", slideshow_manual)
nextButtonEl.addEventListener("click", slideshow_manual)

const retter = [{navn: "Grooov Burger", bilde: "slideshow_burger.jpg"},
                {navn: "Syyykt Flatbrød", bilde: "slideshow_flatbrød.jpg"},
                {navn: "Heftig Kebab", bilde: "slideshow_kebab.jpg"}];

function slideshow_manual(e) {
    let bakgrunnEl = document.getElementById("bakgrunn");
    let rettnavnEl = document.getElementById("rettnavn");
    
    value = Number(e.target.value)
    counter += value
    
    if (counter < 0) {
        counter = retter.length - 1;
    } else if (counter == retter.length) {
        counter = 0;
    }

    bakgrunnEl.style.background = `url('img/${retter[counter].bilde}') no-repeat center center/cover`;
    rettnavnEl.innerText = retter[counter].navn
}

function slideshow_automatic() {
    let bakgrunnEl = document.getElementById("bakgrunn");
    let rettnavnEl = document.getElementById("rettnavn");

    counter += 1
    
    if (counter < 0) {
        counter = retter.length - 1;
    } else if (counter == retter.length) {
        counter = 0;
    }

    bakgrunnEl.style.background = `url('img/${retter[counter].bilde}') no-repeat center center/cover`;
    rettnavnEl.innerText = retter[counter].navn

    setTimeout("slideshow_automatic()", 4500);
}

window.onload = slideshow_automatic;