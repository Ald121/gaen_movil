angular.module('starter.controllers')
.controller('VerMasController', function($scope,servicioscatalogo,$stateParams,$ionicModal,$ionicScrollDelegate,$ionicSlideBoxDelegate) {
var idprod=$stateParams.id;

$scope.allImages = [];
$scope.zoomMin = 1;

servicioscatalogo.get_producto_by_id().get({idproducto:idprod}).$promise.then(function(data){
$scope.producto=data.respuesta;
$scope.allImages.push({src:data.respuesta.img});
});

$scope.showImages = function() {
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
