(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CusCategory')
        .controller('CusCategoryCtrl', CusCategoryCtrl);


    function CusCategoryCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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

        $scope.CusCategoryModel = {};
        $scope.CusCategoryModel.FunctionId = FunctionId;
        $scope.CusCategoryModel.UserName = $rootScope.UserName;
        $scope.SubmitBtn = "Add";
        $scope.loadData = function () {
            $http.get('CusCategory/GetCusCategory').success(function (json) {
                $scope.CusCategoryList = json;
            });
        };
        $scope.loadData();

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        $scope.addData = function () {
            debugger;
            $scope.CusCategoryModel.FunctionId = FunctionId;
            var data = { 'data': JSON.stringify($scope.CusCategoryModel) };
            if ($scope.SubmitBtn === "Add") {
                $http.post('CusCategory/AddCusCategory', data, config)
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
                $scope.CusCategoryModel.FunctionId = FunctionId;
                var dataHasNotChanged = angular.equals($scope.originalData, $scope.CusCategoryModel);
                if (dataHasNotChanged) {
                    $scope.showErrorMsg("No data has been modified");
                    return;
                }
                $scope.CusCategoryModel.FunctionId = FunctionId;
                var data = { 'data': JSON.stringify($scope.CusCategoryModel) };
                $http.post('CusCategory/EditCusCategory', data, config)
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
        $scope.changeCusCategory = function (index) {
            var data = $scope.CusCategoryList[index];
            $scope.CusCategoryModel = angular.copy(data);

            $scope.originalData = angular.copy($scope.CusCategoryModel);
            $scope.SubmitBtn = "Update";
        };
        $scope.deleteCusCategory = function (index) {
            var data = { 'data': JSON.stringify($scope.CusCategoryList[index]) };
            $http.post('CusCategory/DeleteCusCategory', data, config)
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
        $scope.ClearFields = function () {
            $scope.CusCategoryModel.CusCategoryId = "";
            $scope.CusCategoryModel.CusCategoryNm = "";
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