(function () {
    'use strict';

    angular.module('mTakaAPP.pages.Ledger')
        .controller('LedgerCtrl', LedgerCtrl);

    function LedgerCtrl($scope, $http, toastr, $filter, editableOptions, editableThemes, $rootScope, $stateParams, $state, getFunctionId) {
        debugger;

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

        $scope.LedgerModel = {};
        $scope.LedgerModel.FromDate = null;
        $scope.LedgerModel.ToDate = null;
        $scope.LedgerModel.WalletAccountNo = null;
        $scope.LedgerModel.smartTablePageSize = 10;
        $scope.LedgerModel.LedgerTxnList = [];
        $scope.LedgerModel.RowCollection = [];
        var MTKSession = JSON.parse(sessionStorage.MTKSession);
        $scope.LedgerModel.WalletAccountNo = (MTKSession != null && MTKSession.CurrentUserId != null) ? MTKSession.CurrentUserId : null;

        $scope.dpOpenStatus = {};
        $scope.setDpOpenStatus = function (id) {
            debugger;
            $scope.dpOpenStatus[id] = true
        };

        $scope.dpOpenStatus1 = {};
        $scope.setDpOpenStatus1 = function (id1) {
            debugger;
            $scope.dpOpenStatus1[id1] = true
        };

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        $scope.GetAllLedgerTxnByAccNoandDate = function () {
            if ($scope.LedgerModel.FromDate != null) {
                $scope.SplitFromDate = $scope.LedgerModel.FromDate.toString();
                $scope.FDBmonth = ($scope.SplitFromDate.split(' ')[1]);
                monthstringtonumberconvert($scope.FDBmonth);
                $scope.FDBmonth = $scope.month;
                $scope.FDBday = ($scope.SplitFromDate.split(' ')[2]);
                $scope.FDByear = ($scope.SplitFromDate.split(' ')[3]);
                $scope.LedgerModel.FromDate = ($scope.FDByear + '-' + $scope.FDBmonth + '-' + $scope.FDBday + 'T18:00:00.000Z');
            }
            if ($scope.LedgerModel.ToDate != null) {
                $scope.SplitToDate = $scope.LedgerModel.ToDate.toString();
                $scope.TDGmonth = ($scope.SplitToDate.split(' ')[1]);
                monthstringtonumberconvert($scope.TDGmonth);
                $scope.TDGmonth = $scope.month;
                $scope.TDGday = ($scope.SplitToDate.split(' ')[2]);
                $scope.TDGyear = ($scope.SplitToDate.split(' ')[3]);
                $scope.LedgerModel.ToDate = ($scope.TDGyear + '-' + $scope.TDGmonth + '-' + $scope.TDGday + 'T18:00:00.000Z');
            }
            $scope.originalData = angular.copy($scope.LedgerModel);

            var data = { 'data': JSON.stringify($scope.LedgerModel) };
            $http.post('Ledger/GetAllLedgerTxnByAccNoandDate', data, config)
                .then(
                function (response) {
                    debugger;
                    if (response.data != null) {
                        $scope.LedgerModel.LedgerTxnList = response.data;
                        $scope.LedgerModel.RowCollection = response.data;
                        $scope.GetAccMasterInfoByAccNo($scope.originalData);
                    }
                }
                );
        };

        $scope.GetAccMasterInfoByAccNo = function (_object) {
            debugger;
            if (_object == undefined) {
                $scope.LedgerModel.CurrentBalance = "";

            }
            else {
                var data = { 'data': JSON.stringify(_object) };
                $http.post('Ledger/GetAccMasterInfoByAccNo', data, config)
                    .then(
                    function (response) {
                        debugger;
                        if (response.data.AccBalance == null) {
                            $scope.LedgerModel.AccBalance = "";
                            showErrorMsg(response.data.ResponseMessage);
                        }
                        if (response.data.AccBalance != null) {
                            $scope.LedgerModel.CurrentBalance = response.data.AccBalance;
                        }
                    }
                    );
            }
        };

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
            debugger;
            $scope.LedgerModel.FromDate = "";
            $scope.LedgerModel.ToDate = "";
            $scope.LedgerModel.WalletAccountNo = "";
            $scope.LedgerModel.LedgerTxnList = "";
            $scope.LedgerModel.RowCollection = "";
            $scope.LedgerModel.CurrentBalance = "";
        };

        function showSuccessMsg(_Msg) {
            toastr.success(_Msg);
        };
        function showErrorMsg(_Msg) {
            toastr.error(_Msg);
        };
    }
})();