var app = angular.module('starter');

app.service('serviciosLoginRegistro', function($resource,servicios) {
	// get Productos
    this.login = function() {
        return $resource(servicios.server().appGaen()+'public/login', {}
        , {
            send: {
                method: 'POST', isArray: false
            }
        });
    };

    // get Productos
    this.registro = function() {
        return $resource(servicios.server().appGaen()+'public/Registrar', {}
        , {
            send: {
                method: 'POST', isArray: false
            }
        });
    };
});
