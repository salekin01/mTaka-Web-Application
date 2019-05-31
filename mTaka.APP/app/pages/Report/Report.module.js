(function () {
    'use strict';

    angular.module('mTakaAPP.pages.Report', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('Report', {
                url: '/Report',
                templateUrl: window.applicationBaseUrl + 'app/pages/Report/Report.html',
                title: 'Reports',
                controller: 'ReportCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();