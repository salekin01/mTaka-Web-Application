(function () {
    'use strict';

    angular.module('mTakaAPP.pages.PostOffice', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('PostOffice', {
                url: '/PostOffice',
                templateUrl: window.applicationBaseUrl + 'app/pages/PostOffice/PostOffice.html',
                title: 'Post Office',
                controller: 'PostOfficeCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();