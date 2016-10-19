angular.module('starter.controllers')
.controller('VerMasController', function($rootScope,$scope,$stateParams,servicioscatalogo, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
var currentId = $stateParams.id;
$scope.producto=[];
$scope.zoomMin = 1;

 $rootScope.allImages = [];

  servicioscatalogo.get_producto_by_id().get({idproducto:currentId}).$promise.then(function(data){
    $scope.producto=data.respuesta;
    $rootScope.allImages.push({src:data.respuesta.img});
  });

$scope.showImages = function(index) {
  $scope.activeSlide = 0;
  $scope.showModal('templates/zoom.html');
};
 
$scope.showModal = function(templateUrl) {
  $ionicModal.fromTemplateUrl(templateUrl, {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.modal.show();
  });
}
 
$scope.closeModal = function() {
  $scope.modal.hide();
  $scope.modal.remove()
};
 
$scope.updateSlideStatus = function(slide) {
  var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
  if (zoomFactor == $scope.zoomMin) {
    $ionicSlideBoxDelegate.enableSlide(true);
  } else {
    $ionicSlideBoxDelegate.enableSlide(false);
  }
};



});