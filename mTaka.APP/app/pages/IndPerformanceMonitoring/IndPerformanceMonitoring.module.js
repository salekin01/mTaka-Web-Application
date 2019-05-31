(function () {
    'use strict';

    angular.module('mTakaAPP.pages.IndPerformanceMonitoring', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('IndPerformanceMonitoring', {
                url: '/IndPerformanceMonitoring',
                templateUrl: window.applicationBaseUrl + 'app/pages/IndPerformanceMonitoring/IndPerformanceMonitoring.html',
                title: 'Individual Performance Monitoring',
                controller: 'IndPerformanceMonitoringCtrl',
            });
    }

})();