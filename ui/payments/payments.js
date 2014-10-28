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

        .controller('PS.payments.list', function ($scope, PaymentConfig) {

            $scope.paymentConfig = PaymentConfig.get(function () {
                $scope.payments = _.toArray($scope.paymentConfig.payments);
            });

            $scope.remove = function (payment) {

                var payment = new PaymentConfig(payment);

                payment.$delete(function () {
                    $scope.payments.splice($scope.payments.indexOf(payment), 1);
                });

            }

        })

        .controller('PS.payments.form', function ($scope, PaymentConfig, PaymentConfigMeta, $state) {

            $scope.payment = new PaymentConfig({
                name: '',
                factory: '',
                options: {}
            });


            $scope.metasConfig = PaymentConfigMeta.get(function () {
                $scope.metaFields = $scope.metasConfig.generic;
            });


            $scope.$watch('payment.factory', function () {
                $scope.updateForm();
            });


            $scope.updateForm = function () {
                $scope.fields = $scope.payment.factory && $scope.metasConfig.metas[$scope.payment.factory] ? $scope.metasConfig.metas[$scope.payment.factory].options : [];
            }

            $scope.save = function () {
                $scope.payment.$save(function () {
                    $state.go('app.payments');
                });
            }
        })

    ;

});