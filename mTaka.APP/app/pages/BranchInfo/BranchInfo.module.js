(function () {
    'use strict';

    angular.module('mTakaAPP.pages.BranchInfo', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('BranchInfo', {
                url: '/BranchInfo',
                templateUrl: window.applicationBaseUrl + 'app/pages/BranchInfo/BranchInfo.html',
                title: 'Branch Info',
                controller: 'BranchInfoCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();