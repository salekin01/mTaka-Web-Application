(function () {
    'use strict';

    angular.module('mTakaAPP.pages.DistrictInfo')
        .controller('DistrictInfoCtrl', DistrictInfoCtrl);

    function DistrictInfoCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
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

        $scope.DistrictInfoModel = {};
        $scope.DistrictInfoModel.DivisionId = null;

        $scope.DistrictInfoModel.FunctionId = FunctionId;
        $scope.DistrictInfoModel.UserName = $rootScope.UserName;


        $scope.SubmitBtn = "Add";
        $scope.GetDivisionInfoForDD = function () {
            $http.get('DivisionInfo/GetDivisionInfoForDD').success(function (json) {
                $scope.DivisionInfoForDD = json;
            });
        };
        $scope.GetDivisionInfoForDD();

        $scope.loadData = function () {
            $http.get('DistrictInfo/Index').success(function (json) {
                $scope.DistrictInfoList = json;
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
                $scope.DistrictInfoModel.FunctionId = FunctionId;
                $scope.DistrictInfoModel.DivisionId = $scope.DistrictInfoModel.DivisionId.Value;
                var data = { 'data': JSON.stringify($scope.DistrictInfoModel) };
                $http.post('DistrictInfo/Create', data, config)
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
                $scope.DistrictInfoModel.FunctionId = FunctionId;
                $scope.DistrictInfoModel.DivisionId = $scope.DistrictInfoModel.DivisionId.Value;
                var data = { 'data': JSON.stringify($scope.DistrictInfoModel) };
                $http.post('DistrictInfo/Edit', data, config)
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
        $scope.changeDistrictInfo = function (index) {
            var data = $scope.DistrictInfoList[index];
            $scope.DistrictInfoModel.DistrictId = data.DistrictId;
            $scope.DistrictInfoModel.DistrictNm = data.DistrictNm;
            $scope.DistrictInfoModel.DistrictShortNm = data.DistrictShortNm;
            accessArrayOfJsonObjectByKeyValue($scope.DivisionInfoForDD, data.DivisionId);
            $scope.DistrictInfoModel.DivisionId = $scope.selectedDivisionInfoDD;
            $scope.SubmitBtn = "Update";
        };
        $scope.deleteDistrictInfo = function (index) {
            var data = { 'data': JSON.stringify($scope.DistrictInfoList[index]) };
            $http.post('DistrictInfo/Delete', data, config)
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
            $scope.DistrictInfoModel.DistrictId = "";
            $scope.DistrictInfoModel.DistrictNm = "";
            $scope.DistrictInfoModel.DistrictShortNm = "";
            $scope.DistrictInfoModel.DivisionId = "";
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