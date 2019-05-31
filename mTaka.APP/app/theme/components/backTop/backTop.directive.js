
(function () {
    'use strict';

    angular.module('mTakaAPP.theme.components')
        .directive('backTop', backTop);

    /** @ngInject */
    function backTop() {
        return {
            restrict: 'E',
            templateUrl: window.applicationBaseUrl + 'app/theme/components/backTop/backTop.html',
            controller: function () {
                $('#backTop').backTop({
                    'position': 200,
                    'speed': 100
                });
            }
        };
    }
})();