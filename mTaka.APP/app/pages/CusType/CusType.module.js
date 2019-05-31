(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CusType', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('CusType', {
                url: '/CustomerType',
                templateUrl: window.applicationBaseUrl + 'app/pages/CusType/CusType.html',
                title: 'Customer Type',
                controller: 'CusTypeCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();