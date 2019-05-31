(function () {
    'use strict';

    angular.module('mTakaAPP.pages.TopPerformer', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('TopPerformer', {
                url: '/TopPerformer',
                templateUrl: window.applicationBaseUrl + 'app/pages/TopPerformer/TopPerformer.html',
                title: 'Top Performer',
                controller: 'TopPerformerCtrl',
            });
    }

})();