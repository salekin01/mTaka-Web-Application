(function () {
    'use strict';

    angular.module('mTakaAPP.pages.StatusWiseService', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('StatusWiseService', {
                url: '/StatusWiseService',
                templateUrl: window.applicationBaseUrl + 'app/pages/StatusWiseService/StatusWiseService.html',
                title: 'SWS',
                controller: 'StatusWiseServiceCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 3,
                //},
            });
    }
})();