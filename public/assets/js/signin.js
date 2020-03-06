// =============== funciones para acceder con google =========================//
// function onSignIn(googleUser) {     var profile =
// googleUser.getBasicProfile();     console.log('PROFILE', profile);
// console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an
// ID token instead.     console.log('Name: ' + profile.getName());
// console.log('Image URL: ' + profile.getImageUrl());     console.log('Email: '
// + profile.getEmail()); // This is null if the 'email' scope is not present. }


function signOut() {
    var auth2 = gapi
        .auth2
        .getAuthInstance();
    auth2
        .signOut()
        .then(function() {
            console.log('User signed out.');
        });
}

function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    var id_token = googleUser
        .getAuthResponse()
        .id_token;
    console.log("token", id_token);
    var profile = googleUser.getBasicProfile();
    console.log(profile.getGivenName());
    console.log(profile.getFamilyName());
    // console.log('PROFILE', profile);
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    //======envío datos con token google para validación en el API
    var params = `idtoken=${id_token}&nombres=${profile.getGivenName()}&apellidos=${profile.getFamilyName()}`;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://pro-api-node.herokuapp.com/api/v1/google');
    // xhr.open('POST', 'api/v1/google');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        console.log('Signed in as: ' + xhr.responseText);
    };
    xhr.send(params);
}

function onFailure(error) {
    console.log(error);
}

function renderButton() {
    gapi
        .signin2
        .render('g-signin2', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': onSuccess,
            'onfailure': onFailure,
            'signOut': signOut
        });
}