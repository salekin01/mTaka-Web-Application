(function () {
    'use strict';

    angular.module('mTakaAPP.pages.AccLimit', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AccLimit', {
                url: '/AccLimit',
                templateUrl: window.applicationBaseUrl + 'app/pages/AccLimit/AccLimit.html',
                title: 'Account Limit',
                controller: 'AccLimitCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();