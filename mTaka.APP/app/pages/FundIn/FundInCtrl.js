(function () {
    'use strict';

    angular.module('mTakaAPP.pages.FundIn')
        .controller('FundInCtrl', FundInCtrl);

    function FundInCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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
        $scope.FundInModel = {};
        $scope.LedgerModel = {};
        $scope.FundInModel.FromSystemAccountNo = null;
        $scope.FundInModel.FromAccountBalance = null;
        $scope.FundInModel.ToSystemAccountNo = null;

        $scope.FundInModel.FunctionId = FunctionId;
        $scope.FundInModel.UserName = $rootScope.UserName;

        //$scope.FundInModel.FromSystemAccountNo = "01911111111";
        var MTKSession = JSON.parse(sessionStorage.MTKSession);
        $scope.FundInModel.FromSystemAccountNo = (MTKSession != null && MTKSession.CurrentUserId != null) ? MTKSession.CurrentUserId : null;
        $scope.FundInModel.DefineServiceId = "001";
        $scope.FundInModel.FunctionId = "090107001";
        $scope.FundInModel.FunctionName = "FundIn";
        GetAccMasterInfoByAccNo();
        $scope.FundInModel.FromAccountBalance = $scope.FundInModel.FromAccountBalance;
        $scope.SubmitBtn = "Add";
        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        $scope.addData = function () {
            debugger;
            if ($scope.SubmitBtn === "Add") {
                $scope.FundInModel.FunctionId = FunctionId;
                    debugger;
                    $scope.FundInModel.MakeBy = "Prova";
                //$scope.FundInModel.MakeDT = "12/30/2017";
                //$scope.FundInModel.TransDT = "12/30/2017";
                //CheckStatusWiseService();
                //CheckTransactionRules();
                //if ($scope.Check_StatusWiseServic == 1 && $scope.Check_TransactionRules == 1) {
                    debugger;
                    var data = { 'data': JSON.stringify($scope.FundInModel) };
                    $http.post('FundIn/Create', data, config)
                        .then(
                        function (response) {
                            debugger;
                            if (response.data.Result == 1) {
                                showSuccessMsg(response.data.ResponseMessage);                                
                                GetAccMasterInfoByAccNo();
                                ClearFields();
                            }
                            else
                                showErrorMsg(response.data.ResponseMessage);
                        }
                        );
                //}
            }
        };
        //function CheckStatusWiseService() {
        //    debugger;
        //    if ($scope.FundInModel.ToSystemAccountNo == null) {
        //        showErrorMsg("Please insert To Account No.");
        //    }
        //    else {
        //        var data = { 'data': JSON.stringify($scope.FundInModel) };
        //        $http.post('StatusWiseService/CheckStatusWiseService', data, config)
        //            .then(
        //            function (response) {
        //                debugger;
        //                if (response.data.Result == 0) {
        //                    $scope.Check_StatusWiseServic = 0;
        //                    showErrorMsg(response.data.ResponseMessage);
        //                }
        //                if (response.data.Result == 1) {
        //                    $scope.Check_StatusWiseServic = 1;
        //                }
        //            }
        //            );
        //    }
        //};
        //function CheckTransactionRules() {
        //    debugger;
        //    if ($scope.FundInModel.FromSystemAccountNo == null || $scope.FundInModel.ToSystemAccountNo == null) {
        //        showErrorMsg("Please insert Account No.");
        //    }
        //    else {
        //        var data = { 'data': JSON.stringify($scope.FundInModel) };
        //        $http.post('TransactionRules/CheckTransactionRules', data, config)
        //            .then(
        //            function (response) {
        //                debugger;
        //                if (response.data.Result == 0) {
        //                    $scope.Check_TransactionRules = 0;
        //                    showErrorMsg(response.data.ResponseMessage);
        //                }
        //                if (response.data.Result == 1) {
        //                    $scope.Check_TransactionRules = 1;
        //                }
        //            }
        //            );
        //    }
        //};
        function GetAccMasterInfoByAccNo() {
            debugger;
            if ($scope.FundInModel.FromSystemAccountNo == null)            {
                $scope.FundInModel.FromAccountBalance = null;
                showErrorMsg("You are not a valid account holder.");
            }
            else
            {
                var data = { 'data': JSON.stringify($scope.FundInModel) };
                $http.post('Ledger/GetAccMasterInfoByAccNo', data, config)
                    .then(
                    function (response) {
                        debugger;
                        if (response.data.AccBalance == null) {
                            $scope.FundInModel.FromAccountBalance = null;
                            showErrorMsg(response.data.ResponseMessage);
                        }
                        if (response.data.AccBalance != null) {
                            $scope.FundInModel.FromAccountBalance = response.data.AccBalance;
                        }
                    }
                    );
            }             
        };
        //$scope.GetFromAccInfo = function (object) {
        //    debugger;           
        //        var data = { 'data': JSON.stringify(object) };
        //        $http.post('AccInfo/GetAccInfo', data, config)
        //            .then(
        //            function (response) {
        //                debugger;
        //                if (response.data.SystemAccountNo == null) {
        //                    $scope.FromAcc = "";
        //                    showErrorMsg(response.data.ResponseMessage);
        //                }
        //                if (response.data.SystemAccountNo != null) {
        //                    $scope.FromAcc = response.data.SystemAccountNo;
        //                }
        //            }
        //            );            
        //};
        //$scope.GetToAccInfo = function (object) {
        //    debugger;
        //        var data = { 'data': JSON.stringify(object) };
        //        $http.post('AccInfo/GetAccInfo', data, config)
        //            .then(
        //            function (response) {
        //                debugger;
        //                if (response.data.SystemAccountNo == null) {
        //                    $scope.ToAcc = "";
        //                    showErrorMsg(response.data.ResponseMessage);
        //                }
        //                if (response.data.SystemAccountNo != null) {
        //                    $scope.ToAcc = response.data.SystemAccountNo;
        //                }
        //            }
        //            );
        //};
        function ClearFields() {
            debugger;
            $scope.FundInModel.FundInId = "";
            $scope.FundInModel.ToSystemAccountNo = "";
            $scope.FundInModel.Amount = "";
            $scope.FundInModel.Narration = "";
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