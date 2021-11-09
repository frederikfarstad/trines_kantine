
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 5,
      center: { lat: 63.429927199999995, lng: 10.3959849 },
    });
  
    setMarkers(map);
  }

  const beaches = [
    ["Trondheim TK", 63.429927199999995, 10.3959849, 4],
    ["Bergen TK", 60.3931944, 5.3153888, 5],
    ["Monaco TK", 43.7387047, 7.427407799999999, 3],
    ["Oslo TK", 59.910500199999994, 10.7440664, 2],
    ["New York TK", 40.763497, -73.9788217, 1],
    ["London TK", 47.3667782, 8.532605199999999, 6]
    ["Kabul TK", 34.53286124073453, 69.17328282584828, 6]
  ];
  
  function setMarkers(map) {
    const image = {
      url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",

      size: new google.maps.Size(20, 32),

      origin: new google.maps.Point(0, 0),

      anchor: new google.maps.Point(0, 32),
    };

    const shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: "poly",
    };
  
    for (let i = 0; i < beaches.length; i++) {
      const beach = beaches[i];
  
      new google.maps.Marker({
        position: { lat: beach[1], lng: beach[2] },
        map,
        icon: image,
        shape: shape,
        title: beach[0],
        zIndex: beach[3],
      });
    }
  }