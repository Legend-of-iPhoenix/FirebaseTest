// Initialize Firebase
var config = {
	apiKey: "AIzaSyBvOJPa_v2t5TKV_AxBTEyGkOVyXtnZNE4",
	authDomain: "testprojecta-8f0a1.firebaseapp.com",
	databaseURL: "https://testprojecta-8f0a1.firebaseio.com",
	projectId: "testprojecta-8f0a1",
	storageBucket: "testprojecta-8f0a1.appspot.com",
	messagingSenderId: "914780740361"
};

firebase.initializeApp(config);
var gProvider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage();
var signedIn;
var userName;

firebase.auth().onAuthStateChanged(function(user) {
if (user) {
		signedIn = true;
		userName = user.displayName;
		// User is signed in.
	} else {
		signedIn = false;
		// No user is signed in.
	}
	setButtons(signedIn);
});