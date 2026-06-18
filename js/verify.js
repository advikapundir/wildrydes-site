document.getElementById('verifyForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const code = document.getElementById('code').value;

    const poolData = {
        UserPoolId: window._config.cognito.userPoolId,
        ClientId: window._config.cognito.userPoolClientId
    };

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const userData = {
        Username: email,
        Pool: userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }

        alert("Account verified successfully!");

        window.location.href = "signin.html";
    });
});