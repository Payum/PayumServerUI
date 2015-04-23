define(['service/api'], function () {

    angular.module('PS.gateways.service', ['PS.service.api'])

        .factory('GatewayMeta', function (Api) {
            return Api.resource('/gateways/meta');
        })

        .factory('Gateway', function (Api) {
            return Api.resource('/gateways/:name');
        })
    ;
});