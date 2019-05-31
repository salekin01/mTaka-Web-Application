(function () {
    'use strict';

    angular.module('mTakaAPP.pages.ErrorLog', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('ErrorLog', {
                url: '/ErrorLog',
                templateUrl: window.applicationBaseUrl + 'app/pages/ErrorLog/ErrorLog.html',
                title: 'Error Log',
                controller: 'ErrorLogCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();