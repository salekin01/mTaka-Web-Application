(function () {
    'use strict';

    angular.module('mTakaAPP.pages.UtilityServiceBillSetup', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('UtilityServiceBillSetup', {
                url: '/UtilityServiceBillSetup',
                templateUrl: window.applicationBaseUrl + 'app/pages/UtilityServiceBillSetup/UtilityServiceBillSetup.html',
                title: 'Utility Service Bill Setup',
                controller: 'UtilityServiceBillSetupCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();