define([], function () {

    angular.module('PS.directive.ps-form-fields', [])

        .controller('psFormFields', function ($scope, $parse, $filter, $attrs) {

            var getter = $parse($attrs.ngModel);
            $scope.model  = getter($scope);

            $scope.$watch($attrs.psFormFields, function(options) {
                if (options) {

                    angular.forEach($scope.model, function (value, name) {
                        delete $scope.model[name];
                    });

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