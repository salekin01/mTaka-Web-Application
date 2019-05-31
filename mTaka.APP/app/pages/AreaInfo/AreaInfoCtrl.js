(function () {
    'use strict';

    angular.module('mTakaAPP.pages.AreaInfo')
        .controller('AreaInfoCtrl', AreaInfoCtrl);

    function AreaInfoCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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

        $scope.AreaInfoModel = {};
        $scope.AreaInfoModel.UpazilaId = null;
        $scope.AreaInfoModel.CityId = null;

        $scope.AreaInfoModel.FunctionId = FunctionId;
        $scope.AreaInfoModel.UserName = $rootScope.UserName;


        $scope.SubmitBtn = "Add";
        $scope.GetUpazilaInfoForDD = function () {
            $http.get('UpazilaInfo/GetUpazilaInfoForDD').success(function (json) {
                $scope.UpazilaInfoForDD = json;
            });
        };
        $scope.GetUpazilaInfoForDD();

        $scope.GetCityInfoForDD = function () {
            $http.get('CityInfo/GetCityInfoForDD').success(function (json) {
                $scope.CityInfoForDD = json;
            });
        };
        $scope.GetCityInfoForDD();

        $scope.loadData = function () {
            $http.get('AreaInfo/Index').success(function (json) {
                $scope.AreaInfoList = json;
            });
        };
        $scope.loadData();

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        $scope.addData = function () {
            debugger;
            if ($scope.SubmitBtn === "Add") {
                $scope.AreaInfoModel.FunctionId = FunctionId;
                $scope.AreaInfoModel.UpazilaId = $scope.AreaInfoModel.UpazilaId.Value;
                $scope.AreaInfoModel.CityId = $scope.AreaInfoModel.CityId.Value;
                var data = { 'data': JSON.stringify($scope.AreaInfoModel) };
                $http.post('AreaInfo/Create', data, config)
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
            else if ($scope.SubmitBtn === "Update") {
                $scope.AreaInfoModel.FunctionId = FunctionId;
                $scope.AreaInfoModel.UpazilaId = $scope.AreaInfoModel.UpazilaId.Value;
                $scope.AreaInfoModel.CityId = $scope.AreaInfoModel.CityId.Value;
                var data = { 'data': JSON.stringify($scope.AreaInfoModel) };
                $http.post('AreaInfo/Edit', data, config)
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
        $scope.changeAreaInfo = function (index) {
            var data = $scope.AreaInfoList[index];
            $scope.AreaInfoModel.AreaId = data.AreaId;
            $scope.AreaInfoModel.AreaNm = data.AreaNm;
            $scope.AreaInfoModel.AreaShortNm = data.AreaShortNm;
            accessArrayOfJsonObjectByKeyValueUpazila($scope.UpazilaInfoForDD, data.UpazilaId);
            $scope.AreaInfoModel.UpazilaId = $scope.selectedUpazilaInfoDD;
            accessArrayOfJsonObjectByKeyValueCity($scope.CityInfoForDD, data.CityId);
            $scope.AreaInfoModel.CityId = $scope.selectedCityInfoDD;
            $scope.SubmitBtn = "Update";
        };
        $scope.deleteAreaInfo = function (index) {
            var data = { 'data': JSON.stringify($scope.AreaInfoList[index]) };
            $http.post('AreaInfo/Delete', data, config)
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
        function accessArrayOfJsonObjectByKeyValueUpazila(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedUpazilaInfoDD = object;
                }
            });
        }
        function accessArrayOfJsonObjectByKeyValueCity(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedCityInfoDD = object;
                }
            });
        }
        $scope.ClearFields = function () {
            $scope.AreaInfoModel.AreaId = "";
            $scope.AreaInfoModel.AreaNm = "";
            $scope.AreaInfoModel.AreaShortNm = "";
            $scope.AreaInfoModel.UpazilaId = "";
            $scope.AreaInfoModel.CityId = "";
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