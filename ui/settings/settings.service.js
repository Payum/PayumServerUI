define([], function () {

    angular.module('PS.settings.service', ['ngCookies'])

        .factory('Settings', function ($cookieStore, $http, $q) {

            var Settings = {

                api: '',
                apiHealth: false,

                save: function (settings) {
                    if (settings.api) {
                        settings.api = settings.api.replace(/\/$/, "");
                    }

                    angular.extend(this, settings);
                    $cookieStore.put('api', this.api);
                },
                
                check: function () {

                    return $q(function (resolve, reject) {
                        $http.get(Settings.api).then(
                            function () {
                                Settings.apiHealth = true;
                                resolve();
                            },
                            function () {
                                Settings.apiHealth = false;
                                reject();
                            }
                        );
                    })
                },
                toJSON: function () {
                    return {
                        api: this.api
                    }
                }
            };

            if ($cookieStore.get('api')) {
                Settings.api = $cookieStore.get('api');
            }

            return  Settings
        });

});

