(function () {
    'use strict';

    angular.module('mTakaAPP.pages.DefineService', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('DefineService', {
                url: '/DefineService',
                templateUrl: window.applicationBaseUrl + 'app/pages/DefineService/DefineService.html',
                title: 'Define Service',
                controller: 'DefineServiceCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();