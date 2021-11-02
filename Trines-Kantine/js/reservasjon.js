
function beregnLedige() {
    event.preventDefault();
    var ledige = parseInt(document.getElementById('antallPlasser').innerHTML);
    var valgt = parseInt(document.getElementById('antallValgt').value);



    const nyLedige = ledige - valgt;

    if (nyLedige >= 0) {
        document.getElementById('antallPlasser').innerHTML = nyLedige;

        endreAdvarsel("Din bestilling er registrert", "lime", "block");
    }

    else {
        endreAdvarsel("Beklager, det er ikke nok ledige plasser", "red", "block");
    }
}

function endreAdvarsel(tekst, farge, display) {
    document.getElementById('advarsel').innerText = tekst;
    document.getElementById('advarsel').style.color = farge;
    document.getElementById('advarsel').style.display = display;
}
