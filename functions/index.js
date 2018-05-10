const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.pruneFiles = functions.auth.user().onDelete((user) => {  //doesn't work
	admin.database().ref("files").orderByKey().once("value").then((snapshot) => {
    	snapshot.forEach((childSnapshot) => {
			if (childSnapshot.child("user/uid").val() === user.uid) {
				console.log("removed files/" + childSnapshot.child("name").val());
				//admin.storage().ref("files/" + childSnapshot.child("name").val()).delete();
				//functions.storage.object();
				childSnapshot.child("user").ref.set({
					user: {
						name: "n/a",
						uid: "-1",
						email: "na@gmail.com",
						photoURL: "/"
					}
				});

			} else {
				console.log("not removed" + childSnapshot.child("name").val() + ": " + childSnapshot.child("user/uid").val() + " !== " + user.uid);
			}
			return;
		});
		return 0;
	}).catch((error) => {
		console.log(error);
	});
	return 0;
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
