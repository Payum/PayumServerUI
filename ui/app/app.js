define(
    [
        'gateways/gateways',
        'payments/payments',
        'settings/settings'
    ], function () {

        angular.module('PS.app', [
                'ui.router',
                'PS.gateways',
                'PS.payments',
                'PS.settings',
                'schemaForm'
            ])

            .factory('MainMenu', function () {

                return [
                    {
                        name: 'Payments',
                        state: 'app.payments'
                    },
                    {
                        name: 'Gateways',
                        state: 'app.gateways'
                    },
                    {
                        name: 'Settings',
                        state: 'app.settings'
                    }
                ]
            })

            .config(function ($stateProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise('/app');

                $stateProvider.state('app', {
                    url: "/app",
                    templateUrl: require.toUrl('./app/app.html'),
                    controller: 'PS.app'
                });

            })
            .controller('PS.app', function ($scope, $state, MainMenu, Settings) {

                $scope.mainMenu = MainMenu;

                Settings.check().then(function () {
                    if ($state.is('app')) {
                        $state.go('app.gateways');
                    }
                }, function () {
                    $state.go('app.settings');
                });

            });

    });

