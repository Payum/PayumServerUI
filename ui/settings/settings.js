define([], function () {

    angular.module('PS.settings', ['ui.router'])

        .config(function ($stateProvider) {

            $stateProvider.state('app.settings', {
                url: "/settings",
                views: {
                    'main@app': {
                        templateUrl: require.toUrl('./settings/form.html')
                    }
                }
            });
        })
        ;

});

