(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CurrencyInfo', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('CurrencyInfo', {
                url: '/CurrencyInfo',
                templateUrl: window.applicationBaseUrl + 'app/pages/CurrencyInfo/CurrencyInfo.html',
                title: 'Currency Info',
                controller: 'CurrencyInfoCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();