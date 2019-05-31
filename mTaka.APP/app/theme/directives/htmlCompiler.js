
(function () {
    'use strict';

    angular.module('mTakaAPP.theme')
   .directive('compile', compile);

    /** @ngInject */
    function compile($compile,$timeout) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                $timeout(function () {
                    $compile(elem.contents())(scope);
                });
            }
        };
    }
})();



