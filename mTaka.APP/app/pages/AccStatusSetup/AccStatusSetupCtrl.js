(function () {
    'use strict';

    angular.module('mTakaAPP.pages.AccStatusSetup')
        .controller('AccStatusSetupCtrl', AccStatusSetupCtrl);

    function AccStatusSetupCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
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

        $scope.AccStatusSetupModel = {};
        $scope.SubmitBtn = "Add";

        $scope.AccStatusSetupModel.FunctionId = FunctionId;
        $scope.AccStatusSetupModel.UserName = $rootScope.UserName;


        function loadData() {
            $http.post('AccStatusSetup/Index').success(function (json) {
                $scope.AccStatusSetupList = json;
                //console.log($scope.AccStatusSetupList);
            });
        };
        loadData();
        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        $scope.addData = function () {
            if ($scope.SubmitBtn === "Add") {
                //$scope.AccStatusSetupModel.FunctionId = FunctionId;
                var data = { 'data': JSON.stringify($scope.AccStatusSetupModel) };
                $http.post('AccStatusSetup/Create', data, config)
                    .then(
                    function (response) {
                        debugger;                        
                        if (response.data.Result == 1)
                        {
                            showSuccessMsg(response.data.ResponseMessage);
                            loadData();
                            $scope.ClearFields();
                        }
                        else
                            showErrorMsg(response.data.ResponseMessage);
                    }
                    );

            }
            else if ($scope.SubmitBtn === "Update") {
                var data = { 'data': JSON.stringify($scope.AccStatusSetupModel) };
                $http.post('AccStatusSetup/Edit', data, config)
                    .then(
                    function (response) {                        
                        if (response.data.Result == 1)
                        {
                            showSuccessMsg(response.data.ResponseMessage);
                            loadData();
                            $scope.ClearFields();
                        }                            
                        else
                            showErrorMsg(response.data.ResponseMessage);
                    }
                    );
            }
        };
        $scope.changeAccStatusSetup = function (index) {
            var data = $scope.AccStatusSetupList[index];
            $scope.AccStatusSetupModel.AccountStatusId = data.AccountStatusId;
            $scope.AccStatusSetupModel.AccountStatusName = data.AccountStatusName;
            $scope.AccStatusSetupModel.AccountStatusShortName = data.AccountStatusShortName;

            $scope.SubmitBtn = "Update";
        };
        $scope.deleteAccStatusSetup = function (index) {
            var data = { 'data': JSON.stringify($scope.AccStatusSetupList[index]) };
            $http.post('AccStatusSetup/Delete', data, config)
                .then(
                function (response) {                    
                    if (response.data.Result == 1)
                    {
                        showSuccessMsg(response.data.ResponseMessage);
                        loadData();
                        $scope.ClearFields();
                    }                        
                    else
                        showErrorMsg(response.data.ResponseMessage);
                }
                );
        };
        $scope.ClearFields = function () {
            $scope.AccStatusSetupModel.AccountStatusId = "";
            $scope.AccStatusSetupModel.AccountStatusName = "";
            $scope.AccStatusSetupModel.AccountStatusShortName = "";

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