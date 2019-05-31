(function () {
    'use strict';

    angular.module('mTakaAPP.pages.AccStatusSetup', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AccStatusSetup', {
                url: '/AccountInfoSetup',
                templateUrl: window.applicationBaseUrl + 'app/pages/AccStatusSetup/AccStatusSetup.html',
                title: 'Account Status Setup',
                controller: 'AccStatusSetupCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();