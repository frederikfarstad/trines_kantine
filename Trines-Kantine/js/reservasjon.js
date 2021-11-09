
function beregnLedige() {
    event.preventDefault(); //stopper siden fra å refreshe
    var ledige = parseInt(document.getElementById('antallPlasser').innerHTML); //henter antall ledige plasser
    var valgt = parseInt(document.getElementById('antallValgt').value); //henter tallet hentet fra formen



    const nyLedige = ledige - valgt; //oppdaterer ledige plasser

    if (nyLedige >= 0) { //sjekker om ledige plasser
        document.getElementById('antallPlasser').innerHTML = nyLedige; //oppdaterer tekst med  nytt tall

        endreAdvarsel("Din bestilling er registrert", "lime", "block"); //oppdaterer tekst
    }

    else {
        endreAdvarsel("Beklager, det er ikke nok ledige plasser", "red", "block"); //gir tilbakemelding hvis ikke ledig
    }
}

function endreAdvarsel(tekst, farge, display) {
    document.getElementById('advarsel').innerText = tekst; //oppdaterer tekst
    document.getElementById('advarsel').style.color = farge; //oppdaterer fargen på teksten
    document.getElementById('advarsel').style.display = display; //gjør at teksten er synlig (er ikke det når siden åpnes)
}
