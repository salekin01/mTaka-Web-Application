(function () {
    'use strict';

    angular.module('mTakaAPP.pages.main', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: window.applicationBaseUrl + 'app/pages/main/main.html',
                title: 'DashBoard',
                controller: 'mainCtrl',
            });
    }
})();