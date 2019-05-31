(function () {
    'use strict';

    angular.module('mTakaAPP.pages.ChannelAccProfile', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('ChannelAccProfile', {
                url: '/ChannelAccProfileAccountProfile',
                templateUrl: window.applicationBaseUrl + 'app/pages/ChannelAccProfile/ChannelAccProfile.html',
                title: 'Channel Account Profile',
                controller: 'ChannelAccProfileCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();