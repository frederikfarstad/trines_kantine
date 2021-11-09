const handlekurv = {
    KEY: "egirejgrdkske",
    innhold: [],
    init(){
        let _innhold = localStorage.getItem(handlekurv.KEY)
        if (_innhold) {
            handlekurv.innhold = JSON.parse(_innhold)
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
                handlekurv.vis_sum()
            }
        }
    },
    increase(id, antall=1){
        handlekurv.innhold = handlekurv.innhold.map(item=>{
            if (item.id === id) {
                item.antall = parseInt(item.antall) + antall;
            }return item;
        });
        handlekurv.sync();
        visHandlekurv()
        handlekurv.vis_sum()
        handlekurv.vis_pris(id)
    },
    reduce(id, antall=1){
        handlekurv.innhold = handlekurv.innhold.map(item=>{
            if (item.id === id) {
                item.antall = parseInt(item.antall) - antall;
            }return item;
        });
        handlekurv.innhold.forEach(item=>{
            if (item.id === id && item.antall === 0) {
                handlekurv.remove(id)
            };
        });
        handlekurv.sync();
        visHandlekurv()
        handlekurv.vis_sum()
        handlekurv.vis_pris(id)
    },
    increase_by_list(event){
        handlekurv.innhold = handlekurv.innhold.map(item=>{
            if (item.id === event.target.classList[1]) {
                item.antall = event.target.value;
            }return item;
        });
        handlekurv.innhold.forEach(item=>{
            if (item.id === event.target.classList[1] && item.antall <= 0) {
                handlekurv.remove(event.target.classList[1])
            };if (item.id === event.target.classList[1] && item.antall > 0) {
                handlekurv.vis_pris(event.target.classList[1])
            }
        });
        handlekurv.sync();
        handlekurv.vis_sum();
    },
    remove(id){
        handlekurv.innhold = handlekurv.innhold.filter(item=>{
            if (item.id !== id) {
                return true
            };
        });
        handlekurv.sync();
        visHandlekurv()
        handlekurv.vis_sum()
    },
    remove_by_list(event){
        handlekurv.innhold = handlekurv.innhold.filter(item=>{
            if (item.id !== event.target.classList[1]) {
                return true
            };
        });
        handlekurv.sync();
        visHandlekurv();
        handlekurv.vis_sum()
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
    },
    vis_sum(){
        let sum_tekst = document.getElementById("sum")
        sum = 0
        handlekurv.innhold.forEach(item=>{
            sum = sum + (item.pris * parseInt(item.antall))
        })
        sum_tekst.innerText = sum + "kr"
    },
    vis_pris(c){
        let oc = c + "_pris"
        let pris_tekst = document.getElementById(oc)
        let pris = 0
        handlekurv.innhold.forEach(item=>{
            if (item.id == c) {
                pris = item.pris * parseInt(item.antall)
            }
        })
        pris_tekst.innerText = pris + "kr"
    }
}
function visHandlekurv() {
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
    var elements1 = document.getElementsByClassName("antall-liste")
    var elements2 = document.getElementsByClassName("knp-slett")
    if (handlekurv.innhold !== "") {
        for (let i = 0; i < elements1.length; i++) {
            elements1[i].addEventListener("change", handlekurv.increase_by_list)
        }for (let j = 0; j < elements2.length; j++) {
            elements2[j].addEventListener("click", handlekurv.remove_by_list)
        }
    }/*else{
        removeEventListener()
    }*/
    // handlekurv_seksjon.getElementsByClassName("antall-liste")[0].addEventListener("change", handlekurv.increase_by_list)
    // handlekurv_seksjon.getElementsByClassName("knp-slett")[0].addEventListener("click", handlekurv.remove_by_list)
}


const produkter = [{navn: "Rullekebab", id: "rullekebab", pris: 129, allergener: "Gluten, laktose, egg", src: "img/rullekebab.png"}, 
{navn: "Kebab i pita", id: "kebabipita", pris: 99, allergener: "Gluten, laktose, egg", src: "img/pita.png"}, 
{navn: "Falafel", id: "falafel", pris: 109, allergener: "Gluten, laktose, egg", src: "img/falafel.png"}, 
{navn: "Hamburger", id: "burger", pris: 99, allergener: "Gluten", src: "img/hamburger.png"}, 
{navn: "Cheeseburger", id: "cheese", pris: 109, allergener: "Gluten, laktose", src: "img/cheeseburger.png"}, 
{navn: "Pizza margherita", id: "margherita", pris: 149, allergener: "Gluten, laktose", src: "img/margherita.png"}, 
{navn: "Pommes frites", id: "pommes", pris: 69, allergener: "Gluten", src: "img/pommes-frites.png"}]

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
function legg_Til(ev) {
    ev.preventDefault();
    handlekurv.add(ev.target.id)
    visHandlekurv()
}
main()
window.addEventListener("DOMContentLoaded", ()=>{
    handlekurv.init()
    handlekurv.vis_sum()
    visHandlekurv()
})
