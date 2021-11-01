


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