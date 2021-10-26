const produkter = [{navn: "Rullekebab", pris: "129kr", allergener: "Gluten, laktose, egg"}, 
{navn: "Kebab i pita", pris: "99kr", allergener: "Gluten, laktose, egg"}, 
{navn: "Falafel", pris: "109kr", allergener: "Gluten, laktose, egg"}, 
{navn: "Hamburger", pris: "99kr", allergener: "Gluten"}, 
{navn: "Cheeseburger", pris: "109kr", allergener: "Gluten, laktose"}, 
{navn: "Pizza margherita", pris: "149", allergener: "Gluten, laktose"}, 
{navn: "Pommes frites", pris: "69kr", allergener: "Gluten"}]

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

        let head_Navn = document.createElement("h1")
        head_Navn.innerText = produkter[i].navn
        div.appendChild(head_Navn)

        let btn = document.createElement("button")
        btn.innerText = "Legg til"
        btn.addEventListener("click", legg_Til)
        div.appendChild(btn)

        let head_Pris = document.createElement("h2")
        head_Pris.innerText = produkter[i].pris
        div.appendChild(head_Pris)

        let allergi = document.createElement("p")
        allergi.innerText = produkter[i].allergener
        div.appendChild(allergi)
    }
}
main()