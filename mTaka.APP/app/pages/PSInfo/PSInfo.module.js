(function () {
    'use strict';

    angular.module('mTakaAPP.pages.PSInfo', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('PSInfo', {
                url: '/PoliceStationInfo',
                templateUrl: window.applicationBaseUrl + 'app/pages/PSInfo/PSInfo.html',
                title: 'Police Station Info',
                controller: 'PSInfoCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();