define(['service/api'], function () {

    angular.module('PS.orders.service', ['PS.service.api'])
        .factory('Order', function (Api) {
            return Api.resource('/orders');
        })
        .factory('OrderService', function () {
            return {
                orders: [],

                add: function (order) {
                    this.orders.push(order);
                },

                getOrders: function () {
                    return this.orders;
                }
            }
        })
        ;

});

