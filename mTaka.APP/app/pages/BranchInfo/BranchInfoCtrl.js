(function () {
    'use strict';

    angular.module('mTakaAPP.pages.BranchInfo')
        .controller('BranchInfoCtrl', BranchInfoCtrl);

    function BranchInfoCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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

        $scope.BranchInfoModel = {};
        $scope.BranchInfoModel.CurrencyId = null;
        $scope.BranchInfoModel.CityId = null;
        $scope.BranchInfoModel.DistrictId = null;
        $scope.BranchInfoModel.DivisionId = null;
        $scope.BranchInfoModel.CountryId = null;
        $scope.BranchInfoModel.PoliceStationId = null;

        $scope.BranchInfoModel.FunctionId = FunctionId;
        $scope.BranchInfoModel.UserName = $rootScope.UserName;

        $scope.SubmitBtn = "Add";
        $scope.GetCurrencyInfoForDD = function () {
            $http.get('CurrencyInfo/GetCurrencyInfoForDD').success(function (json) {
                $scope.CurrencyInfoForDD = json;
            });
        };
        $scope.GetCurrencyInfoForDD();

        $scope.GetCityInfoForDD = function () {
            $http.get('CityInfo/GetCityInfoForDD').success(function (json) {
                $scope.CityInfoForDD = json;
            });
        };
        $scope.GetCityInfoForDD();

        $scope.GetDistrictInfoForDD = function () {
            $http.get('DistrictInfo/GetDistrictInfoForDD').success(function (json) {
                $scope.DistrictInfoForDD = json;
            });
        };
        $scope.GetDistrictInfoForDD();

        $scope.GetDivisionInfoForDD = function () {
            $http.get('DivisionInfo/GetDivisionInfoForDD').success(function (json) {
                $scope.DivisionInfoForDD = json;
            });
        };
        $scope.GetDivisionInfoForDD();

        $scope.GetCountryInfoForDD = function () {
            $http.get('CountryInfo/GetCountryInfoForDD').success(function (json) {
                $scope.CountryInfoForDD = json;
            });
        };
        $scope.GetCountryInfoForDD();

        $scope.GetPSInfoForDD = function () {
            $http.get('PSInfo/GetPSInfoForDD').success(function (json) {
                $scope.PSInfoForDD = json;
            });
        };
        $scope.GetPSInfoForDD();

        $scope.loadData = function () {
            $http.get('BranchInfo/Index').success(function (json) {
                $scope.BranchInfoList = json;
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
                $scope.BranchInfoModel.FunctionId = FunctionId;
                $scope.BranchInfoModel.CurrencyId = $scope.BranchInfoModel.CurrencyId.Value;
                $scope.BranchInfoModel.CityId = $scope.BranchInfoModel.CityId.Value;
                $scope.BranchInfoModel.DistrictId = $scope.BranchInfoModel.DistrictId.Value;
                $scope.BranchInfoModel.DivisionId = $scope.BranchInfoModel.DivisionId.Value;
                $scope.BranchInfoModel.CountryId = $scope.BranchInfoModel.CountryId.Value;
                $scope.BranchInfoModel.PoliceStationId = $scope.BranchInfoModel.PoliceStationId.Value;
                var data = { 'data': JSON.stringify($scope.BranchInfoModel) };
                $http.post('BranchInfo/Create', data, config)
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
                $scope.BranchInfoModel.FunctionId = FunctionId;
                $scope.BranchInfoModel.CurrencyId = $scope.BranchInfoModel.CurrencyId.Value;
                $scope.BranchInfoModel.CityId = $scope.BranchInfoModel.CityId.Value;
                $scope.BranchInfoModel.DistrictId = $scope.BranchInfoModel.DistrictId.Value;
                $scope.BranchInfoModel.DivisionId = $scope.BranchInfoModel.DivisionId.Value;
                $scope.BranchInfoModel.CountryId = $scope.BranchInfoModel.CountryId.Value;
                $scope.BranchInfoModel.PoliceStationId = $scope.BranchInfoModel.PoliceStationId.Value;
                var data = { 'data': JSON.stringify($scope.BranchInfoModel) };
                $http.post('BranchInfo/Edit', data, config)
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
        $scope.changeBranchInfo = function (index) {
            var data = $scope.BranchInfoList[index];
            $scope.BranchInfoModel.BranchId = data.BranchId;
            $scope.BranchInfoModel.BranchNm = data.BranchNm;
            $scope.BranchInfoModel.BranchShortNm = data.BranchShortNm;
            accessArrayOfJsonObjectByKeyValueCurrency($scope.CurrencyInfoForDD, data.CurrencyId);
            $scope.BranchInfoModel.CurrencyId = $scope.selectedCurrencyInfoDD;
            $scope.BranchInfoModel.BranchClosedFlag = data.BranchClosedFlag;
            $scope.BranchInfoModel.BranchGrade = data.BranchGrade;
            $scope.BranchInfoModel.BranchClosedDate = data.BranchClosedDate;
            $scope.BranchInfoModel.BranchIdCBClearing = data.BranchIdCBClearing;
            $scope.BranchInfoModel.BranchIdCBCL = data.BranchIdCBCL;
            $scope.BranchInfoModel.BranchIdCBSBS = data.BranchIdCBSBS;
            $scope.BranchInfoModel.BranchIdCBCIB = data.BranchIdCBCIB;
            $scope.BranchInfoModel.BranchIdCBADFX = data.BranchIdCBADFX;
            $scope.BranchInfoModel.BranchIdCBCTR = data.BranchIdCBCTR;
            $scope.BranchInfoModel.ControllingBRCSHFlag = data.ControllingBRCSHFlag;
            $scope.BranchInfoModel.ControllingBRCLGFlag = data.ControllingBRCLGFlag;
            $scope.BranchInfoModel.RuralBranchFlag = data.RuralBranchFlag;
            $scope.BranchInfoModel.UrbanBranchFlag = data.UrbanBranchFlag;
            $scope.BranchInfoModel.InsuranceVaultCashFlag = data.InsuranceVaultCashFlag;
            $scope.BranchInfoModel.InsuranceTransitCashFlag = data.InsuranceTransitCashFlag;
            $scope.BranchInfoModel.Address1 = data.Address1;
            $scope.BranchInfoModel.Address2 = data.Address2;
            accessArrayOfJsonObjectByKeyValueCity($scope.CityInfoForDD, data.CityId);
            $scope.BranchInfoModel.CityId = $scope.selectedCityInfoDD;
            accessArrayOfJsonObjectByKeyValueDistrict($scope.DistrictInfoForDD, data.DistrictId);
            $scope.BranchInfoModel.DistrictId = $scope.selectedDistrictInfoDD;
            accessArrayOfJsonObjectByKeyValueDivision($scope.DivisionInfoForDD, data.DivisionId);
            $scope.BranchInfoModel.DivisionId = $scope.selectedDivisionInfoDD;
            accessArrayOfJsonObjectByKeyValueCountry($scope.CountryInfoForDD, data.CountryId);
            $scope.BranchInfoModel.CountryId = $scope.selectedCountryInfoDD;
            accessArrayOfJsonObjectByKeyValuePS($scope.PSInfoForDD, data.PoliceStationId);
            $scope.BranchInfoModel.PoliceStationId = $scope.selectedPSInfoDD;
            $scope.BranchInfoModel.Phone = data.Phone;
            $scope.BranchInfoModel.FAX = data.FAX;
            $scope.BranchInfoModel.TELEX = data.TELEX;
            $scope.BranchInfoModel.SWIFT = data.SWIFT;
            $scope.BranchInfoModel.Email = data.Email;
            $scope.BranchInfoModel.ZipCode = data.ZipCode;
            $scope.SubmitBtn = "Update";
        };
        $scope.deleteBranchInfo = function (index) {
            var data = { 'data': JSON.stringify($scope.BranchInfoList[index]) };
            $http.post('BranchInfo/Delete', data, config)
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
        function accessArrayOfJsonObjectByKeyValueCurrency(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedCurrencyInfoDD = object;
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
        function accessArrayOfJsonObjectByKeyValueDistrict(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedDistrictInfoDD = object;
                }
            });
        }
        function accessArrayOfJsonObjectByKeyValueDivision(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedDivisionInfoDD = object;
                }
            });
        }
        function accessArrayOfJsonObjectByKeyValueCountry(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedCountryInfoDD = object;
                }
            });
        }
        function accessArrayOfJsonObjectByKeyValuePS(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedPSInfoDD = object;
                }
            });
        }
        $scope.ClearFields = function () {
            $scope.BranchInfoModel.BranchId = "";
            $scope.BranchInfoModel.BranchNm = "";
            $scope.BranchInfoModel.BranchShortNm = "";
            $scope.BranchInfoModel.CurrencyId = "";
            $scope.BranchInfoModel.BranchClosedFlag = "";
            $scope.BranchInfoModel.BranchGrade = "";
            $scope.BranchInfoModel.BranchClosedDate = "";
            $scope.BranchInfoModel.BranchIdCBClearing = "";
            $scope.BranchInfoModel.BranchIdCBCL = "";
            $scope.BranchInfoModel.BranchIdCBSBS = "";
            $scope.BranchInfoModel.BranchIdCBCIB = "";
            $scope.BranchInfoModel.BranchIdCBADFX = "";
            $scope.BranchInfoModel.BranchIdCBCTR = "";
            $scope.BranchInfoModel.ControllingBRCSHFlag = "";
            $scope.BranchInfoModel.ControllingBRCLGFlag = "";
            $scope.BranchInfoModel.RuralBranchFlag = "";
            $scope.BranchInfoModel.UrbanBranchFlag = "";
            $scope.BranchInfoModel.InsuranceVaultCashFlag = "";
            $scope.BranchInfoModel.InsuranceTransitCashFlag = "";
            $scope.BranchInfoModel.Address1 = "";
            $scope.BranchInfoModel.Address2 = "";
            $scope.BranchInfoModel.CityId = "";
            $scope.BranchInfoModel.DistrictId = "";
            $scope.BranchInfoModel.DivisionId = "";
            $scope.BranchInfoModel.CountryId = "";
            $scope.BranchInfoModel.PoliceStationId = "";
            $scope.BranchInfoModel.Phone = "";
            $scope.BranchInfoModel.FAX = "";
            $scope.BranchInfoModel.TELEX = "";
            $scope.BranchInfoModel.SWIFT = "";
            $scope.BranchInfoModel.Email = "";
            $scope.BranchInfoModel.ZipCode = "";
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