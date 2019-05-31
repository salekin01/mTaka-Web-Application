(function () {
    'use strict';
    angular.module('mTakaAPP.pages.DefineService')
        .controller('DefineServiceCtrl', DefineServiceCtrl);

    function DefineServiceCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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

        function loadData() {
            $http.get('DefineService/Index').success(function (json) {
                $scope.define_service = json;
            });
        };
        loadData();
        $scope.NewDefineService = {};
        $scope.SubmitBtn = "Add";

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        $scope.addData = function () {
            $scope.NewDefineService.FunctionId = FunctionId;
            var data = { 'data': JSON.stringify($scope.NewDefineService) };
            if ($scope.SubmitBtn === "Add") {
                $http.post('DefineService/Create', data, config)
                    .then(
                    function (response) {
                        if (response.data.Result == 1) {
                            showSuccessMsg(response.data.ResponseMessage);
                            $scope.ClearFields();
                            loadData();
                        }
                        else
                            showErrorMsg(response.data.ResponseMessage);
                    }
                    );

            }
            else if ($scope.SubmitBtn === "Update") {
                $scope.NewDefineService.FunctionId = FunctionId;
                var data = { 'data': JSON.stringify($scope.NewDefineService) };
                $http.post('DefineService/Edit', data, config)
                    .then(
                    function (response) {
                        if (response.data.Result == 1) {
                            showSuccessMsg(response.data.ResponseMessage);
                            $scope.ClearFields();
                            loadData();
                        }
                        else
                            showErrorMsg(response.data.ResponseMessage);
                    }
                    );
            }

        };

        $scope.deleteDefineService = function (index) {
            var data = { 'data': JSON.stringify($scope.define_service[index]) };
            $http.post('DefineService/Delete', data, config)
                .then(
                function (response) {
                    if (response.data.Result == 1) {
                        showSuccessMsg(response.data.ResponseMessage);
                        $scope.ClearFields();
                        loadData();
                    }
                    else
                        showErrorMsg(response.data.ResponseMessage);
                }
                );
        };

        $scope.changeDefineService = function (index) {
            var data = $scope.define_service[index];
            $scope.NewDefineService.DefineServiceId = data.DefineServiceId;
            $scope.NewDefineService.DefineServiceNm = data.DefineServiceNm;
            $scope.NewDefineService.FunctionIdForDefineService = data.FunctionIdForDefineService;
            $scope.SubmitBtn = "Update";
        };

        $scope.ClearFields = function () {
            $scope.NewDefineService.DefineServiceId = "";
            $scope.NewDefineService.DefineServiceNm = "";
            $scope.NewDefineService.FunctionIdForDefineService = "";
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
