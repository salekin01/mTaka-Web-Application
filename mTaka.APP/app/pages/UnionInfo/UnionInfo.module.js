(function () {
    'use strict';

    angular.module('mTakaAPP.pages.UnionInfo', ['ui.select', 'ngSanitize'])
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
            .state('UnionInfo', {
                url: '/UnionInfo',
                templateUrl: window.applicationBaseUrl + 'app/pages/UnionInfo/UnionInfo.html',
                title: 'Union Info',
                controller: 'UnionInfoCtrl',
                authenticate: false,
                params: {
                    obj: null,
                    funtionid: null,
                }
                //,

                //resolve: {
                //    authenticate: function ($stateParams) {
                //        debugger;
                //        $stateParams.funtionid === null ? false : true;
                //    }
                //}

            });
    }
})();