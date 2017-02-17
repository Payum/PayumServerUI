define([
    './payments.service',
    'gateways/gateways.service',
    'filter/ntext',
], function () {

    angular.module('PS.payments', ['ui.router', 'PS.payments.service', 'PS.gateways.service', 'ntext'])

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

            $stateProvider.state('app.payments.details', {
                url: "/details/:paymentId",
                views: {
                    'main@app': {
                        templateUrl: require.toUrl('./payments/details.html'),
                        controller: 'PS.payments.details'

                    }
                }
            });

            $stateProvider.state('app.payments.capture', {
                url: "/capture/:paymentId",
                views: {
                    'main@app': {
                        templateUrl: require.toUrl('./payments/capture.html'),
                        controller: 'PS.payments.capture'

                    }
                }
            });

            $stateProvider.state('app.payments.authorize', {
                url: "/authorize/:paymentId",
                views: {
                    'main@app': {
                        templateUrl: require.toUrl('./payments/authorize.html'),
                        controller: 'PS.payments.authorize'

                    }
                }
            });

        })
        .controller('PS.payments.details', function ($scope, PaymentService, $stateParams, $state) {

            PaymentService.getById($stateParams.paymentId).then(function (payment) {
                $scope.payment = payment;
            });

            $scope.sync = function (payment) {
                PaymentService.sync(payment);
            }

            $scope.remove = function (payment) {
                PaymentService.remove(payment).then(function () {
                    $state.go('app.payments');
                });
            }

        })
        .controller('PS.payments.capture', function ($scope, $stateParams, $state, PaymentService) {

            PaymentService.getById($stateParams.paymentId).then(function (payment) {
                $scope.payment = payment;

                var token = {
                    type: 'capture',
                    paymentId: $scope.payment.id,
                    afterUrl: $state.href('app.payments.details', {paymentId: $scope.payment.id}, {absolute: true}),
                    targetUrl: ''
                };

                PaymentService.createToken(token).then(function(token) {
                    $scope.token = token;
                    $scope.show_payum_container = true;
                });
            });

            $scope.execute = function() {
                PaymentService.executeToken($scope.token);
            }

        })
        .controller('PS.payments.authorize', function ($scope, PaymentService, $stateParams, $state) {

            PaymentService.getById($stateParams.paymentId).then(function (payment) {
                $scope.payment = payment;

                var token = {
                    type: 'authorize',
                    paymentId: $scope.payment.id,
                    afterUrl: $state.href('app.payments.details', {paymentId: $scope.payment.id}, {absolute: true}),
                    targetUrl: ''
                };

                PaymentService.createToken(token).then(function(token) {
                    $scope.token = token;
                    $scope.show_payum_container = true;
                });
            });

            $scope.execute = function() {
                PaymentService.executeToken($scope.token);
            }
        })
        .controller('PS.payments.list', function ($scope, PaymentService) {

            $scope.payments = PaymentService.getPayments();

            $scope.sync = function (payment) {
                PaymentService.sync(payment);
            }

            $scope.remove = function (payment) {
                PaymentService.remove(payment);
            }

        })
        .controller('PS.payments.form', function ($scope, $state, Payment, PaymentSchema, PaymentService) {
            $scope.payment = new Payment({});
            $scope.schema = {};
            $scope.form = ["*"];

            PaymentSchema.getNew().get(function (schema) {
                $scope.schema = schema;
            });

            PaymentSchema.getNewForm().get(function (form) {
                $scope.form = form;
            });

            $scope.onSubmit = function(form) {
                $scope.error = '';

                // First we broadcast an event so all fields validate themselves
                $scope.$broadcast('schemaFormValidate');

                // Then we check if the form is valid
                if (form.$valid) {
                    $scope.payment.$save(function () {
                        $state.go('app.payments');
                    }, function (res) {

                        if (res.data.message) {
                            $scope.error = res.data.message;

                            return;
                        }

                        if (res.data.errors) {
                            for (property in res.data.errors) {
                                if (false === res.data.errors.hasOwnProperty(property)) {
                                    continue;
                                }

                                for (index in res.data.errors[property]) {
                                    $scope.$broadcast('schemaForm.error.'+property, res.data.errors[property][index], res.data.errors[property][index]);
                                }
                            }
                        }
                    });
                }
            }
        })

        .filter('paymentStatus', function (PaymentService) {
            return function (payment) {
                return PaymentService.getPaymentStatus(payment);
            }
        })

    ;

});

