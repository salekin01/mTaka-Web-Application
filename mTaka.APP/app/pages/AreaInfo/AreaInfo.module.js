(function () {
    'use strict';

    angular.module('mTakaAPP.pages.AreaInfo', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AreaInfo', {
                url: '/AreaInfo',
                templateUrl: window.applicationBaseUrl + 'app/pages/AreaInfo/AreaInfo.html',
                title: 'Area Info',
                controller: 'AreaInfoCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();