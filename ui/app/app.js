define(
    [
        'payments/payments',
        'orders/orders',
        'storages/storages',
        'settings/settings'
    ], function () {

        angular.module('PS.app', [
                'ui.router',
                'PS.payments',
                'PS.orders',
                'PS.storages',
                'PS.settings'
            ])

            .factory('MainMenu', function () {

                return [
                    {
                        name: 'Orders',
                        state: 'app.orders'
                    },
                    {
                        name: 'Payments',
                        state: 'app.payments'
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

                if (!Settings.isOk()) {
                    $state.go('app.settings');
                }

            });

    });

