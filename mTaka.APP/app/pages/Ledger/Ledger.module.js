(function () {
    'use strict';

    angular.module('mTakaAPP.pages.Ledger', ['ui.select', 'ngSanitize', 'checklist-model', 'smart-table'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('Ledger', {
                url: '/Ledger',
                templateUrl: window.applicationBaseUrl + 'app/pages/Ledger/Ledger.html',
                title: 'Ledger',
                controller: 'LedgerCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();