(function () {
    'use strict';

    angular.module('mTakaAPP.pages.ManagerType')
        .controller('ManagerTypeCtrl', ManagerTypeCtrl);


    function ManagerTypeCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
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

        $scope.ManTypeModel = {};
        $scope.SubmitBtn = "Add";


        $scope.ManTypeModel.FunctionId = FunctionId;
        $scope.ManTypeModel.UserName = $rootScope.UserName;

        $scope.GetManagerCategoryForDD = function () {
            $http.get('ManagerCategory/GetManagerCategoryForDD').success(function (json) {
                $scope.ManagerCategoryForDD = json;

            });
        };
        $scope.GetManagerCategoryForDD();

        $scope.GetManagerTypeForDD = function () {
            $http.get('ManagerType/GetManagerTypeForDD').success(function (json) {
                $scope.ParentAccForManGroup = json;

            });
        };
        $scope.GetManagerTypeForDD();

        $scope.loadData = function () {
            $http.post('ManagerType/Index').success(function (json) {
                $scope.ManagerType = json;
                console.log($scope.ManagerType);
            });
        };

        $scope.loadData();
        $scope.NewManagerType = {};
        $scope.SubmitBtn = "Add";


        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        $scope.addData = function () {
            if ($scope.SubmitBtn === "Add") {
                debugger;
                $scope.ManTypeModel.FunctionId = FunctionId;
                $scope.ManTypeModel.ManagerCategoryId = $scope.ManTypeModel.ManagerCategoryId.Value;
                $scope.ManTypeModel.ManTypeParentAcc = $scope.ManTypeModel.ManTypeParentAcc != null ? $scope.ManTypeModel.ManTypeParentAcc.Value : $scope.ManTypeModel.ManTypeParentAcc;
                var data = { 'data': JSON.stringify($scope.ManTypeModel) };
                $http.post('ManagerType/Create', data, config)
                    .then(
                    function (response) {
                        debugger;
                        $scope.loadData();
                        $scope.ClearFields();
                        if (response.data.Result == 1)
                            $scope.showSuccessMsg(response.data.ResponseMessage);
                        else
                            $scope.showErrorMsg(response.data.ResponseMessage);
                    },
                    function (response) {
                        $scope.showErrorMsg();
                    }
                    );

            }
            else if ($scope.SubmitBtn === "Update") {
                $scope.ManTypeModel.FunctionId = FunctionId;
                $scope.ManTypeModel.ManagerCategoryId = $scope.ManTypeModel.ManagerCategoryId.Value;
                $scope.ManTypeModel.ManTypeParentAcc = $scope.ManTypeModel.ManTypeParentAcc.Value;
                var data = { 'data': JSON.stringify($scope.ManTypeModel) };
                $http.post('ManagerType/Edit', data, config)
                    .then(
                    function (response) {
                        $scope.getnewdata = $scope.loadData();
                        var cltFld = $scope.ClearFields();
                        if (response.data.Result == 1)
                            $scope.showSuccessMsg(response.data.ResponseMessage);
                        else
                            $scope.showErrorMsg(response.data.ResponseMessage);
                    },
                    function (response) {
                        var error = $scope.showErrorMsg();
                        if (response.data.Result == 1)
                            $scope.showSuccessMsg(response.data.ResponseMessage);
                        else
                            $scope.showErrorMsg(response.data.ResponseMessage);
                    }
                    );
            }

        };

        $scope.deleteManagerType = function (index) {
            var data = { 'data': JSON.stringify($scope.ManagerType[index]) };
            $http.post('ManagerType/Delete', data, config)
                .then(
                function (response) {

                    $scope.getnewdata = $scope.loadData();
                    var cltFld = $scope.ClearFields();
                    if (response.data.Result == 1)
                        $scope.showSuccessMsg(response.data.ResponseMessage);
                    else
                        $scope.showErrorMsg(response.data.ResponseMessage);
                },
                function (response) {
                    var error = $scope.showErrorMsg();
                    if (response.data.Result == 1)
                        $scope.showSuccessMsg(response.data.ResponseMessage);
                    else
                        $scope.showErrorMsg(response.data.ResponseMessage);
                }
                );
        };

        $scope.changeManagerType = function (index) {
            var data = $scope.ManagerType[index];
            $scope.ManTypeModel.ManTypeId = data.ManTypeId;
            $scope.ManTypeModel.ManTypeNm = data.ManTypeNm;
            $scope.ManTypeModel.ManTypeShortNm = data.ManTypeShortNm;
            accessArrayOfJsonObjectByKeyValue($scope.ManagerCategoryForDD, data.ManagerCategoryId);
            $scope.ManTypeModel.ManagerCategoryId = $scope.selectedManagerGroupDD;

            accessArrayOfJsonObjectByKeyValueParentAcc($scope.ParentAccForManGroup, data.ManTypeParentAcc);
            $scope.ManTypeModel.ManTypeParentAcc = $scope.selectedParentAccForManGroupDD;
            $scope.SubmitBtn = "Update";
        };
        function accessArrayOfJsonObjectByKeyValue(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedManagerGroupDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueParentAcc(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedParentAccForManGroupDD = object;
                }
            });
        }
        $scope.ClearFields = function () {

            $scope.ManTypeModel.ManTypeId = "";
            $scope.ManTypeModel.ManTypeNm = "";
            $scope.ManTypeModel.ManTypeShortNm = "";
            $scope.ManTypeModel.ManagerCategoryId = "";
            $scope.ManTypeModel.ManTypeParentAcc = "";
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