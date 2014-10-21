define([], function () {

    angular.module('PS.settings.service', ['ngCookies'])

        .factory('Settings', function ($cookieStore) {

            return {

                api: '',

                isOk: function () {
                    return this.api;
                }
            }
        });

});

