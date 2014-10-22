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

        .factory('PaymentConfigMeta', function (Api) {
            return Api.resource('/configs/payments/metas');
        })

        .factory('PaymentConfig', function (Api) {
            return Api.resource('/configs/payments');
        })

        .controller('PS.gateways.list', function ($scope, PaymentConfig) {
            $scope.paymentConfig = PaymentConfig.get(function () {
                $scope.payments = $scope.paymentConfig.configs;
            });
        })

        .controller('PS.gateways.form', function ($scope, PaymentConfig, PaymentConfigMeta) {

            $scope.payment = new PaymentConfig({
                name: '',
                factory: '',
                options: {}
            });

            $scope.metasConfig = PaymentConfigMeta.get(function () {
                $scope.metas = _.toArray($scope.metasConfig.metas);
            });

            $scope.save = function () {
                console.log($scope.payment);
            }
        })
    ;

});

