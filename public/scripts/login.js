var signedIn;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    signedIn = true;
    // User is signed in.
  } else {
    signedIn = false;
    // No user is signed in.
  }
  setButtons(signedIn);
});

function gLogin() {
  firebase.auth().signInWithPopup(gProvider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    signedIn = true;
    //setButtons(signedIn);
  });
}

function gLogout() {
  firebase.auth().signOut().then(function () {
    signedIn = false;
    //setButtons(signedIn);
  }).catch(function (error) {
    // An error happened.
  });
}

function setButtons(loggedIn) {
  if (loggedIn) {
    document.getElementById("signin").setAttribute("style", "display: none; text-align: center;");
    document.getElementById("signout").setAttribute("style", "display: block; text-align: center;");
    document.getElementById("signoutButton").innerHTML = "Logout, " + userName;
  } else {
    document.getElementById("signin").setAttribute("style", "display: block; text-align: center;");
    document.getElementById("signout").setAttribute("style", "display: none; text-align: center;");
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  // // The Firebase SDK is initialized and available here!
  //
  // firebase.auth().onAuthStateChanged(user => { });
  // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
  // firebase.messaging().requestPermission().then(() => { });
  // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
  //
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

  try {
    let app = firebase.app();
    let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
    document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
  } catch (e) {
    console.error(e);
    document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
  }
});
