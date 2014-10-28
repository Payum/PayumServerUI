define(['service/api'], function () {

    angular.module('PS.orders.service', ['PS.service.api'])
        .factory('Order', function (Api) {
            return Api.resource('/orders/:orderId');
        })
        .factory('OrderMeta', function (Api) {
            return Api.resource('/orders/meta');
        })
        .factory('OrderService', function (Order, $q) {
            return {
                orders: [],

                add: function (order) {
                    this.orders.push(order);
                },
                remove: function (order) {
                    this.orders.splice(this.orders.indexOf(order), 1);
                },
                removeAll: function () {
                    this.orders.splice(0, this.orders.length);
                },

                getById: function (orderId) {
                    return $q(function (resolve, reject) {
                        Order.get({orderId: orderId}, function (order) {
                            resolve(order.order);
                        }, function () {
                            reject();
                        })
                    });
                },
                getOrderStatus: function (order) {

                    var payment = _(order.payments).sortBy(function (payment) {
                        return payment.date;
                    }).first();


                    if (payment) {
                        return payment.status;
                    }

                },
                getOrders: function () {

                    var self = this;

                    Order.get(function (resp) {
                        self.removeAll();
                        _.each(resp.orders, function (order) {
                            self.add(order);
                        });
                    });

                    return this.orders;
                }
            }
        })
    ;

});

