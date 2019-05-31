(function () {
    'use strict';

    angular.module('mTakaAPP.pages.UtilityServiceBillSetup')
        .controller('UtilityServiceBillSetupCtrl', UtilityServiceBillSetupCtrl);

    function UtilityServiceBillSetupCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
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

        $scope.UtilityServiceBillSetupModel = {};
         $scope.SubmitBtn = "Add";
        //$scope.USBList = [];

        //$scope.InputTypeForDD =
        //    [{
        //        "Text": "Text",
        //        "Value": "text",
        //        "Selected": false
        //    },
        //    {
        //        "Text": "Number",
        //        "Value": "number",
        //        "Selected": false
        //    },
        //    {
        //        "Text": "Password",
        //        "Value": "password",
        //        "Selected": false
        //    },
        //    {
        //        "Text": "Day Month",
        //        "Value": "date",
        //        "Selected": false
        //    }];

        $scope.GetProviderForDD = function () {
            debugger;
            $http.get('DefineService/GetDefineServiceUSBForDD').success(function (json) {
                $scope.ProviderForDD = json;
            });
        };
        $scope.GetProviderForDD();

        $scope.loadData = function () {
            $http.get('UtilityServiceBillSetup/Index').success(function (json) {
                $scope.USBList = json;
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
                debugger;
                $scope.UtilityServiceBillSetupModel.FunctionId = FunctionId;
                $scope.UtilityServiceBillSetupModel.PvName = $scope.UtilityServiceBillSetupModel.PvId.Text;
                $scope.UtilityServiceBillSetupModel.PvId = $scope.UtilityServiceBillSetupModel.PvId.Value;
                if ($scope.UtilityServiceBillSetupModel.PvId == "Educational Payment") {
                    $scope.UtilityServiceBillSetupModel.PvId = $scope.UtilityServiceBillSetupModel.InstituteName;
                }
                var data = {'data': JSON.stringify($scope.UtilityServiceBillSetupModel) };
                //var jsonObj = JSON.parse(data); 
                //$scope.USBList.push(jsonObj);
                $http.post('UtilityServiceBillSetup/Create', data, config)
                    .then(
                    function (response) {
                        $scope.loadData();
                        $scope.ClearFields();
                        if (response.data.Result == 1)
                        {
                            $scope.showSuccessMsg(response.data.ResponseMessage);
                            $scope.loadData();
                            $scope.ClearFields();
                        }
                        else
                            $scope.showErrorMsg(response.data.ResponseMessage);
                    }
                    );

            }
            else if ($scope.SubmitBtn === "Update") {
                $scope.UtilityServiceBillSetupModel.FunctionId = FunctionId;
                var dataHasNotChanged = angular.equals($scope.originalData, $scope.UtilityServiceBillSetupModel);
                $scope.UtilityServiceBillSetupModel.MonthlyBill = $scope.UtilityServiceBillSetupModel.MonthlyBill.Value;
                if (dataHasNotChanged) {
                    $scope.showErrorMsg("No data has been modified");
                    return;
                }
                var data = { 'data': JSON.stringify($scope.UtilityServiceBillSetupModel) };
                $http.post('UtilityServiceBillSetup/Edit', data, config)
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

        $scope.RemovePV = function (index) {
            var index = $scope.USBList.indexOf(index)
            $scope.USBList.splice(index, 1);     
        };

        $scope.changeUsbParam = function (index) {
            var data = $scope.USBList[index];
            $scope.UtilityServiceBillSetupModel.PvSL = data.PvSL;
            $scope.UtilityServiceBillSetupModel.PvShortName = data.PvShortName;
            $scope.UtilityServiceBillSetupModel.PvAddress = data.PvAddress;
            $scope.UtilityServiceBillSetupModel.PvApiAddress = data.PvApiAddress;

            //$scope.UtilityServiceBillSetupModel.ClientIDLength = data.ClientIDLength;
            //$scope.UtilityServiceBillSetupModel.ClientIDPrefix = data.ClientIDPrefix;
            //$scope.UtilityServiceBillSetupModel.ClientIDName = data.ClientIDName;
            //$scope.UtilityServiceBillSetupModel.UserAssistForClient = data.UserAssistForClient;
            //$scope.UtilityServiceBillSetupModel.UserAssistForClientLength = data.UserAssistForClientLength;
            //$scope.UtilityServiceBillSetupModel.BillingCodeLength = data.BillingCodeLength;
            //$scope.UtilityServiceBillSetupModel.UserAssistForBill = data.UserAssistForBill;
            //$scope.UtilityServiceBillSetupModel.UserAssistForBillLength = data.UserAssistForBillLength;
            //$scope.UtilityServiceBillSetupModel.MonthlyBill = data.MonthlyBill;
            debugger;
            accessArrayOfJsonObjectByKeyValuePVId($scope.ProviderForDD, data.PvId);
            $scope.UtilityServiceBillSetupModel.PvId = $scope.selectedProviderForDD;

            //$scope.UtilityServiceBillSetupModel = angular.copy(data);
            //$scope.originalData = angular.copy($scope.UtilityServiceBillSetupModel);
            $scope.SubmitBtn = "Update";
        };
        function accessArrayOfJsonObjectByKeyValuePVId(Array, keyValue) {
                if (keyValue == "") {
                    $scope.selectedProviderForDD = "";
                }
                Array.forEach(function (object) {
                    if (object.Value == keyValue) {
                        $scope.selectedProviderForDD = object;
                    }
                });
            }
        $scope.ClearFields = function () {

            $scope.UtilityServiceBillSetupModel.PvSL = "";
            $scope.UtilityServiceBillSetupModel.PvId = "";
            $scope.UtilityServiceBillSetupModel.PvShortName = "";
            $scope.UtilityServiceBillSetupModel.PvAddress = "";
            $scope.UtilityServiceBillSetupModel.PvApiAddress = "";

            $scope.UtilityServiceBillSetupModel.ClientIDLength = "";
            $scope.UtilityServiceBillSetupModel.ClientIDPrefix = "";
            $scope.UtilityServiceBillSetupModel.ClientIDName = "";
            $scope.UtilityServiceBillSetupModel.UserAssistForClient = "";
            $scope.UtilityServiceBillSetupModel.UserAssistForClientLength = "";
            $scope.UtilityServiceBillSetupModel.BillingCodeLength = "";
            $scope.UtilityServiceBillSetupModel.UserAssistForBill = "";
            $scope.UtilityServiceBillSetupModel.UserAssistForBillLength = "";
            $scope.UtilityServiceBillSetupModel.MonthlyBill = "";
            $scope.UtilityServiceBillSetupModel.InstituteName = "";
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