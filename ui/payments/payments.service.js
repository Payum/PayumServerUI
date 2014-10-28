define(['service/api'], function () {

    angular.module('PS.payments.service', ['PS.service.api'])

        .factory('PaymentConfigMeta', function (Api) {
            return Api.resource('/configs/payments/metas');
        })

        .factory('PaymentConfig', function (Api) {
            return Api.resource('/configs/payments/:name', {'name': '@name'});
        })
    ;

});