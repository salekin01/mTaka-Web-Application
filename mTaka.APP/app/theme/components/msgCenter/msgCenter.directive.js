
(function () {
    'use strict';

    angular.module('mTakaAPP.theme.components')
        .directive('msgCenter', msgCenter);

    /** @ngInject */
    function msgCenter() {
        return {
            restrict: 'E',
            templateUrl: window.applicationBaseUrl + 'app/theme/components/msgCenter/msgCenter.html',
            controller: 'MsgCenterCtrl'
        };
    }
})();