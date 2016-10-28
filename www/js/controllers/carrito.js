angular.module('starter.controllers')
.controller('VerCarritoController', function($state,$ionicPopup,serviciosPedidos,servicios,$rootScope,$localStorage,$scope,$stateParams,servicioscatalogo, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

$scope.provincias=[];
$scope.ciudades=[];
$scope.empresas_envio=[{nombre_empresa:'Servientrega'},{nombre_empresa:'Correos del Ecuador'}];
servicios.localizacion().provincias().get().$promise.then(function(data){
  $scope.provincias=data.repuesta;
});

servicios.localizacion().ciudades().get().$promise.then(function(data){
  $scope.ciudades=data.repuesta;
});


$scope.cargar_datos=function(){
if ($rootScope.direccion) {
  if ($localStorage.datosUser) {
    $rootScope.datosUser=$localStorage.datosUser;
  }
  $scope.fecha=new Date($rootScope.datosUser.fecha_nacimiento);
  $scope.choice = $rootScope.datosUser.sexo;
  $scope.selectedCiud = $rootScope.datosUser.nombre_ciudad;
  $scope.selectedProv = $rootScope.datosUser.nombre_provincia;
  $scope.selectedEmpresa=$rootScope.datosUser.nombre_empresa;

  $scope.datos={
  idcliente:$rootScope.datosUser.idcliente,
  nombres:$rootScope.datosUser.nombres,
  apellidos:$rootScope.datosUser.apellidos,
  direccion:$rootScope.datosUser.direccion,
  email:$rootScope.datosUser.email,
  fecha_nacimiento:$scope.fecha,
  telefono:$rootScope.datosUser.telefono,
  sexo:$rootScope.datosUser.sexo,
  nombre_provincia:$scope.selectedProv,
  nombre_ciudad:$scope.selectedCiud,
  nombre_empresa:$scope.selectedEmpresa
  }
}
}

$scope.subtotal=0;
$scope.total=0;



$scope.calc_total=function(){
  $scope.cargar_datos();
	var multi=0;
var suma=0;
	for (var i = 0; i < $rootScope.productos_carrito.length; i++) {
	multi=$rootScope.productos_carrito[i].cantidad*$rootScope.productos_carrito[i].precio_venta;
	suma=suma+multi;
}
$scope.subtotal=suma;
$scope.total=(suma+4.99).toFixed(2);
// console.log($scope.total);
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

  $scope.confirmar_pedido=function(){
    serviciosPedidos.confirmar_pedido().send({usuario:$scope.datos,productos:$rootScope.productos_carrito,total:$scope.total}).$promise.then(function(data){
      console.log(data.respuesta);
      if (data.respuesta) {
        $scope.alerta();
      }
    });
  }

  $scope.alerta = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Correcto!',
     template: ' <div class="energized" style="text-align: center;"><i class="icon ion-checkmark-circled" style="font-size: 50px;"></i><br>SU PEDIDO HA SIDO ENVIADO SATISFACTORIAMENTE TIENE 24 HRS PARA REALIZAR EL PAGO :)</div>'
   });

  alertPopup.then(function(res) {
    $rootScope.productos_carrito=[];
    
    servicioscatalogo.get_productos().get().$promise.then(function(data){
    $rootScope.productos=data.respuesta;
      });

     $state.go('app.inicio');
   });

 };

  servicios.pagos().datos_deposito().get().$promise.then(function(data){
  $scope.deposito=data.repuesta;
  });

});