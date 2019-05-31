(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CommissionSetup', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('CommissionSetup', {
                url: '/CommissionSetup',
                templateUrl: window.applicationBaseUrl + 'app/pages/CommissionSetup/CommissionSetup.html',
                title: 'Commission Setup',
                controller: 'CommissionSetupCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();