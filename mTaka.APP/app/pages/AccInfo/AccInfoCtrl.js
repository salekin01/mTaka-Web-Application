(function () {
    'use strict';

    angular.module('mTakaAPP.pages.AccInfo')
        .controller('AccInfoCtrl', AccInfoCtrl);

    function AccInfoCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
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


        $scope.AccInfoModel = {};
        //$scope.AccInfoModel.WalletAccountNo = {};
        //$scope.AccInfoModel.AccountStatusId = {};
        $scope.AccInfoModel.FunctionId = FunctionId;
        $scope.AccInfoModel.UserName = $rootScope.UserName;
        $scope.SubmitBtn = "Update";

        $scope.GetAccNoForDD = function () {
            $http.post('AccInfo/GetAccNoForDD').success(function (json) {
                $scope.AccNoForDD = json;
            });
        };
        $scope.GetAccNoForDD();

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        $scope.BtnSubmit = function () {
            $scope.AccInfoModel.WalletAccountNo = $scope.AccInfoModel.WalletAccountNoDD.Value;
            var data = { 'data': JSON.stringify($scope.AccInfoModel) };
            //alert(data);
            $http.post('AccInfo/GetAccInfo', data, config)
                  .then(
                  function (response) {
                      if (response.data != null) {
                          
                          $scope.AccInfoModel = response.data;
                      }

                      else {
                          console.log(response);
                      }


                  }
             );
        }

        $scope.BtnUpdate = function () {
            var data = { 'data': JSON.stringify($scope.AccInfoModel) };
            $http.post('AccInfo/Create', data, config)
                .then(
                function (response) {
                    if (response.data.Result == 1)

                        $scope.showSuccessMsg(response.data.ResponseMessage);
                    else
                        $scope.showErrorMsg(response.data.ResponseMessage);
                }
                );
        }

        $scope.ClearField = function () {
            $scope.AccInfoModel.WalletAccountNo = "";
            $scope.AccInfoModel.AccNm = "";
            $scope.AccInfoModel.AccType = "";
            $scope.AccInfoModel.ManNationalId = "";
        }

        function accessArrayOfJsonObjectByKeyValue(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedAccStatusForDD = object;
                }
            });
        }
    }
})();