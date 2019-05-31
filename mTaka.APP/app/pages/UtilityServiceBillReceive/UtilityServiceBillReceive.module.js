(function () {
    'use strict';

    angular.module('mTakaAPP.pages.UtilityServiceBillReceive', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('UtilityServiceBillReceive', {
                url: '/UtilityServiceBillReceive',
                templateUrl: window.applicationBaseUrl + 'app/pages/UtilityServiceBillReceive/UtilityServiceBillReceive.html',
                title: 'Utility Bill Receive',
                controller: 'UtilityServiceBillReceiveCtrl', 
            });
    }
})();