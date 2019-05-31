(function () {
    'use strict';

    angular.module('mTakaAPP.pages.ReportConfigMaster')
        .controller('ReportConfigMasterCtrl', ReportConfigMasterCtrl);

    function ReportConfigMasterCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
        var FunctionId = getFunctionId.FunctionId($rootScope.menuList, $state);
        debugger;

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

        $scope.ReportMasterModel = {};
       // $scope.ReportMasterModel.ConnectionId = null;
        $scope.SubmitBtn = "Add";
        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        $scope.GetFunctionIdForDD = function () {
            $http.get('ReportConfigMaster/GetFunctionIdForDD').success(function (json) {
                $scope.FunctionIdForDD = json;
            });
        };
        $scope.GetFunctionIdForDD();

        $scope.GetConnectionForDD = function () {
            $http.get('ReportConfigMaster/GetConnectionForDD').success(function (json) {
                $scope.ConnectionForDD = json;
            });
        };
        $scope.GetConnectionForDD();

        $scope.onSelected = function (selectedItem) {
        
            var data = { 'data': selectedItem.Value };
            $http.post('ReportConfigMaster/GetByFunctionId', data, config).then(
                function (response) {
                    console.log(response);
                    if (response.data.FunctionId != null) {
                        $scope.ReportMasterModel.FunctionId = response.data.FunctionId;
                        $scope.ReportMasterModel.ReportName = response.data.ReportName;
                        $scope.ReportMasterModel.ReportFile = response.data.ReportFile;
                        $scope.ReportMasterModel.AutoGenPeriod = response.data.AutoGenPeriod == '1' ? true : false;
                        $scope.ReportMasterModel.GenBeforeEod = response.data.GenBeforeEod == '1' ? true : false;
                        $scope.ReportMasterModel.ConnectionId = response.data.ConnectionId;
                        $scope.ReportMasterModel.IsVisible = response.data.IsVisible == '1' ? true : false;

                        accessArrayOfJsonObjectByKeyValueFID($scope.FunctionIdForDD, response.data.FunctionId);
                        $scope.ReportMasterModel.FunctionId = $scope.selectedFunctionIdDD;

                        accessArrayOfJsonObjectByKeyValue($scope.ConnectionForDD, response.data.ConnectionId);
                        $scope.ReportMasterModel.ConnectionId = $scope.selectedReportConfigDD;
                    }
                    else {

                        $scope.ReportMasterModel.ReportName = '';
                        $scope.ReportMasterModel.ReportFile = '';
                        $scope.ReportMasterModel.AutoGenPeriod = '';
                        $scope.ReportMasterModel.GenBeforeEod = false;
                        $scope.ReportMasterModel.ConnectionId = '';
                        $scope.ReportMasterModel.IsVisible = false;
                        $scope.SubmitBtn = "Add";
                    }
            })
        };

        $scope.loadData = function () {
            
            $http.get('ReportConfigMaster/Index').success(function (json) {
              
                $scope.ConfigMasterList = json;
            });
        };
        $scope.loadData();

       
        $scope.addData = function () {           
            debugger;
            if ($scope.SubmitBtn === "Add") {
                $scope.ReportMasterModel.ConnectionId = $scope.ReportMasterModel.ConnectionId.Value;
                $scope.ReportMasterModel.FunctionId = $scope.ReportMasterModel.FunctionId.Value;
                var data = { 'data': JSON.stringify($scope.ReportMasterModel) };
                $http.post('ReportConfigMaster/Create', data, config)
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
                
                $scope.ReportMasterModel.ConnectionId = $scope.ReportMasterModel.ConnectionId.Value;
                var data = { 'data': JSON.stringify($scope.ReportMasterModel) };
                $http.post('ReportConfigMaster/Edit', data, config)
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
        $scope.changeReportConfig = function (index) {
            var data = $scope.ConfigMasterList[index];
            $scope.ReportMasterModel.FunctionId = data.FunctionId;
            $scope.ReportMasterModel.ReportName = data.ReportName;
            $scope.ReportMasterModel.ReportFile = data.ReportFile;
            $scope.ReportMasterModel.AutoGenPeriod = data.AutoGenPeriod == '1' ? true : false;
            $scope.ReportMasterModel.GenBeforeEod = data.GenBeforeEod == '1' ? true : false;
            $scope.ReportMasterModel.ConnectionId = data.ConnectionId;
            $scope.ReportMasterModel.IsVisible = data.IsVisible == '1' ? true : false;
       
            //alert(data.UpazilaId);

            accessArrayOfJsonObjectByKeyValueFID($scope.FunctionIdForDD, data.FunctionId);
            $scope.ReportMasterModel.FunctionId = $scope.selectedFunctionIdDD;

            accessArrayOfJsonObjectByKeyValue($scope.ConnectionForDD, data.ConnectionId);
            $scope.ReportMasterModel.ConnectionId = $scope.selectedReportConfigDD;
            $scope.SubmitBtn = "Update";
        };
        $scope.deleteUnionInfo = function (index) {
            var data = { 'data': JSON.stringify($scope.UnionInfoList[index]) };
            $http.post('ReportConfigMaster/Delete', data, config)
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

        function accessArrayOfJsonObjectByKeyValueFID(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedFunctionIdDD = object;
                }
            });
        }
        function accessArrayOfJsonObjectByKeyValue(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedReportConfigDD = object;
                }
            });
        }
        $scope.ClearFields = function () {
            $scope.ReportMasterModel.FunctionId = '';
            $scope.ReportMasterModel.ReportName = '';
            $scope.ReportMasterModel.ReportFile = '';
            $scope.ReportMasterModel.AutoGenPeriod = '';
            $scope.ReportMasterModel.GenBeforeEod = false;
            $scope.ReportMasterModel.ConnectionId = '';
            $scope.ReportMasterModel.IsVisible = false;
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