(function () {
    'use strict';

    angular.module('mTakaAPP.pages.AccType', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AccountType', {
                url: '/AccountType',
                templateUrl: window.applicationBaseUrl + 'app/pages/AccType/AccType.html',
                title: 'Account Type',
                controller: 'AccTypeCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();