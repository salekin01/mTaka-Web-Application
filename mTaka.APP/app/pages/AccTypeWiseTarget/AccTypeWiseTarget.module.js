(function () {
    'use strict';

    angular.module('mTakaAPP.pages.AccTypeWiseTarget', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AccTypeWiseTarget', {
                url: '/AccTypeWiseTarget',
                templateUrl: window.applicationBaseUrl + 'app/pages/AccTypeWiseTarget/AccTypeWiseTarget.html',
                title: 'Acc Type Wise Target',
                controller: 'AccTypeWiseTargetCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();