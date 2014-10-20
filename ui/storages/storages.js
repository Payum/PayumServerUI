define([], function () {

    angular.module('PS.storages', ['ui.router'])

        .config(function ($stateProvider) {

            $stateProvider.state('app.storages', {
                url: "/storages",
                views: {
                    'main@app': {
                        templateUrl: require.toUrl('./storages/list.html')
                    }
                }
            });

            $stateProvider.state('app.storages.new', {
                url: "/new",
                views: {
                    'main@app': {
                        templateUrl: require.toUrl('./storages/form.html')
                    }
                }
            });

        })
        ;

});

