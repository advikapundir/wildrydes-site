document.getElementById('signinForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const authenticationData = {
        Username: email,
        Password: password
    };

    const authenticationDetails =
        new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    const poolData = {
        UserPoolId: window._config.cognito.userPoolId,
        ClientId: window._config.cognito.userPoolClientId
    };

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const userData = {
        Username: email,
        Pool: userPool
    };

    const cognitoUser =
        new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {

            const idToken = result.getIdToken().getJwtToken();

            localStorage.setItem('idToken', idToken);

            alert('Login successful!');

            window.location.href = 'ride.html';
        },

        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        }
    });
});