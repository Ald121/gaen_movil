var app = angular.module('starter');

app.service('servicioscatalogo', function($resource,servicios) {
	// get Productos
    this.get_productos = function() {
        return $resource(servicios.server().appGaen()+'public/getProductos', {}
        , {
            get: {
                method: 'GET', isArray: false
                // , 
                // params: {
                //     token: $localStorage.token, 
                //     sucursal: $localStorage.sucursal.codigo
                // }
            }
        });
    };

    // get Productos
    this.get_producto_by_id = function() {
        return $resource(servicios.server().appGaen()+'public/getProductosById', {}
        , {
            get: {
                method: 'GET', isArray: false
                // , 
                // params: {
                //     token: $localStorage.token, 
                //     sucursal: $localStorage.sucursal.codigo
                // }
            }
        });
    };
});
