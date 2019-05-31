(function () {
    'use strict';

    angular.module('mTakaAPP.theme.components')
        .directive('baWizard', baWizard);

    /** @ngInject */
    function baWizard() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: window.applicationBaseUrl + 'app/theme/components/baWizard/baWizard.html',
            controllerAs: '$baWizardController',
            controller: 'baWizardCtrl'
        }
    }
})();