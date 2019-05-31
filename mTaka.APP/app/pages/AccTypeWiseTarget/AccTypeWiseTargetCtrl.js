(function () {
    'use strict';

    angular.module('mTakaAPP.pages.AccTypeWiseTarget')
        .controller('AccTypeWiseTargetCtrl', AccTypeWiseTargetCtrl);

    function AccTypeWiseTargetCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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

        $scope.AccTypeWiseTargetModel = {};

        $scope.AccTypeWiseTargetModel.FunctionId = FunctionId;
        $scope.AccTypeWiseTargetModel.UserName = $rootScope.UserName;

        $scope.AccTypeWiseTargetModel.AccCategoryId = null;
        $scope.SubmitBtn = "Add";

        $scope.GetCreateInfoForAccTypeWiseTarget = function () {
            $http.get('AccTypeWiseTarget/Create').success(function (json) {
                $scope.AccTypeWiseTargetModel = json;
                $scope.AccCategoryForDD = $scope.AccTypeWiseTargetModel.AccCategoryDD;
            });
        };
        $scope.GetCreateInfoForAccTypeWiseTarget();

        $scope.GetAccCategoryForDD = function () {
            $http.get('AccCategory/GetAccCategoryForDD').success(function (json) {
                $scope.AccCategoryForDD = json;

            });
        };
        $scope.GetAccCategoryForDD();

        $scope.GetAccTypeForDD = function () {
            $http.get('AccType/GetAccTypeForDD').success(function (json) {
                debugger;
                $scope.AccTypeForDD = json;
            });
        };
        $scope.GetAccTypeForDD();

        $scope.GetDefineServiceForDD = function () {
            $http.get('DefineService/GetDefineServiceForDD').success(function (json) {
                $scope.ServiceForDD = json;
            });
        };
        $scope.GetDefineServiceForDD();

        $scope.GetCalenderPeriodForDD = function () {

            $http.get('ChargeRule/GetCalenderPeriodForDD').success(function (json) {
                $scope.CalenderPeriodForDD = json;
            });
        };
        $scope.GetCalenderPeriodForDD();

        $scope.GetAllTransTypeForDD = function () {

            $http.post('CommonService/GetAllTransType').success(function (json) {
                $scope.TransTypeForDD = json;
            });
        };
        $scope.GetAllTransTypeForDD();

        $scope.GetDistrictInfoForDD = function () {
            $http.get('DistrictInfo/GetDistrictInfoForDD').success(function (json) {
                $scope.DistrictInfoForDD = json;
            });
        };
        $scope.GetDistrictInfoForDD();

        $scope.GetAreaInfoForDD = function () {
            $http.get('AreaInfo/GetAreaInfoForDD').success(function (json) {
                $scope.AreaInfoForDD = json;
            });
        };
        $scope.GetAreaInfoForDD();

        $scope.loadData = function () {
            $http.get('AccTypeWiseTarget/Index').success(function (json) {
                $scope.AccTypeWiseTargetList = json;
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
                debugger;
                $scope.AccTypeWiseTargetModel.AccCategoryId = $scope.AccTypeWiseTargetModel.AccCategoryId != null ? $scope.AccTypeWiseTargetModel.AccCategoryId.Value : null;
                $scope.AccTypeWiseTargetModel.AccTypeId = $scope.AccTypeWiseTargetModel.AccTypeId != null ? $scope.AccTypeWiseTargetModel.AccTypeId.Value : null;
                $scope.AccTypeWiseTargetModel.DefineServiceId = $scope.AccTypeWiseTargetModel.DefineServiceId != null ? $scope.AccTypeWiseTargetModel.DefineServiceId.Value : null;
                $scope.AccTypeWiseTargetModel.CalenderPrdId = $scope.AccTypeWiseTargetModel.CalenderPrdId != null ? $scope.AccTypeWiseTargetModel.CalenderPrdId.Value : null;
                $scope.AccTypeWiseTargetModel.TransTypeSlId = $scope.AccTypeWiseTargetModel.TransTypeSlId != null ? $scope.AccTypeWiseTargetModel.TransTypeSlId.Value : null;
                $scope.AccTypeWiseTargetModel.District = $scope.AccTypeWiseTargetModel.District != null ? $scope.AccTypeWiseTargetModel.District.Value : null;
                $scope.AccTypeWiseTargetModel.Area = $scope.AccTypeWiseTargetModel.Area != null ? $scope.AccTypeWiseTargetModel.Area.Value : null;
                var data = { 'data': JSON.stringify($scope.AccTypeWiseTargetModel) };
                $http.post('AccTypeWiseTarget/Create', data, config)
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
                $scope.AccTypeWiseTargetModel.FunctionId = FunctionId;
                var dataHasNotChanged = angular.equals($scope.originalData, $scope.AccTypeWiseTargetModel);
                if (dataHasNotChanged) {
                    $scope.showErrorMsg("No data has been modified");
                    return;
                }      

                $scope.AccTypeWiseTargetModel.AccCategoryId = $scope.AccTypeWiseTargetModel.AccCategoryId != null ? $scope.AccTypeWiseTargetModel.AccCategoryId.Value : null;
                var data = { 'data': JSON.stringify($scope.AccTypeWiseTargetModel) };
                $http.post('AccTypeWiseTarget/Edit', data, config)
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
        $scope.changeAccTypeWiseTarget = function (index) {
            debugger;
            var data = $scope.AccTypeWiseTargetList[index];
            $scope.AccTypeWiseTargetModel = angular.copy(data);

            accessArrayOfJsonObjectByKeyValue($scope.AccCategoryForDD, data.AccCategoryId);
            $scope.AccTypeWiseTargetModel.AccCategoryId = $scope.selectedAccCategoryDD;

            accessArrayOfJsonObjectByKeyValueAccType($scope.AccTypeForDD, data.AccTypeId);
            $scope.AccTypeWiseTargetModel.AccTypeId = $scope.selectedAccTypeForDD;

            accessArrayOfJsonObjectByKeyValueService($scope.ServiceForDD, data.DefineServiceId);
            $scope.AccTypeWiseTargetModel.DefineServiceId = $scope.selectedServiceForDD;

            accessArrayOfJsonObjectByKeyValueFrequency($scope.CalenderPeriodForDD, data.CalenderPrdId);
            $scope.AccTypeWiseTargetModel.CalenderPrdId = $scope.selectedFrequencyForDD;

            accessArrayOfJsonObjectByKeyValueTransType($scope.TransTypeForDD, data.TransTypeSlId);
            $scope.AccTypeWiseTargetModel.TransTypeSlId = $scope.selectedTransTypeForDD;

            accessArrayOfJsonObjectByKeyValueDictrict($scope.DistrictInfoForDD, data.District);
            $scope.AccTypeWiseTargetModel.District = $scope.selectedDistrictInfoForDD;

            accessArrayOfJsonObjectByKeyValueArea($scope.AreaInfoForDD, data.Area);
            $scope.AccTypeWiseTargetModel.Area = $scope.selectedAreaInfoForDD;

            $scope.originalData = angular.copy($scope.AccTypeWiseTargetModel);
            $scope.SubmitBtn = "Update";
        };

        function accessArrayOfJsonObjectByKeyValue(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedAccCategoryDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueAccType(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedAccTypeForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueService(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedServiceForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueFrequency(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedFrequencyForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueTransType(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedTransTypeForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueDictrict(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedDistrictInfoForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueArea(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedAreaInfoForDD = object;
                }
            });
        }

        $scope.deleteAccTypeWiseTarget = function (index) {
            var data = { 'data': JSON.stringify($scope.AccTypeWiseTargetList[index]) };
            $http.post('AccTypeWiseTarget/Delete', data, config)
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
            $scope.AccTypeWiseTargetModel.TargetSlNo = "";
            $scope.AccTypeWiseTargetModel.AccCategoryId = "";
            $scope.AccTypeWiseTargetModel.AccTypeId = "";
            $scope.AccTypeWiseTargetModel.DefineServiceId = "";
            $scope.AccTypeWiseTargetModel.CalenderPrdId = "";
            $scope.AccTypeWiseTargetModel.TransTypeSlId = "";
            $scope.AccTypeWiseTargetModel.Amount = "";
            $scope.AccTypeWiseTargetModel.District = "";
            $scope.AccTypeWiseTargetModel.Area = "";
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