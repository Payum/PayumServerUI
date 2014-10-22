define(['service/api', 'directive/ps-form-fields/ps-form-fields'], function () {

    angular.module('PS.gateways', ['ui.router', 'PS.service.api', 'PS.directive.ps-form-fields'])

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

        .controller('PS.gateways.list', function ($scope, PaymentConfig, $state) {
            $scope.paymentConfig = PaymentConfig.get(function () {
                $scope.payments = $scope.paymentConfig.configs;
            });
        })

        .controller('PS.gateways.form', function ($scope, PaymentConfig, PaymentConfigMeta, $state) {

            $scope.payment = new PaymentConfig({
                name: '',
                factory: '',
                options: {}
            });

            $scope.metasConfig = PaymentConfigMeta.get(function () {
                $scope.metas = _.toArray($scope.metasConfig.metas);
            });


            $scope.updateForm = function () {
                $scope.fields = _.find($scope.metas, function (meta) {
                    return $scope.payment.factory == meta.name;
                });
            }

            $scope.save = function () {
                $scope.payment.$save(function () {
                    $state.go('app.gateways');
                });
            }
        })

    ;

});