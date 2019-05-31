(function () {
    'use strict';

    angular.module('mTakaAPP.pages.ManagerAccProfile', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('ManagerAccProfile', {
                url: '/ManagerAccProfile',
                templateUrl: window.applicationBaseUrl + 'app/pages/ManagerAccProfile/ManagerAccProfile.html',
                title: 'Manager Account Profile',
                controller: 'ManagerAccProfileCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();