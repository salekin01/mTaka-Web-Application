(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CityInfo', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('CityInfo', {
                url: '/CityInfo',
                templateUrl: window.applicationBaseUrl + 'app/pages/CityInfo/CityInfo.html',
                title: 'City Info',
                controller: 'CityInfoCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();