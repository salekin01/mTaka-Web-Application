(function () {
    'use strict';

    angular.module('mTakaAPP.pages.UpazilaInfo')
        .controller('UpazilaInfoCtrl', UpazilaInfoCtrl);

    function UpazilaInfoCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
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

        $scope.UpazilaInfoModel = {};
        $scope.UpazilaInfoModel.DistrictId = null;
        $scope.SubmitBtn = "Add";
        $scope.GetDistrictInfoForDD = function () {
            $http.get('DistrictInfo/GetDistrictInfoForDD').success(function (json) {
                $scope.DistrictInfoForDD = json;
            });
        };
        $scope.GetDistrictInfoForDD();

        $scope.loadData = function () {
            $http.get('UpazilaInfo/Index').success(function (json) {
                $scope.UpazilaInfoList = json;
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
                $scope.UpazilaInfoModel.FunctionId = FunctionId;
                $scope.UpazilaInfoModel.DistrictId = $scope.UpazilaInfoModel.DistrictId.Value;
                var data = { 'data': JSON.stringify($scope.UpazilaInfoModel) };
                $http.post('UpazilaInfo/Create', data, config)
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
                $scope.UpazilaInfoModel.FunctionId = FunctionId;
                $scope.UpazilaInfoModel.DistrictId = $scope.UpazilaInfoModel.DistrictId.Value;
                var data = { 'data': JSON.stringify($scope.UpazilaInfoModel) };
                $http.post('UpazilaInfo/Edit', data, config)
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
        $scope.changeUpazilaInfo = function (index) {
            var data = $scope.UpazilaInfoList[index];
            $scope.UpazilaInfoModel.UpazilaId = data.UpazilaId;
            $scope.UpazilaInfoModel.UpazilaNm = data.UpazilaNm;
            $scope.UpazilaInfoModel.UpazilaShortNm = data.UpazilaShortNm;
            accessArrayOfJsonObjectByKeyValue($scope.DistrictInfoForDD, data.DistrictId);
            $scope.UpazilaInfoModel.DistrictId = $scope.selectedDistrictInfoDD;
            $scope.SubmitBtn = "Update";
        };
        $scope.deleteUpazilaInfo = function (index) {
            var data = { 'data': JSON.stringify($scope.UpazilaInfoList[index]) };
            $http.post('UpazilaInfo/Delete', data, config)
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
                    $scope.selectedDistrictInfoDD = object;
                }
            });
        }
        $scope.ClearFields = function () {
            $scope.UpazilaInfoModel.UpazilaId = "";
            $scope.UpazilaInfoModel.UpazilaNm = "";
            $scope.UpazilaInfoModel.UpazilaShortNm = "";
            $scope.UpazilaInfoModel.DistrictId = "";
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