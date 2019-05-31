angular.module('mTakaAPP.theme').run(function ($rootScope, $state) {

  /* ENTRY EVENTS */

  $rootScope.$on('$locationChangeStart', function (event, toUrl, fromUrl, toHistoryState, fromHistoryState) {
    console.groupCollapsed('$locationChangeStart');
    console.debug('event:', event);
    console.debug('toUrl:', toUrl);
    console.debug('fromUrl:', fromUrl);
    console.debug('toHistoryState:', toHistoryState);
    console.debug('fromHistoryState:', fromHistoryState);
    console.groupEnd('$locationChangeStart');
  });

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    console.groupCollapsed('$stateChangeStart');
    console.debug('event:', event);
    console.debug('toState:', toState);
    console.debug('toParams:', toParams);
    console.debug('fromState:', fromState);
    console.debug('fromParams:', fromParams);
    console.groupEnd('$stateChangeStart');
  });

  /* SUCCESS EVENTS */
  
  $rootScope.$on('$locationChangeSuccess', function (event, toUrl, fromUrl, toHistoryState, fromHistoryState) {
    console.groupCollapsed('$locationChangeSuccess');
    console.debug('event:', event);
    console.debug('toUrl:', toUrl);
    console.debug('fromUrl:', fromUrl);
    console.debug('toHistoryState:', toHistoryState);
    console.debug('fromHistoryState:', fromHistoryState);
    console.groupEnd('$locationChangeSuccess');
  });

  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    console.groupCollapsed('$stateChangeSuccess');
    console.debug('event:', event);
    console.debug('toState:', toState);
    console.debug('toParams:', toParams);
    console.debug('fromState:', fromState);
    console.debug('fromParams:', fromParams);
    console.groupEnd('$stateChangeSuccess');
    console.debug('\n');
  });

  /* ERROR EVENTS */

  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams) {
    console.groupCollapsed('$stateChangeError');
    console.debug('event:', event);
    console.debug('toState:', toState);
    console.debug('toParams:', toParams);
    console.debug('fromState:', fromState);
    console.debug('fromParams:', fromParams);
    console.groupEnd('$stateChangeError');
    console.debug('\n');
  });

  $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
    console.groupCollapsed('$stateNotFound');
    console.debug('event:', event);
    console.debug('unfoundState:', unfoundState);
    console.debug('fromState:', fromState);
    console.debug('fromParams:', fromParams);
    console.groupEnd('$stateNotFound');
    console.debug('\n');
  });

});