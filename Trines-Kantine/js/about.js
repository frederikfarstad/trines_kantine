// Initialize and add the map
function initMap() {
    // The location of Trondheim office
    const TK = { lat: 63.429927199999995, lng: 10.3959849 };
    // The map, centered at Trondheim office
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: TK,
    });
    // The marker, positioned at Trondheim office
    const marker = new google.maps.Marker({
      position: TK,
      map: map,
    });
  }