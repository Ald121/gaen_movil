angular.module('starter.controllers')
.controller('login-RegistroController', function($scope,$rootScope,serviciosLoginRegistro,$ionicPopup,$localStorage,$state) {

$scope.login=function(user,pass){
serviciosLoginRegistro.login().send({usuario:user,pass_app:pass}).$promise.then(function(data){
$localStorage.token=data.token;
$localStorage.datosUser=data.respuesta;
$rootScope.loginstatus=false;
 $state.go('app.inicio');
},function(error){
  if (error.status==401) {
    $scope.showAlert();
  }
});
}

 $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Error!',
     template: 'Usuario / Contraseña erroneos'
   });
 };

});
