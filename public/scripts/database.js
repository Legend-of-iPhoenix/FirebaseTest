var _tempData;
function writeFileData(f_nodeName, f_path, f_name, f_user)
{
	firebase.database().ref('files/' + f_nodeName).set({
    name: f_name,
    path: f_path,
	user: {
		name: f_user.displayName,
		uid: f_user.uid,
		email: f_user.email,
		photoURL: f_user.photoURL
	}
  });
  console.log("Written.");
}

function readFileDataEventually(f_name, child)
{
	return firebase.database().ref('files/' + f_name).once('value').then(function(snapshot) {
		return snapshot.child(child).val();
	});
}

function readFileDataNow(f_name, child)
{
	//figure this out
}
