(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CustomerAccProfile', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('CustomerAccProfile', {
                url: '/CustomerAccountProfile',
                templateUrl: window.applicationBaseUrl + 'app/pages/CustomerAccProfile/CustomerAccProfile.html',
                title: 'CUSTOMER ACCOUNT PROFILE',
                controller: 'CustomerAccProfileCtrl',

            });
    }
})();