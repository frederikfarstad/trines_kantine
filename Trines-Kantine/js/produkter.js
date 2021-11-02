const produkter = [{navn: "Rullekebab", pris: "129kr", allergener: "Gluten, laktose, egg", src: "img/rullekebab.png"}, 
{navn: "Kebab i pita", pris: "99kr", allergener: "Gluten, laktose, egg", src: "img/pita.png"}, 
{navn: "Falafel", pris: "109kr", allergener: "Gluten, laktose, egg", src: "img/falafel.png"}, 
{navn: "Hamburger", pris: "99kr", allergener: "Gluten", src: "img/hamburger.png"}, 
{navn: "Cheeseburger", pris: "109kr", allergener: "Gluten, laktose", src: "img/cheeseburger.png"}, 
{navn: "Pizza margherita", pris: "149kr", allergener: "Gluten, laktose", src: "img/margherita.png"}, 
{navn: "Pommes frites", pris: "69kr", allergener: "Gluten", src: "img/pommes-frites.png"}]

const filler = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"

function legg_Til(){
    console.log("funker");
}

function main(){
    var prod_Side = document.getElementById("products")
    for (let i = 0; i < produkter.length; i++) {
        let div = document.createElement("div")
        div.className = "produkt_Boks"
        div.id = produkter[i].navn
        prod_Side.appendChild(div)

        let mat_bilder = document.createElement("img")
        mat_bilder.src = produkter[i].src
        div.appendChild(mat_bilder)

        let head_Navn = document.createElement("h1")
        head_Navn.innerText = produkter[i].navn
        div.appendChild(head_Navn)

        let btn = document.createElement("button")
        btn.innerText = "Legg til"
        btn.addEventListener("click", legg_Til)
        div.appendChild(btn)

        let head_Pris = document.createElement("h3")
        head_Pris.innerText = produkter[i].pris
        div.appendChild(head_Pris)

        let produkt_informasjon = document.createElement("p")
        produkt_informasjon.innerText = filler
        div.appendChild(produkt_informasjon)

        let allergi = document.createElement("p")
        allergi.innerText = produkter[i].allergener
        div.appendChild(allergi)
    }
}
main()