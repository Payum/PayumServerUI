define(
    [
        'gateways/gateways',
        'orders/orders',
        'storages/storages',
        'settings/settings'
    ], function () {

        angular.module('PS.app', [
                'ui.router',
                'PS.gateways',
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
                        name: 'Gateways',
                        state: 'app.gateways'
                    },
                    {
                        name: 'Storages',
                        state: 'app.storages'
                    },
                    {
                        name: 'Settings',
                        state: 'app.settings'
                    }
                ]
            })

            .config(function ($stateProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise('');

                $stateProvider.state('app', {
                    url: "",
                    templateUrl: require.toUrl('./app/app.html'),
                    controller: 'PS.app'
                });

            })
            .controller('PS.app', function ($scope, $state, MainMenu) {

                $scope.mainMenu = MainMenu;

                $state.go('app.gateways');
            });

    });

