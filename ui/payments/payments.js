define([
    'directive/ps-form-fields/ps-form-fields',
    './payments.service'
], function () {

    angular.module('PS.payments', [
            'ui.router',
            'PS.service.api',
            'PS.directive.ps-form-fields',
            'PS.payments.service'
        ])

        .config(function ($stateProvider) {

            $stateProvider.state('app.payments', {
                url: "/payments",
                views: {
                    'main@app': {
                        templateUrl: require.toUrl('./payments/list.html'),
                        controller: 'PS.payments.list'
                    }
                }
            });

            $stateProvider.state('app.payments.new', {
                url: "/new",
                views: {
                    'main@app': {
                        templateUrl: require.toUrl('./payments/form.html'),
                        controller: 'PS.payments.form'
                    }
                }
            });

        })

        .controller('PS.payments.list', function ($scope, PaymentConfig, $state) {
            $scope.paymentConfig = PaymentConfig.get(function () {
                $scope.payments = $scope.paymentConfig.configs;
            });
        })

        .controller('PS.payments.form', function ($scope, PaymentConfig, PaymentConfigMeta, $state) {

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
                    $state.go('app.payments');
                });
            }
        })

    ;

});