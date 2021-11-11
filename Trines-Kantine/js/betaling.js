
/* Luhns Algoritme for kredittkortsjekk 
Dette er et gyldig kortnummer 79927398713 (ikke et faktisk kort)*/

function luhn(){
    let card = document.getElementById("kortnummer").value;
    let liste = card.toString().split("");                  //Gjør om kortnummeret til en liste

    let total = 0;
    for(let x = liste.length - 2; x >= 0; x -= 2){          //Går igjennom hvert andre tall inkl det nest bakerste (IKKE INKL CHECKSUM)
        var temp = 2*parseInt(liste[x]);                    //Ganger tallet med 2
        tempList = temp.toString().split("");               //Legger alle sifrene i tallet (eks 1 og 2 i 12) til en midlertidig liste
        for(num of tempList){
            total += parseInt(num);                         //Legger til verdien av alle tallene fra den midlertidig listen til totalen
        }
    }

    for(let x = liste.length-3; x >= 0; x -= 2){            //Går igjennom hvert andre tall fra det tredje bakerste (IKKE INKL CHECKSUM)
        total += parseInt(liste[x]);                        //Legger til verdien av tallet til totalen
    }

    checkDigit = parseInt(liste[liste.length-1])            //Henter ut det siste sifferet fra kortnummeret (sjekknummeret)

    if(10-total%10 == checkDigit){                          //Sjekker om verdien fra luhns algoritme og checksummen stemmer
        console.log("valid");
        return true;
    }
    else{
        console.log("invalid")
        return false;
    }

}



/* De forskjellige leveringsmetodene */
deliveryOptions = {
    hjemlevering: 49,
    hente_selv: 0,
    baat: 99,
    trine_personal: 999
}



/* Det som ligger i i handlekurven fra meny.html blir overført til betaling.html */
const key = "egirejgrdkske";                                //Nøkkelen til en verdi i localstorage (samme som i meny.html)
const value = JSON.parse(localStorage.getItem(key));        //Henter ut verdien i localstorage (en liste med objekter)  
//console.log(value);                                       //Vi kunne også ha brukt eval(), men vi leste at JSON.parse() var tryggere.

let foodNameDiv = document.getElementById("foodType");      
let foodStatsDiv = document.getElementById("foodStats");

for(x of value){                                            //Går igjennom alle objektene i localstorage
    let foodText = document.createTextNode(x.navn);         //Lager tekstnode med navn
    let foodAmount = document.createTextNode(x.antall);     //Lager tekstnode med antall
    let foodPrice = document.createTextNode(x.pris);        //Lager tekstnode med pris
    let foodTextParagraph = document.createElement("p");    //Lager p-element som skal vise navnet på maten
    let foodStatsParagraph = document.createElement("p");   //Lager p-element som skal vise prisen og antall av maten

    foodTextParagraph.setAttribute("class", "whiteText");
    foodStatsParagraph.setAttribute("class", "whiteText");

    //legger til navnet på maten til html filen
    foodTextParagraph.append(foodText);
    foodNameDiv.appendChild(foodTextParagraph);
    foodNameDiv.appendChild(document.createElement("br"));  //Legger til et br element for å lage linjeskift

    //Legger til antall og pris på varen til html filen
    foodStatsParagraph.append(foodAmount);
    foodStatsParagraph.append("*");
    foodStatsParagraph.append(document.createTextNode("   "));
    foodStatsParagraph.append(foodPrice);
    foodStatsParagraph.append(",-");
    foodStatsDiv.appendChild(foodStatsParagraph);
    foodStatsDiv.appendChild(document.createElement("br"));
}



/* Regner ut prisen av matvarene når siden åpnes */
let totalFoodPrice = 0;
for(x of value){
    totalFoodPrice += x.pris * x.antall;
}



/* Legger til totalprisen når siden åpnes for første gang */
let total = 49 + totalFoodPrice;                                            //49 siden siden starter checket på hjemlevering med pris 49kr
document.getElementById("totalCost").innerText = total.toString() + ",-";   //Skriver ut totalpris i det siden åpnes



/* Regner ut ny totalpris ved ny leveringsmetode */
let prevDelivery = deliveryOptions["hjemlevering"]; //Prisen på forrige leveringsmetode, her står det hjemlevering siden den er checked by default på siden

