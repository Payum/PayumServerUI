define(['gateways/gateways'], function () {

    angular.module('PS.app', ['ui.router', 'PS.gateways'])

        .config(function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('');

            $stateProvider.state('app', {
                url: "",
                templateUrl: require.toUrl('./app/app.html'),
                controller: 'PS.app'
            });

        })
        .controller('PS.app', function ($scope, $state) {
            $state.go('app.gateways');
        });

});

