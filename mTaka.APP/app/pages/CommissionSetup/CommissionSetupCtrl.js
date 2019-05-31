(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CommissionSetup')
        .controller('CommissionSetupCtrl', CommissionSetupCtrl);

    function CommissionSetupCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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

        $scope.CommissionSetupModel = {};
        $scope.CommissionSetupModel_API = {};
        $scope.CommissionSetupModel.CommissionId = null;
        $scope.ListCommissionSetup_API = [];
        $scope.ListCommissionSetup = [];
        $scope.SubmitBtn = "Add";

        $scope.CommissionSetupModel.FunctionId = FunctionId;
        $scope.CommissionSetupModel.UserName = $rootScope.UserName;

        $scope.CreateCommissionSetup = function () {
            $http.get('CommissionSetup/Create').success(function (json) {
                $scope.CommissionSetupModel = json;
                //$scope.CusCategoryForDD = $scope.CommissionSetupModel.CusCategoryDD;
            });
        };
        //$scope.CreateCommissionSetup();

        $scope.GetDefineServiceForDD = function () {
            $http.get('CommissionSetup/GetDefineServiceForDD').success(function (json) {
                $scope.DefineServiceForDD = json;
            });
        };
        $scope.GetDefineServiceForDD();

        $scope.GetAccTypeForDD = function () {
            $http.get('CommissionSetup/GetAccTypeForDD').success(function (json) {
                $scope.AccTypeForDD = json;
            });
        };
        $scope.GetAccTypeForDD();

        $scope.loadData = function () {
            debugger;
            $http.get('CommissionSetup/Index').success(function (json) {
                $scope.CommissionSetupList = json;
                console.log($scope.CommissionSetupList);
            });
        };
        $scope.loadData();
        //console.Log($scope.CommissionSetupList);
        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        $scope.addData = function () {
            debugger;
            if ($scope.SubmitBtn === "Add") {
                
                $scope.CommissionSetupModel.FunctionId = FunctionId;
                $scope.CommissionSetupModel.CommissionId = $scope.CommissionSetupModel.CommissionId != null ? $scope.CommissionSetupModel.CommissionId : null;
                $scope.CommissionSetupModel.DefineServiceId = $scope.CommissionSetupModel.DefineServiceId != null ? $scope.CommissionSetupModel.DefineServiceId.Value : null;
               // $scope.CommissionSetupModel.Charge = $scope.CommissionSetupModel.Charge != null ? $scope.CommissionSetupModel.Charge : null;
                $scope.CommissionSetupModel.Vat = $scope.CommissionSetupModel.Vat != null ? $scope.CommissionSetupModel.Vat : null;
                $scope.CommissionSetupModel.GLAccount = $scope.CommissionSetupModel.GLAccount != null ? $scope.CommissionSetupModel.GLAccount : null;
                $scope.CommissionSetupModel.ListCommissionSetupDTL = $scope.ListCommissionSetup_API;
                var data = { 'data': JSON.stringify($scope.CommissionSetupModel) };
                $http.post('CommissionSetup/Create', data, config)
                    .then(
                    function (response) {
                        $scope.loadData();
                        $scope.ClearFields();
                        $scope.ClearAddItems();
                        $scope.showSuccessMsg(response.data.ResponseMessage);
                    },
                    function (response) {
                        $scope.showErrorMsg(response.data.ResponseMessage);
                    }
                    );

            }
            else if ($scope.SubmitBtn === "Update") {
                $scope.CommissionSetupModel.FunctionId = FunctionId;
                $scope.CommissionSetupModel.CommissionId = $scope.CommissionSetupModel.CommissionId != null ? $scope.CommissionSetupModel.CommissionId : null;
                $scope.CommissionSetupModel.DefineServiceId = $scope.CommissionSetupModel.DefineServiceId != null ? $scope.CommissionSetupModel.DefineServiceId.Value : null;
               // $scope.CommissionSetupModel.Charge = $scope.CommissionSetupModel.Charge != null ? $scope.CommissionSetupModel.Charge : null;
                $scope.CommissionSetupModel.Vat = $scope.CommissionSetupModel.Vat != null ? $scope.CommissionSetupModel.Vat : null;
                $scope.CommissionSetupModel.GLAccount = $scope.CommissionSetupModel.GLAccount != null ? $scope.CommissionSetupModel.GLAccount : null;
                $scope.CommissionSetupModel.ListCommissionSetupDTL = $scope.ListCommissionSetup_API;
                
                var data = { 'data': JSON.stringify($scope.CommissionSetupModel) };
                $http.post('CommissionSetup/Edit', data, config)
                    .then(
                    function (response) {
                        $scope.loadData();
                        $scope.ClearFields();
                        $scope.showSuccessMsg(response.data.ResponseMessage);
                    },
                    function (response) {
                        $scope.showErrorMsg(response.data.ResponseMessage);
                    }
                    );
            }
        };

        $scope.changeCusType = function (index) {
            debugger;
            var data = $scope.CommisionSetupList[index];
            $scope.CommissionSetupModel = angular.copy(data);

            accessArrayOfJsonObjectByKeyValue($scope.CusCategoryForDD, data.CommissionId);
            $scope.CommissionSetupModel.CommissionId = $scope.selectedCusCategoryDD;

            $scope.originalData = angular.copy($scope.CommissionSetupModel);
            $scope.SubmitBtn = "Update";
        };
        $scope.deleteCusType = function (index) {
            var data = { 'data': JSON.stringify($scope.CommissionSetupList[index]) };
            $http.post('CommissionSetup/Delete', data, config)
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
            $scope.CommissionSetupModel.CommissionId = "";
            $scope.CommissionSetupModel.DefineServiceId = "";
            //$scope.CommissionSetupModel.Charge = "";
            $scope.CommissionSetupModel.Vat = "";
            $scope.CommissionSetupModel.GLAccount = "";
            $scope.CommissionSetupModel.AccTypeId = "";
            $scope.CommissionSetupModel.CommissionRate = "";
            $scope.CommissionSetupModel.AIT = "";
            $scope.SubmitBtn = "Add";
        };
        $scope.ClearTempFields = function () {
            $scope.CommissionSetupModel_API.AccTypeId = "";
            $scope.CommissionSetupModel_API.CommissionRate = "";
            $scope.CommissionSetupModel_API.AIT = "";
            $scope.CommissionSetupModel.AccTypeId = "";
            $scope.CommissionSetupModel.CommissionRate = "";
            $scope.CommissionSetupModel.AIT = "";
        };
       
        $scope.ClearAddItems = function () {
            $scope.ListCommissionSetup_API.AccTypeId = "";
            $scope.ListCommissionSetup_API.CommissionRate = "";
            $scope.ListCommissionSetup_API.AIT = "";
            $scope.ListCommissionSetup_API.AccTypeId = "";
            $scope.ListCommissionSetup_API.CommissionRate = "";
            $scope.ListCommissionSetup_API.AIT = "";
            $scope.ListCommissionSetup.CommissionId = "";
            $scope.ListCommissionSetup.DefineServiceId = "";
            //$scope.ListCommissionSetup.Charge = "";
            $scope.ListCommissionSetup.Vat = "";
            $scope.ListCommissionSetup.GLAccount = "";
            $scope.ListCommissionSetup.AccTypeId = "";
            $scope.ListCommissionSetup.CommissionRate = "";
            $scope.ListCommissionSetup.AIT = "";

            $scope.SubmitBtn = "Add";
        };

        $scope.AddItem = function () {
            debugger;
            var flag = true;
            if ($scope.CommissionSetupModel.AccTypeId == null)
            {
                alert("Please Select Account Type Id.");
                flag = false;
            }
            if (flag === true && CommissionSetupModel.AccTypeId !== null) {
                $scope.CommissionSetupModel_API.AccTypeId = $scope.CommissionSetupModel.AccTypeId != null ? $scope.CommissionSetupModel.AccTypeId.Value : null;
                $scope.CommissionSetupModel_API.CommissionRate = $scope.CommissionSetupModel.CommissionRate != null ? $scope.CommissionSetupModel.CommissionRate : null;
                $scope.CommissionSetupModel_API.AIT = $scope.CommissionSetupModel.AIT != null ? $scope.CommissionSetupModel.AIT : null;

                $scope.originalData = angular.copy($scope.CommissionSetupModel_API);
                $scope.ListCommissionSetup_API.push($scope.originalData);


                $scope.originalData = angular.copy($scope.CommissionSetupModel);
                $scope.ListCommissionSetup.push($scope.originalData);

                $scope.ClearTempFields();
            }
            
        }
        $scope.deleteItem = function ($index) {
            debugger;
            $scope.ListCommissionSetup_API.splice($index, 1);
            $scope.ListCommissionSetup.splice($index, 1);
        }

        $scope.showSuccessMsg = function (_Msg) {
            toastr.success(_Msg);
        };
        $scope.showErrorMsg = function (_Msg) {
            toastr.error(_Msg);
        };
    }
})();