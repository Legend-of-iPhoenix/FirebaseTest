function uploadFile(uploader_id, folder) {
	// File or Blob named mountains.jpg
	var file = document.getElementById(uploader_id).files[0];

	// Upload file and metadata to the object 'images/mountains.jpg'
	var uploadTask = storageRef.child(folder + "/" + file.name).put(file);

	// Listen for state changes, errors, and completion of the upload.
	uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
	  function(snapshot) {
		// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
		var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		console.log('Upload is ' + progress + '% done');
		switch (snapshot.state) {
		  case firebase.storage.TaskState.PAUSED: // or 'paused'
			console.log('Upload is paused');
			break;
		  case firebase.storage.TaskState.RUNNING: // or 'running'
			console.log('Upload is running');
			break;
		}
	  }, function(error) {

	  // A full list of error codes is available at
	  // https://firebase.google.com/docs/storage/web/handle-errors
	  switch (error.code) {
		case 'storage/unauthorized':
		  // User doesn't have permission to access the object
		  break;

		case 'storage/canceled':
		  // User canceled the upload
		  break;

		case 'storage/unknown':
		  // Unknown error occurred, inspect error.serverResponse
		  break;
	  }
	}, function() {
	  // Upload completed successfully, now we can get the download URL
	  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
		console.log('File available at', downloadURL);
		writeFileData(downloadURL, file.name.substring(0, file.name.lastIndexOf('.')));
	  });
	});
}

function downloadFile(downloader_id, folder, link_id) {
	var filepath = folder + "/" + document.getElementById(downloader_id).value;
	//console.log(filepath);
	storageRef.child(filepath).getDownloadURL().then(function(url) {
	// `url` is the download URL for filepath
	document.getElementById(link_id).setAttribute("href", url);
	document.getElementById(link_id).setAttribute("style", "display: block;");
	var name = document.getElementById(downloader_id).value;
	name = name.substring(0, name.lastIndexOf('.'));
	//document.getElementById(link_id).value = readFileData(name.substring(0, name.lastIndexOf('.')));
	readFileDataEventually(name, "path").then(function(data){
			console.log(data);
	});
	/*
	//Direct dl
	var xhr = new XMLHttpRequest();
	xhr.responseType = 'blob';
	xhr.onload = function(event) {
	var blob = xhr.response;
	};
	xhr.open('GET', url);
	xhr.send();*/
	});
}
