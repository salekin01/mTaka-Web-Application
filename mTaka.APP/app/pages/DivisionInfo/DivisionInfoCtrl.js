(function () {
    'use strict';

    angular.module('mTakaAPP.pages.DivisionInfo')
        .controller('DivisionInfoCtrl', DivisionInfoCtrl);

    function DivisionInfoCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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

        $scope.DivisionInfoModel = {};
        $scope.DivisionInfoModel.CountryId = null;

        $scope.DivisionInfoModel.FunctionId = FunctionId;
        $scope.DivisionInfoModel.UserName = $rootScope.UserName;


        $scope.SubmitBtn = "Add";
        $scope.GetCountryInfoForDD = function () {
            $http.get('CountryInfo/GetCountryInfoForDD').success(function (json) {
                $scope.CountryInfoForDD = json;
            });
        };
        $scope.GetCountryInfoForDD();

        $scope.loadData = function () {
            $http.get('DivisionInfo/Index').success(function (json) {
                $scope.DivisionInfoList = json;
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
                $scope.DivisionInfoModel.FunctionId = FunctionId;
                $scope.DivisionInfoModel.CountryId = $scope.DivisionInfoModel.CountryId.Value;
                var data = { 'data': JSON.stringify($scope.DivisionInfoModel) };
                $http.post('DivisionInfo/Create', data, config)
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
                $scope.DivisionInfoModel.FunctionId = FunctionId;
                $scope.DivisionInfoModel.CountryId = $scope.DivisionInfoModel.CountryId.Value;
                var data = { 'data': JSON.stringify($scope.DivisionInfoModel) };
                $http.post('DivisionInfo/Edit', data, config)
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
        $scope.changeDivisionInfo = function (index) {
            var data = $scope.DivisionInfoList[index];
            $scope.DivisionInfoModel.DivisionId = data.DivisionId;
            $scope.DivisionInfoModel.DivisionNm = data.DivisionNm;
            $scope.DivisionInfoModel.DivisionShortNm = data.DivisionShortNm;
            accessArrayOfJsonObjectByKeyValue($scope.CountryInfoForDD, data.CountryId);
            $scope.DivisionInfoModel.CountryId = $scope.selectedCountryInfoDD;
            $scope.SubmitBtn = "Update";
        };
        $scope.deleteDivisionInfo = function (index) {
            var data = { 'data': JSON.stringify($scope.DivisionInfoList[index]) };
            $http.post('DivisionInfo/Delete', data, config)
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
                    $scope.selectedCountryInfoDD = object;
                }
            });
        }
        $scope.ClearFields = function () {
            $scope.DivisionInfoModel.DivisionId = "";
            $scope.DivisionInfoModel.DivisionNm = "";
            $scope.DivisionInfoModel.DivisionShortNm = "";
            $scope.DivisionInfoModel.CountryId = "";
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