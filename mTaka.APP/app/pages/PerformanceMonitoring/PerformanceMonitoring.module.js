(function () {
    'use strict';

    angular.module('mTakaAPP.pages.PerformanceMonitoring', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('PerformanceMonitoring', {
                url: '/PerformanceMonitoring',
                templateUrl: window.applicationBaseUrl + 'app/pages/PerformanceMonitoring/PerformanceMonitoring.html',
                title: 'Performance Monitoring',
                controller: 'PerformanceMonitoringCtrl',
            });
    }

})();