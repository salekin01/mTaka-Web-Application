
(function () {
    'use strict';

    angular.module('mTakaAPP.theme.components')
        .directive('pageTop', pageTop);

    /** @ngInject */
    function pageTop() {
        return {
            restrict: 'E',
            templateUrl: window.applicationBaseUrl + 'app/theme/components/pageTop/pageTop.html',
            controllerAs: '$pageTopController', //added by salekin - 21.01.2018
            controller: 'pageTopCtrl'           //added by salekin - 21.01.2018
        };
    }
})();