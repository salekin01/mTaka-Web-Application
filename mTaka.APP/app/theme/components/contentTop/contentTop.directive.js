
(function () {
    'use strict';

    angular.module('mTakaAPP.theme.components')
        .directive('contentTop', contentTop);

    /** @ngInject */
    function contentTop($location, $state) {
        return {
            restrict: 'E',
            templateUrl: window.applicationBaseUrl + 'app/theme/components/contentTop/contentTop.html',
            link: function ($scope) {
                $scope.$watch(function () {
                    $scope.activePageTitle = $state.current.title;
                });
            }
        };
    }
})();