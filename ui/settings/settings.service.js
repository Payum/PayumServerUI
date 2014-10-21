define([], function () {

    angular.module('PS.settings.service', ['ngCookies'])

        .factory('Settings', function ($cookieStore) {

            var Settings = {

                api: '',
                apiHealth: false,

                isOk: function () {
                    return this.api && this.apiHealth;
                },

                save: function (settings) {
                    angular.extend(this, settings);
                    $cookieStore.put('api', this.api);
                }
            };

            if ($cookieStore.get('api')) {
                Settings.api = $cookieStore.get('api');
            }

            return  Settings
        });

});

