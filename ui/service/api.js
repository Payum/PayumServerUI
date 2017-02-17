define(['settings/settings.service'], function () {

    angular.module('PS.service.api', ['ngResource', 'PS.settings.service'])

        .config(function ($httpProvider) {
        })
        .factory('Api', function ($resource, $window, Settings) {

            return {
                resource: function (url) {
                    return $resource(Settings.api + url, arguments[1] || {}, arguments[2] || {});
                }
            };

        })
});