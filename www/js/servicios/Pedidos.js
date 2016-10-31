var app = angular.module('starter');

app.service('serviciosPedidos', function($resource,servicios,$localStorage) {
    // confirmar Pedido
    this.confirmar_pedido = function() {
        return $resource(servicios.server().appGaen()+'public/confirmarPedido', {}
        , {
            send: {
                method: 'POST', isArray: false,
                params: {
                    token: $localStorage.token
                }
            }
        });
    };

    this.mis_pedidos = function() {
        return $resource(servicios.server().appGaen()+'public/misPedidos', {}
        , {
            get: {
                method: 'GET', isArray: false,
                params: {
                    token: $localStorage.token
                }
            }
        });
    };
});
