(function () {
    'use strict';

    angular.module('mTakaAPP.pages.UtilityServiceBillReporting')
        .controller('UtilityServiceBillReportingCtrl', UtilityServiceBillReportingCtrl, '$sce');

    function UtilityServiceBillReportingCtrl($scope, $http, toastr, $sce, $rootScope, $stateParams, $state, getFunctionId) {

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

        $scope.UtilityServiceBillReportingModel = {};
        $scope.UtilityServiceBillReportingModel.DefineServiceId = null;
        $scope.SubmitBtn = "Add";
        $scope.FieldTypeForDD =
            [{
                "Text": "Bill",
                "Value": "001",
                "Selected": false
            },
            {
                "Text": "Account",
                "Value": "002",
                "Selected": false
            },
            {
                "Text": "Amount",
                "Value": "003",
                "Selected": false
            },
            {
                "Text": "Branch",
                "Value": "004",
                "Selected": false
            }];

        $scope.ReportingTypeForDD =
            [{
                "Text": "Input",
                "Value": "001",
                "Selected": false
            },
            {
                "Text": "Output",
                "Value": "002",
                "Selected": false
            }];

        $scope.InputTypeForDD =
            [{
                "Text": "Text",
                "Value": "text",
                "Selected": false
            },
            {
                "Text": "Number",
                "Value": "number",
                "Selected": false
            },
            {
                "Text": "Password",
                "Value": "password",
                "Selected": false
            },
            {
                "Text": "Date",
                "Value": "date",
                "Selected": false
            }];

        $scope.GetProviderForDD = function () {
            $http.get('UtilityServiceBillReceive/GetProviderForDD').success(function (json) {
                $scope.ProviderForDD = json;
            });
        };
        $scope.GetProviderForDD();

        $scope.GetMobileOperatorForDD = function () {
            $http.get('CommonService/GetMobileOperator').success(function (json) {
                $scope.MblOperatorForDD = json;
            });
        };
        $scope.GetMobileOperatorForDD();


        $scope.onSelected = function (selectedItem) {
            $scope.FieldList = "";
            var data = { 'data': JSON.stringify(selectedItem.Value) };
            $http.post('UtilityServiceBillReporting/GetProviderInfo', data, config).success(function (json) {
                $scope.FieldList = json;
            }
            )
        };

        //$scope.GetProviderInfo = function () {
        //    $scope.FieldList = "";
        //    $scope.UtilityServiceBillReportingModel.DefineServiceId = $scope.UtilityServiceBillReportingModel.DefineServiceId != null ? $scope.UtilityServiceBillReportingModel.DefineServiceId.Value : null;
        //    var data = { 'data': JSON.stringify($scope.UtilityServiceBillReportingModel) };
        //    $http.post('UtilityServiceBillReporting/GetProviderInfo', data, config).success(function (json) {
        //        $scope.FieldList = json;
        //    });
        //};
        //$scope.GetProviderInfo();


        //$scope.loadData = function () {
        //    $http.get('UtilityServiceBillReporting/Index').success(function (json) {
        //        $scope.FieldList = json;
        //        $rootScope.ActivityLogIndex();
        //    });
        //};
        //$scope.loadData();


        $scope.addData = function () {
            if ($scope.SubmitBtn === "Add") {
                $scope.UtilityServiceBillReportingModel.FunctionId = FunctionId;
                $scope.UtilityServiceBillReportingModel.DefineServiceId = $scope.UtilityServiceBillReportingModel.DefineServiceId != null ? $scope.UtilityServiceBillReportingModel.DefineServiceId.Value : null;
                $scope.UtilityServiceBillReportingModel.OperatorId = $scope.UtilityServiceBillReportingModel.OperatorId != null ? $scope.UtilityServiceBillReportingModel.OperatorId.Value : null;
                $scope.UtilityServiceBillReportingModel.InputType = $scope.UtilityServiceBillReportingModel.InputType != null ? $scope.UtilityServiceBillReportingModel.InputType.Value : null;
                $scope.UtilityServiceBillReportingModel.FieldType = $scope.UtilityServiceBillReportingModel.FieldType != null ? $scope.UtilityServiceBillReportingModel.FieldType.Value : null;
                $scope.UtilityServiceBillReportingModel.ReportingType = $scope.UtilityServiceBillReportingModel.ReportingType != null ? $scope.UtilityServiceBillReportingModel.ReportingType.Text : null;
                var data = { 'data': JSON.stringify($scope.UtilityServiceBillReportingModel) };
                $http.post('UtilityServiceBillReporting/Create', data, config)
                    .then(
                    function (response) {
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
                $scope.UtilityServiceBillReportingModel.FunctionId = FunctionId;
                $scope.UtilityServiceBillReportingModel.DefineServiceId = $scope.UtilityServiceBillReportingModel.DefineServiceId.Value;
                $scope.UtilityServiceBillReportingModel.ReportFieldType = $scope.UtilityServiceBillReportingModel.ReportFieldType.Value;

                var data = { 'data': JSON.stringify($scope.UtilityServiceBillReportingModel) };
                $http.post('UtilityServiceBillReporting/Edit', data, config)
                    .then(
                    function (response) {
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
        };


        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        $scope.changeField = function (index) {
            var data = $scope.FieldList[index];
            debugger;
            if (data.ReportingType == "Input") {
                data.ReportingType = "001";
            }
            if (data.ReportingType == "Output") {
                data.ReportingType = "002";
            }
            //$scope.UtilityServiceBillReportingModel.ReportingId = data.DefineServiceId;
            $scope.UtilityServiceBillReportingModel.FieldNameForAPI = data.FieldNameForAPI;
            $scope.UtilityServiceBillReportingModel = angular.copy(data);

            accessArrayOfJsonObjectByKeyValueDefineServiceId($scope.ProviderForDD, data.DefineServiceId);
            $scope.UtilityServiceBillReportingModel.DefineServiceId = $scope.selectedDefineServiceIdDD;

            accessArrayOfJsonObjectByKeyValueReportFieldType($scope.ReportingTypeForDD, data.ReportingType);
            $scope.UtilityServiceBillReportingModel.ReportingType = $scope.selectedReportFieldTypeDD;

            accessArrayOfJsonObjectByKeyValueFieldType($scope.FieldTypeForDD, data.FieldType);
            $scope.UtilityServiceBillReportingModel.FieldType = $scope.selectedFieldTypeForDD;

            accessArrayOfJsonObjectByKeyValueInputType($scope.InputTypeForDD, data.InputType);
            $scope.UtilityServiceBillReportingModel.InputType = $scope.selectedInputTypeForDD;

            $scope.originalData = angular.copy($scope.UtilityServiceBillReportingModel);
            $scope.SubmitBtn = "Update";

            if (data.ReportingType == "001") {
                data.ReportingType = "Input";
            }
            if (data.ReportingType == "002") {
                data.ReportingType = "Output";
            }
        };

        function accessArrayOfJsonObjectByKeyValueDefineServiceId(Array, keyValue) {
            if (keyValue == null) {
                $scope.selectedDefineServiceIdDD = "";
                return;
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedDefineServiceIdDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueReportFieldType(Array, keyValue) {
            if (keyValue == null) {
                $scope.selectedReportFieldTypeDD = "";
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedReportFieldTypeDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueFieldType(Array, keyValue) {
            if (keyValue == null) {
                $scope.selectedFieldTypeForDD = "";
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedFieldTypeForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueInputType(Array, keyValue) {
            if (keyValue == null) {
                $scope.selectedInputTypeForDD = "";
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedInputTypeForDD = object;
                }
            });
        }

        $scope.ClearFields = function () {
            $scope.UtilityServiceBillReportingModel.ReportingId = "";
            $scope.UtilityServiceBillReportingModel.DefineServiceId = "";
            $scope.UtilityServiceBillReportingModel.PvId = "";
            $scope.UtilityServiceBillReportingModel.InputType = "";
            $scope.UtilityServiceBillReportingModel.FieldName = "";
            $scope.UtilityServiceBillReportingModel.FieldType = "";
            $scope.UtilityServiceBillReportingModel.FieldLength = "";
            $scope.UtilityServiceBillReportingModel.FieldPrefix = "";
            $scope.UtilityServiceBillReportingModel.FieldSuffix = "";
            $scope.UtilityServiceBillReportingModel.UserAssist = "";
            $scope.UtilityServiceBillReportingModel.UserAssistlength = "";
            $scope.UtilityServiceBillReportingModel.FieldAccNo = "";
            $scope.UtilityServiceBillReportingModel.FieldNameForAPI = "";
            $scope.SubmitBtn = "Add";
        };

        $scope.showSuccessMsg = function (_Msg) {
            debugger;
            toastr.success(_Msg);
        };
        $scope.showErrorMsg = function (_Msg) {
            toastr.error(_Msg);
        };
    }
})();