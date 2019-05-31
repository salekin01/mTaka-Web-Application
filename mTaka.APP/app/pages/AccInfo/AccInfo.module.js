(function () {
    'use strict';

    angular.module('mTakaAPP.pages.AccInfo', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AccInfo', {
                url: '/AccountInfo',
                templateUrl: window.applicationBaseUrl + 'app/pages/AccInfo/AccInfo.html',
                title: 'Account Info ',
                controller: 'AccInfoCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();