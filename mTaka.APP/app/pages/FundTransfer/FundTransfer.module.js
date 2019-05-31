(function () {
    'use strict';

    angular.module('mTakaAPP.pages.FundTransfer', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('FundTransfer', {
                url: '/FundTransfer',
                templateUrl: window.applicationBaseUrl + 'app/pages/FundTransfer/FundTransfer.html',
                title: 'Fund Transfer',
                controller: 'FundTransferCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();