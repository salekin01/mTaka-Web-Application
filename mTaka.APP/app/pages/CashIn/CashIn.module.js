(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CashIn', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('CashIn', {
                url: '/CashIn',
                templateUrl: window.applicationBaseUrl + 'app/pages/CashIn/CashIn.html',
                title: 'Cash In',
                controller: 'CashInCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();