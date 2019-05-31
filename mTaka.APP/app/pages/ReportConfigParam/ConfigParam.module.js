(function () {
    'use strict';

    angular.module('mTakaAPP.pages.ReportConfigParam', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('ReportConfigParam', {
                url: '/ReportConfigParam',
                templateUrl: window.applicationBaseUrl + 'app/pages/ReportConfigParam/ConfigParam.html',
                title: 'Report Configuration Param',
                controller: 'ReportConfigParamCtrl',
                authenticate: false,
                params: {
                    obj: null,
                    funtionid: null,
                }
            });
    }
})();