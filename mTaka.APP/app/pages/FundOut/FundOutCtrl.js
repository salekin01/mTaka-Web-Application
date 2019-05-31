(function () {
    'use strict';

    angular.module('mTakaAPP.pages.FundOut')
        .controller('FundOutCtrl', FundOutCtrl);

    function FundOutCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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
        $scope.FundOutModel = {};
        $scope.LedgerModel = {};
        $scope.FundOutModel.FromSystemAccountNo = null;
        $scope.FundOutModel.FromAccountBalance = null;
        $scope.FundOutModel.ToSystemAccountNo = null;

        $scope.FundOutModel.FunctionId = FunctionId;
        $scope.FundOutModel.UserName = $rootScope.UserName;

        //$scope.FundOutModel.FromSystemAccountNo = "01911111111";
        var MTKSession = JSON.parse(sessionStorage.MTKSession);
        $scope.FundOutModel.FromSystemAccountNo = (MTKSession != null && MTKSession.CurrentUserId != null) ? MTKSession.CurrentUserId : null;
        $scope.FundOutModel.DefineServiceId = "002";
        $scope.FundOutModel.FunctionId = "090107002";
        $scope.FundOutModel.FunctionName = "FundOut";
        GetAccMasterInfoByAccNo();
        $scope.FundOutModel.FromAccountBalance = $scope.FundOutModel.FromAccountBalance;
        $scope.SubmitBtn = "Add";
        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        $scope.addData = function () {
            debugger;
            if ($scope.SubmitBtn === "Add") {                
                    debugger;
                    $scope.FundOutModel.MakeBy = "Prova";
                    //$scope.FundOutModel.MakeDT = "12/30/2017";
                    //$scope.FundOutModel.TransDT = "12/30/2017";
                    var data = { 'data': JSON.stringify($scope.FundOutModel) };
                    $http.post('FundOut/Create', data, config)
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
            }
        };
        function GetAccMasterInfoByAccNo() {
            debugger;
            if ($scope.FundOutModel.FromSystemAccountNo == null) {
                $scope.FundOutModel.FromAccountBalance = null;
                showErrorMsg("You are not a valid account holder.");
            }
            else
            {
                var data = { 'data': JSON.stringify($scope.FundOutModel) };
                $http.post('Ledger/GetAccMasterInfoByAccNo', data, config)
                    .then(
                    function (response) {
                        debugger;
                        if (response.data.AccBalance == null) {
                            $scope.FundOutModel.FromAccountBalance = null;
                            showErrorMsg(response.data.ResponseMessage);
                        }
                        if (response.data.AccBalance != null) {
                            $scope.FundOutModel.FromAccountBalance = response.data.AccBalance;
                        }
                    }
                    );
            }
        };
        function ClearFields() {
            $scope.FundOutModel.FundOutId = "";
            $scope.FundOutModel.ToSystemAccountNo = "";
            $scope.FundOutModel.Amount = "";
            $scope.FundOutModel.Narration = "";
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