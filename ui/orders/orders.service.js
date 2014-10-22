define(['service/api'], function () {

    angular.module('PS.orders.service', ['PS.service.api'])
        .factory('Order', function (Api) {
            return Api.resource('/orders');
        })
        .factory('OrderService', function () {

        })
        ;

});

