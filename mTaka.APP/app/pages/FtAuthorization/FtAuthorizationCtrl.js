(function () {
    'use strict';

    angular.module('mTakaAPP.pages.FtAuthorization')
        .controller('FtAuthorizationCtrl', FtAuthorizationCtrl);

    function FtAuthorizationCtrl($scope, $http, toastr, $filter, editableOptions, editableThemes, $rootScope, $stateParams, $state, getFunctionId) {

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

        $scope.AuthLogModel = {};
        $scope.AuthLogModel.FunctionId = null;
        $scope.AuthLogModel.AuthStatusId = null;
        $scope.AuthLogModel.ShowDetailsEnable = false;
        $scope.AuthLogModel.smartTablePageSize = 10;
        $scope.AuthLogModel.AuthLogList = [];
        $scope.AuthLogModel.RowCollection = [];

        $scope.GetFtAuthLogFunctionsForDD = function () {
            $http.get('FtAuthorization/GetFtAuthLogFunctionsForDD').success(function (json) {
                $scope.NftAuthLogFunctionsForDD = json;
            });
        };
        $scope.GetFtAuthLogFunctionsForDD();

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        $scope.onSelected = function (selectedItem) {
            var data = { 'data': JSON.stringify(selectedItem.Value) };
            $http.post('FtAuthorization/GetAllFtAuthLogByFunctionId', data, config)
                .then(
                function (response) {
                    if (response.data != null) {
                        $scope.AuthLogModel.AuthLogList = response.data;
                        $scope.AuthLogModel.ShowDetailsEnable = false;
                        $scope.AuthLogModel.RowCollection = response.data;
                    }
                }
                );
        };

        $scope.addData = function () {
            debugger;
            $scope.AuthLogModel1 = {};
            $scope.AuthLogModel1.Remarks = $scope.AuthLogModel.Remarks;
            $scope.AuthLogModel1.AuthStatusId = $scope.AuthLogModel.AuthStatusId;
            $scope.AuthLogModel1.SelectedAuthLogIdList = $scope.AuthLogModel.SelectedAuthLogIdList;
            $scope.AuthLogModel1.MakeBy = "salekin";
            $scope.AuthLogModel1.FunctionId = "090106002";
            var data = { 'data': JSON.stringify($scope.AuthLogModel1) };
            $http.post('FtAuthorization/Create', data, config)
                .then(
                function (response) {
                    //$scope.loadData();
                    $scope.ClearFields();
                    debugger;
                    if (response.data.Result == 1) {
                        GetFtAuthLogFunctionsForDD();
                        $scope.showSuccessMsg(response.data.ResponseMessage);
                    }   
                    else
                        $scope.showErrorMsg(response.data.ResponseMessage);
                }
                );
        };

        $scope.toggleAll = function () {
            debugger;
            if ($scope.AuthLogModel.checkAll)
                $scope.AuthLogModel.SelectedAuthLogIdList = $scope.AuthLogModel.AuthLogList.map(function (item) { return item.LogId; });
            else
                $scope.AuthLogModel.SelectedAuthLogIdList = [];

            //var toggleStatus = $scope.AuthLogModel.isAllSelected;
            //angular.forEach($scope.AuthLogModel.AuthLogList, function (itm) { itm.selected = toggleStatus; });
        }

        $scope.ShowDetails = function (index) {
            var data = $scope.AuthLogModel.AuthLogList[index];
            var data = { 'data': JSON.stringify(data.LogId) };
            $http.post('FtAuthorization/GetFtAuthLogDetailsByLogId', data, config)
                .then(
                function (response) {
                    if (response.data != null) {
                        debugger;
                        $scope.AuthLogModel.AuthLogDetailsList = response.data;
                        $scope.AuthLogModel.ShowDetailsEnable = true;
                    }
                }
                );
        };

        $scope.ClearFields = function () {
            $scope.AuthLogModel.FunctionId = "";
            $scope.AuthLogModel.Remarks = "";
            $scope.AuthLogModel.AuthLogList = "";
            $scope.AuthLogModel.RowCollection = "";
            $scope.AuthLogModel.checkAll = "";
            $scope.AuthLogModel.SelectedAuthLogIdList = [];
            $scope.AuthLogModel.AuthLogDetailsList = null;
            $scope.AuthLogModel.ShowDetailsEnable = false;
        };

        $scope.showSuccessMsg = function (_Msg) {
            toastr.success(_Msg);
        };
        $scope.showErrorMsg = function (_Msg) {
            toastr.error(_Msg);
        };
    }
})();