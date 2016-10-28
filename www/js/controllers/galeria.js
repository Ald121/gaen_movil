angular.module('starter.controllers')
.controller('GaleriaController', function($scope,servicios,$stateParams,$ionicModal,$ionicScrollDelegate,$ionicSlideBoxDelegate) {
var idprod=$stateParams.id;

 $scope.allImages = [{
    src: 'http://www.gaen.skn1.com/images/thumbs/1.jpg'
  },
  {
    src: 'http://www.gaen.skn1.com/images/thumbs/2.jpg'
  },
  {
    src: 'http://www.gaen.skn1.com/images/thumbs/3.jpg'
  },
  {
    src: 'http://www.gaen.skn1.com/images/thumbs/4.jpg'
  },
  {
    src: 'http://www.gaen.skn1.com/images/thumbs/5.jpg'
  },
  {
    src: 'http://www.gaen.skn1.com/images/thumbs/6.jpg'
  }
  ];
$scope.zoomMin = 1;

// servicios.galeria().get().$promise.then(function(data){
// $scope.producto=data.respuesta;
// $scope.allImages.push({src:data.respuesta.img});
// });

$scope.showImages = function(index) {
  $scope.activeSlide = index;
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
