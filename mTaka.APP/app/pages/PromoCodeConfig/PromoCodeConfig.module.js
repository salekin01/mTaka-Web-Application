(function () {
	'use strict';

	angular.module('mTakaAPP.pages.PromoCodeConfig', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider
            .state('PromoCodeConfig', {
            	url: '/PromoCodeConfig',
            	templateUrl: window.applicationBaseUrl + 'app/pages/PromoCodeConfig/PromoCodeConfig.html',
            	title: 'Promo Code Configuration',
            	controller: 'PromoCodeConfigCtrl',
            	//sidebarMeta: {
            	//    icon: 'ion-android-contacts',
            	//    order: 2,
            	//},
            });
	}
})();