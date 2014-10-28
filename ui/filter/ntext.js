define([], function () {

    angular.module('ntext', [])
        .filter('ntext', function ($sce) {
            return function (text) {
                return $sce.trustAsHtml(text.replace("\n", '<br />'));
            }
        });
    ;

});