define(['settings/settings.service'], function () {

    angular.module('PS.service.api', ['restangular', 'PS.settings.service'])

        .factory('Api', function (Restangular, Settings) {

            return Restangular.withConfig(function (RestangularConfigurer) {
//                RestangularConfigurer.setDefaultRequestParams({token: Config.token});
                RestangularConfigurer.setBaseUrl(Settings.api);
            });

        })
});