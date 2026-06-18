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
<div style="
background:red;
color:white;
padding:20px;
border-radius:20px;
">
<h2>🦄 Unicorn Assigned</h2>
<p>Ride ID: ${data.RideId}</p>
<p>Rider: ${data.Rider}</p>
<p>ETA: ${data.Eta}</p>
</div>
`;
});
