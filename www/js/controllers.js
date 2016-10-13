angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
// ionic.Platform.ready(function() {
//     StatusBar.hide();
//   });
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

 $scope.groups = [{name:'Inicio',items:[],click:'S',link:'#/app/inicio',icon:'ion-home'},
                  {name:'Ingresar',items:[],click:'S',link:'#/app/login',icon:'ion-person'},
                  {name:'Realizar Pago',items:[],click:'S',link:'#/app/pagar',icon:'ion-card'},
                  {name:'Quiénes Somos',items:[],click:'S',link:'#/app/quienes-somos',icon:'ion-information-circled'},
                  {name:'Productos',items:['Bolsos','Artesanias'],icon:'ion-bag'},
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
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
