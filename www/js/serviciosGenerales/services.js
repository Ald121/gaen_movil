var app = angular.module('starter');

app.service('servicios', function($resource) {
    // guardar imagenes
    this.server=function() {
        return {
            appGaen: function() {
                // return "http://186.33.168.251/appnext/";
                return "http://192.168.0.109/serviciosGaen/";
            }
        }
    };

});
