define(['./settings.service'], function () {

    angular.module('PS.settings', ['ui.router', 'PS.settings.service'])

        .config(function ($stateProvider) {

            $stateProvider.state('app.settings', {
                url: "/settings",
                views: {
                    'main@app': {
                        templateUrl: require.toUrl('./settings/form.html'),
                        controller: 'PS.settings'
                    }
                }
            });
        })
        .controller('PS.settings', function ($scope, Settings, $state, $http) {
            $scope.settings = Settings;

            $scope.save = function (settings) {
                Settings.save(settings);
                $state.go('app.gateways');
            }

            $scope.testUrl = function () {

                $http.get(Settings.api + '/configs/payments').
                    success(function () {
                        Settings.apiHealth = true;
                    }).
                    error(function () {
                        Settings.apiHealth = false;
                    });

            }

            $scope.$watch('settings.api', function () {
                $scope.testUrl();
            });

            $scope.testUrl();

        })
    ;

});

