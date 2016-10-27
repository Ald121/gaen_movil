var app = angular.module('starter');

app.service('serviciosPedidos', function($resource,servicios) {
    // confirmar Pedido
    this.confirmar_pedido = function() {
        return $resource(servicios.server().appGaen()+'public/confirmarPedido', {}
        , {
            send: {
                method: 'POST', isArray: false
            }
        });
    };
});
