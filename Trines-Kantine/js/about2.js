
// initialiserer kartet med startpiunkt i trondheim, og bruker setmarkers funksjonen til å lage lokasjoner
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 5,                                              //velger startZoom
      center: { lat: 63.429927199999995, lng: 10.3959849 }, //velger startposisjon
    });
  
    setMarkers(map);  //bruker map og setter markers på den
  }

// lager en Array for alle lokasjonene til TK
  const locations = [
    ["Trondheim TK", 63.429927199999995, 10.3959849, 4],
    ["Bergen TK", 60.3931944, 5.3153888, 5],
    ["Monaco TK", 43.7387047, 7.427407799999999, 3],
    ["Oslo TK", 59.910500199999994, 10.7440664, 2],
    ["New York TK", 40.763497, -73.9788217, 1],
    ["London TK", 47.3667782, 8.532605199999999, 6],
    ["Kabul TK", 34.53286124073453, 69.17328282584828, 7]
  ];
// Lager en funksjon som lager en marker på kartet
  function setMarkers(map) {
    const image = {
      url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",

      size: new google.maps.Size(20, 32),

      origin: new google.maps.Point(0, 0),

      anchor: new google.maps.Point(0, 32),
    };
// Utseende til markerne som skal lages blir det offesielle flagget til TK
    const shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: "poly",
    };
// En for løkke som lager en marker for hvert element i listen locations
    for (let i = 0; i < locations.length; i++) {
      // Henter hver enkelt liste fra array locations inn i const location
      const location = locations[i];
      // lager en marker på kartet på posisjonen som ligger i listen
      new google.maps.Marker({
        position: { lat: location[1], lng: location[2] },
        map,
        icon: image,
        shape: shape,
        title: location[0],
        zIndex: location[3],
      });
      console.log(location[i]);
    }
  }