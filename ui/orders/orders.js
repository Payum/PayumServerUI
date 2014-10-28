define([
    './orders.service',
    'payments/payments.service',
    'filter/ntext',
    'directive/ps-form-fields/ps-form-fields'
], function () {

    angular.module('PS.orders', ['ui.router', 'PS.orders.service', 'PS.payments.service', 'ntext'])

        .config(function ($stateProvider) {

            $stateProvider.state('app.orders', {
                url: "/orders",
                views: {
                    'main@app': {
                        templateUrl: require.toUrl('./orders/list.html'),
                        controller: 'PS.orders.list'
                    }
                }
            });

            $stateProvider.state('app.orders.new', {
                url: "/new",
                views: {
                    'main@app': {
                        templateUrl: require.toUrl('./orders/form.html'),
                        controller: 'PS.orders.form'

                    }
                }
            });

            $stateProvider.state('app.orders.details', {
                url: "/details/:orderId",
                views: {
                    'main@app': {
                        templateUrl: require.toUrl('./orders/details.html'),
                        controller: 'PS.orders.details'

                    }
                }
            });

            $stateProvider.state('app.orders.edit', {
                url: "/edit/:orderId",
                views: {
                    'main@app': {
                        templateUrl: require.toUrl('./orders/form.html'),
                        controller: 'PS.orders.form'
                    }
                }
            });

        })
        .controller('PS.orders.details', function ($scope, OrderService, $stateParams, $state) {

            OrderService.getById($stateParams.orderId).then(function (order) {
                $scope.order = order;
            });

            $scope.sync = function (order) {
                OrderService.sync(order);
            }

            $scope.remove = function (order) {
                OrderService.remove(order).then(function () {
                    $state.go('app.orders');
                });
            }

        })
        .controller('PS.orders.list', function ($scope, OrderService) {

            $scope.orders = OrderService.getOrders();

            $scope.sync = function (order) {
                OrderService.sync(order);
            }

            $scope.remove = function (order) {
                OrderService.remove(order);
            }

        })
        .controller('PS.orders.form', function ($scope, Order, PaymentConfig, OrderService, $state, OrderMeta) {

            $scope.paymentConfig = PaymentConfig.get(function () {
                $scope.payments = _.toArray($scope.paymentConfig.payments);
            });


            $scope.orderMeta = OrderMeta.get(function () {
                $scope.meta = $scope.orderMeta.meta;
            });

            if ($state.params.orderId) {
                OrderService.getById($state.params.orderId).then(function (order) {
                    $scope.order = new Order(order);
                });
            }
            else {
                $scope.order = new Order();
            }


            $scope.save = function () {

                $scope.error = '';

                $scope.order.$save(function (order) {
                    OrderService.add(order.order);
                    $state.go('app.orders');
                }, function (res) {
                    $scope.error = 'Invalid form';

                    if (res.data.errors) {
                        $scope.error = res.data.errors;
                    }

                    if (res.data.message) {
                        $scope.error = res.data.message;
                    }
                });
            }
        })

        .filter('orderStatus', function (OrderService) {
            return function (order) {
                return OrderService.getOrderStatus(order);
            }
        })

    ;

});

