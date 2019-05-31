/**
 * @author v.lugovsky
 * created on 10.12.2016
 */
(function () {
    'use strict';

    angular.module('mTakaAPP.theme.inputs')
        .directive('baSwitcher', baSwitcher);

    /** @ngInject */
    function baSwitcher() {
        return {
            templateUrl: window.applicationBaseUrl + 'app/theme/inputs/baSwitcher/baSwitcher.html',
            scope: {
                switcherStyle: '@',
                switcherValue: '='
            }
        };
    }
})();