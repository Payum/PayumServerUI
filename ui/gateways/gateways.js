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


            $scope.updateForm = function () {
                $scope.fields = _.find($scope.metas, function (meta) {
                    return $scope.payment.factory == meta.name;
                });
            }

            $scope.save = function () {
                console.log($scope.payment);
                $scope.payment.$save();
            }
        })

        .controller('psFormFields', function ($scope, $parse, $filter, $attrs) {

            var getter = $parse($attrs.ngModel);
            $scope.model  = getter($scope);

            $scope.$watch($attrs.psFormFields, function(options) {
                if (options) {

                    angular.forEach($scope.model, function (value, name) {
                        delete $scope.model[name];
                    });

                    angular.forEach(options, function (option, name) {
                        option.name = name;
                        option.label = option.label || option.name;
                        option.type = option.type || 'text';
                        option.default = option.default || null;

                        $scope.model[name] = option.default;
                    });

                    $scope.options = options;
                }
            });



        })
        .directive('psFormFields', function () {
            return {
                restrict: 'AE',
                controller: 'psFormFields',
                templateUrl: require.toUrl('./directive/ps-form-fields/layout.html'),
                link: new Function()
            };

        })

    ;

});