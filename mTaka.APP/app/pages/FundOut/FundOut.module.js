(function () {
    'use strict';

    angular.module('mTakaAPP.pages.FundOut', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('FundOut', {
                url: '/FundOut',
                templateUrl: window.applicationBaseUrl + 'app/pages/FundOut/FundOut.html',
                title: 'Fund Out',
                controller: 'FundOutCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();