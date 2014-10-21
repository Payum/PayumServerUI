define([], function () {

    angular.module('PS.settings.service', [])

        .factory('Settings', function () {
            return {
                api: '',
                token: '',

                isOk: function () {
                    return this.api && this.token;
                }
            }
        });

});

