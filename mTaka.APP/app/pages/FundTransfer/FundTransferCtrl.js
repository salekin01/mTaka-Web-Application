(function () {
    'use strict';

    angular.module('mTakaAPP.pages.FundTransfer')
        .controller('FundTransferCtrl', FundTransferCtrl);

    function FundTransferCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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
        $scope.FundTransferModel = {};
        $scope.AccInfoModel = {};
        $scope.LedgerModel = {};
        $scope.FundTransferModel.FromSystemAccountNo = null;
        $scope.FundTransferModel.FromSystemAccountNo1 = null;
        $scope.FundTransferModel.FromAccountBalance = null;
        $scope.FundTransferModel.ToSystemAccountNo = null;

        $scope.FundTransferModel.FunctionId = FunctionId;
        $scope.FundTransferModel.UserName = $rootScope.UserName;

        var MTKSession = JSON.parse(sessionStorage.MTKSession);        
        //GetBankAccInfoByWalletAccNo();
        $scope.FundTransferModel.DefineServiceId = "011";
        $scope.FundTransferModel.FunctionId = "090107006";
        $scope.FundTransferModel.FunctionName = "FundTransfer";
        //GetLedgerMasterInfoByAgAccNo();
        $scope.FundTransferModel.FromAccountBalance = $scope.FundTransferModel.FromAccountBalance;
        $scope.SubmitBtn = "Add";
        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        $scope.GetTransactionSetupForDD = function () {
            $http.get('CommonService/GetTransactionSetupForDD').success(function (json) {
                $scope.TransactionSetupForDD = json;
            });
        };
        $scope.GetTransactionSetupForDD();
        $scope.GetBankAccInfoByWalletAccNo = function () {
            debugger;
            if ($scope.FundTransferModel.SelectDefineServiceId.Value == "001")
            {
                $scope.FundTransferModel.FromSystemAccountNo = (MTKSession != null && MTKSession.CurrentUserId != null) ? MTKSession.CurrentUserId : null;
                $scope.FundTransferModel.FromSystemAccountNo1 = $scope.FundTransferModel.FromSystemAccountNo;
                if ($scope.FundTransferModel.FromSystemAccountNo == null) {
                    //$scope.FundTransferModel.FromAccountBalance = null;
                    showErrorMsg("You are not a valid account holder.");
                }
                else {
                    $scope.AccInfoModel.FromSystemAccountNo = $scope.FundTransferModel.FromSystemAccountNo;
                    var data = { 'data': JSON.stringify($scope.AccInfoModel) };
                    $http.post('AccInfo/GetBankAccInfoByWalletAccNo', data, config)
                        .then(
                        function (response) {
                            debugger;
                            if (response.data.FromSystemAccountNo == null) {
                                $scope.FundTransferModel.FromAccountBalance = null;
                                showErrorMsg(response.data.ResponseMessage);
                            }
                            if (response.data.FromSystemAccountNo != null && $scope.FundTransferModel.FromSystemAccountNo1 != null) {
                                debugger;
                                $scope.FundTransferModel.FromSystemAccountNo = response.data.FromSystemAccountNo;
                                $scope.FundTransferModel.ToSystemAccountNo = $scope.FundTransferModel.FromSystemAccountNo1;
                                $scope.FundTransferModel.dis = "dis";
                            }
                        }
                        );
                }
            }
            else
            {
                $scope.ClearFields_False();
            }
        };
        $scope.addData = function () {
            debugger;
            if ($scope.SubmitBtn === "Add") {
                $scope.FundTransferModel.MakeBy = "Prova";
                $scope.FundTransferModel.SelectDefineServiceId = $scope.FundTransferModel.SelectDefineServiceId != null ? $scope.FundTransferModel.SelectDefineServiceId.Value : null;
                var data = { 'data': JSON.stringify($scope.FundTransferModel) };
                $http.post('FundTransfer/Create', data, config)
                    .then(
                    function (response) {
                        debugger;
                        $scope.loadData();
                        if (response.data.Result == 1) {
                            showSuccessMsg(response.data.ResponseMessage);
                            $scope.ClearFields();
                            //GetLedgerMasterInfoByAgAccNo();
                        }
                        else
                            showErrorMsg(response.data.ResponseMessage);
                    }
                    );
            }
        };
        $scope.ClearFields = function () {
            debugger;
            $scope.FundTransferModel.FundTransferId = "";
            $scope.FundTransferModel.ToSystemAccountNo = "";
            $scope.FundTransferModel.Amount = "";
            $scope.FundTransferModel.Narration = "";
            $scope.FundTransferModel.SelectDefineServiceId.Value = "";
            $scope.SubmitBtn = "Add";
        };
        $scope.ClearFields_False = function () {
            debugger;
            $scope.FundTransferModel.FromSystemAccountNo = "";
            $scope.FundTransferModel.FromSystemAccountNo1 = "";
            $scope.FundTransferModel.FundTransferId = "";
            $scope.FundTransferModel.ToSystemAccountNo = "";
            $scope.FundTransferModel.Amount = "";
            $scope.FundTransferModel.Narration = "";
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