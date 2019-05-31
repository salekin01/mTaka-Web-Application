(function () {
    'use strict';

    angular.module('mTakaAPP.pages.TransactionTemplate')
        .controller('TransactionTemplateCtrl', TransactionTemplateCtrl);

    function TransactionTemplateCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
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
        $scope.TransactionTemplateModel = {};
        $scope.TransactionTemplateModel_API = {};
        $scope.TransactionTemplateModel.DefineServiceId = null;
        $scope.TransactionTemplateModel.SourceofAccountId = null;
        $scope.TransactionTemplateModel.TypeofAccountId = null;
        $scope.TransactionTemplateModel.AccountTypeId = null;
        $scope.ListTransactionTemplate_API = [];
        $scope.ListTransactionTemplate = [];
        //$scope.TransactionTemplateModel.ChargeRuleId = null;
        $scope.SubmitBtn = "Add";

        $scope.GetDefineServiceForDD = function () {
            $http.get('DefineService/GetDefineServiceForDD').success(function (json) {
                $scope.DefineServiceForDD = json;
            });
        };
        $scope.GetDefineServiceForDD();

        $scope.GetSourceofAccForDD = function () {
            $http.get('CommonService/GetSourceofAccForDD').success(function (json) {
                $scope.SourceofAccountForDD = json; SourceofAccountForDD
            });
        };
        $scope.GetSourceofAccForDD();

        $scope.GetTypeofAccForDD = function () {
            $http.get('CommonService/GetTypeofAccForDD').success(function (json) {
                $scope.TypeofAccountForDD = json;
            });
        };
        $scope.GetTypeofAccForDD();

        $scope.GetAccTypeForDD = function () {
            $http.get('AccType/GetAccTypeForDD').success(function (json) {
                $scope.AccTypeForDD = json;
            });
        };
        $scope.GetAccTypeForDD();

        //$scope.GetAccBalanceTypeForDD = function () {
        //    $http.get('CommonService/GetAccBalanceTypeForDD').success(function (json) {
        //        $scope.BalanceTypeForDD = json;
        //    });
        //};
        //$scope.GetAccBalanceTypeForDD();

        $scope.DebitOrCreditForDD = [];
        $scope.DebitOrCreditForDD =
            [{
                "Text": "Debit",
                "Value": "D",
                "Selected": false
            },
            {
                "Text": "Credit",
                "Value": "C",
                "Selected": false
            }];

        $scope.GetChargeRuleForDD = function () {
            $http.get('ChargeRule/GetChargeRuleForDD').success(function (json) {
                $scope.ChargeRuleForDD = json;
            });
        };
        $scope.GetChargeRuleForDD();

        $scope.loadData = function () {
            debugger;
            $http.get('TransactionTemplate/Index').success(function (json) {
                $scope.TransactionTemplateList = json;
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
            if ($scope.SubmitBtn === "Add") {
                //$scope.TransactionTemplateModel_API.FunctionId = FunctionId;
                $scope.TransactionTemplateModel_API.ListTransactionTemplate_API = $scope.ListTransactionTemplate_API;
                var data = { 'data': JSON.stringify($scope.TransactionTemplateModel_API) };
                $http.post('TransactionTemplate/Create', data, config)
                    .then(
                        function (response) {
                            $scope.loadData();
                            $scope.ClearFields();
                            $scope.ClearItems();
                            $scope.showSuccessMsg(response.data.ResponseMessage);
                        },
                        function (response) {
                            $scope.showErrorMsg(response.data.ResponseMessage);
                        }
                    );

            }
            else if ($scope.SubmitBtn === "Update") {
                //$scope.TransactionTemplateModel.FunctionId = FunctionId;
                $scope.TransactionTemplateModel.DefineServiceId = $scope.TransactionTemplateModel.DefineServiceId != null ? $scope.TransactionTemplateModel.DefineServiceId.Value : null;
                $scope.TransactionTemplateModel.SourceofAccountId = $scope.TransactionTemplateModel.SourceofAccountId != null ? $scope.TransactionTemplateModel.SourceofAccountId.Value : null;
                $scope.TransactionTemplateModel.TypeofAccountId = $scope.TransactionTemplateModel.TypeofAccountId != null ? $scope.TransactionTemplateModel.TypeofAccountId.Value : null;
                $scope.TransactionTemplateModel.AccountTypeId = $scope.TransactionTemplateModel.AccountTypeId != null ? $scope.TransactionTemplateModel.AccountTypeId.Value : null;
                $scope.TransactionTemplateModel.DebitOrCredit = $scope.TransactionTemplateModel.DebitOrCredit != null ? $scope.TransactionTemplateModel.DebitOrCredit.Value : null;
                //$scope.TransactionTemplateModel.ChargeRuleId = $scope.TransactionTemplateModel.ChargeRuleId != null ? $scope.TransactionTemplateModel.ChargeRuleId.Value : null;
                var data = { 'data': JSON.stringify($scope.TransactionTemplateModel) };
                $http.post('TransactionTemplate/Edit', data, config)
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
        $scope.changeTransactionTemplate = function (index) {
            debugger;
            var data = $scope.TransactionTemplateList[index];
            $scope.TransactionTemplateModel.TransactionTemplateId = data.TransactionTemplateId;

            accessArrayOfJsonObjectByKeyValue_DefineService($scope.DefineServiceForDD, data.DefineServiceId);
            $scope.TransactionTemplateModel.DefineServiceId = $scope.selectedDefineServiceDD;

            accessArrayOfJsonObjectByKeyValue_SourceofAccount($scope.SourceofAccountForDD, data.SourceofAccountId);
            $scope.TransactionTemplateModel.SourceofAccountId = $scope.selectedSourceofAccountDD;

            accessArrayOfJsonObjectByKeyValue_TypeofAccount($scope.TypeofAccountForDD, data.TypeofAccountId);
            $scope.TransactionTemplateModel.TypeofAccountId = $scope.selectedTypeofAccountDD;

            accessArrayOfJsonObjectByKeyValue_AccType($scope.AccTypeForDD, data.AccountTypeId);
            $scope.TransactionTemplateModel.AccountTypeId = $scope.selectedAccTypeDD;

            $scope.TransactionTemplateModel.GLAccSl = data.GLAccSl;

            //accessArrayOfJsonObjectByKeyValue_BalanceType($scope.DebitOrCreditForDD, data.DebitOrCredit);
            //$scope.TransactionTemplateModel.DebitOrCredit = $scope.selectedDebitOrCreditDD;

            $scope.TransactionTemplateModel.Narration = data.Narration;

            accessArrayOfJsonObjectByKeyValue_ChargeRule($scope.ChargeRuleForDD, data.ChargeRuleId);
            $scope.TransactionTemplateModel.ChargeRuleId = $scope.selectedChargeRuleDD;
            $scope.SubmitBtn = "Update";
        };
        $scope.deleteTransactionTemplate = function (index) {
            var data = { 'data': JSON.stringify($scope.TransactionTemplateList[index]) };
            $http.post('TransactionTemplate/Delete', data, config)
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
        };

        function accessArrayOfJsonObjectByKeyValue_DefineService(Array, keyValue) {
            if (keyValue == null) {
                $scope.selectedDefineServiceDD = "";
                return;
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedDefineServiceDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValue_SourceofAccount(Array, keyValue) {
            if (keyValue == null) {
                $scope.selectedSourceofAccountDD = "";
                return;
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedSourceofAccountDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValue_TypeofAccount(Array, keyValue) {
            if (keyValue == null) {
                $scope.selectedTypeofAccountDD = "";
                return;
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedTypeofAccountDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValue_AccType(Array, keyValue) {
            if (keyValue == null) {
                $scope.selectedAccTypeDD = "";
                return;
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedAccTypeDD = object;
                }
            });
        }

        //function accessArrayOfJsonObjectByKeyValue_BalanceType(Array, keyValue) {
        //    if (keyValue == null) {
        //        $scope.selectedDebitOrCreditDD = "";
        //        return;
        //    }
        //    Array.forEach(function (object) {
        //        if (object.Value == keyValue) {
        //            $scope.selectedDebitOrCreditDD = object;
        //        }
        //    });
        //}

        function accessArrayOfJsonObjectByKeyValue_ChargeRule(Array, keyValue) {
            if (keyValue == null) {
                $scope.selectedChargeRuleDD = "";
                return;
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedChargeRuleDD = object;
                }
            });
        }

        $scope.ClearFields = function () {
            $scope.TransactionTemplateModel.TransactionTemplateId = "";
            $scope.TransactionTemplateModel.DefineServiceId = "";
            $scope.TransactionTemplateModel.SourceofAccountId = "";
            $scope.TransactionTemplateModel.TypeofAccountId = "";
            $scope.TransactionTemplateModel.AccountTypeId = "";
            $scope.TransactionTemplateModel.GLAccSl = "";
            $scope.TransactionTemplateModel.GLAccName = "";
            $scope.TransactionTemplateModel.DebitOrCredit = "";
            $scope.TransactionTemplateModel.Narration = "";
            $scope.TransactionTemplateModel.ChargeRuleId = "";
            $scope.SubmitBtn = "Add";
        };
        $scope.ClearItems = function () {
            $scope.ListTransactionTemplate = "";
            $scope.ListTransactionTemplate_API = "";
            $scope.SubmitBtn = "Add";
        };

        $scope.AddItem = function () {
            debugger;
            $scope.TransactionTemplateModel_API.FunctionId = FunctionId;
            $scope.TransactionTemplateModel_API.DefineServiceId = $scope.TransactionTemplateModel.DefineServiceId != null ? $scope.TransactionTemplateModel.DefineServiceId.Value : null;
            $scope.TransactionTemplateModel_API.SourceofAccountId = $scope.TransactionTemplateModel.SourceofAccountId != null ? $scope.TransactionTemplateModel.SourceofAccountId.Value : null;
            $scope.TransactionTemplateModel_API.TypeofAccountId = $scope.TransactionTemplateModel.TypeofAccountId != null ? $scope.TransactionTemplateModel.TypeofAccountId.Value : null;
            $scope.TransactionTemplateModel_API.AccountTypeId = $scope.TransactionTemplateModel.AccountTypeId != null ? $scope.TransactionTemplateModel.AccountTypeId.Value : null;
            $scope.TransactionTemplateModel_API.DebitOrCredit = $scope.TransactionTemplateModel.DebitOrCredit != null ? $scope.TransactionTemplateModel.DebitOrCredit.Value : null;
            $scope.TransactionTemplateModel_API.GLAccSl = $scope.TransactionTemplateModel.GLAccSl != null ? $scope.TransactionTemplateModel.GLAccSl : null;
            $scope.TransactionTemplateModel_API.Narration = $scope.TransactionTemplateModel.Narration != null ? $scope.TransactionTemplateModel.Narration : null;
            $scope.TransactionTemplateModel_API.ChargeRuleId = $scope.TransactionTemplateModel.ChargeRuleId != null ? $scope.TransactionTemplateModel.ChargeRuleId.Value : null;

            $scope.originalData = angular.copy($scope.TransactionTemplateModel_API);
            $scope.ListTransactionTemplate_API.push($scope.originalData);

            $scope.originalData = angular.copy($scope.TransactionTemplateModel);
            $scope.ListTransactionTemplate.push($scope.originalData);
        }
        $scope.deleteItem = function ($index) {
            debugger;
            $scope.ListTransactionTemplate_API.splice($index, 1);
            $scope.ListTransactionTemplate.splice($index, 1);
        }

        $scope.showSuccessMsg = function (_Msg) {
            toastr.success(_Msg);
        };
        $scope.showErrorMsg = function (_Msg) {
            toastr.error(_Msg);
        };
    }
})();