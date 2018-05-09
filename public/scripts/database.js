function writeFileData(f_path, f_name)
{
	firebase.database().ref('files/' + f_name).set({
    name: f_name,
    path: f_path
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
//figure out how to do this
}
