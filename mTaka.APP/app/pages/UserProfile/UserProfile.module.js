(function () {
    'use strict';

    angular.module('mTakaAPP.pages.UserProfile', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('UserProfile', {
                url: '/UserProfile',
                templateUrl: window.applicationBaseUrl + 'app/pages/UserProfile/UserProfile.html',
                title: 'User Profile',
                controller: 'UserProfileCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();