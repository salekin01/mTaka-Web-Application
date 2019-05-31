(function () {
    'use strict';

    angular.module('mTakaAPP.pages.AccType')
        .controller('AccTypeCtrl', AccTypeCtrl);

    function AccTypeCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
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

        $scope.AccTypeModel = {};
        $scope.SubmitBtn = "Add";
        $scope.AccTypeModel.UserName = $rootScope.UserName;
        $scope.GetAccCategoryForDD = function () {
            $http.get('AccCategory/GetAccCategoryForDD').success(function (json) {
                $scope.AccCategoryForDD = json;
                
            });
        };
        $scope.GetAccCategoryForDD();

        $scope.GetAccTypeForDD = function () {
            $http.get('AccType/GetAccTypeForDD').success(function (json) {
                $scope.ParentAccForDD = json;

            });
        };
        $scope.GetAccTypeForDD();
        $scope.loadData = function () {
            $http.get('AccType/Index').success(function (json) {
                $scope.AccTypeList = json;
                $rootScope.ActivityLogIndex();
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
                $scope.AccTypeModel.FunctionId = FunctionId;
                $scope.AccTypeModel.AccCategoryId = $scope.AccTypeModel.AccCategoryId.Value;
                $scope.AccTypeModel.AccTypeParentAcc = $scope.AccTypeModel.AccTypeParentAcc.Value;
                var data = { 'data': JSON.stringify($scope.AccTypeModel) };
                $http.post('AccType/Create', data, config)
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
                $scope.AccTypeModel.AccCategoryId = $scope.AccTypeModel.AccCategoryId.Value;
                $scope.AccTypeModel.AccTypeParentAcc = $scope.AccTypeModel.AccTypeParentAcc.Value;

                var data = { 'data':JSON.stringify($scope.AccTypeModel) };
                $http.post('AccType/Edit', data, config)
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
        $scope.changeAccType = function (index) {
            var data = $scope.AccTypeList[index];
            $scope.AccTypeModel.AccTypeId = data.AccTypeId;
            $scope.AccTypeModel.AccTypeNm = data.AccTypeNm;
            $scope.AccTypeModel.AccTypeShortNm = data.AccTypeShortNm;

            accessArrayOfJsonObjectByKeyValueAccCategory($scope.AccCategoryForDD, data.AccCategoryId);
            $scope.AccTypeModel.AccCategoryId = $scope.selectedAccCategoryDD;
            accessArrayOfJsonObjectByKeyValueParentAcc($scope.ParentAccForDD, data.AccTypeParentAcc);
            $scope.AccTypeModel.AccTypeParentAcc = $scope.selectedParentAccDD;
            $scope.SubmitBtn = "Update"; 
        };
        $scope.deleteAccType = function (index) {
            var data = { 'data': JSON.stringify($scope.AccTypeList[index]) };

            $http.post('AccType/Delete', data, config)
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
        function accessArrayOfJsonObjectByKeyValueAccCategory(Array, keyValue) {
            if (keyValue == "") {
                $scope.selectedAccCategoryDD = "";
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedAccCategoryDD = object;
                }
            });
        }
        debugger;
        function accessArrayOfJsonObjectByKeyValueParentAcc(Array, keyValue) {
            if (keyValue == "") {
                $scope.selectedParentAccDD = "";
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedParentAccDD = object;
                }
            });
        }
        $scope.ClearFields = function () {
            $scope.AccTypeModel.AccTypeId = "";
            $scope.AccTypeModel.AccTypeNm = "";
            $scope.AccTypeModel.AccTypeShortNm = "";
            $scope.AccTypeModel.AccCategoryId = "";
            $scope.AccTypeModel.AccTypeParentAcc = "";
            $scope.AccTypeModel.selectedParentAccDD = "";
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