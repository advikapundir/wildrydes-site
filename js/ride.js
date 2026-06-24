document.getElementById('rideButton').addEventListener('click', async () => {

    const token = localStorage.getItem('idToken');

    if (!token) {
        alert('Please login first');
        return;
    }
    drawRoute();

    const response = await fetch(
        window._config.api.invokeUrl + '/ride',
        {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PickupLocation: {
                    Latitude: 12.9716,
                    Longitude: 77.5946
                }
            })
        }
    );

    const data = await response.json();
    console.log("Ride data:", data);
document.getElementById('rideInfo').innerHTML = `
<div class="confirmation-card">

    <div class="confirmation-header">
        <div class="unicorn-badge">🦄</div>

        <h3>Unicorn Assigned</h3>

        <p>Your magical ride is on its way</p>

        <div class="unicorn-name">
            ✨ ${data.Unicorn.Name} ✨
        </div>
    </div>

    <div class="ride-detail">
        <span class="ride-label">Ride ID</span>
        <span class="ride-value ride-id">${data.RideId}</span>
    </div>

    <div class="ride-detail">
        <span class="ride-label">Rider</span>
        <span class="ride-value rider-email">${data.Rider}</span>
    </div>

    <div class="ride-detail">
        <span class="ride-label">Color</span>
        <span class="ride-value">${data.Unicorn.Color}</span>
    </div>

    <div class="ride-detail">
        <span class="ride-label">ETA</span>
        <span class="ride-value">${data.Eta}</span>
    </div>

</div>
`;
});
