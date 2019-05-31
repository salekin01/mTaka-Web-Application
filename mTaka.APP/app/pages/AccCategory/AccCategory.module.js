(function () {
    'use strict';

    angular.module('mTakaAPP.pages.AccCategory', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AccCategory', {
                url: '/AccCategory',
                templateUrl: window.applicationBaseUrl + 'app/pages/AccCategory/AccCategory.html',
                title: 'Account Category',
                controller: 'AccCategoryCtrl',
                params: {
                    obj: null,
                    funtionid : null,
                }
            });
    }


})();