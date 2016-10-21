angular.module('starter.controllers')
.controller('VerCarritoController', function($rootScope,$scope,$stateParams,servicioscatalogo, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
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
$scope.total=(suma+4.99).toFixed(2);;
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

});