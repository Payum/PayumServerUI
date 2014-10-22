define(['settings/settings.service'], function () {

    angular.module('PS.service.api', ['ngResource', 'PS.settings.service'])

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