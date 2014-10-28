define([], function () {

    angular.module('PS.directive.ps-form-fields', [])

        .controller('psFormFields', function ($scope, $parse, $filter, $attrs) {

            $scope.model = $scope.ngModel;
            $scope.shouldReset = $scope.psFormFieldsReset;

            function resetModel() {
                if ($scope.shouldReset) {
                    angular.forEach($scope.model, function (value, name) {
                        if (!angular.isObject(value)) delete $scope.model[name];
                    });
                }
            }

            $scope.$watch('ngModel', function (model) {
                $scope.model = model;
            });

            $scope.$watch('psFormFields', function (options) {


                if (options) {

                    resetModel();

                    var aOptions = [];

                    angular.forEach(options, function (option, name) {
                        option.name = name;
                        option.label = option.label || option.name;
                        option.type = option.type || 'text';
                        option.default = option.default || null;

                        $scope.model[name] = $scope.model[name] || option.default;

                        aOptions.push(option);
                    });

                    $scope.options = aOptions;
                }
                else {
                    resetModel();
//                    $scope.options = [];
                }
            });


        })
        .directive('psFormFields', function () {
            return {
                restrict: 'A',
                controller: 'psFormFields',
                scope: {
                    //@ reads the attribute value, = provides two-way binding, & works with functions
                    psFormFieldsReset: '=',
                    psFormFields: '=',
                    ngModel: '='
                },
                templateUrl: require.toUrl('./directive/ps-form-fields/ps-form-fields.html'),
                link: new Function()
            };

        })

    ;

});