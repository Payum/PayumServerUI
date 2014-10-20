define([], function () {

    angular.module('PS.app', ['ui.router'])

        .config(function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider.state('app', {
                url: "/",
                templateUrl: require.toUrl('./app/app.html')
            });

        })
        .run(function () {

        });

});

