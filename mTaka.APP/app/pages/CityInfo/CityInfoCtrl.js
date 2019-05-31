(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CityInfo')
        .controller('CityInfoCtrl', CityInfoCtrl);

    function CityInfoCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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

        $scope.CityInfoModel = {};
        $scope.CityInfoModel.DivisionId = null;
        $scope.SubmitBtn = "Add";


        $scope.CityInfoModel.FunctionId = FunctionId;
        $scope.CityInfoModel.UserName = $rootScope.UserName;

        $scope.GetDivisionInfoForDD = function () {
            $http.get('DivisionInfo/GetDivisionInfoForDD').success(function (json) {
                $scope.DivisionInfoForDD = json;
            });
        };
        $scope.GetDivisionInfoForDD();

        $scope.loadData = function () {
            $http.get('CityInfo/Index').success(function (json) {
                $scope.CityInfoList = json;
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

                $scope.CityInfoModel.FunctionId = FunctionId;
                $scope.CityInfoModel.DivisionId = $scope.CityInfoModel.DivisionId.Value;
                var data = { 'data': JSON.stringify($scope.CityInfoModel) };
                $http.post('CityInfo/Create', data, config)
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
                $scope.CityInfoModel.FunctionId = FunctionId;
                $scope.CityInfoModel.DivisionId = $scope.CityInfoModel.DivisionId.Value;
                var data = { 'data': JSON.stringify($scope.CityInfoModel) };
                $http.post('CityInfo/Edit', data, config)
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
        $scope.changeCityInfo = function (index) {
            var data = $scope.CityInfoList[index];
            $scope.CityInfoModel.CityId = data.CityId;
            $scope.CityInfoModel.CityNm = data.CityNm;
            $scope.CityInfoModel.CityShortNm = data.CityShortNm;
            accessArrayOfJsonObjectByKeyValue($scope.DivisionInfoForDD, data.DivisionId);
            $scope.CityInfoModel.DivisionId = $scope.selectedDivisionInfoDD;
            $scope.SubmitBtn = "Update";
        };
        $scope.deleteCityInfo = function (index) {
            var data = { 'data': JSON.stringify($scope.CityInfoList[index]) };
            $http.post('CityInfo/Delete', data, config)
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
                    $scope.selectedDivisionInfoDD = object;
                }
            });
        }
        $scope.ClearFields = function () {
            $scope.CityInfoModel.CityId = "";
            $scope.CityInfoModel.CityNm = "";
            $scope.CityInfoModel.CityShortNm = "";
            $scope.CityInfoModel.DivisionId = "";
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