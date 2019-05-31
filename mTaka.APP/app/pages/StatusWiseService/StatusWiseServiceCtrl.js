(function () {
    'use strict';

    angular.module('mTakaAPP.pages.StatusWiseService')
        .controller('StatusWiseServiceCtrl', StatusWiseServiceCtrl);

    function StatusWiseServiceCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
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

        $scope.StatusWiseServiceModel = {};
        $scope.SubmitBtn = "Add";

        $scope.GetDefineServiceForDD = function () {
            $http.get('DefineService/GetDefineServiceForDD').success(function (json) {
                $scope.DefineServiceForDD = json;
            });
        };
        $scope.GetDefineServiceForDD();

        $scope.GetAccStatusSetupForDD = function () {
            $http.get('AccStatusSetup/GetAccStatusSetupForDD').success(function (json) {
                $scope.AccStatusSetupForDD = json;
            });
        };
        $scope.GetAccStatusSetupForDD();

        function loadData() {
            debugger;
            $http.get('StatusWiseService/Index').success(function (json) {
                $scope.StatusWiseServiceList = json;
            });
        };
        loadData();
        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        $scope.addData = function () {
            debugger;
            if ($scope.SubmitBtn === "Add") {
                $scope.StatusWiseServiceModel.FunctionId = FunctionId;
                $scope.StatusWiseServiceModel.DefineServiceId = $scope.StatusWiseServiceModel.DefineServiceId.Value;
                $scope.StatusWiseServiceModel.AccStatusSetupId = $scope.StatusWiseServiceModel.AccStatusSetupId.Value;
                var data = { 'data': JSON.stringify($scope.StatusWiseServiceModel) };
                $http.post('StatusWiseService/Create', data, config)
                    .then(
                    function (response) {
                        if (response.data.Result == 1) {
                            showSuccessMsg(response.data.ResponseMessage);
                            $scope.ClearFields();
                            loadData();
                        }
                        else
                            showErrorMsg(response.data.ResponseMessage);
                    }
                    );

            }
            else if ($scope.SubmitBtn === "Update") {
                $scope.StatusWiseServiceModel.FunctionId = FunctionId;
                $scope.StatusWiseServiceModel.DefineServiceId = $scope.StatusWiseServiceModel.DefineServiceId.Value;
                $scope.StatusWiseServiceModel.AccStatusSetupId = $scope.StatusWiseServiceModel.AccStatusSetupId.Value;
                var data = { 'data': JSON.stringify($scope.StatusWiseServiceModel) };
                $http.post('StatusWiseService/Edit', data, config)
                    .then(
                    function (response) {
                        if (response.data.Result == 1) {
                            showSuccessMsg(response.data.ResponseMessage);
                            $scope.ClearFields();
                            loadData();
                        }
                        else
                            showErrorMsg(response.data.ResponseMessage);
                    }
                    );
            }
        };
        $scope.changeStatusWiseService = function (index) {
            debugger;
            var data = $scope.StatusWiseServiceList[index];
            $scope.StatusWiseServiceModel.StatusWiseServiceId = data.StatusWiseServiceId;
            accessArrayOfJsonObjectByKeyValue($scope.DefineServiceForDD, data.DefineServiceId);
            $scope.StatusWiseServiceModel.DefineServiceId = $scope.selectedDefineServiceDD;

            accessArrayOfJsonObjectByKeyValue($scope.AccStatusSetupForDD, data.AccStatusSetupId);
            $scope.StatusWiseServiceModel.AccStatusSetupId = $scope.selectedAccStatusSetupDD;
            $scope.SubmitBtn = "Update";
        };
        $scope.deleteStatusWiseService = function (index) {
            var data = { 'data': JSON.stringify($scope.StatusWiseServiceList[index]) };
            $http.post('StatusWiseService/Delete', data, config)
                .then(
                function (response) {
                    if (response.data.Result == 1) {
                        showSuccessMsg(response.data.ResponseMessage);
                        $scope.ClearFields();
                        loadData();
                    }
                    else
                        showErrorMsg(response.data.ResponseMessage);
                }
                );
        };
        function accessArrayOfJsonObjectByKeyValue(Array, keyValue) {
            debugger;
            Array.forEach(function (object) {
                debugger;
                if (object.Value == keyValue) {
                    $scope.selectedDefineServiceDD = object;
                    $scope.selectedAccStatusSetupDD = object;
                }
            });
        }
        $scope.ClearFields = function () {
            $scope.StatusWiseServiceModel.StatusWiseServiceId = "";
            $scope.StatusWiseServiceModel.DefineServiceId = "";
            $scope.StatusWiseServiceModel.AccStatusSetupId = "";
            $scope.SubmitBtn = "Add";
        };

        function showSuccessMsg(_Msg) {
            toastr.success(_Msg);
        };
        function showErrorMsg(_Msg) {
            toastr.error(_Msg);
        };
    }
})();
