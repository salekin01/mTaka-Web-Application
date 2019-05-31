(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CashOut', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('CashOut', {
                url: '/CashOut',
                templateUrl: window.applicationBaseUrl + 'app/pages/CashOut/CashOut.html',
                title: 'Cash Out',
                controller: 'CashOutCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();