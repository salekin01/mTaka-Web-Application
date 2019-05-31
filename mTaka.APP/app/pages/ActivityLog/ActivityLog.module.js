(function () {
    'use strict';

    angular.module('mTakaAPP.pages.ActivityLog', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('ActivityLog', {
                url: '/ActivityLog',
                templateUrl: window.applicationBaseUrl + 'app/pages/ActivityLog/ActivityLog.html',
                title: 'Activity Log',
                controller: 'ActivityLogCtrl',
            });
    }
})();