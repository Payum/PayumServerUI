define(['service/api'], function () {

    angular.module('PS.gateways.service', ['PS.service.api'])

        .factory('Gateway', function (Api) {
            return Api.resource('/gateways/:name');
        })

        .factory('GatewaySchema', function (Api) {
            return {
                "getDefault": function () {
                    return this.getByName('default');
                },
                "getDefaultForm": function () {
                    return this.getFormByName('default');
                },
                "getByName": function (name) {
                    return Api.resource('/schema/gateways/:name.json', {"name": name});
                },
                "getFormByName": function (name) {
                    return Api.resource('/schema/gateways/form/:name.json', {"name": name}, {'get': {'isArray': true}});
                }
            };
        })
    ;
});