function priceCalculation(knapp){                   //Regner ut totalprisen på nytt når man trykker på annet leveringsalternativ
    let chosen = deliveryOptions[knapp.value];      //Pris på valgt leveringsmetode
    total -= prevDelivery;                          //Trekker fra prisen på forrige leveringsmetode
    total += chosen;                                //Legger til prisen på valgt leveringsmetode
    prevDelivery = chosen;                          
    document.getElementById("deliveryStatsCost").innerText = chosen.toString() + ",-";  //Oppdaterer leveringsprisen på siden
    document.getElementById("totalCost").innerText = total.toString() + ",-";           //Oppdaterer totalprisen på siden

}



/* Endrer CSS hvis klarna eller vipps blir valgt som betalingsmetode */
function changecss(rB){
    let kortInfo = document.getElementById("paymentInformation");   //Henter ut valgt betalingsmetode
    if(rB.value == "Vipps"|| rB.value == "Klarna"){ 
        kortInfo.style.display = "none";                            //Skjult
    }
    else if(rB.value == "Visa"|| rB.value == "Mastercard"){
        kortInfo.style.display = "block";                           //Synlig
    }
}



/* Håndterer valideringen av formen */
let submitButton = document.getElementById("submitButton"); //Henter knapp som brukes til submit senere

function pay(){
    
    let kortInfo = document.getElementById("paymentInformation");
    let utlopsDatoElem = document.getElementById("utlopsdato");
    let utlopsDato = utlopsDatoElem.value; 

    let dato = new Date();          //Lager nytt dato-element
    let datoYr = dato.getFullYear().toString()[2] + dato.getFullYear().toString()[3];   //Henter ut siste to siffrene i årstallet (eks 21 ut fra 2021) og lagrer det i en streng
    let datoMnd = (dato.getMonth()+1).toString();   //Legger til måneden som en streng (+1 fordi getMonth() gir verdi fra 0 til 11, men vi ønsker 1 til 12)
    //console.log(`${datoMnd}/${datoYr}`);

    utlopsDato = utlopsDato.replace("/","");    //Fjerner eventuell skråstrek fra input
    utlopsMnd = utlopsDato[0] + utlopsDato[1];  //Henter ut måneden fra input
    utlopsYr = utlopsDato[2] + utlopsDato[3];   //Henter ut år fra input

    
    if(kortInfo.style.display == "none"){                       //Dersom klarna eller vipps er valgt
        document.getElementById("kortnummer").required = false; //Kortdetaljer blir ikke required
        document.getElementById("utlopsdato").required = false;
        document.getElementById("CCV").required = false;
        submitButton.click();                                   //submitter formen (hvis den er valid)

        
    }
    else{                                                       //Dersom Visa eller Mastercard er valgt
        document.getElementById("kortnummer").required = true;  //Kortdetaljer blir required
        document.getElementById("utlopsdato").required = true;;
        document.getElementById("CCV").required = true;;

        //Sjekker om utløpsdatoen er tidligere enn dagens dato og gjør inputfeltet tomt dersom dette er tilfellet (dette gjør at formen ikke blir valid)
        if(utlopsYr < datoYr || utlopsYr == datoYr && utlopsMnd < datoMnd || utlopsMnd < 1 || utlopsMnd > 12){
            utlopsDatoElem.value = "";
            utlopsDatoElem.setAttribute("placeholder", "ugyldig dato [mm/yy]");
        }
        
        //Sjekker om kortet er gyldig og gjør inputfeltet tomt dersom det er ugyldig (dette gjør at formen ikke blir valid)
        if(!luhn()){
            document.getElementById("kortnummer").value = "";
            document.getElementById("kortnummer").setAttribute("placeholder", "ugyldig kortnummer");

        }

        submitButton.click();   //submitter formen (hvis den er valid)

    }
}


//Bytter til hjemmesiden hvis formen har blitt submitta (Da er URL'en annerledes)
let url = window.location.href;                         //Henter URL
let lastUrlPart = url.substr(url.lastIndexOf("/")+1);   //substr(fra, til (slutten av streng hvis ikke spesifisert)) gir en ny streng. Her: fra siste "/"" i URL'en til slutten av URL'en

if(lastUrlPart!="betaling.html"){                       //Dersom URL'en ikke slutter på "betaling.html", så vil det si at formen er submitta
    alert("Bestillingen har blitt sendt!");             //Bruker får bekreftet at bestillingen har blitt sendt
    localStorage.removeItem(key);                       //Handlekurven blir tom
    document.location.href = "index.html";              //Fører brukeren tilbake til hovedsiden
}