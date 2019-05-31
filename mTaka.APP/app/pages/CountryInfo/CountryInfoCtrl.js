(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CountryInfo')
        .controller('CountryInfoCtrl', CountryInfoCtrl);

    function CountryInfoCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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

        $scope.CountryInfoModel = {};
        $scope.CountryInfoModel.CurrencyId = null;
        $scope.SubmitBtn = "Add";

        $scope.CountryInfoModel.FunctionId = FunctionId;
        $scope.CountryInfoModel.UserName = $rootScope.UserName;

        $scope.GetCurrencyInfoForDD = function () {
            $http.get('CurrencyInfo/GetCurrencyInfoForDD').success(function (json) {
                $scope.CurrencyInfoForDD = json;
            });
        };
        $scope.GetCurrencyInfoForDD();

        $scope.loadData = function () {
            $http.get('CountryInfo/Index').success(function (json) {
                $scope.CountryInfoList = json;
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
                $scope.CountryInfoModel.FunctionId = FunctionId;
                $scope.CountryInfoModel.CurrencyId = $scope.CountryInfoModel.CurrencyId.Value;
                var data = { 'data': JSON.stringify($scope.CountryInfoModel) };
                $http.post('CountryInfo/Create', data, config)
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
                $scope.CountryInfoModel.FunctionId = FunctionId;
                $scope.CountryInfoModel.CurrencyId = $scope.CountryInfoModel.CurrencyId.Value;
                var data = { 'data': JSON.stringify($scope.CountryInfoModel) };
                $http.post('CountryInfo/Edit', data, config)
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
        $scope.changeCountryInfo = function (index) {
            var data = $scope.CountryInfoList[index];
            $scope.CountryInfoModel.CountryId = data.CountryId;
            $scope.CountryInfoModel.CountryNm = data.CountryNm;
            $scope.CountryInfoModel.CountryShortNm = data.CountryShortNm;
            $scope.CountryInfoModel.ISOCode = data.ISOCode;
            $scope.CountryInfoModel.CBCode = data.CBCode;
            $scope.CountryInfoModel.NationalityName = data.NationalityName;
            accessArrayOfJsonObjectByKeyValue($scope.CurrencyInfoForDD, data.CurrencyId);
            $scope.CountryInfoModel.CurrencyId = $scope.selectedCurrencyInfoDD;
            $scope.CountryInfoModel.NativeCountryFlag = data.NativeCountryFlag;
            $scope.SubmitBtn = "Update";
        };
        $scope.deleteCountryInfo = function (index) {
            var data = { 'data': JSON.stringify($scope.CountryInfoList[index]) };
            $http.post('CountryInfo/Delete', data, config)
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
        function accessArrayOfJsonObjectByKeyValue(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedCurrencyInfoDD = object;
                }
            });
        }
        $scope.ClearFields = function () {
            $scope.CountryInfoModel.CountryId = "";
            $scope.CountryInfoModel.CountryNm = "";
            $scope.CountryInfoModel.CountryShortNm = "";
            $scope.CountryInfoModel.ISOCode = "";
            $scope.CountryInfoModel.CBCode = "";
            $scope.CountryInfoModel.NationalityName = "";
            $scope.CountryInfoModel.CurrencyId = "";
            $scope.CountryInfoModel.NativeCountryFlag = "";
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