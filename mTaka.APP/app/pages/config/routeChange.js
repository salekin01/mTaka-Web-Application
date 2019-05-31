(function () {
    'use strict';

    angular.module('mTakaAPP.pages.config')
        .run(stateChangeStart);

    /** @ngInject */
    function stateChangeStart($rootScope, $state, localStorage) {
        //debugger;
        //alert("routeChange");
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            var login = localStorage.getObject('dataUser');
            if (toState.authenticate && _.isEmpty(login)) {
                // User isn’t authenticated
                $state.transitionTo("authSignIn");
                event.preventDefault();
            }
        });
    }

})();