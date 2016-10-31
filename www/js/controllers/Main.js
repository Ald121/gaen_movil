angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$rootScope, $ionicModal, $timeout,servicioscatalogo,$localStorage,serviciosPedidos) {
  $rootScope.productos_carrito=[];
// ionic.Platform.ready(function() {
//     StatusBar.hide();
//   });
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $rootScope.productos=[{img:'/img/loader.gif'}];
  servicioscatalogo.get_productos().get().$promise.then(function(data){
    $rootScope.productos=data.respuesta;
  });

 $rootScope.groups = [
                  {name:'Inicio',items:[],click:'S',link:'#/app/inicio',icon:'ion-home'},
                  // {name:'Mis Pedidos',items:[],click:'S',link:'#/app/pagar',icon:'ion-bag'},
                  {name:'Quiénes Somos',items:[],click:'S',link:'#/app/quienes-somos',icon:'ion-information-circled'},
                  // {name:'Productos',items:['Bolsos','Artesanias'],icon:'ion-ios-box'},
                  {name:'Galeria',items:[],click:'S',link:'#/app/galeria',icon:'ion-image'},
                  {name:'Contactos',items:[],click:'S',link:'#/app/contactos',icon:'ion-email'}];
  
   $scope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    return group.show;
  };

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  $scope.close_app=function(){
    navigator.app.exitApp();
  }

$scope.logout=function(){
   $localStorage.$reset();
   $rootScope.loginstatus=true;
   $rootScope.direccion=false;
  }

$scope.add_car=function(producto){
    var index=$rootScope.productos_carrito.indexOf(producto);
    if (index==-1) {
      producto['cantidad']=1;
      $rootScope.productos_carrito.push(producto);
    }else{
      if (producto['cantidad']<producto['stock']) {
        producto['cantidad']=producto['cantidad']+1
      }
    }
  }

  $scope.mis_pedidos=function(producto){

  serviciosPedidos.mis_pedidos().get().$promise.then(function(data){
  $scope.mis_pedidos=data.respuesta;
  });   

  }

})

.controller('PlaylistsCtrl', function($scope) {
  
})
// .controller('PlaylistCtrl', function($scope, $stateParams) {
// });
