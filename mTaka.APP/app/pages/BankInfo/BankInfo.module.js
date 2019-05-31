(function () {
    'use strict';

    angular.module('mTakaAPP.pages.BankInfo', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('BankInfo', {
                url: '/BankInfo',
                templateUrl: window.applicationBaseUrl + 'app/pages/BankInfo/BankInfo.html',
                title: 'Bank Info',
                controller: 'BankInfoCtrl',
            });
    }
})();