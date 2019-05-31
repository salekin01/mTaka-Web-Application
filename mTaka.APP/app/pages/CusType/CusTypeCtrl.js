(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CusType')
        .controller('CusTypeCtrl', CusTypeCtrl);

    function CusTypeCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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

        debugger;
        $scope.CusTypeModel = {};
        $scope.CusTypeModel.CusCategoryId = null;
        $scope.CusTypeModel.FunctionId = FunctionId;
        $scope.CusTypeModel.UserName = $rootScope.UserName;
        $scope.SubmitBtn = "Add";

        $scope.CusTypeModel.FunctionId = FunctionId;
        $scope.CusTypeModel.UserName = $rootScope.UserName;

        $scope.GetCreateInfoForCusType = function () {
            $http.get('CusType/Create').success(function (json) {
                $scope.CusTypeModel = json;
                $scope.CusCategoryForDD = $scope.CusTypeModel.CusCategoryDD;
            });
        };
        $scope.GetCreateInfoForCusType();

        //$scope.GetCusCategoryForDD = function () {
        //    $http.get('CusType/GetCusCategoryForDD').success(function (json) {
        //        $scope.CusCategoryForDD = json;
        //    });
        //};
        //$scope.GetCusCategoryForDD();

        $scope.loadData = function () {
            $http.get('CusType/Index').success(function (json) {
                $scope.CusTypeList = json;
            });
        };
        $scope.loadData();

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        $scope.addData = function () {
            if ($scope.SubmitBtn === "Add") {
                $scope.CusTypeModel.FunctionId = FunctionId;
                $scope.CusTypeModel.UserName = $rootScope.UserName;
                $scope.CusTypeModel.CusCategoryId = $scope.CusTypeModel.CusCategoryId != null ? $scope.CusTypeModel.CusCategoryId.Value : null;
                var data = { 'data': JSON.stringify($scope.CusTypeModel) };
                $http.post('CusType/Create', data, config)
                    .then(
                    function (response) {
                        $scope.loadData();
                        $scope.ClearFields();
                        if (response.data.Result == 1)
                            $scope.showSuccessMsg(response.data.ResponseMessage);
                        else
                            $scope.showErrorMsg(response.data.ResponseMessage);
                    }
                    );

            }
            else if ($scope.SubmitBtn === "Update") {
                $scope.CusTypeModel.FunctionId = FunctionId;
                $scope.CusTypeModel.UserName = $rootScope.UserName;
                var dataHasNotChanged = angular.equals($scope.originalData, $scope.CusTypeModel);
                if (dataHasNotChanged) {
                    $scope.showErrorMsg("No data has been modified");
                    return;
                }      

                $scope.CusTypeModel.FunctionId = FunctionId;
                $scope.CusTypeModel.UserName = $rootScope.UserName;
                $scope.CusTypeModel.CusCategoryId = $scope.CusTypeModel.CusCategoryId != null ? $scope.CusTypeModel.CusCategoryId.Value : null;
                var data = { 'data': JSON.stringify($scope.CusTypeModel) };
                $http.post('CusType/Edit', data, config)
                    .then(
                    function (response) {
                        $scope.loadData();
                        $scope.ClearFields();
                        if (response.data.Result == 1)
                            $scope.showSuccessMsg(response.data.ResponseMessage);
                        else
                            $scope.showErrorMsg(response.data.ResponseMessage);
                    }
                    );
            }
        };
        $scope.changeCusType = function (index) {
            debugger;
            var data = $scope.CusTypeList[index];
            $scope.CusTypeModel = angular.copy(data);

            accessArrayOfJsonObjectByKeyValue($scope.CusCategoryForDD, data.CusCategoryId);
            $scope.CusTypeModel.CusCategoryId = $scope.selectedCusCategoryDD;

            $scope.originalData = angular.copy($scope.CusTypeModel);
            $scope.SubmitBtn = "Update";
        };
        $scope.deleteCusType = function (index) {
            var data = { 'data': JSON.stringify($scope.CusTypeList[index]) };
            $http.post('CusType/Delete', data, config)
                .then(
                function (response) {
                    $scope.loadData();
                    $scope.ClearFields();
                    if (response.data.Result == 1)
                        $scope.showSuccessMsg(response.data.ResponseMessage);
                    else
                        $scope.showErrorMsg(response.data.ResponseMessage);
                }
                );
        };
        function accessArrayOfJsonObjectByKeyValue(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedCusCategoryDD = object;
                }
            });
        }
        $scope.ClearFields = function () {
            $scope.CusTypeModel.CusTypeId = "";
            $scope.CusTypeModel.CusTypeNm = "";
            $scope.CusTypeModel.CusCategoryId = "";
            $scope.SubmitBtn = "Add";
        };


        $scope.showSuccessMsg = function (_Msg) {
            toastr.success(_Msg);
        };
        $scope.showErrorMsg = function (_Msg) {
            toastr.error(_Msg);
        };
    }
})();