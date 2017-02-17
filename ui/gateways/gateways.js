define([
    'filter/ntext',
    './gateways.service'
], function () {

    angular.module('PS.gateways', [
            'ui.router',
            'PS.service.api',
            'PS.gateways.service',
            'ntext',
            'schemaForm'
        ])

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

        .controller('PS.gateways.list', function ($scope, Gateway) {

            $scope.gateway = Gateway.get(function () {
                $scope.gateways = _.toArray($scope.gateway.gateways);
            });

            $scope.remove = function (gateway) {

                Gateway.delete({name: gateway.gatewayName}, function () {
                    $scope.gateways.splice($scope.gateways.indexOf(gateway), 1);
                });

            }

        })

        .controller('PS.gateways.form', function ($scope, $state, Gateway, GatewaySchema) {
            $scope.gateway = new Gateway({
                gatewayName: '',
                factoryName: '',
                config: {}
            });
            $scope.schema = {};
            $scope.form = ["*"];

            $scope.$watch('gateway.factoryName', function () {
                var name = $scope.gateway.factoryName;

                $scope.gateway.config = {};

                if (name) {
                    GatewaySchema.getByName(name).get(function (schema) {
                        $scope.schema = schema;
                    });

                    GatewaySchema.getFormByName(name).get(function (form) {
                        $scope.form = form;
                    });
                } else {
                    GatewaySchema.getDefault().get(function (schema) {
                        $scope.schema = schema;
                    });

                    GatewaySchema.getDefaultForm().get(function (form) {
                        $scope.form = form;
                    });
                }
            });

            $scope.onSubmit = function(form) {
                $scope.error = '';

                // First we broadcast an event so all fields validate themselves
                $scope.$broadcast('schemaFormValidate');

                // Then we check if the form is valid
                if (form.$valid) {
                    $scope.gateway.$save(function () {
                        $state.go('app.gateways');
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
    ;
});