(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CashOut')
        .controller('CashOutCtrl', CashOutCtrl);

    function CashOutCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
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

        $scope.CashOutModel = {};
        $scope.LedgerModel = {};
        $scope.CashOutModel.FromSystemAccountNo = null;
        $scope.CashOutModel.FromAccountBalance = null;
        $scope.CashOutModel.ToSystemAccountNo = null;
        //$scope.CashOutModel.FromSystemAccountNo = "01933333333";
        var MTKSession = JSON.parse(sessionStorage.MTKSession);
        $scope.CashOutModel.FromSystemAccountNo = (MTKSession != null && MTKSession.CurrentUserId != null) ? MTKSession.CurrentUserId : null;
        $scope.CashOutModel.DefineServiceId = "004";
        $scope.CashOutModel.FunctionId = "090107004";
        $scope.CashOutModel.FunctionName = "CashOut";

        $scope.CashOutModel.FunctionId = FunctionId;
        $scope.CashOutModel.UserName = $rootScope.UserName;

        GetAccMasterInfoByAccNo();
        $scope.CashOutModel.FromAccountBalance = $scope.CashOutModel.FromAccountBalance;
        $scope.SubmitBtn = "Add";
        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        $scope.addData = function () {
            debugger;
            if ($scope.SubmitBtn === "Add") {
                $scope.CashOutModel.FunctionId = FunctionId;
                $scope.CashOutModel.MakeBy = "Prova";
                //$scope.CashOutModel.MakeDT = "12/30/2017";
                //$scope.CashOutModel.TransDT = "12/30/2017";
                var data = { 'data': JSON.stringify($scope.CashOutModel) };
                $http.post('CashOut/Create', data, config)
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
            if ($scope.CashOutModel.FromSystemAccountNo == null) {
                $scope.CashOutModel.FromAccountBalance = null;
                showErrorMsg("You are not a valid account holder.");
            }
            else
            {
                var data = { 'data': JSON.stringify($scope.CashOutModel) };
                $http.post('Ledger/GetAccMasterInfoByAccNo', data, config)
                    .then(
                    function (response) {
                        debugger;
                        if (response.data.AccBalance == null) {
                            $scope.CashOutModel.FromAccountBalance = "";
                            showErrorMsg(response.data.ResponseMessage);
                        }
                        if (response.data.AccBalance != null) {
                            $scope.CashOutModel.FromAccountBalance = response.data.AccBalance;
                        }
                    }
                    );
            }
        };
        $scope.ClearFields = function () {
            debugger;
            $scope.CashOutModel.CashOutId = "";
            $scope.CashOutModel.ToSystemAccountNo = "";
            $scope.CashOutModel.Amount = "";
            $scope.CashOutModel.Narration = "";
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