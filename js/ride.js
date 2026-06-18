document.getElementById('rideButton').addEventListener('click', async () => {

    const token = localStorage.getItem('idToken');

    if (!token) {
        alert('Please login first');
        return;
    }

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

    document.getElementById('result').innerHTML =
        '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
});