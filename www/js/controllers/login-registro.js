angular.module('starter.controllers')
.controller('login-RegistroController', function(servicios,$scope,$rootScope,serviciosLoginRegistro,$ionicPopup,$localStorage,$state) {

$scope.provincias={};
$scope.datos=[];
servicios.localizacion().provincias().get().$promise.then(function(data){
  $scope.provincias=data.repuesta;
});
servicios.localizacion().ciudades().get().$promise.then(function(data){
  $scope.ciudades=data.repuesta;
});

$scope.login=function(user,pass){
serviciosLoginRegistro.login().send({usuario:user,pass_app:pass}).$promise.then(function(data){
$localStorage.token=data.token;
$localStorage.datosUser=data.respuesta;
$rootScope.loginstatus=false;
$rootScope.direccion=true;
$rootScope.datosUser=data.respuesta;
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

 $scope.alert_registro = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Correcto!',
     template: 'Registro Correcto, revise su correo para activar su cuenta'
   });
 };

 $scope.registrar=function(data){
  data.nombre_ciudad=$scope.selectedCiud;
  console.log(data.fecha_nacimiento);
  serviciosLoginRegistro.registro().send(data).$promise.then(function(data){
    console.log(data.respuesta);
    if (data.respuesta) {
      $scope.alert_registro();
    }
  });
 }

 $scope.change_prov=function(provincia){
    // $scope.datos.nombre_provincia=provincia;
    $scope.selectedProv = provincia;
  }

  $scope.change_ciu=function(ciudad){
    // $scope.datos.nombre_ciudad=ciudad;
    $scope.selectedCiud = ciudad;
  }

});
