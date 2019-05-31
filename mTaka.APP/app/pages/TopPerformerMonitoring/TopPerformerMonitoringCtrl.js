(function () {
    'use strict';

    angular.module('mTakaAPP.pages.TopPerformerMonitoring')
        .controller('TopPerformerMonitoringCtrl', TopPerformerMonitoringCtrl);

    function TopPerformerMonitoringCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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
        $scope.TopPerformerModel = {};
        $scope.TopPerformerModel.AccountCategoryId = null;
        $scope.TopPerformerModel.AccountTypeId = null;

        $scope.dpOpenStatus = {};
        $scope.setDpOpenStatus = function (id) {
            debugger;
            $scope.dpOpenStatus[id] = true
        };

        $scope.dpOpenStatus1 = {};
        $scope.setDpOpenStatus1 = function (id) {
            debugger;
            $scope.dpOpenStatus1[id] = true
        };

        $scope.GetAccCategoryForDD = function () {
            $http.get('AccCategory/GetAccCategoryForDD').success(function (json) {
                $scope.AccCategoryForDD = json;
            });
        };
        $scope.GetAccCategoryForDD();

        $scope.GetAccTypeForDD = function () {
            $http.get('AccType/GetAccTypeForDD').success(function (json) {
                $scope.AccTypeForDD = json;
            });
        };
        $scope.GetAccTypeForDD();
        
        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        $scope.loadData = function () {
            debugger;
            $http.get('ChannelAccProfile/Index').success(function (json) {
                $scope.ChannelAccProfileList = json;
            });
        };
        $scope.loadData();

        function GetAccMasterInfoByAccNo() {
            debugger;
            if ($scope.CashInModel.FromSystemAccountNo == null) {
                $scope.CashInModel.FromAccountBalance = null;
                showErrorMsg("You are not a valid account holder.");
            }
            else {
                $scope.LedgerModel.FromSystemAccountNo = $scope.CashInModel.FromSystemAccountNo;
                var data = { 'data': JSON.stringify($scope.LedgerModel) };
                $http.post('Ledger/GetAccMasterInfoByAccNo', data, config)
                    .then(
                    function (response) {
                        debugger;
                        if (response.data.ClosingBalance == null) {
                            $scope.CashInModel.FromAccountBalance = null;
                            showErrorMsg(response.data.ResponseMessage);
                        }
                        if (response.data.ClosingBalance != null) {
                            $scope.CashInModel.FromAccountBalance = response.data.ClosingBalance;
                        }
                    }
                    );
            }
        };

        function accessArrayOfJsonObjectByKeyValue(Array, keyValue, callname) {
            if (callname == "AccountCategoryId") {
                Array.forEach(function (object) {
                    if (object.Value == keyValue) {
                        $scope.selectedAccountCategoryId = object;
                    }
                });
            }
            if (callname == "AccountTypeId") {
                Array.forEach(function (object) {
                    if (object.Value == keyValue) {
                        $scope.selectedAccountTypeId = object;
                    }
                });
            }
        }

        function monthstringtonumberconvert(month) {
            debugger;
            switch (month) {
                case "Jan": month = "01"; break;
                case "Feb": month = "02"; break;
                case "Mar": month = "03"; break;
                case "Apr": month = "04"; break;
                case "May": month = "05"; break;
                case "Jun": month = "06"; break;
                case "Jul": month = "07"; break;
                case "Aug": month = "08"; break;
                case "Sep": month = "09"; break;
                case "Oct": month = "10"; break;
                case "Nov": month = "11"; break;
                case "Dec": month = "12"; break;
            }
            $scope.month = month;
        }

        $scope.ClearFields = function () {
            $scope.TopPerformerModel.AccountProfileId = "";
            $scope.TopPerformerModel.AccountCategoryId = "";
            $scope.TopPerformerModel.AccountTypeId = "";            
            $scope.TopPerformerModel.DateofBirth = "";
            $scope.TopPerformerModel.NationalityId = "";
            $scope.TopPerformerModel.dis = "";
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