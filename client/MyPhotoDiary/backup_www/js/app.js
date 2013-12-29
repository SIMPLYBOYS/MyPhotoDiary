 var pictureSource,  // picture source
     destinationType, // sets the format of returned value
     serverIP = '54.238.203.212',
     serverURL = 'http://' + serverIP,
     captureImage,
     retries = 0,
     formdata = false,
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
          formdata = true;
      }
    }

    function clearCache() {
      navigator.camera.cleanup();
    }

    // Convert dataURL to Blob object
    function dataURLtoBlob(dataURL) {
      // Decode the dataURL    
      var binary = atob(dataURL.split(',')[1]);
      // Create 8-bit unsigned array
      var array = [];
      for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      // Return our Blob object
      return new Blob([new Uint8Array(array)], {type: 'image/png'});
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageDataURL) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageDataURL);

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
             onPhotoDataSuccess(imageDataURL);
           },1000)
         } else {
           retries = 0;
           clearCache();
           alert('Oops. Something wrong happens!');
         }
        //alert("Upload failed" + "error code:" + e.code);
      };

     /* var file = dataURLtoBlob(imageDataURL);
      var size = file.size;
      console.log('------base64 image size:' + size + '-------');*/

      //var fd = new FormData();

      //fd.append("first_1219",file);

      if(formdata){
        alert('formdata be true 4!');
        dateTime = new Date();
        $.ajax({
          url: 'http://54.238.203.212/images',
          type: 'POST',
          // data: fd,
          // processData: false,
          // contentType: false,
          contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
          data: { image: imageDataURL, fileName: dateTime.getTime() },
          // data: {img: encodeURIComponent("ABCDF")}, 
          success: function(res){
            alert('ajax upload success!\n');
          }
        });
      }

      // successImage();

     /* ft.upload(imageDataURL, encodeURI("http://http://54.238.203.212/images"),
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
      smallImage.src = "data:image/jpeg;base64," + imageDataURL;
      alert(dateTime.getTime());
      alert(imageDataURL.substr(imageDataURL.lastIndexOf('/')+1));
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