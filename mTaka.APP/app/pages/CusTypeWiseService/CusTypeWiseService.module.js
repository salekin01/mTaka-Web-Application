(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CusTypeWiseService', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('CusTypeWiseService', {
                url: '/CusTypeWiseService',
                templateUrl: window.applicationBaseUrl + 'app/pages/CusTypeWiseService/CusTypeWiseService.html',
                title: 'Account Type Wise Service',
                controller: 'CusTypeWiseServiceCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();