angular.module('starter.controllers')
.controller('login-RegistroController', function(servicios,$scope,$rootScope,serviciosLoginRegistro,$ionicPopup,$localStorage,$state) {

$scope.provincias={};
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
     template: '<div class="balanced" style="text-align: center;"><i class="icon ion-email" style="font-size: 50px;"></i><br>REGISTRO CORRECTO REVISA TU CORREO PARA ACTIVAR TU CUENTA :)</div>'
   });
   alertPopup.then(function(){
    $state.go('app.inicio');
   });
 };

 $scope.registrar=function(data,dato){
  data.nombre_ciudad=$scope.selectedCiud;
  serviciosLoginRegistro.registro().send(data).$promise.then(function(data){
    console.log(data.respuesta);
    if (data.respuesta) {
      data.apellidos="";
      data.choice=null;
      data.direccion="";
      data.email="";
      data.fecha_nacimiento="";
      data.idcliente="";
      data.nombre_ciudad="";
      data.nombres="";
      data.pass="";
      dato.pass2="";
      data.telefono="";
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
