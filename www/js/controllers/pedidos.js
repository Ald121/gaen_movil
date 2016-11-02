angular.module('starter.controllers')
.controller('pedidosController', function($scope,$localStorage,$cordovaCamera,servicios,serviciosPedidos, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $ionicPopup, $cordovaActionSheet,$stateParams,$state) {

serviciosPedidos.mis_pedidos().get().$promise.then(function(data){
$scope.mis_pedidos=data.respuesta;
},function(error){
	if (error.status==-1||error.status==500) {
		var alertPopup = $ionicPopup.alert({
     title: 'Error!',
     template: '<div class="assertive" style="text-align: center;"><i class="icon ion-alert-circled" style="font-size: 50px;"></i><br>DEBES INICIAR SESIÓN NUEVAMENTE PARA CONTINUAR</div>'
   });
	alertPopup.then(function(res) {
    	$state.go('app.login');
  	});

	}
});

$scope.image = null;
  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });

    alertPopup.then(function(){
      $scope.get_pedidos();
    });
  };
 
// Present Actionsheet for switch beteen Camera / Library
$scope.loadImage = function() {
  var options = {
    // title: 'Recursos',
    buttonLabels: ['Seleccionar archivo', 'Usar Camara'],
    addCancelButtonWithLabel: 'Cancel',
    androidEnableCancelButton : true,
  };
  $cordovaActionSheet.show(options).then(function(btnIndex) {
    var type = null;
    if (btnIndex === 1) {
      type = Camera.PictureSourceType.PHOTOLIBRARY;
    } else if (btnIndex === 2) {
      type = Camera.PictureSourceType.CAMERA;
    }
    if (type !== null) {
      $scope.selectPicture(type);
    }
  });
};

// Take image with the camera or from library and store it inside the app folder
// Image will not be saved to users Library.
$scope.selectPicture = function(sourceType) {
  var options = {
    quality: 100,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
 
  $cordovaCamera.getPicture(options).then(function(imagePath) {
    // Grab the file name of the photo in the temporary directory
    var currentName = imagePath.replace(/^.*[\\\/]/, '');
 
    //Create a new name for the photo
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
 
    // If you are trying to load image from the gallery on Android we need special treatment!
    if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
      window.FilePath.resolveNativePath(imagePath, function(entry) {
        window.resolveLocalFileSystemURL(entry, success, fail);
        function fail(e) {
          console.error('Error: ', e);
        }
 
        function success(fileEntry) {
          var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
          // Only copy because of access rights
          $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
            $scope.image = newFileName;
          }, function(error){
            $scope.showAlert('Error', error.exception);
          });
        };
      }
    );
    } else {
      var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      // Move the file to permanent storage
      $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success){
        $scope.image = newFileName;
      }, function(error){
        $scope.showAlert('Error', error.exception);
      });
    }
  },
  function(err){
    // Not always an error, maybe cancel was pressed...
  })
};

$scope.pathForImage = function(image) {
  if (image === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + image;
  }
};

$scope.uploadImage = function() {
  // Destination URL
  var url = "http://gaen.skn1.com/serviciosGaen/public/uploadDeposito";
 
  // File for Upload
  var targetPath = $scope.pathForImage($scope.image);
 
  // File name only
  var filename = $scope.image;;
 
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename,'idpedido': '113'},
    headers : {
                Connection: "close"
            },
    headers: {
        Authorization: 'Bearer ' + $localStorage.token,
        },
  };
 
 $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
      console.log("OK: " + JSON.stringify(result));
      $scope.showAlert('Correcto', 'Pago Subido Correctamente');
      $state.go('app.mis-pedidos');

}, function(err) {
  $scope.showAlert('Error', 'Intentalo nuevamente');
console.log("ERROR: " + JSON.stringify(err));
});
 // function (progress) {
// // constant progress updates
// console.log(progress)
// });
}

$scope.get_pedidos=function(){
   serviciosPedidos.mis_pedidos().get().$promise.then(function(data){
    $scope.mis_pedidos=data.respuesta;
    },function(error){
      if (error.status==-1||error.status==500) {
        var alertPopup = $ionicPopup.alert({
         title: 'Error!',
         template: '<div class="assertive" style="text-align: center;"><i class="icon ion-alert-circled" style="font-size: 50px;"></i><br>DEBES INICIAR SESIÓN NUEVAMENTE PARA CONTINUAR</div>'
       });
      alertPopup.then(function(res) {
          $state.go('app.login');
        });
      }
    });
}



});
