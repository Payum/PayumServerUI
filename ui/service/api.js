define(['settings/settings.service'], function () {

    angular.module('PS.service.api', ['ngResource', 'PS.settings.service'])

        .config(function ($httpProvider) {
        })
        .factory('Api', function ($resource, $window, Settings) {

            return {
                resource: function (url) {
                    var args = _.toArray(arguments);
                    args[0] = Settings.api + url
                    return $resource.apply($window, args);
                }
            };

        })
});