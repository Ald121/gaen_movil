// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 
                            'starter.controllers',
                            'ngResource',
                            'ngStorage'])

.run(function($ionicPlatform,$rootScope,$localStorage) {
  if ($localStorage.token) {
    $rootScope.direccion=true;
    $rootScope.loginstatus=false;
  }else
  {
    $rootScope.direccion=false;
    $rootScope.loginstatus=true;
  }
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      // StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller:'login-RegistroController'
      }
    }
  })

  .state('app.pagar', {
      url: '/pagar',
      views: {
        'menuContent': {
          templateUrl: 'templates/pagar.html'
        }
      }
    })

  .state('app.quienes-somos', {
      url: '/quienes-somos',
      views: {
        'menuContent': {
          templateUrl: 'templates/quienes-somos.html'
        }
      }
    })
  .state('app.galeria', {
      url: '/galeria',
      views: {
        'menuContent': {
          templateUrl: 'templates/galeria.html'
        }
      }
    })
  .state('app.contactos', {
      url: '/contactos',
      views: {
        'menuContent': {
          templateUrl: 'templates/contactos.html'
        }
      }
    })

  .state('app.vermas', {
      url: '/ver-mas/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/ver-mas.html',
          controller: 'VerMasController'
        }
      }
    })

  .state('app.vercarrito', {
      url: '/ver-carrito',
      views: {
        'menuContent': {
          templateUrl: 'templates/ver-carrito.html',
          controller: 'VerCarritoController'
        }
      }
    })
  .state('app.direccion', {
      url: '/direccion',
      views: {
        'menuContent': {
          templateUrl: 'templates/direccion-envio.html',
          controller: 'VerCarritoController'
        }
      }
    })

  .state('app.cuenta-banco', {
      url: '/cuenta-banco',
      views: {
        'menuContent': {
          templateUrl: 'templates/cuenta-banco.html',
          controller: 'VerCarritoController'
        }
      }
    })

    .state('app.inicio', {
      url: '/inicio',
      views: {
        'menuContent': {
          templateUrl: 'templates/index.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/inicio');
});
