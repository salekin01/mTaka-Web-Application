(function () {
    'use strict';

    angular.module('mTakaAPP.pages.Dashboard', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('Dashboard', {
                url: '/Dashboard',
                templateUrl: window.applicationBaseUrl + 'app/pages/Dashboard/Dashboard.html',
                title: 'DashBoard',
                controller: 'DashboardCtrl',
            });
    }
})();