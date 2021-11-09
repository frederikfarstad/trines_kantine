
//Luhns Algoritme for kredittkortsjekk
function luhn(){
    let card = document.getElementById("kortnummer").value;
    let liste = card.toString().split("");

    let total = 0;
    for(let x = liste.length - 2; x >= 0; x -= 2){ //Går igjennom hvert andre tall inkl det nest bakerste (IKKE INKL CHECKSUM)
        var temp = 2*parseInt(liste[x]);
        tempList = temp.toString().split("");
        for(num of tempList){
            total += parseInt(num);
        }
    }

    for(let x = liste.length-3; x >= 0; x -= 2){ //Går igjennom hvert andre tall fra det tredje bakerste (IKKE INKL CHECKSUM)
        total += parseInt(liste[x]);
    }

    checkDigit = parseInt(liste[liste.length-1])

    if(10-total%10 == checkDigit){ //Sjekker verdien fra luhn og checksummen stemmer
        console.log("valid");
        return true;
    }
    else{
        console.log("invalid")
        return false;
    }

}

deliveryOptions = {
    hjemlevering: 49,
    hente_selv: 0,
    baat: 99,
    trine_personal: 999
}

//Det som ligger i handlekurven blir lagt til på siden
const key = "egirejgrdkske";
const value = JSON.parse(localStorage.getItem(key));
console.log(value);

let foodNameDiv = document.getElementById("foodType");
let foodStatsDiv = document.getElementById("foodStats");

for(x of value){
    let foodText = document.createTextNode(x.navn);
    let foodAmount = document.createTextNode(x.antall);
    let foodPrice = document.createTextNode(x.pris);
    let foodTextParagraph = document.createElement("p");
    let foodStatsParagraph = document.createElement("p");

    foodTextParagraph.setAttribute("class", "whiteText");
    foodStatsParagraph.setAttribute("class", "whiteText");

    //Selve navnet på varen
    foodTextParagraph.append(foodText);
    foodNameDiv.appendChild(foodTextParagraph);
    foodNameDiv.appendChild(document.createElement("br"));

    //Antall og pris på varen
    foodStatsParagraph.append(foodAmount);
    foodStatsParagraph.append("*");
    foodStatsParagraph.append(document.createTextNode("   "));
    foodStatsParagraph.append(foodPrice);
    foodStatsParagraph.append(",-");
    foodStatsDiv.appendChild(foodStatsParagraph);
    foodStatsDiv.appendChild(document.createElement("br"));

    
}

//Regner ut prisen av matvarene når siden åpnes
let totalFoodPrice = 0;
for(x of value){
    totalFoodPrice += x.pris * x.antall;
}


//INITIALISERINGER AV VARIABLER
let prevDelivery = deliveryOptions["hjemlevering"]; //Prisen på forrige leveringsmetode
let total = 49 + totalFoodPrice; //49 siden siden starter checket på hjemlevering med pris 49kr
document.getElementById("totalCost").innerText = total.toString() + ",-"; //initialiserer totalprisen på siden


function priceCalculation(knapp){ //Regner ut prisen
    let chosen = deliveryOptions[knapp.value];
    total -= prevDelivery; //Tar vekk kostnaden av den forrige leveringen
    total += chosen;
    prevDelivery = chosen;
    document.getElementById("deliveryStatsCost").innerText = chosen.toString() + ",-"; //Oppdaterer leveringsprisen på siden
    document.getElementById("totalCost").innerText = total.toString() + ",-"; //Oppdaterer totalprisen på siden

}

let userForm = document.getElementById("userDataForm");
let paymentForm = document.getElementById("paymentForm");

//Sjekker om formene er fylt ut og om de er valid
function pay(){
    let valid = true

    if(userForm.fornavn.checkValidity() == false){
        valid = false;
        alert("Skriv inn et fornavn");
    }
    else if(userForm.etternavn.checkValidity() == false){
        valid = false;
        alert("Skriv inn et etternavn");
    }
    else if(userForm.adresse.checkValidity() == false){
        valid = false;
        alert("Skriv inn en adresse");
    }
    else if(userForm.postnummer.checkValidity() == false){
        valid = false;
        alert("Skriv inn et postnummer");
    }
    else if(userForm.telefon.checkValidity() == false){
        valid = false;
        alert("Skriv inn et telefonnummer");
    }
    else if(userForm.mail.checkValidity() == false){
        valid = false;
        alert("Skriv inn en gyldig mail");
    }
    else if(paymentForm.cardnumber.checkValidity() == false){
        valid = false;
        alert("Skriv inn et kortnummer");
    }
    else if(paymentForm.expiredate.checkValidity() == false){
        valid = false;
        alert("Skriv inn en gyldig utløpsdato");
    }
    else if(paymentForm.securitycode.checkValidity() == false){
        valid = false;
        alert("Skriv inn sikkerhetskoden");
    }
    else if(!luhn()){
        valid = false;
        alert("Skriv inn et gyldig kortnummer");
    }

    if(valid){
        alert("Kjøp fullført!");
        userForm.submit();
        paymentForm.submit();
        localStorage.removeItem(key);
        document.location.href = "index.html";
    }
}