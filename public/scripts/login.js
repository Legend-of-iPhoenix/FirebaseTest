var signedIn;
var curUser;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
	curUser = user;
    signedIn = true;
	console.log("User is logged in");
    // User is signed in.
  } else {
    signedIn = false;
	curUser = null;
    console.log("User is not logged in");
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
	signedIn = true;
	//setButtons(signedIn);
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
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
  var stylesheet = getStylesheet("visibility");
  if (loggedIn) {
    document.getElementById("signin").setAttribute("style", "display: none;");
    document.getElementById("signout").setAttribute("style", "display: block;");
    document.getElementById("signoutButton").innerHTML = "Logout, " + curUser.displayName;
	stylesheet.deleteRule(0);
	stylesheet.insertRule(".signedin { display: block; }", 0);
	
  } else {
    document.getElementById("signin").setAttribute("style", "display: block;");
    document.getElementById("signout").setAttribute("style", "display: none;");
	stylesheet.deleteRule(0);
	stylesheet.insertRule(".signedin { display: none; }", 0);
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
    document.getElementById('load').innerHTML = "Firebase SDK loaded with ${features.join(', ')}";
  } catch (e) {
    console.error(e);
    document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
  }
});