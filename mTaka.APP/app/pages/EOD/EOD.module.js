(function () {
    'use strict';

    angular.module('mTakaAPP.pages.EOD', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('EOD', {
                url: '/EOD',
                templateUrl: window.applicationBaseUrl + 'app/pages/EOD/EOD.html',
                title: 'EOD',
                controller: 'EODCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();