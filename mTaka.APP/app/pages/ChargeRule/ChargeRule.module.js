(function () {
    'use strict';

    angular.module('mTakaAPP.pages.ChargeRule', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

        //.run(function ($rootScope, $http, $location) {
        //    // redirect to login page if not logged in and trying to access a restricted page
        //    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        //        debugger;
        //        var publicPages = ['/authSignIn'];
        //        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        //        if (restrictedPage && !($stateParams.funtionid === null)) {
        //            $location.path('/authSignIn');
        //        }
        //    });
        //});

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('ChargeRule', {
                url: '/ChargeRule',
                templateUrl: window.applicationBaseUrl + 'app/pages/ChargeRule/ChargeRule.html',
                title: 'Charge Rules',
                controller: 'ChargeRuleCtrl',
                authenticate: false,
                params: {
                    obj: null,
                    funtionid: null,
                }
            });
    }
})();