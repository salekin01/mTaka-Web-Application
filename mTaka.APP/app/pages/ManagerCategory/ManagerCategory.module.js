(function () {
    'use strict';

    angular.module('mTakaAPP.pages.ManagerCategory', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('ManagerCategory', {
                url: '/ManagerCategory',
                templateUrl: window.applicationBaseUrl + 'app/pages/ManagerCategory/ManagerCategory.html',
                title: 'Manager Category',
                controller: 'ManagerCategoryCtrl',
                //sidebarMeta: {                   
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }


})();