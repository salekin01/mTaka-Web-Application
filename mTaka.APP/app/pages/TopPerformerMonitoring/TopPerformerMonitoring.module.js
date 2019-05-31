(function () {
	'use strict';

	angular.module('mTakaAPP.pages.TopPerformerMonitoring', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider
            .state('TopPerformerMonitoring', {
            	url: '/TopPerformerMonitoring',
            	templateUrl: window.applicationBaseUrl + 'app/pages/TopPerformerMonitoring/TopPerformerMonitoring.html',
            	title: 'Top Performer Monitoring',
            	controller: 'TopPerformerMonitoringCtrl',
            });
	}

})();