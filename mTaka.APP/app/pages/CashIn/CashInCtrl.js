(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CashIn')
        .controller('CashInCtrl', CashInCtrl);

    function CashInCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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
        $scope.CashInModel = {};
        $scope.LedgerModel = {};
        $scope.CashInModel.FromSystemAccountNo = null;
        $scope.CashInModel.FromAccountBalance = null;
        $scope.CashInModel.ToSystemAccountNo = null;
        //$scope.CashInModel.FromSystemAccountNo = "01933333333";
        var MTKSession = JSON.parse(sessionStorage.MTKSession);
        $scope.CashInModel.FromSystemAccountNo = (MTKSession != null && MTKSession.CurrentUserId != null) ? MTKSession.CurrentUserId : null;
        $scope.CashInModel.DefineServiceId = "003";
        $scope.CashInModel.FunctionId = "090107003";
        $scope.CashInModel.FunctionName = "CashIn";
        GetAccMasterInfoByAccNo();
        $scope.CashInModel.FromAccountBalance = $scope.CashInModel.FromAccountBalance;

        $scope.CashInModel.FunctionId = FunctionId;
        $scope.CashInModel.UserName = $rootScope.UserName;


        $scope.SubmitBtn = "Add";
        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        $scope.addData = function () {
            debugger;
            if ($scope.SubmitBtn === "Add") {
                $scope.CashInModel.FunctionId = FunctionId;
                $scope.CashInModel.MakeBy = "Prova";
                //$scope.CashInModel.MakeDT = "12/30/2017";
                //$scope.CashInModel.TransDT = "12/30/2017";
                var data = { 'data': JSON.stringify($scope.CashInModel) };
                $http.post('CashIn/Create', data, config)
                    .then(
                    function (response) {
                        debugger;
                        if (response.data.Result == 1) {
                            showSuccessMsg(response.data.ResponseMessage);                            
                            GetAccMasterInfoByAccNo();
                            $scope.ClearFields();
                        }
                        else
                            showErrorMsg(response.data.ResponseMessage);
                    }
                    );
            }
        };
        function GetAccMasterInfoByAccNo() {
            debugger;
            if ($scope.CashInModel.FromSystemAccountNo == null) {
                $scope.CashInModel.FromAccountBalance = null;
                showErrorMsg("You are not a valid account holder.");                
            }
            else
            {
                var data = { 'data': JSON.stringify($scope.CashInModel) };
                $http.post('Ledger/GetAccMasterInfoByAccNo', data, config)
                    .then(
                    function (response) {
                        debugger;
                        if (response.data.AccBalance == null) {
                            $scope.CashInModel.FromAccountBalance = null;
                            showErrorMsg(response.data.ResponseMessage);
                        }
                        if (response.data.AccBalance != null) {
                            $scope.CashInModel.FromAccountBalance = response.data.AccBalance;
                        }
                    }
                    );
            }
        };
        $scope.ClearFields = function () {
            debugger;
            $scope.CashInModel.SerialId = "";
            $scope.CashInModel.ToSystemAccountNo = "";
            $scope.CashInModel.Amount = "";
            $scope.CashInModel.Narration = "";
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