var app = angular.module('starter');

app.service('servicios', function($resource) {
    // guardar imagenes
    this.server=function() {
        return {
            appGaen: function() {
                // return "http://186.33.168.251/appnext/";
                return "http://gaen.skn1.com/serviciosGaen/";
            }
        }
    };

    var ipserver=this.server();
    ipserver=ipserver.appGaen();
    // get Localizacion
    this.localizacion = function() {
    	return {
            provincias: function() {
              return $resource(ipserver+'public/getProvincias', {}
                    , {
                        get: {
                            method: 'POST', isArray: false
                        }
                    });
            },

            ciudades: function() {
              return $resource(ipserver+'public/getCiudades', {}
			        , {
			            get: {
			                method: 'POST', isArray: false
			            }
			        });
            }
        }
    };

     this.pagos=function() {
        return {
            datos_deposito: function() {
              return $resource(ipserver+'public/getDatosDeposito', {}
                    , {
                        get: {
                            method: 'POST', isArray: false
                        }
                    });
            }
        }
    };

     this.galeria=function() {
              return $resource(ipserver+'public/getGaleria', {}
                    , {
                        get: {
                            method: 'POST', isArray: false
                        }
                    });
    };

});
