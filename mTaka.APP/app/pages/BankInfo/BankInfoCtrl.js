(function () {
    'use strict';

    angular.module('mTakaAPP.pages.BankInfo')
        .controller('BankInfoCtrl', BankInfoCtrl);

    function BankInfoCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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

        $scope.BankModel = {};
       
        $scope.SubmitBtn = "Add";

        $scope.BankModel.FunctionId = FunctionId;
        $scope.BankModel.UserName = $rootScope.UserName;

        

        $scope.GetCountryInfoForDD = function () {
            $http.get('CountryInfo/GetCountryInfoForDD').success(function (json) {
                $scope.CountryForDD = json;
            });
        };
        $scope.GetCountryInfoForDD();

        $scope.GetCityInfoForDD = function () {
            $http.get('CityInfo/GetCityInfoForDD').success(function (json) {
                $scope.CityForDD = json;
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
                $scope.DivisionInfForDD = json;
            });
        };
        $scope.GetDivisionInfoForDD();

        $scope.GetPSInfoForDD = function () {
            $http.get('PSInfo/GetPSInfoForDD').success(function (json) {
                $scope.PSInfoForDD = json;
            });
        };
        $scope.GetPSInfoForDD();

        $scope.GetUpazilaInfoForDD = function () {
            $http.get('UpazilaInfo/GetUpazilaInfoForDD').success(function (json) {
                $scope.UpazilaInfoForDD = json;
            });
        };
        $scope.GetUpazilaInfoForDD();

        $scope.GetUpazilaInfoForDD = function () {
            $http.get('UpazilaInfo/GetUpazilaInfoForDD').success(function (json) {
                $scope.UnionInfoForDD = json;
            });
        };
        $scope.GetUpazilaInfoForDD();

        $scope.GetAreaInfoForDD = function () {
            $http.get('AreaInfo/GetAreaInfoForDD').success(function (json) {
                $scope.AreaInfoForDD = json;
            });
        };
        $scope.GetAreaInfoForDD();

        $scope.GetPostOfficeInfoForDD = function () {
            $http.get('PostOffice/GetPostOfficeInfoForDD').success(function (json) {
                $scope.PostOfficeForDD = json;
            });
        };
        $scope.GetPostOfficeInfoForDD();

        $scope.loadData = function () {
            $http.get('BankInfo/Index').success(function (json) {
                $scope.BankInfoList = json;
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
                $scope.BankModel.FunctionId = FunctionId;
                $scope.BankModel.CountryId = $scope.BankModel.CountryId.Value;
                $scope.BankModel.DivisionId = $scope.BankModel.DivisionId.Value;
                $scope.BankModel.CityId = $scope.BankModel.CityId.Value;
                $scope.BankModel.DistrictId = $scope.BankModel.DistrictId.Value;
                $scope.BankModel.UpazilaId = $scope.BankModel.UpazilaId.Value;
                $scope.BankModel.UnionId = $scope.BankModel.UnionId.Value;
                $scope.BankModel.PSId = $scope.BankModel.PSId.Value;
                $scope.BankModel.POId = $scope.BankModel.POId.Value;
                $scope.BankModel.AreaId = $scope.BankModel.AreaId.Value;

                var data = { 'data': JSON.stringify($scope.BankModel) };
                $http.post('BankInfo/Create', data, config)
                    .then(
                    function (response) {
                        $scope.ClearFields();
                        if (response.data.Result == 1)
                            $scope.showSuccessMsg(response.data.ResponseMessage);
                        else
                            $scope.showErrorMsg(response.data.ResponseMessage);
                    }
                    );
            }

            else if ($scope.SubmitBtn === "Update") {
                    $scope.BankModel.FunctionId = FunctionId;
                    $scope.BankModel.CountryId = $scope.BankModel.CountryId.Value;
                    $scope.BankModel.DivisionId = $scope.BankModel.DivisionId.Value;
                    $scope.BankModel.CityId = $scope.BankModel.CityId.Value;
                    $scope.BankModel.DistrictId = $scope.BankModel.DistrictId.Value;
                    $scope.BankModel.UpazilaId = $scope.BankModel.UpazilaId.Value;
                    $scope.BankModel.UnionId = $scope.BankModel.UnionId.Value;
                    $scope.BankModel.PSId = $scope.BankModel.PSId.Value;
                    $scope.BankModel.POId = $scope.BankModel.POId.Value;
                    $scope.BankModel.AreaId = $scope.BankModel.AreaId.Value;
                    var data = { 'data': JSON.stringify($scope.BankModel) };
                    $http.post('BankInfo/Edit', data, config)
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
        $scope.ChangeBank = function (index) {
            var data = $scope.BankInfoList[index];
            $scope.BankModel.BankId = data.BankId;
            $scope.BankModel.BankNM = data.BankNM;
            $scope.BankModel.BankShortNM = data.BankShortNM;
            $scope.BankModel.BankReportNM = data.BankReportNM;
            $scope.BankModel.CbId = data.CbId;
            $scope.BankModel.Phone = data.Phone;
            $scope.BankModel.Fax = data.Fax;
            $scope.BankModel.Swift = data.Swift;
            $scope.BankModel.Email = data.Email;
            $scope.BankModel.Web = data.Web;
            $scope.BankModel.ContactPerson = data.ContactPerson;
            $scope.BankModel.HomeBankAppFlag = data.HomeBankAppFlag;
            $scope.BankModel.Address = data.Address;

            accessArrayOfJsonObjectByKeyValueCountry($scope.CountryForDD, data.CountryId);
            $scope.BankModel.CountryId = $scope.selecteCountryDD;

            accessArrayOfJsonObjectByKeyValueDivision($scope.DivisionInfForDD, data.DivisionId);
            $scope.BankModel.DivisionId = $scope.selecteDivisionInfForDD;

            accessArrayOfJsonObjectByKeyValueCity($scope.CityForDD, data.CityId);
            $scope.BankModel.CityId = $scope.selecteCityForDD;

            accessArrayOfJsonObjectByKeyValueDistrict($scope.DistrictInfoForDD, data.DistrictId);
            $scope.BankModel.DistrictId = $scope.selecteDistrictInfoForDD;

            accessArrayOfJsonObjectByKeyValueUpazila($scope.UpazilaInfoForDD, data.UpazilaId);
            $scope.BankModel.UpazilaId = $scope.selecteUpazilaForDD;

            accessArrayOfJsonObjectByKeyValueUnion($scope.UnionInfoForDD, data.UnionId);
            $scope.BankModel.UnionId = $scope.selecteUnionForDD;

            accessArrayOfJsonObjectByKeyValuePS($scope.PSInfoForDD, data.PSId);
            $scope.BankModel.PSId = $scope.selectePSForDD;

            accessArrayOfJsonObjectByKeyValuePO($scope.PostOfficeForDD, data.POId);
            $scope.BankModel.POId = $scope.selectePOForDD;

            accessArrayOfJsonObjectByKeyValueArea($scope.AreaInfoForDD, data.AreaId);
            $scope.BankModel.AreaId = $scope.selecteAreaForDD;


            $scope.SubmitBtn = "Update";
        };

        function accessArrayOfJsonObjectByKeyValueCountry(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteCountryDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueDivision(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteDivisionInfForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueCity(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteCityForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueDistrict(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteDistrictInfoForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueUpazila(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteUpazilaForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueUnion(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteUnionForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValuePS(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectePSForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValuePO(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectePOForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueArea(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteAreaForDD = object;
                }
            });
        }
            ////**CLEAR**//
            $scope.ClearFields = function () {
                $scope.BankModel.BankId = "";
                $scope.BankModel.BankNM = "";
                $scope.BankModel.BankShortNM = "";
                $scope.BankModel.BankReportNM = "";
                $scope.BankModel.CbId = "";

                $scope.BankModel.Address = "";
                $scope.BankModel.CountryId = "";
                $scope.BankModel.DivisionId = "";
                $scope.BankModel.CityId = "";
                $scope.BankModel.DistrictId = "";
                $scope.BankModel.UpazilaId = "";
                $scope.BankModel.UnionId = "";
                $scope.BankModel.PSId = "";
                $scope.BankModel.POId = "";
                $scope.BankModel.AreaId = "";

                $scope.BankModel.Phone = "";
                $scope.BankModel.Fax = "";
                $scope.BankModel.Swift = "";
                $scope.BankModel.Email = "";

                $scope.BankModel.Web = "";
                $scope.BankModel.ContactPerson = "";
                $scope.BankModel.HomeBankAppFlag = "";

                $scope.SubmitBtn = "Add";
            };

            $scope.DeleteBank = function (index) {
                var data = { 'data': JSON.stringify($scope.BankInfoList[index]) };
                $http.post('BankInfo/Delete', data, config)
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

            $scope.showSuccessMsg = function (_Msg) {
                toastr.success(_Msg);
            };
            $scope.showErrorMsg = function (_Msg) {
                toastr.error(_Msg);
            };
        }
})();
