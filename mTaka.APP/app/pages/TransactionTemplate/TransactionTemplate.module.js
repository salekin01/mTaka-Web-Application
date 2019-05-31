(function () {
    'use strict';

    angular.module('mTakaAPP.pages.TransactionTemplate', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('TransactionTemplate', {
                url: '/TransactionTemplate',
                templateUrl: window.applicationBaseUrl + 'app/pages/TransactionTemplate/TransactionTemplate.html',
                title: 'Transaction Template',
                controller: 'TransactionTemplateCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 3,
                //},
            });
    }
})();