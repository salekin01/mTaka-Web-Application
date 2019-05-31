/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('mTakaAPP.theme.components')
        .directive('widgets', widgets);

    /** @ngInject */
    function widgets() {
        return {
            restrict: 'EA',
            scope: {
                ngModel: '='
            },
            templateUrl: window.applicationBaseUrl + 'app/theme/components/widgets/widgets.html',
            replace: true
        };
    }
})();