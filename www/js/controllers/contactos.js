angular.module('starter.controllers')
.controller('contactosController', function($scope, $ionicLoading, $compile) {

$scope.horario=[{dia:'Lunes', hora:'8:00 - 18:00'},
{dia:'Martes', hora:'8:00 - 18:00'},
{dia:'Miercoles', hora:'8:00 - 18:00'},
{dia:'Jueves' ,hora:'8:00 - 18:00'},
{dia:'Viernes', hora:'8:00 - 18:00'},
{dia:'Sábado', hora:'8:00 - 18:00'},
{dia:'Domingo', hora:'CERRADO'}];

      
    });
