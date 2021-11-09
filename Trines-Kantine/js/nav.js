const navEl = document.createElement("nav");
navEl.id = "navbar";

const logoEl = document.createElement("div");
logoEl.id = "logo";

const logoImgEl = document.createElement("img");
logoImgEl.src = "img/logo.png";
logoImgEl.alt = "Logo";
const a1El = document.createElement("a");
a1El.href = "index.html"
const logoTextEl = document.createElement("h1");
logoTextEl.innerText = "Trines Kantine";

const michelinEl = document.createElement("div");
michelinEl.id = "michelin";
const michelinImgEl = document.createElement("img");
michelinImgEl.src = "img/michelin.png";

const linksEl = document.createElement("div")
linksEl.id = "links";
links = [ 
{href: "reservasjon.html", tekst: "reservasjon"},
{href: "about.html", tekst: "Om oss"},
{href: "meny.html", tekst: "meny"} ];
for (i = 0; i < links.length; i++) {
    aEl = document.createElement("a");
    aEl.href = links[i].href;
    linksEl.appendChild(aEl)
    liEl = document.createElement("li");
    liEl.innerText = links[i].tekst;
    aEl.appendChild(liEl);
}

document.body.prepend(navEl);
navEl.append(logoEl);
logoEl.append(logoImgEl);
a1El.append(logoTextEl)
logoEl.append(a1El);
navEl.append(michelinEl);
michelinEl.append(michelinImgEl);
navEl.append(linksEl);