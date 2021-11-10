const handlekurv = {
    KEY: "egirejgrdkske",
    innhold: []
} // lager en konstant for handlekurven, med en nøkkel som skal brukes for å få tilgang og en tom array

function init(){ 
    // funksjon som kjøres da siden har lastet inn. sjekker om det er noe i localstorage og setter det i konstanten handlekurv
    let _innhold = localStorage.getItem(handlekurv.KEY)
    if (_innhold) {
        handlekurv.innhold = JSON.parse(_innhold) 
    }
    sync() 
}
function sync(){ // oppdaterer localstorage
    let _handlekurv = JSON.stringify(handlekurv.innhold)
    localStorage.setItem(handlekurv.KEY, _handlekurv) 
}
function find(id){ // finner en vare basert på id og returnerer den
    let match = handlekurv.innhold.filter(item=>{
        if (item.id == id) {
            return true
        };
    });
    if (match && match[0]) {
        return match[0]
    }
}
function add(id){ // legger ting til i handlekurven
    if (find(id)) {
        increase(id, 1); // er den allerede i handlekurven økes den kun med 1
    }else{ // ellers lages produktet og blir sendt inn i handlekurven
        let arr = produkter.filter(produkt=>{
            if (produkt.id == id) {
                return true;
            }
        });
        if (arr && arr[0]) {
            let obj = {
                id: arr[0].id,
                navn: arr[0].navn,
                antall: 1,
                pris: arr[0].pris
            };
            handlekurv.innhold.push(obj);
            sync();
            vis_sum()
        }
    }
}
function increase(id, antall=1){ // funksjon for å øke antall i handlekurv. defaulter til å øke med 1
    handlekurv.innhold = handlekurv.innhold.map(item=>{
        if (item.id === id) {
            item.antall = parseInt(item.antall) + antall; 
        }return item;
    });
    sync();
    visHandlekurv()
    vis_sum()
    vis_pris(id)
}
function reduce(id, antall=1){ // funksjon for å minke antall i handlekurv. defaulter til å minke med 1
    handlekurv.innhold = handlekurv.innhold.map(item=>{
        if (item.id === id) {
            item.antall = parseInt(item.antall) - antall;
        }return item;
    });
    handlekurv.innhold.forEach(item=>{ // dersom antallet blir 0, skal produktet fjernes fra handlekurven
        if (item.id === id && item.antall === 0) {
            remove(id)
        };
    });
    sync();
    visHandlekurv()
    vis_sum()
    vis_pris(id)
}
function change_by_list(event){ // trengtes egen funksjon for å øke og minke med input-listen, som trigges med eventlistener
    handlekurv.innhold = handlekurv.innhold.map(item=>{
        if (item.id === event.target.classList[1]) {
            item.antall = event.target.value;
        }return item;
    });
    handlekurv.innhold.forEach(item=>{ // fjerner produktet om antallet blir 0 eller færre, og oppdaterer prisen
        if (item.id === event.target.classList[1] && item.antall <= 0) {
            remove(event.target.classList[1])
        }else {
            vis_pris(event.target.classList[1])
        }
    });
    sync();
    vis_sum();
}
function remove(id){ // fjerner produktet
    handlekurv.innhold = handlekurv.innhold.filter(item=>{
        if (item.id !== id) {
            return true
        };
    });
    sync();
    visHandlekurv()
    vis_sum()
}
function remove_by_btn(event){ // egen funksjon for å fjerne produktet med FJERN-knappen
    handlekurv.innhold = handlekurv.innhold.filter(item=>{
        if (item.id !== event.target.classList[1]) {
            return true
        };
    });
    sync();
    visHandlekurv();
    vis_sum()
}
function empty(){ // funksjon for å tømme handlekurven. KAN FJERNES
    handlekurv.innhold = [];
    sync();
}
function sort(felt="navn"){ // kan fjernes!! bør kanskje også
    let sortert = handlekurv.innhold.sort((a, b)=>{
        if (a[felt] > b[felt]) {
            return 1;
        }else if (a[felt] < b[felt]) {
            return -1;
        }else{
            return 0;
        }
    });return sortert; 
}
function vis_sum(){ // funksjon for å oppdatere summen av varene
    let sum_tekst = document.getElementById("sum")
    sum = 0
    handlekurv.innhold.forEach(item=>{
        sum = sum + (item.pris * parseInt(item.antall))
    })
    sum_tekst.innerText = sum + "kr"
}
function vis_pris(id){ // funksjon for å vise prisen til produktene. pris * antall
    let pris_id = id + "_pris"
    let pris_tekst = document.getElementById(pris_id)
    let pris = 0
    handlekurv.innhold.forEach(item=>{
        if (item.id == id) {
            pris = item.pris * parseInt(item.antall)
        }
    })
    pris_tekst.innerText = pris + "kr"
}
function visHandlekurv() { // funksjon for å vise den oppdaterte handlekurven fra localstorage
    let handlekurv_seksjon = document.getElementById("handlekurv_Content")
    handlekurv_seksjon.innerText = ""
    let s = handlekurv.innhold
    s.forEach(produkt=>{
        let vare = document.createElement("div")
        vare.className = "vare_div"
        handlekurv_seksjon.appendChild(vare)

        let navn = document.createElement("h3")
        navn.innerText = produkt.navn
        navn.classList.add("navn")
        vare.appendChild(navn)

        let antall = document.createElement("input")
        antall.type = "number"
        antall.value = produkt.antall
        antall.classList.add("antall-liste")
        antall.classList.add(produkt.id)
        vare.appendChild(antall)

        let pris = document.createElement("h3")
        pris.innerText = (produkt.pris * produkt.antall) + " kr"
        pris.className = "pris_tekst"
        pris.id = produkt.id + "_pris"
        vare.appendChild(pris)


        let fjern = document.createElement("button")
        fjern.classList.add("knp-slett")
        fjern.classList.add(produkt.id)
        fjern.innerText = "Fjern"
        vare.appendChild(fjern)
    })
    var elements1 = document.getElementsByClassName("antall-liste") // input-listen og FJERN-knappen
    var elements2 = document.getElementsByClassName("knp-slett")
    if (handlekurv.innhold !== "") {
        for (let i = 0; i < elements1.length; i++) { // eventlistener for input-listen, og FJERN-knappen
            elements1[i].addEventListener("change", change_by_list)
        }for (let j = 0; j < elements2.length; j++) {
            elements2[j].addEventListener("click", remove_by_btn)
        }
    }
}


