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
        .controller('PS.settings', function ($scope, Settings, $state, $location) {

            $scope.settings = Settings;

            var query = $location.search();
            if (query.api) {
                Settings.api = query.api;
                Settings.check(function() {
                    Settings.save();
                });
            }

            $scope.save = function (settings) {
                Settings.save(settings);
                $state.go('app.gateways');
            }

            $scope.testUrl = function () {
                $location.search($scope.settings.toJSON());
                Settings.check();
            }

            $scope.testUrl();



        })
    ;

});

