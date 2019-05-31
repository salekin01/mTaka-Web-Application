(function () {
    'use strict';

    angular.module('mTakaAPP.pages.FundIn', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('FundIn', {
                url: '/FundIn',
                templateUrl: window.applicationBaseUrl + 'app/pages/FundIn/FundIn.html',
                title: 'Fund In',
                controller: 'FundInCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();