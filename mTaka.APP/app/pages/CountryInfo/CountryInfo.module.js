(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CountryInfo', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('CountryInfo', {
                url: '/CountryInfo',
                templateUrl: window.applicationBaseUrl + 'app/pages/CountryInfo/CountryInfo.html',
                title: 'CountryInfo',
                controller: 'CountryInfoCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();