(function () {
    'use strict';

    angular.module('mTakaAPP.pages.DivisionInfo', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('DivisionInfo', {
                url: '/DivisionInfo',
                templateUrl: window.applicationBaseUrl + 'app/pages/DivisionInfo/DivisionInfo.html',
                title: 'Division Info',
                controller: 'DivisionInfoCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();