(function () {
    'use strict';

    angular.module('mTakaAPP.pages.NftAuthorization', ['ui.select', 'ngSanitize', 'checklist-model','smart-table'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('NftAuthorization', {
                url: '/NftAuthorization',
                templateUrl: window.applicationBaseUrl + 'app/pages/NftAuthorization/NftAuthorization.html',
                title: 'Nft Authorization',
                controller: 'NftAuthorizationCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();