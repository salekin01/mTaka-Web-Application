(function () {
    'use strict';

    angular.module('mTakaAPP.pages.ManagerType', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('ManagerType', {
                url: '/ManagerType',
                templateUrl: window.applicationBaseUrl + 'app/pages/ManagerType/ManagerType.html',
                title: 'Manager Type',
                controller: 'ManagerTypeCtrl',
                //sidebarMeta: {                   
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }


})();