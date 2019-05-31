(function () {
    'use strict';

    angular.module('mTakaAPP.pages.ManagerAccProfile')
        .controller('ManagerAccProfileCtrl', ManagerAccProfileCtrl);

    function ManagerAccProfileCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
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


        $scope.ManModel = {};
        

        $scope.SubmitBtn = "Add";

        $scope.open = open;
        $scope.opened = false;
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.options = {
            showWeeks: false
        };

        function open() {
            $scope.opened = true;
        }

        //New Date
        $scope.dpOpenStatus = {};

        $scope.setDpOpenStatus = function (id) {
            $scope.dpOpenStatus[id] = true
        };

        //DOJ
        $scope.dpOpenStatusDOJ = {};

        $scope.setDpOpenStatusDOJ = function (id) {
            $scope.dpOpenStatusDOJ[id] = true
        };

        //End New Date

        $scope.GetAddress = function () {

            $http.get('CommonService/GetAllAddress').success(function (json) {
                $scope.AddressForDD = json;
            });
        };
        $scope.GetAddress();


        $scope.GetGender = function () {

            $http.get('CommonService/GetAllGender').success(function (json) {
                $scope.ManGenderForDD = json;
            });
        };
        $scope.GetGender();

        $scope.GetManagerGroupForDD = function () {

            $http.get('ManagerCategory/GetManagerCategoryForDD').success(function (json) {
                $scope.ManGroupForDD = json;
            });
        };
        $scope.GetManagerGroupForDD();

        $scope.GetManagerTypeForDD = function () {
            $http.get('ManagerType/GetManagerTypeForDD').success(function (json) {
                $scope.ManTypeForDD = json;
            });
        };
        $scope.GetManagerTypeForDD();



        $scope.GetCountryInfoForDD = function () {
            $http.get('CountryInfo/GetCountryInfoForDD').success(function (json) {
                $scope.ManCountryForDD = json;
            });
        };
        $scope.GetCountryInfoForDD();

        $scope.GetCityInfoForDD = function () {
            $http.get('CityInfo/GetCityInfoForDD').success(function (json) {
                $scope.ManCityForDD = json;
            });
        };
        $scope.GetCityInfoForDD();

        $scope.GetDistrictInfoForDD = function () {
            $http.get('DistrictInfo/GetDistrictInfoForDD').success(function (json) {
                $scope.DistrictInfoForDD = json;
            });
        };
        $scope.GetDistrictInfoForDD();

        $scope.GetPSInfoForDD = function () {
            $http.get('PSInfo/GetPSInfoForDD').success(function (json) {
                $scope.PSInfoForDD = json;
            });
        };
        $scope.GetPSInfoForDD();

        $scope.GetAreaInfoForDD = function () {
            $http.get('AreaInfo/GetAreaInfoForDD').success(function (json) {
                $scope.AreaInfoForDD = json;
            });
        };
        $scope.GetAreaInfoForDD();

        $scope.GetDesignationInfoForDD = function () {
            $http.get('Designation/GetDesignationInfoForDD').success(function (json) {
                $scope.ManDesignationForDD = json;
            });
        };
        $scope.GetDesignationInfoForDD();

        $scope.GetDepartmentInfoForDD = function () {
            $http.get('Department/GetDepartmentInfoForDD').success(function (json) {
                $scope.ManDepartmentForDD = json;
            });
        };
        $scope.GetDepartmentInfoForDD();


        $scope.GetBranchInfoForDD = function () {
            $http.get('BranchInfo/GetBranchInfoForDD').success(function (json) {
                $scope.ManBrancForDD = json;
            });
        };
        $scope.GetBranchInfoForDD();

        $scope.loadData = function () {
            $http.get('ManagerAccProfile/Index').success(function (json) {
                $scope.ManList = json;
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
                $scope.ManModel.FunctionId = FunctionId;
                //$scope.ManModel.ManagerSystemAccount = (Math.ceil(Math.random() * 999999999999999));
                $scope.ManModel.ManGrp = $scope.ManModel.ManGrp != null ? $scope.ManModel.ManGrp.Value : null;
                $scope.ManModel.ManType = $scope.ManModel.ManType != null ? $scope.ManModel.ManType.Value : null;
                $scope.ManModel.ManDepartment = $scope.ManModel.ManDepartment != null ? $scope.ManModel.ManDepartment.Value : null;
                $scope.ManModel.ManDesignation = $scope.ManModel.ManDesignation != null ? $scope.ManModel.ManDesignation.Value : null;
                $scope.ManModel.ManPresentCountry = $scope.ManModel.ManPresentCountry != null ? $scope.ManModel.ManPresentCountry.Value : null;
                $scope.ManModel.ManPresentCity = $scope.ManModel.ManPresentCity != null ? $scope.ManModel.ManPresentCity.Value : null;
                $scope.ManModel.ManPresentDistrict = $scope.ManModel.ManPresentDistrict != null ? $scope.ManModel.ManPresentDistrict.Value : null;
                $scope.ManModel.ManPresentThana = $scope.ManModel.ManPresentThana != null ? $scope.ManModel.ManPresentThana.Value : null;
                $scope.ManModel.ManPresentArea = $scope.ManModel.ManPresentArea != null ? $scope.ManModel.ManPresentArea.Value : null;
                $scope.ManModel.ManPermanentCountry = $scope.ManModel.ManPermanentCountry != null ? $scope.ManModel.ManPermanentCountry.Value : null;
                $scope.ManModel.ManPermanentCity = $scope.ManModel.ManPermanentCity != null ? $scope.ManModel.ManPermanentCity.Value : null;
                $scope.ManModel.ManPermanentDistrict = $scope.ManModel.ManPermanentDistrict != null ? $scope.ManModel.ManPermanentDistrict.Value : null;
                $scope.ManModel.ManPermanentThana = $scope.ManModel.ManPermanentThana != null ? $scope.ManModel.ManPermanentThana.Value : null;
                $scope.ManModel.ManPermanentArea = $scope.ManModel.ManPermanentArea != null ? $scope.ManModel.ManPermanentArea.Value : null;
                $scope.ManModel.ManBranchNm = $scope.ManModel.ManBranchNm != null ? $scope.ManModel.ManBranchNm.Value : null;
                $scope.ManModel.ManGender = $scope.ManModel.ManGender != null ? $scope.ManModel.ManGender.Value : null;

                //$scope.SplitDateofBirth = $scope.ManModel.ManDOB.toString();
                //$scope.DOBmonth = ($scope.SplitDateofBirth.split(' ')[1]);
                //monthstringtonumberconvert($scope.DOBmonth);
                //$scope.DOBmonth = $scope.month;
                //$scope.DOBday = ($scope.SplitDateofBirth.split(' ')[2]);
                ////$scope.day = (parseInt($scope.day1) + 1).toString();                
                //$scope.DOByear = ($scope.SplitDateofBirth.split(' ')[3]);
                //$scope.ManModel.ManDOB = ($scope.DOBday + '-' + $scope.DOBmonth + '-' + $scope.DOByear);


                var data = { 'data': JSON.stringify($scope.ManModel) };
                $http.post('ManagerAccProfile/Create', data, config)
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
                $scope.ManModel.FunctionId = FunctionId;
                $scope.ManModel.ManGrp = $scope.ManModel.ManGrp != null ? $scope.ManModel.ManGrp.Value : null;
                $scope.ManModel.ManType = $scope.ManModel.ManType != null ? $scope.ManModel.ManType.Value : null;
                $scope.ManModel.ManDepartment = $scope.ManModel.ManDepartment != null ? $scope.ManModel.ManDepartment.Value : null;
                $scope.ManModel.ManDesignation = $scope.ManModel.ManDesignation != null ? $scope.ManModel.ManDesignation.Value : null;
                $scope.ManModel.ManPresentCountry = $scope.ManModel.ManPresentCountry != null ? $scope.ManModel.ManPresentCountry.Value : null;
                $scope.ManModel.ManPresentCity = $scope.ManModel.ManPresentCity != null ? $scope.ManModel.ManPresentCity.Value : null;
                $scope.ManModel.ManPresentDistrict = $scope.ManModel.ManPresentDistrict != null ? $scope.ManModel.ManPresentDistrict.Value : null;
                $scope.ManModel.ManPresentThana = $scope.ManModel.ManPresentThana != null ? $scope.ManModel.ManPresentThana.Value : null;
                $scope.ManModel.ManPresentArea = $scope.ManModel.ManPresentArea != null ? $scope.ManModel.ManPresentArea.Value : null;
                $scope.ManModel.ManPermanentCountry = $scope.ManModel.ManPermanentCountry != null ? $scope.ManModel.ManPermanentCountry.Value : null;
                $scope.ManModel.ManPermanentCity = $scope.ManModel.ManPermanentCity != null ? $scope.ManModel.ManPermanentCity.Value : null;
                $scope.ManModel.ManPermanentDistrict = $scope.ManModel.ManPermanentDistrict != null ? $scope.ManModel.ManPermanentDistrict.Value : null;
                $scope.ManModel.ManPermanentThana = $scope.ManModel.ManPermanentThana != null ? $scope.ManModel.ManPermanentThana.Value : null;
                $scope.ManModel.ManPermanentArea = $scope.ManModel.ManPermanentArea != null ? $scope.ManModel.ManPermanentArea.Value : null;
                $scope.ManModel.ManBranchNm = $scope.ManModel.ManBranchNm != null ? $scope.ManModel.ManBranchNm.Value : null;
                $scope.ManModel.ManGender = $scope.ManModel.ManGender != null ? $scope.ManModel.ManGender.Value : null;
                var data = { 'data': JSON.stringify($scope.ManModel) };
                $http.post('ManagerAccProfile/Edit', data, config)
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

        $scope.changeManager = function (index) {
            var data = $scope.ManList[index];
            $scope.ManModel.ManId = data.ManId;
            $scope.ManModel.ManNm = data.ManNm;
            $scope.ManModel.ManFatherNm = data.ManFatherNm;
            $scope.ManModel.ManMotherNm = data.ManMotherNm;
            $scope.ManModel.ManBranchNm = data.ManBranchNm;

            $scope.ManModel.ManDOB = new Date(data.ManDOB);
            $scope.ManModel.ManDOJ = new Date(data.ManDOJ);
            $scope.ManModel.ManNationalId = data.ManNationalId;

            $scope.ManModel.ManPassport = data.ManPassport;
            $scope.ManModel.WalletAccountNo = data.WalletAccountNo;
            $scope.ManModel.Others = data.Others;
            $scope.ManModel.ManPresentAddress1 = data.ManPresentAddress1;
            $scope.ManModel.ManPresentAddress2 = data.ManPresentAddress2;
            $scope.ManModel.ManPresentPhone = data.ManPresentPhone;
            $scope.ManModel.ManPermanentAddress1 = data.ManPermanentAddress1;
            $scope.ManModel.ManPermanentAddress2 = data.ManPermanentAddress2;
            $scope.ManModel.ManPermanentPhone = data.ManPermanentPhone;
            $scope.ManModel.ManEmpId = data.ManEmpId;
            $scope.ManModel.ManPowerOfAttorney = data.ManPowerOfAttorney;
            $scope.ManModel.ManTaxIdNo = data.ManTaxIdNo;
            $scope.ManModel.ManOfficePhone = data.ManOfficePhone;
            $scope.ManModel.ManFax = data.ManFax;
            $scope.ManModel.ManEmail = data.ManEmail;
            $scope.ManModel.ManCell = data.ManCell;

            //DropDown
            accessArrayOfJsonObjectByKeyValueManGroup($scope.ManGroupForDD, data.ManGrp);
            $scope.ManModel.ManGrp = $scope.selecteManGroupForDD;

            accessArrayOfJsonObjectByKeyValueManType($scope.ManTypeForDD, data.ManType);
            $scope.ManModel.ManType = $scope.selecteManTypeForDD;

            accessArrayOfJsonObjectByKeyValueBranch($scope.ManBrancForDD, data.ManBranchNm);
            $scope.ManModel.ManBranchNm = $scope.selecteManBrancForDD;

            accessArrayOfJsonObjectByKeyValueDepartment($scope.ManDepartmentForDD, data.ManDepartment);
            $scope.ManModel.ManDepartment = $scope.selecteManDepartmentForDD;

            accessArrayOfJsonObjectByKeyValueDesignation($scope.ManDesignationForDD, data.ManDesignation);
            $scope.ManModel.ManDesignation = $scope.selecteManDesignationForDD;

            accessArrayOfJsonObjectByKeyValueGender($scope.ManGenderForDD, data.ManGender);
            $scope.ManModel.ManGender = $scope.selecteManGenderForDD;



            accessArrayOfJsonObjectByKeyValueCountry($scope.ManCountryForDD, data.ManPresentCountry);
            $scope.ManModel.ManPresentCountry = $scope.selecteCountryDD;

            accessArrayOfJsonObjectByKeyValueCity($scope.ManCityForDD, data.ManPresentCity);
            $scope.ManModel.ManPresentCity = $scope.selecteCityForDD;

            accessArrayOfJsonObjectByKeyValueDistrict($scope.DistrictInfoForDD, data.ManPresentDistrict);
            $scope.ManModel.ManPresentDistrict = $scope.selecteDistrictInfoForDD;

            accessArrayOfJsonObjectByKeyValueThana($scope.PSInfoForDD, data.ManPresentThana);
            $scope.ManModel.ManPresentThana = $scope.selecteThanaForDD;

            accessArrayOfJsonObjectByKeyValueArea($scope.AreaInfoForDD, data.ManPresentArea);
            $scope.ManModel.ManPresentArea = $scope.selecteAreaForDD;
            //Permanent Address

            accessArrayOfJsonObjectByKeyValueCountry($scope.ManCountryForDD, data.ManPermanentCountry);
            $scope.ManModel.ManPermanentCountry = $scope.selecteCountryDD;

            accessArrayOfJsonObjectByKeyValueCity($scope.ManCityForDD, data.ManPermanentCity);
            $scope.ManModel.ManPermanentCity = $scope.selecteCityForDD;

            accessArrayOfJsonObjectByKeyValueDistrict($scope.DistrictInfoForDD, data.ManPermanentDistrict);
            $scope.ManModel.ManPermanentDistrict = $scope.selecteDistrictInfoForDD;

            accessArrayOfJsonObjectByKeyValueThana($scope.PSInfoForDD, data.ManPermanentThana);
            $scope.ManModel.ManPermanentThana = $scope.selecteThanaForDD;

            accessArrayOfJsonObjectByKeyValueArea($scope.AreaInfoForDD, data.ManPermanentArea);
            $scope.ManModel.ManPermanentArea = $scope.selecteAreaForDD;

            $scope.SubmitBtn = "Update";
            
        };

        //DropDown
        function accessArrayOfJsonObjectByKeyValueManGroup(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteManGroupForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueManType(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteManTypeForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueBranch(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteManBrancForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueDepartment(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteManDepartmentForDD = object;
                }
            });
        }


        function accessArrayOfJsonObjectByKeyValueDesignation(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteManDesignationForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueGender(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteManGenderForDD = object;
                }
            });
        }



        //DD Address
        function accessArrayOfJsonObjectByKeyValueCountry(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteCountryDD = object;
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

        function accessArrayOfJsonObjectByKeyValueThana(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteThanaForDD = object;
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

        function monthstringtonumberconvert(month) {
            switch (month) {
                case "Jan": month = "01"; break;
                case "Feb": month = "02"; break;
                case "Mar": month = "03"; break;
                case "Apr": month = "04"; break;
                case "May": month = "05"; break;
                case "Jun": month = "06"; break;
                case "Jul": month = "07"; break;
                case "Aug": month = "08"; break;
                case "Sep": month = "09"; break;
                case "Oct": month = "10"; break;
                case "Nov": month = "11"; break;
                case "Dec": month = "12"; break;
            }
            $scope.month = month;
        }


        //**CLEAR**//
        $scope.ClearFields = function () {
            $scope.ManModel.ManGrp = "";
            $scope.ManModel.ManGrp = "";
            $scope.ManModel.ManDepartment = "";
            $scope.ManModel.ManDesignation = "";
            $scope.ManModel.ManPresentCountry = "";
            $scope.ManModel.ManPresentCity = "";
            $scope.ManModel.ManPresentDistrict = "";
            $scope.ManModel.ManPresentThana = "";
            $scope.ManModel.ManPresentArea = "";
            $scope.ManModel.ManPermanentCountry = "";
            $scope.ManModel.ManPermanentCity = "";
            $scope.ManModel.ManPermanentDistrict = "";
            $scope.ManModel.ManPermanentThana = "";
            $scope.ManModel.ManPermanentArea = "";

            $scope.ManModel.ManNm = "";
            $scope.ManModel.ManFatherNm = "";
            $scope.ManModel.ManMotherNm = "";
            $scope.ManModel.ManBranchNm = "";
            $scope.ManModel.ManDOB = "";
            $scope.ManModel.ManDOJ = "";
            $scope.ManModel.ManGender = "";
            $scope.ManModel.ManPassport = "";
            $scope.ManModel.Others = "";
            $scope.ManModel.ManPresentAddress1 = "";
            $scope.ManModel.ManPresentAddress2 = "";
            $scope.ManModel.ManPresentPhone = "";
            $scope.ManModel.ManPermanentAddress1 = "";
            $scope.ManModel.ManPermanentAddress2 = "";

            $scope.ManModel.WalletAccountNo = "";
            $scope.ManModel.ManPermanentPhone = "";
            $scope.ManModel.ManEmpId = "";
            $scope.ManModel.ManPowerOfAttorney = "";
            $scope.ManModel.ManTaxIdNo = "";
            $scope.ManModel.ManOfficePhone = "";
            $scope.ManModel.ManFax = "";
            $scope.ManModel.ManEmail = "";
            $scope.ManModel.ManCell = "";
            $scope.ManModel.ManNationalId = "";
           
            $scope.loadData();
            $scope.SubmitBtn = "Add";
        };

        $scope.ViewManager = function (index) {
            var data = { 'data': JSON.stringify($scope.ManList[index]) };
            alert("Hello, This is: " + index.ManNm);
        }

        $scope.showSuccessMsg = function (_Msg) {
            toastr.success(_Msg);
        };
        $scope.showErrorMsg = function (_Msg) {
            toastr.error(_Msg);
        };
    }
})();
