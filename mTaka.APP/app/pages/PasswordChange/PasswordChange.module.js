(function () {
    'use strict';

    angular.module('mTakaAPP.pages.PasswordChange', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('PasswordChange', {
                url: '/PasswordChange',
                templateUrl: 'app/pages/PasswordChange/PasswordChange.html',
                title: 'Password Change',
                controller: 'PasswordChangeCtrl',
                sidebarMeta: {
                    order: 800,
                },
                authenticate: false
            });
    }

})(); 