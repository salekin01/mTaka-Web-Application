(function () {
    'use strict';

    angular.module('mTakaAPP.pages.FileUpload', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('FileUpload', {
                url: '/FileUpload',
                templateUrl: window.applicationBaseUrl + 'app/pages/FileUpload/FileUpload.html',
                title: 'File Upload',
                controller: 'FileUploadCtrl',
                //sidebarMeta: {
                //    icon: 'ion-android-contacts',
                //    order: 2,
                //},
            });
    }
})();