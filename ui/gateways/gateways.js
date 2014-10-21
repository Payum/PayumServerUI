define(['service/api'], function () {

    angular.module('PS.gateways', ['ui.router', 'PS.service.api'])

        .config(function ($stateProvider) {

            $stateProvider.state('app.gateways', {
                url: "/gateways",
                views: {
                    'main@app': {
                        templateUrl: require.toUrl('./gateways/list.html'),
                        controller: 'PS.gateways.list'
                    }
                }
            });

            $stateProvider.state('app.gateways.new', {
                url: "/new",
                views: {
                    'main@app': {
                        templateUrl: require.toUrl('./gateways/form.html'),
                        controller: 'PS.gateways.form'
                    }
                }
            });

        })

        .factory('PaymentMeta', function (Api) {

            return Api.withConfig(function (config) {

                config.addResponseInterceptor(function (res, operation) {
                    if (operation == 'getList') {
                        console.log(res);
                        return _.toArray(res.metas);
                    }
                });

            }).all('configs/payments/metas');
        })

        .factory('Payment', function (Api) {

            return Api.withConfig(function (config) {

                config.addResponseInterceptor(function (res, operation) {
                    if (operation == 'getList') {
                        return _.toArray(res.configs);
                    }
                });

            }).all('configs/payments');
        })

        .controller('PS.gateways.list', function ($scope, Payment) {

            Payment.getList().then(function (payments) {
                $scope.payments = payments;
            });
        })

        .controller('PS.gateways.form', function ($scope, Payment, PaymentMeta) {

            $scope.payment = {};

            PaymentMeta.getList().then(function (metas) {
                $scope.metas = metas;
            });

            $scope.getGenerator = function () {

                if(!$scope.metas) return [];

                var meta = _($scope.metas).find(function (item) {
                    return item.name == $scope.payment.factory
                });

                return meta.plain();
            }

            $scope.save = function () {
                console.log($scope.payment);
            }
        })
    ;

});

