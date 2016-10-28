angular.module('starter.controllers')
.controller('pedidosController', function($scope,$rootScope,serviciosPedidos,servicios,$ionicPopup,$localStorage,$state,$timeout,FileUploader) {

serviciosPedidos.mis_pedidos().get().$promise.then(function(data){
$scope.mis_pedidos=data.respuesta;
});

$scope.showPopup = function(pedido) {
  $scope.data = {};
  $scope.pedido=pedido;

  // An elaborate, custom popup
  $scope.myPopup = $ionicPopup.show({
    templateUrl: "templates/modales/upload_pago.html",
    title: 'Subir Deposito',
    // subTitle: 'Please use normal things',
    scope: $scope,
    buttons: []
  });
  $scope.myPopup.then(function(res) {
    // console.log('Tapped!', res);
    console.log($scope);
  });

  // $timeout(function() {
  //    myPopup.close(); //close the popup after 3 seconds for some reason
  // }, 3000);
 };

var uploader = $scope.uploader = new FileUploader({
            url: servicios.server().appGaen()+'public/uploadDeposito',
            headers: {
        Authorization: 'Bearer ' + $localStorage.token,
        },
        removeAfterUpload:true

        });
        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        uploader.onAfterAddingFile = function(fileItem) {
         fileItem.formData=[{
        idpedido:$scope.pedido.idpedido
	    }];
	    };

        uploader.onCompleteAll = function() {
            $scope.myPopup.close();
            serviciosPedidos.mis_pedidos().get().$promise.then(function(data){
			$scope.mis_pedidos=data.respuesta;
			});
        };

        // -------------------------------
        var controller = $scope.controller = {
            isImage: function(item) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };



});
