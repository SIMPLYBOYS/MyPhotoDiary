 var pictureSource,  // picture source
     destinationType, // sets the format of returned value
     serverIP = '54.238.203.212',
     serverURL = 'http://' + serverIP,
     captureImage,
     retries = 0,
     message;

    function onDeviceReady(){
      /*document.getElementById("helloworld").innerHTML = "Hello World! Loaded PhoneGap Framework!";
      $("#myphotodiary").html("Hi jquery!!");*/
      pictureSource=navigator.camera.PictureSourceType;
      destinationType=navigator.camera.DestinationType;
    }

    function init(){
    	document.addEventListener("deviceready", onDeviceReady, false);
      if(window.FormData){
          alert('this app support formdata!\n\n');
      }
    }

    function clearCache() {
      navigator.camera.cleanup();
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage'),
          dateTime = new Date(),
          ft = new FileTransfer(),
          options = new FileUploadOptions();
          options.fileKey = 'file';
          options.fileName = dateTime.getTime()+'.jpg';
          options.mimeType = 'image/jpeg';
          options.chunkedMode = false;

      var params = {};
          params.value1 = "test";
          params.value2 = "param";
          options.params = params;

      var successImage = function(r){
        clearCache();
        $.ajax({url: serverURL + '/images', dataType: 'json', type: 'GET'}).done(function(data){
          // var l = data.length;
          $('#myphotodiary').html('Hi Ajax!!');
        });
        retries = 0;
        alert('Done!');    
      };

      var failImage = function (e) {
         if(retries == 0){
           retries++;
           setTimeout(function(){
             onPhotoDataSuccess(imageData);
           },1000)
         } else {
           retries = 0;
           clearCache();
           alert('Oops. Something wrong happens!');
         }
        //alert("Upload failed" + "error code:" + e.code);
      };

      successImage();

     /* ft.upload(imageData, encodeURI("http://http://54.238.203.212/images"),
                   successImage,
                   failImage,
                   options);*/

      // console.log('=============' + options.fileName);
      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
      alert(dateTime.getTime());
      alert(imageData.substr(imageData.lastIndexOf('/')+1));
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);

      // Get image 
      //handle
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }

    // A button will call this function
    //
    function capturePhoto(e) {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 100, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    //
    function onFail(message) {
      alert('Failed because: ' + message);
    }

    //window.onload = init();
    $(document).ready(function(){
         
         init();
         //alert('shuttle app 2013!');
         /*message = $('#inputext')[0];

         message.onclick = function(e){
            e.preventDefault();
         	alert('input submit');
         }*/
    });
    console.log("register the listener");