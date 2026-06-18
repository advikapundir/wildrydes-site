let map;
let directionsService;
let directionsRenderer;

function initMap() {

    map = new google.maps.Map(
        document.getElementById("map"),
        {
            center: { lat: 12.9716, lng: 77.5946 },
            zoom: 12,
            mapTypeControl: false,
            streetViewControl: false
        }
    );
    directionsService =
    new google.maps.DirectionsService();

directionsRenderer =
    new google.maps.DirectionsRenderer({
        suppressMarkers: false,
        polylineOptions: {
            strokeColor: "#A78BFA",
            strokeWeight: 6
        }
    });

directionsRenderer.setMap(map);

    const pickupInput =
        document.getElementById("pickup");

    const destinationInput =
        document.getElementById("destination");

    const pickupAutocomplete =
        new google.maps.places.Autocomplete(
            pickupInput
        );

    const destinationAutocomplete =
        new google.maps.places.Autocomplete(
            destinationInput
        );

    console.log("Map + Autocomplete loaded");
}
function drawRoute() {

    const pickup =
        document.getElementById("pickup").value;

    const destination =
        document.getElementById("destination").value;

    if (!pickup || !destination) {
        alert("Please enter both locations.");
        return;
    }

    directionsService.route(
        {
            origin: pickup,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {

            if (status === "OK") {

                directionsRenderer.setDirections(
                    result
                );

            } else {

                alert(
                    "Could not find route."
                );

            }
        }
    );
}
window.addEventListener("load", () => {
    setTimeout(initMap, 300);
});