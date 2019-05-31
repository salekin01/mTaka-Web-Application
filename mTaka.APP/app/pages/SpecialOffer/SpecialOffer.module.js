(function () {
    'use strict';

    angular.module('mTakaAPP.pages.SpecialOffer', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('SpecialOffer', {
                url: '/SpecialOffer',
                templateUrl: window.applicationBaseUrl + 'app/pages/SpecialOffer/SpecialOffer.html',
                title: 'Special Offers',
                controller: 'SpecialOfferCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();