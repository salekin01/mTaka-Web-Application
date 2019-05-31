(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CurrencyInfo')
        .controller('CurrencyInfoCtrl', CurrencyInfoCtrl);

    function CurrencyInfoCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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

        $scope.CurrencyInfoModel = {};
        $scope.SubmitBtn = "Add";

        $scope.CurrencyInfoModel.FunctionId = FunctionId;
        $scope.CurrencyInfoModel.UserName = $rootScope.UserName;

        $scope.loadData = function () {
            $http.get('CurrencyInfo/Index').success(function (json) {
                $scope.CurrencyInfoList = json;
            });
        };
        $scope.loadData();

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        $scope.addData = function () {
            if ($scope.SubmitBtn === "Add") {
                $scope.CurrencyInfoModel.FunctionId = FunctionId;
                var data = { 'data': JSON.stringify($scope.CurrencyInfoModel) };
                $http.post('CurrencyInfo/Create', data, config)
                    .then(
                    function (response) {
                        debugger;
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
                $scope.CurrencyInfoModel.FunctionId = FunctionId;
                var data = { 'data': JSON.stringify($scope.CurrencyInfoModel) };
                $http.post('CurrencyInfo/Edit', data, config)
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
        $scope.changeCurrencyInfo = function (index) {
            var data = $scope.CurrencyInfoList[index];
            $scope.CurrencyInfoModel.CurrencyId = data.CurrencyId;
            $scope.CurrencyInfoModel.CurrencyNm = data.CurrencyNm;
            $scope.CurrencyInfoModel.CurrencyShortNm = data.CurrencyShortNm;
            $scope.CurrencyInfoModel.CurrencyReportNm = data.CurrencyReportNm;
            $scope.CurrencyInfoModel.CurrencyDecimalNm = data.CurrencyDecimalNm;
            $scope.CurrencyInfoModel.CBCode = data.CBCode;
            $scope.CurrencyInfoModel.InternationalName = data.InternationalName;
            $scope.CurrencyInfoModel.BaseCurrencyConvertFlag = data.BaseCurrencyConvertFlag;
            $scope.CurrencyInfoModel.LocalVariable = data.LocalVariable;
            $scope.SubmitBtn = "Update";
        };
        $scope.deleteCurrencyInfo = function (index) {
            var data = { 'data': JSON.stringify($scope.CurrencyInfoList[index]) };
            $http.post('CurrencyInfo/Delete', data, config)
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
        };
        $scope.ClearFields = function () {
            $scope.CurrencyInfoModel.CurrencyId = "";
            $scope.CurrencyInfoModel.CurrencyNm = "";
            $scope.CurrencyInfoModel.CurrencyShortNm = "";
            $scope.CurrencyInfoModel.CurrencyReportNm = "";
            $scope.CurrencyInfoModel.CurrencyDecimalNm = "";
            $scope.CurrencyInfoModel.CBCode = "";
            $scope.CurrencyInfoModel.InternationalName = "";
            $scope.CurrencyInfoModel.BaseCurrencyConvertFlag = "";
            $scope.CurrencyInfoModel.LocalVariable = "";
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