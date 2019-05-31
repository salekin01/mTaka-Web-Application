(function () {
    'use strict';

    angular.module('mTakaAPP.pages.ActivityLogService');

    function ActivityLogCtrl($scope, $http, toastr, $rootScope, $state, $stateParams) {

        $scope.ActivityLogModel = {};

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        $rootScope.$watch($state, function (newValue, oldValue) {
            alert(newValue);
        });


        //$rootScope.ActivityLogFnc = function () {
        //    $scope.ActivityLogModel.IpAddress = "172.68.0.1";//get Form session;
        //    $scope.ActivityLogModel.BranchId = "185";//get Form session;
        //    $scope.ActivityLogModel.AccountNo = "10224574221";//get Form session;
        //    $scope.ActivityLogModel.UserId = "00124";//get Form session;
        //    $scope.ActivityLogModel.Action = "Form: " + sessionStorage.OldState + " To: " + $rootScope.$state.current.name;
        //    var data = { 'data': JSON.stringify($scope.ActivityLogModel) };
        //    $http.post('UserActivityLog/Create', data, config).then(
        //         function (response) {

        //         },
        //         function (response) {
        //         }
        //         );
        //    sessionStorage.OldState = $rootScope.$state.current.name;
        //    //$rootScope.OldState = JSON.parse(sessionStorage.OldState);
        //};
        //$rootScope.ActivityLogFnc();
    }
})();