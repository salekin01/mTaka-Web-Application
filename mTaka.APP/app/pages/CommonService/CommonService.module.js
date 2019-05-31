(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CommonService', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('CommonService', {
                url: '/CommonService',
                templateUrl: window.applicationBaseUrl + 'app/pages/CommonService/CommonService.html',
                title: 'Common Service',
                controller: 'CommonServiceCtrl',
               
            });
    }
})();