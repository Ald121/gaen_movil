angular.module('starter.controllers')
.controller('VerCarritoController', function(servicios,$rootScope,$localStorage,$scope,$stateParams,servicioscatalogo, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

$scope.provincias=[];
$scope.ciudades=[];
servicios.localizacion().provincias().get().$promise.then(function(data){
  $scope.provincias=data.repuesta;
});

servicios.localizacion().ciudades().get().$promise.then(function(data){
  $scope.ciudades=data.repuesta;
});


if ($localStorage.token) {
  $rootScope.direccion=true;
  $scope.datosUser=$localStorage.datosUser;
  $scope.fecha=new Date($scope.datosUser.fecha_nacimiento);
  $scope.choice = $scope.datosUser.sexo;
  $scope.selectedCiud = $scope.datosUser.nombre_ciudad;
  $scope.selectedProv = $scope.datosUser.nombre_provincia;

  $scope.datos={
  idcliente:$scope.datosUser.idcliente,
  nombres:$scope.datosUser.nombres,
  apellidos:$scope.datosUser.apellidos,
  direccion:$scope.datosUser.direccion,
  email:$scope.datosUser.email,
  fecha_nacimiento:$scope.fecha,
  telefono:$scope.datosUser.telefono,
  sexo:$scope.datosUser.sexo,
  nombre_provincia:$scope.selectedProv,
  nombre_ciudad:$scope.selectedCiud
  }

}
$scope.subtotal=0;
$scope.total=0;


$scope.calc_total=function(){
	var multi=0;
var suma=0;
	for (var i = 0; i < $rootScope.productos_carrito.length; i++) {
	multi=$rootScope.productos_carrito[i].cantidad*$rootScope.productos_carrito[i].precio_venta;
	suma=suma+multi;
}
$scope.subtotal=suma;
$scope.total=(suma+4.99).toFixed(2);
}

$scope.remove_producto=function(producto){
var index=$rootScope.productos_carrito.indexOf(producto);
    if (index!=-1) {
      $rootScope.productos_carrito.splice(index,1);
    }
    $scope.calc_total();
  }

  $scope.mas_cantidad=function(producto){
var index=$rootScope.productos_carrito.indexOf(producto);
    if (index!=-1) {
    	if ($rootScope.productos_carrito[index].cantidad<$rootScope.productos_carrito[index].stock) {
    		$rootScope.productos_carrito[index].cantidad=$rootScope.productos_carrito[index].cantidad+1;
    	}
    }
     $scope.calc_total();
  }

  $scope.menos_cantidad=function(producto){
	var index=$rootScope.productos_carrito.indexOf(producto);
    if (index!=-1) {
    	if ($rootScope.productos_carrito[index].cantidad>1) {
    		$rootScope.productos_carrito[index].cantidad=$rootScope.productos_carrito[index].cantidad-1;
    	}
    }
    $scope.calc_total();
  }
   $scope.calc_total();

  $scope.actualizar_dataUser=function(){
  $localStorage.datosUser=$scope.datos;
  }

  $scope.change_prov=function(provincia){
    $scope.datos.nombre_provincia=provincia;
    $scope.selectedProv = provincia;
    $scope.actualizar_dataUser();
  }

  $scope.change_ciu=function(ciudad){
    $scope.datos.nombre_ciudad=ciudad;
    $scope.selectedCiud = ciudad;
    $scope.actualizar_dataUser();
  }

  $scope.change_genero=function(choice){
    $scope.datos.sexo=choice;
    $scope.choice = choice;
    $scope.actualizar_dataUser();
  }

  servicios.pagos().datos_deposito().get().$promise.then(function(data){
  $scope.deposito=data.repuesta;
  });

});