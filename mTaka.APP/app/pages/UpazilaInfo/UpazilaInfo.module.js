(function () {
    'use strict';

    angular.module('mTakaAPP.pages.UpazilaInfo', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('UpazilaInfo', {
                url: '/UpazilaInfo',
                templateUrl: window.applicationBaseUrl + 'app/pages/UpazilaInfo/UpazilaInfo.html',
                title: 'Upazila Info',
                controller: 'UpazilaInfoCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();