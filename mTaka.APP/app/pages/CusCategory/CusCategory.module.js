(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CusCategory', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('CusCategory', {
                url: '/CusCategory',
                templateUrl: window.applicationBaseUrl +'app/pages/CusCategory/CusCategory.html',
                title: 'Customer Category',
                controller: 'CusCategoryCtrl',
                //sidebarMeta: {                   
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }


})();