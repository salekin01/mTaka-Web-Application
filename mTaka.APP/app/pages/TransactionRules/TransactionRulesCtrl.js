(function () {
    'use strict';

    angular.module('mTakaAPP.pages.TransactionRules')
        .controller('TransactionRulesCtrl', TransactionRulesCtrl);

    function TransactionRulesCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
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

        $scope.TransactionRulesModel = {};
        $scope.SubmitBtn = "Add";
        $scope.TransactionRulesList = [];
        $scope.originalData = {};

        $scope.CommissionForDD =
            [{
            "Text": "Commission Allow",
            "Value": "1",
            "Selected": false
            },
            {
                "Text": "Commission Not Allow",
                "Value": "0",
                "Selected": false
            }];

        $scope.TranactionForDD =
            [{
            "Text": "Tranaction Allow",
                "Value": "1",
                "Selected": false
            },
            {
                "Text": "Tranaction Not Allow",
                "Value": "0",
                "Selected": false
            }];

        //$scope.TransactionRulesModel.s1 = true;
        //    $scope.TransactionRulesModel.s2 = false;

        $scope.GetAccType1ForDD = function () {
            $http.get('AccType/GetAccTypeForDD').success(function (json) {
                $scope.AccType1ForDD = json;

            });
        };
        $scope.GetAccType1ForDD();

        $scope.GetAccType2ForDD = function () {
            $http.get('AccType/GetAccTypeForDD').success(function (json) {
                $scope.AccType2ForDD = json;

            });
        };
        $scope.GetAccType2ForDD();

        $scope.GetDefineServiceForDD = function () {
            $http.get('DefineService/GetDefineServiceForDD').success(function (json) {
                $scope.DefineServiceForDD = json;
            });
        };
        $scope.GetDefineServiceForDD();



        $scope.loadData = function () {
            $http.get('TransactionRules/Index').success(function (json) {
                $scope.TransactionRulesList = json;
                //for (var i = 0; i <= $scope.TransactionRulesList.length; i++)
                //{                   
                //    var counter = new Number(i);
                //    if ($scope.TransactionRulesList[counter].TranactionAllowed === 0) {
                //        $scope.TransactionRulesModel.s2 = false;
                //    } else {
                //        $scope.TransactionRulesModel.s2 = true;
                //    }

                //    if ($scope.TransactionRulesList[counter].commissionAllowed === 0) {
                //        $scope.TransactionRulesModel.s1 = false;
                //    } else {
                //        $scope.TransactionRulesModel.s1 = true;
                //    }                    
                //}
                //console.log($scope.TransactionRulesList);

                //angular.forEach($scope.TransactionRulesList, function (value, key) {
                //    if (value.TranactionAllowed == "0")
                //    {
                //        $scope.TransactionRulesModel.s2 = false;
                //    }
                //    else
                //    {
                //        $scope.TransactionRulesModel.s2 = true;
                //    }

                //    if (value.commissionAllowed == "0") {
                //        $scope.TransactionRulesModel.s1 = false;
                //    }
                //    else {
                //        $scope.TransactionRulesModel.s1 = true;
                //    }
                //});
                //console.log("Length: " + $scope.TransactionRulesList.length);
                //console.log("TranactionAllowed: "+$scope.TransactionRulesList[1].TranactionAllowed);
            });
            //$rootScope.ActivityLogIndex();
        };
        $scope.loadData();

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        $scope.addData = function () {
            if ($scope.SubmitBtn === "Add") {
                $scope.TransactionRulesModel.FunctionId = FunctionId;
                $scope.TransactionRulesModel.AccountType1 = $scope.TransactionRulesModel.AccountType1 != null ? $scope.TransactionRulesModel.AccountType1.Value : null;
                $scope.TransactionRulesModel.AccountType2 = $scope.TransactionRulesModel.AccountType2 != null ? $scope.TransactionRulesModel.AccountType2.Value : null;
                $scope.TransactionRulesModel.DefineServiceId = $scope.TransactionRulesModel.DefineServiceId != null ? $scope.TransactionRulesModel.DefineServiceId.Value : null;
                //$scope.TransactionRulesModel.commissionAllowed = $scope.TransactionRulesModel.commissionAllowed.Value;
                //$scope.TransactionRulesModel.TranactionAllowed = $scope.TransactionRulesModel.TranactionAllowed.Value;

                var data = { 'data': JSON.stringify($scope.TransactionRulesModel) };
                $http.post('TransactionRules/Create', data, config)
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

                var dataHasNotChanged = angular.equals($scope.originalData, $scope.TransactionRulesModel);
                if (dataHasNotChanged) {
                    $scope.showErrorMsg("No data has been modified");
                    return;
                }

                $scope.TransactionRulesModel.AccountType1 = $scope.TransactionRulesModel.AccountType1 != null ? $scope.TransactionRulesModel.AccountType1.Value : null;
                $scope.TransactionRulesModel.AccountType2 = $scope.TransactionRulesModel.AccountType2 != null ? $scope.TransactionRulesModel.AccountType2.Value : null;
                $scope.TransactionRulesModel.DefineServiceId = $scope.TransactionRulesModel.DefineServiceId != null ? $scope.TransactionRulesModel.DefineServiceId.Value : null;
                var data = { 'data': JSON.stringify($scope.TransactionRulesModel) };
                $http.post('TransactionRules/Edit', data, config)
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
        $scope.changeTransactionRules = function (index) {

            var data = $scope.TransactionRulesList[index];
            $scope.TransactionRulesModel = angular.copy(data);

            accessArrayOfJsonObjectByKeyValueAccTYpe1($scope.AccType1ForDD, data.AccountType1);
            $scope.TransactionRulesModel.AccountType1 = $scope.selectedAccType1ForDD;

            accessArrayOfJsonObjectByKeyValueAccTYpe2($scope.AccType2ForDD, data.AccountType2);
            $scope.TransactionRulesModel.AccountType2 = $scope.selectedAccType2ForDD;

            accessArrayOfJsonObjectByKeyValueDefineServiceId($scope.DefineServiceForDD, data.DefineServiceId);
            $scope.TransactionRulesModel.DefineServiceId = $scope.selectedDefineServiceDD;

            if (data.commissionAllowed == "1") {
                $scope.TransactionRulesModel.commissionAllowed = true;
            } else if (data.commissionAllowed == "0") {
                $scope.TransactionRulesModel.commissionAllowed = false;
            }
            if (data.TranactionAllowed == "1") {
                $scope.TransactionRulesModel.TranactionAllowed = true;
            } else if (data.TranactionAllowed == "0") {
                $scope.TransactionRulesModel.TranactionAllowed = false;
            }
            $scope.originalData = angular.copy($scope.TransactionRulesModel);
            $scope.SubmitBtn = "Update";
        };
        $scope.deleteTransactionRules = function (index) {
            var data = { 'data': JSON.stringify($scope.TransactionRulesList[index]) };

            $http.post('TransactionRules/Delete', data, config)
                .then(
                function (response) {
                    $scope.loadData();
                    $scope.ClearFields();
                    $scope.showSuccessMsg();
                },
                function (response) {
                    $scope.showErrorMsg();
                }
                );
        };
        function accessArrayOfJsonObjectByKeyValueAccTYpe1(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedAccType1ForDD = object;
                }
            });
        }
        function accessArrayOfJsonObjectByKeyValueAccTYpe2(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedAccType2ForDD = object;
                }
            });
        }
        function accessArrayOfJsonObjectByKeyValueDefineServiceId(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedDefineServiceDD = object;
                }
            });
        }
        $scope.ClearFields = function () {

            $scope.TransactionRulesModel.TransactionRuleId = "";
            $scope.TransactionRulesModel.AccountType1 = "";
            $scope.TransactionRulesModel.AccountType2 = "";
            $scope.TransactionRulesModel.DefineServiceId = "";
            $scope.TransactionRulesModel.commissionAllowed = false;
            $scope.TransactionRulesModel.TranactionAllowed = false;
            $scope.SubmitBtn = "Add";
        };


        $scope.showSuccessMsg = function () {
            toastr.success('Your information has been saved successfully!', 'Congratulations');
        };
        $scope.showErrorMsg = function () {
            toastr.error("Your information hasn't been saved!", 'Error!!');
        };
    }
})();