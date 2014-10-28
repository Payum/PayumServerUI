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
                    var self = this;

                    return $q(function (resolve, reject) {

                        Order.delete({orderId: order.id}, function () {
                            self.orders.splice(self.orders.indexOf(order), 1);
                            resolve(order);
                        }, reject);
                    });

                },
                removeAll: function () {
                    this.orders.splice(0, this.orders.length);
                },

                getById: function (orderId) {
                    return $q(function (resolve, reject) {
                        Order.get({orderId: orderId}, function (order) {
                            resolve(order.order);
                        }, reject)
                    });
                },
                sync: function (order) {
                    var self = this;
                    return this.getById(order.id).then(function (newOrder) {
                        self.replace(order, newOrder)
                    });
                },
                replace: function (order, newOrder) {
                    var idx = this.orders.indexOf(order);
                    this.orders[idx] = newOrder;
                },
                getOrderStatus: function (order) {

                    if(!order) return '';

                    var payment = _(order.payments).sortBy(function (payment) {
                        return payment.date;
                    }).last();


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