const produkter = [{navn: "Rullekebab", id: "rullekebab", pris: 129, allergener: "Gluten, laktose, egg", src: "img/rullekebab.png"}, 
{navn: "Kebab i pita", id: "kebabipita", pris: 99, allergener: "Gluten, laktose, egg", src: "img/pita.png"}, 
{navn: "Falafel", id: "falafel", pris: 109, allergener: "Gluten, laktose, egg", src: "img/falafel.png"}, 
{navn: "Hamburger", id: "burger", pris: 99, allergener: "Gluten", src: "img/hamburger.png"}, 
{navn: "Cheeseburger", id: "cheese", pris: 109, allergener: "Gluten, laktose", src: "img/cheeseburger.png"}, 
{navn: "Pizza margherita", id: "margherita", pris: 149, allergener: "Gluten, laktose", src: "img/margherita.png"}, 
{navn: "Pommes frites", id: "pommes", pris: 69, allergener: "Gluten", src: "img/pommes-frites.png"}]

const filler = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"

function main(){ // funksjon som lager alle produktene og viser dem på venstre side av skjermen
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
        btn.id = produkter[i].id
        btn.addEventListener("click", legg_Til)
        div.appendChild(btn)

        let head_Pris = document.createElement("h3")
        head_Pris.innerText = produkter[i].pris + "kr"
        div.appendChild(head_Pris)

        let produkt_informasjon = document.createElement("p")
        produkt_informasjon.innerText = filler
        div.appendChild(produkt_informasjon)

        let allergi = document.createElement("p")
        allergi.innerText = produkter[i].allergener
        div.appendChild(allergi)
    }
}
function legg_Til(ev) { // funksjon for Legg Til-knappene. legger til produktene
    ev.preventDefault();
    add(ev.target.id)
    visHandlekurv()
}
main()
window.addEventListener("DOMContentLoaded", ()=>{ // kjøres når siden har lastet ned. oppdaterer handlekurven og viser den
    init()
    vis_sum()
    visHandlekurv()
})
