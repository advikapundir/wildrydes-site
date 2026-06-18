const form = document.getElementById('registerForm');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const poolData = {
        UserPoolId: window._config.cognito.userPoolId,
        ClientId: window._config.cognito.userPoolClientId
    };

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const attributeList = [];

    const dataEmail = {
        Name: 'email',
        Value: email
    };

    attributeList.push(
        new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail)
    );

    userPool.signUp(
        email,
        password,
        attributeList,
        null,
        function(err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }

            alert('Registration successful! Check your email for the verification code.');

            window.location.href = 'verify.html';
        }
    );
});