
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

//Det som ligger i handlekurven havner her når betalingssiden åpnes (DET SOM ER I LISTEN NÅ ER PLACEHOLDER)
let shoppingCartFood = [["food1", 100], ["food2", 50]]

//Regner ut prisen av matvarene når siden åpnes
let totalFoodPrice = 0;
for(x of shoppingCartFood){
    totalFoodPrice += x[1];
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
