define([
    'directive/ps-form-fields/ps-form-fields',
    'filter/ntext',
    './gateways.service'
], function () {

    angular.module('PS.gateways', [
            'ui.router',
            'PS.service.api',
            'PS.directive.ps-form-fields',
            'PS.gateways.service',
            'ntext'
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

        .controller('PS.gateways.form', function ($scope, Gateway, GatewayMeta, $state, $sce) {

            $scope.error = '';

            $scope.gateway = new Gateway({
                gatewayName: '',
                factoryName: '',
                config: {}
            });


            $scope.metasConfig = GatewayMeta.get(function () {
                $scope.metaFields = $scope.metasConfig.generic;
            });


            $scope.$watch('gateway.factoryName', function () {
                $scope.updateForm();
            });


            $scope.updateForm = function () {
                $scope.fields = $scope.gateway.factoryName && $scope.metasConfig.meta[$scope.gateway.factoryName] ? $scope.metasConfig.meta[$scope.gateway.factoryName].config : [];
            }

            $scope.save = function () {

                $scope.error = '';

                $scope.gateway.$save(function () {
                    $state.go('app.gateways');
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
    ;

});