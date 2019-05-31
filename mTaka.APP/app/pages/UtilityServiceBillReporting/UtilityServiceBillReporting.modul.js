(function () {
    'use strict';

    angular.module('mTakaAPP.pages.UtilityServiceBillReporting', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('UtilityServiceBillReporting', {
                url: '/UtilityServiceBillReporting',
                templateUrl: window.applicationBaseUrl + 'app/pages/UtilityServiceBillReporting/UtilityServiceBillReporting.html',
                title: 'Utility Reporting Field',
                controller: 'UtilityServiceBillReportingCtrl',
            });
    }
})();