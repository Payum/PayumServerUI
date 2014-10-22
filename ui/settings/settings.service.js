define([], function () {

    angular.module('PS.settings.service', ['ngCookies'])

        .factory('Settings', function ($cookieStore, $http, $q) {

            var Settings = {

                api: '',
                apiHealth: false,

                save: function (settings) {
                    angular.extend(this, settings);
                    $cookieStore.put('api', this.api);
                },
                
                check: function () {

                    return $q(function (resolve, reject) {
                        $http.get(Settings.api + '/configs/payments').
                            success(function () {
                                Settings.apiHealth = true;
                                resolve();
                            }).
                            error(function () {
                                Settings.apiHealth = false;
                                reject();
                            });
                    })
                }
            };

            if ($cookieStore.get('api')) {
                Settings.api = $cookieStore.get('api');
            }

            return  Settings
        });

});

