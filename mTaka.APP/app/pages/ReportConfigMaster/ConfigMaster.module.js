(function () {
    'use strict';

    angular.module('mTakaAPP.pages.ReportConfigMaster', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('ReportConfigMaster', {
                url: '/ConfigMaster',
                templateUrl: window.applicationBaseUrl + 'app/pages/ReportConfigMaster/ConfigMaster.html',
                title: 'Report Configuration',
                controller: 'ReportConfigMasterCtrl',
                authenticate: false,
                params: {
                    obj: null,
                    funtionid: null,
                }
            });
    }
})();