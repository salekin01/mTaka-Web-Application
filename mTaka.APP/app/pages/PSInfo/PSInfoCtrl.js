(function () {
    'use strict';

    angular.module('mTakaAPP.pages.PSInfo')
        .controller('PSInfoCtrl', PSInfoCtrl);

    function PSInfoCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
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


        $scope.PSInfoModel = {};
        $scope.PSInfoModel.UpazilaId = null;
        $scope.SubmitBtn = "Add";
        $scope.GetUpazilaInfoForDD = function () {
            $http.get('UpazilaInfo/GetUpazilaInfoForDD').success(function (json) {
                $scope.UpazilaInfoForDD = json;
            });
        };
        $scope.GetUpazilaInfoForDD();

        $scope.loadData = function () {
            $http.get('PSInfo/Index').success(function (json) {
                $scope.PSInfoList = json;
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
                $scope.PSInfoModel.FunctionId = FunctionId;
                $scope.PSInfoModel.UpazilaId = $scope.PSInfoModel.UpazilaId.Value;
                var data = { 'data': JSON.stringify($scope.PSInfoModel) };
                $http.post('PSInfo/Create', data, config)
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
                $scope.PSInfoModel.UpazilaId = $scope.PSInfoModel.UpazilaId.Value;
                var data = { 'data': JSON.stringify($scope.PSInfoModel) };
                $http.post('PSInfo/Edit', data, config)
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
        $scope.changePSInfo = function (index) {
            var data = $scope.PSInfoList[index];
            $scope.PSInfoModel.PoliceStationId = data.PoliceStationId;
            $scope.PSInfoModel.PoliceStationNm = data.PoliceStationNm;
            $scope.PSInfoModel.PoliceStationShortNm = data.PoliceStationShortNm;
            accessArrayOfJsonObjectByKeyValue($scope.UpazilaInfoForDD, data.UpazilaId);
            $scope.PSInfoModel.UpazilaId = $scope.selectedUpazilaInfoDD;
            $scope.SubmitBtn = "Update";
        };
        $scope.deletePSInfo = function (index) {
            var data = { 'data': JSON.stringify($scope.PSInfoList[index]) };
            $http.post('PSInfo/Delete', data, config)
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
                    $scope.selectedUpazilaInfoDD = object;
                }
            });
        }
        $scope.ClearFields = function () {
            $scope.PSInfoModel.PoliceStationId = "";
            $scope.PSInfoModel.PoliceStationNm = "";
            $scope.PSInfoModel.PoliceStationShortNm = "";
            $scope.PSInfoModel.UpazilaId = "";
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