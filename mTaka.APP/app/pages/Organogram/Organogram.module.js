(function () {
    'use strict';

    angular.module('mTakaAPP.pages.Organogram', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('Organogram', {
                url: '/Organogram',
                templateUrl: window.applicationBaseUrl + 'app/pages/Organogram/Organogram.html',
                title: 'Organogram',
                controller: 'OrganogramCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();