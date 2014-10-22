define([], function () {

    angular.module('PS.directive.ps-form-fields', [])

        .controller('psFormFields', function ($scope, $parse, $filter, $attrs) {

            var getter = $parse($attrs.ngModel);
            $scope.model = getter($scope);

            function resetModel() {
                angular.forEach($scope.model, function (value, name) {
                    delete $scope.model[name];
                });
            }

            $scope.$watch($attrs.psFormFields, function (options) {
                if (options) {

                    resetModel();

                    var aOptions = [];

                    angular.forEach(options, function (option, name) {
                        option.name = name;
                        option.label = option.label || option.name;
                        option.type = option.type || 'text';
                        option.default = option.default || null;

                        $scope.model[name] = option.default;

                        aOptions.push(option);
                    });

                    $scope.options = aOptions;
                }
                else {
                    resetModel();
                    $scope.options = [];
                }
            });


        })
        .directive('psFormFields', function () {
            return {
                restrict: 'AE',
                controller: 'psFormFields',
                templateUrl: require.toUrl('./directive/ps-form-fields/ps-form-fields.html'),
                link: new Function()
            };

        })

    ;

});