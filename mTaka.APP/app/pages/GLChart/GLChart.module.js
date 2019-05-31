(function () {
    'use strict';

    angular.module('mTakaAPP.pages.GLChart', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('GLChart', {
                url: '/GLChart',
                templateUrl: window.applicationBaseUrl + 'app/pages/GLChart/GLChart.html',
                title: 'GL Chart',
                controller: 'GLChartCtrl',
                authenticate: false,
                params: {
                    obj: null,
                    funtionid: null,
                }
            });
    }
})();