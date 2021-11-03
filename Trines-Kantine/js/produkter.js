const handlekurv = {
    KEY: "egirejgrdkske",
    innhold: [],
    init(){
        let _innhold = localStorage.getItem(handlekurv.KEY)
        if (_innhold) {
            handlekurv.innhold = _innhold
        }
        handlekurv.sync()
    },
    sync(){
        let _handlekurv = JSON.stringify(handlekurv.innhold)
        localStorage.setItem(handlekurv.KEY, _handlekurv)
    },
    find(id){
        let match = handlekurv.innhold.filter(item=>{
            if (item.id == id) {
                return true
            };
        });
        if (match && match[0]) {
            return match[0]
        }
    },
    add(id){
        if (handlekurv.find(id)) {
            handlekurv.increase(id, 1);
        }else{
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
                handlekurv.sync();
            }
        }
    },
    increase(id, antall=1){
        handlekurv.innhold = handlekurv.innhold.map(item=>{
            if (item.id === id) {
                item.antall = item.antall + antall;
            }return item;
        });
        handlekurv.sync();
    },
    reduce(id, antall=1){
        handlekurv.innhold = handlekurv.innhold.map(item=>{
            if (item.id === id) {
                item.antall = item.antall - antall;
            }return item;
        });
        handlekurv.innhold.forEach(item=>{
            if (item.id === id && item.antall === 0) {
                handlekurv.remove(id)
            };
        });
        handlekurv.sync();
    },
    remove(id){
        handlekurv.innhold = handlekurv.innhold.filter(item=>{
            if (item.id !== id) {
                return true
            };
        });
        handlekurv.sync();
    },
    empty(){
        handlekurv.innhold = [];
        handlekurv.sync();
    },
    sort(felt="navn"){ // kan fjernes!! bør kanskje også
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
}

const produkter = [{navn: "Rullekebab", id: "rullekebab", pris: "129kr", allergener: "Gluten, laktose, egg", src: "img/rullekebab.png"}, 
{navn: "Kebab i pita", id: "kebaIPita", pris: "99kr", allergener: "Gluten, laktose, egg", src: "img/pita.png"}, 
{navn: "Falafel", id: "falafel", pris: "109kr", allergener: "Gluten, laktose, egg", src: "img/falafel.png"}, 
{navn: "Hamburger", id: "burger", pris: "99kr", allergener: "Gluten", src: "img/hamburger.png"}, 
{navn: "Cheeseburger", id: "cheese", pris: "109kr", allergener: "Gluten, laktose", src: "img/cheeseburger.png"}, 
{navn: "Pizza margherita", id: "margherita", pris: "149kr", allergener: "Gluten, laktose", src: "img/margherita.png"}, 
{navn: "Pommes frites", id: "pommes", pris: "69kr", allergener: "Gluten", src: "img/pommes-frites.png"}]

const filler = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"

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
        btn.id = produkter[i].id
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
function legg_Til(ev) {
    ev.preventDefault();
    let id = ev.target.id
    handlekurv.add(id)
}
main()
//window.addEventListener("DOM")
handlekurv.sync()
