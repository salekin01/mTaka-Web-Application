(function () {
    'use strict';

    angular.module('mTakaAPP.pages.PasswordChange')
        .controller('PasswordChangeCtrl', PasswordChangeCtrl);


    function PasswordChangeCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
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

         
        $scope.PasswordChangeModel = {};
        $scope.SubmitBtn = "Add";

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        $scope.addData = function () {
            $scope.PasswordChangeModel.FunctionId = FunctionId;
            var data = { 'data': JSON.stringify($scope.PasswordChangeModel) };
            if ($scope.SubmitBtn === "Add") {
                $http.post('PasswordChange/PasswordChange', data, config)
                    .then(
                    function (response) {
                        if (response.data.Result == 1)
                            $location.path("/authSignIn");
                            //$scope.showSuccessMsg(response.data.ResponseMessage);
                        else
                            $scope.showErrorMsg(response.data.ResponseMessage);
                    }
                    );

            }
        };

        $scope.showSuccessMsg = function (_Msg) {
            toastr.success(_Msg);
        };
        $scope.showErrorMsg = function (_Msg) {
            toastr.error(_Msg);
        };
    }
})();