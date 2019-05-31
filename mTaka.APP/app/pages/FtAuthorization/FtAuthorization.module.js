(function () {
    'use strict';

    angular.module('mTakaAPP.pages.FtAuthorization', ['ui.select', 'ngSanitize', 'checklist-model', 'smart-table'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('FtAuthorization', {
                url: '/FtAuthorization',
                templateUrl: window.applicationBaseUrl + 'app/pages/FtAuthorization/FtAuthorization.html',
                title: 'Ft Authorization',
                controller: 'FtAuthorizationCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();