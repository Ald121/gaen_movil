angular.module('starter.controllers')
.controller('VerCarritoController', function($rootScope,$scope,$stateParams,servicioscatalogo, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

$scope.remove_producto=function(producto){
var index=$rootScope.productos_carrito.indexOf(producto);
    if (index!=-1) {
      $rootScope.productos_carrito.splice(index,1);
    }
  }

});