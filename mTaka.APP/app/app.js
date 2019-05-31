'use strict';

angular.module('mTakaAPP', [
    'ngAnimate',
    'ngMessages',
    'ui.bootstrap',
    'ui.sortable',
    'ui.router',
    'ngTouch',
    'toastr',
    'smart-table',
    "xeditable",
    'ui.slimscroll',
    'ngJsTree',
    'angular-progress-button-styles',
    'mTakaAPP.theme',
    'mTakaAPP.pages',
    'directives.customvalidation.customValidationTypes',
    'checklist-model',
    'ngIdle'

]).config(function (IdleProvider, KeepaliveProvider) {
    IdleProvider.idle(10000); // 15 min
    IdleProvider.timeout(10000);
    KeepaliveProvider.interval(15000); // heartbeat every 10 min
    KeepaliveProvider.http('/authSignIn/authSignIn.html'); // URL that makes sure session is alive
    }).run(function ($rootScope, Idle, $state, $location) {
        Idle.watch();
        $rootScope.$on('IdleStart', function () {
            /* Display modal warning or sth */alert("You're Idle. Do Something! Or \n You'll be logged out within 10 seconds");

        });
        $rootScope.$on('IdleTimeout', function () { /* Logout user */
            $state.go("authSignIn");
           // $location.path("/authSignIn");
        });
    });