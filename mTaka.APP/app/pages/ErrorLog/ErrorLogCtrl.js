(function () {
    'use strict';

    angular.module('mTakaAPP.pages.ErrorLog')
        .controller('ErrorLogCtrl', ErrorLogCtrl);

    function ErrorLogCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

        var FunctionId = getFunctionId.FunctionId($rootScope.menuList, $state);


        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                $state.current = toState;
            });
        $state.go($state.current.name, { funtionid: FunctionId });
        $rootScope.$on('$stateChangeError', function (e, toState, toParams, fromState, fromParams, error) {

            if (error === "Not Authorized") {
                $state.go("authSignIn");
            }
        });

        $scope.ErrorLogModel = {};

        $scope.loadData = function () {
            $http.get('ErrorLog/Index').success(function (json) {
                $scope.ErrorLogList = json;
            });
        };
        $scope.loadData();

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        $scope.deleteErrorLog = function (index) {
            var data = { 'data': JSON.stringify($scope.ErrorLogList[index]) };
            $http.post('ErrorLog/Delete', data, config)
                .then(
                function (response) {
                    $scope.loadData();
                    $scope.showSuccessMsg(response.data.ResponseMessage);
                },
                function (response) {
                    $scope.showErrorMsg(response.data.ResponseMessage);
                }
                );
        };

        $scope.showSuccessMsg = function (_Msg) {
            toastr.success(_Msg);
        };
        $scope.showErrorMsg = function () {
            toastr.error(_Msg);
        };
    }
})();