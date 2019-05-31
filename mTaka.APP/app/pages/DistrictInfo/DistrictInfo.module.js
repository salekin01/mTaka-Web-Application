(function () {
    'use strict';

    angular.module('mTakaAPP.pages.DistrictInfo', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('DistrictInfo', {
                url: '/DistrictInfo',
                templateUrl: window.applicationBaseUrl + 'app/pages/DistrictInfo/DistrictInfo.html',
                title: 'District Info',
                controller: 'DistrictInfoCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();