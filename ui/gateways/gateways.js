define(['service/api'], function () {

    angular.module('PS.gateways', ['ui.router', 'PS.service.api'])

        .config(function ($stateProvider) {

            $stateProvider.state('app.gateways', {
                url: "/gateways",
                views: {
                    'main@app': {
                        templateUrl: require.toUrl('./gateways/list.html')
                    }
                }
            });

            $stateProvider.state('app.gateways.new', {
                url: "/new",
                views: {
                    'main@app': {
                        templateUrl: require.toUrl('./gateways/form.html'),
                        controller: 'PS.gateways.form'
                    }
                }
            });

        })

        .factory('PaymentMeta', function (Api) {

            return Api.withConfig(function (config) {

                config.addResponseInterceptor(function (res, operation) {
                    if (operation == 'getList') {

                        var list = [];

                        angular.forEach(res.metas, function (meta) {
                            list.push(meta);
                        });

                        return list;
                    }
                });

            }).all('configs/payments/metas');
        })

        .controller('PS.gateways.form', function ($scope, PaymentMeta) {

            PaymentMeta.getList().then(function (metas) {
                console.log(metas);
            });

            console.log('ok');
        })
    ;

});

