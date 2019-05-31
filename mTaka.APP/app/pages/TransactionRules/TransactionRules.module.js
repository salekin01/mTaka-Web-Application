(function () {
    'use strict';

    angular.module('mTakaAPP.pages.TransactionRules', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('TransactionRules', {
                url: '/TransactionRules',
                templateUrl: window.applicationBaseUrl + 'app/pages/TransactionRules/TransactionRules.html',
                title: 'Transaction Rules',
                controller: 'TransactionRulesCtrl',
            });
    }
})();