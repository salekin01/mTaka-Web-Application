(function () {
    'use strict';

    angular.module('mTakaAPP.pages.ChannelAccProfile')
        .controller('ChannelAccProfileCtrl', ChannelAccProfileCtrl);
    
    function ChannelAccProfileCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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

        debugger;
        $scope.ChannelAccProfileModel = {};
        ////$scope.ChannelAccProfileModel.AccountCategoryId = null;
        $scope.ChannelAccProfileModel.AccountTypeId = null;
        $scope.ChannelAccProfileModel.Gender = null;
        $scope.ChannelAccProfileModel.PresentCountryId = null;
        $scope.ChannelAccProfileModel.PresentCityId = null;
        $scope.ChannelAccProfileModel.PresentDistrictId = null;
        $scope.ChannelAccProfileModel.PresentPoliceStationId = null;
        $scope.ChannelAccProfileModel.PresentAreaId = null;
        $scope.ChannelAccProfileModel.PermanentCountryId = null;
        $scope.ChannelAccProfileModel.PermanentCityId = null;
        $scope.ChannelAccProfileModel.PermanentDistrictId = null;
        $scope.ChannelAccProfileModel.PermanentPoliceStationId = null;
        $scope.ChannelAccProfileModel.PermanentAreaId = null; 
        $scope.ChannelAccProfileModel.BankId = null;
        $scope.ChannelAccProfileModel.BranchId = null;
        $scope.ChannelAccProfileModel.ParentAccountTypeId = null;
        $scope.ChannelAccProfileModel.ParentAccountProfileId = null;
        ////$scope.ChannelAccProfileModel.ManagerTypeId = null;
        $scope.ChannelAccProfileModel.ManagerAccountProfileId = null;
        $scope.SubmitBtn = "Add";

        $scope.ChannelAccProfileModel.FunctionId = FunctionId;
        $scope.ChannelAccProfileModel.UserName = $rootScope.UserName;

        $scope.dpOpenStatus = {}; 
        $scope.setDpOpenStatus = function (id) {
            debugger;
            $scope.dpOpenStatus[id] = true
        };

        $scope.dpOpenStatus1 = {};
        $scope.setDpOpenStatus1 = function (id) {
            debugger;
            $scope.dpOpenStatus1[id] = true
        };
        
        $scope.GetAddress = function () {

            $http.get('CommonService/GetAllAddress').success(function (json) {
                $scope.AddressForDD = json;
            });
        };
        $scope.GetAddress();

        $scope.GetGender = function () {
            $http.get('CommonService/GetAllGender').success(function (json) {
                $scope.GenderForDD = json;
            });
        };
        $scope.GetGender();
        ////$scope.GetAccCategoryForDD = function () {
        ////    $http.get('AccCategory/GetAccCategoryForDD').success(function (json) {
        ////        $scope.AccCategoryForDD = json;
        ////    });
        ////};
        ////$scope.GetAccCategoryForDD();

        $scope.GetAccTypeForDD = function () {
            $http.get('AccType/GetAccTypeForDD').success(function (json) {
                $scope.AccTypeForDD = json;
            });
        };
        $scope.GetAccTypeForDD();

        $scope.GetCountryInfoForDD = function () {
            $http.get('CountryInfo/GetCountryInfoForDD').success(function (json) {
                $scope.CountryInfoForDD = json;
            });
        };
        $scope.GetCountryInfoForDD();

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

        $scope.GetBankInfoForDD = function () {             
            $http.get('BankInfo/GetBankInfoForDD').success(function (json) {
                $scope.BankInfoForDD = json;
            });
        };
        $scope.GetBankInfoForDD();

        $scope.GetBranchInfoForDD = function () {
            $http.get('BranchInfo/GetBranchInfoForDD').success(function (json) {
                $scope.BranchInfoForDD = json;
            });
        };
        $scope.GetBranchInfoForDD();

        $scope.GetChannelAccProfileForDD = function () {
            $http.get('ChannelAccProfile/GetChannelAccProfileForDD').success(function (json) {
                $scope.ChannelAccProfileForDD = json;
            });
        };
        $scope.GetChannelAccProfileForDD();       

        ////$scope.GetManagerTypeForDD = function () {
        ////    $http.get('ManagerType/GetManagerTypeForDD').success(function (json) {
        ////        $scope.ManagerTypeForDD = json;
        ////    });
        ////};
        ////$scope.GetManagerTypeForDD();

        $scope.GetManagerForDD = function () {
            $http.get('ManagerAccProfile/GetManagerForDD').success(function (json) {
                $scope.ManagerForDD = json;
            });
        };
        $scope.GetManagerForDD();

        //$scope.open = open;
        //$scope.opened = false;
        //$scope.options = {
        //    showWeeks: false
        //};
        //function open($event) {
        //    debugger;
        //    $scope.opened = true;
        //}

        //$scope.open = function ($event) {
        //    debugger;
        //    if($scope.opened) {
        //        // Prevent datepicker from closing this calendar popup
        //        $event.preventDefault();
        //        $event.stopPropagation();
        //    } else {
        //        // Delay opening until next tick, otherwise calendar popup will be immediately closed
        //        $timeout(function() {
        //            $scope.opened = true;
        //        })
        //        }
        //};
        function loadData() {
            debugger;
            $http.get('ChannelAccProfile/Index').success(function (json) {
                $scope.ChannelAccProfileList = json;
            });
        };
        loadData();

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        $scope.addData = function () {
            debugger;
            if ($scope.SubmitBtn === "Add") {
                $scope.ChannelAccProfileModel.FunctionId = FunctionId;
                //$scope.ChannelAccProfileModel.SystemAccountNo = (Math.ceil(Math.random() * 999999999999999));
                ////$scope.ChannelAccProfileModel.AccountCategoryId = $scope.ChannelAccProfileModel.AccountCategoryId != null ? $scope.ChannelAccProfileModel.AccountCategoryId.Value : null;
                $scope.ChannelAccProfileModel.AccountTypeId = $scope.ChannelAccProfileModel.AccountTypeId != null ? $scope.ChannelAccProfileModel.AccountTypeId.Value : null;
                $scope.ChannelAccProfileModel.Gender = $scope.ChannelAccProfileModel.Gender != null ? $scope.ChannelAccProfileModel.Gender.Value : null;
                $scope.ChannelAccProfileModel.PresentCountryId = $scope.ChannelAccProfileModel.PresentCountryId != null ? $scope.ChannelAccProfileModel.PresentCountryId.Value : null;
                $scope.ChannelAccProfileModel.PresentCityId = $scope.ChannelAccProfileModel.PresentCityId != null ? $scope.ChannelAccProfileModel.PresentCityId.Value : null;
                $scope.ChannelAccProfileModel.PresentDistrictId = $scope.ChannelAccProfileModel.PresentDistrictId != null ? $scope.ChannelAccProfileModel.PresentDistrictId.Value : null;
                $scope.ChannelAccProfileModel.PresentPoliceStationId = $scope.ChannelAccProfileModel.PresentPoliceStationId != null ? $scope.ChannelAccProfileModel.PresentPoliceStationId.Value : null;
                $scope.ChannelAccProfileModel.PresentAreaId = $scope.ChannelAccProfileModel.PresentAreaId != null ? $scope.ChannelAccProfileModel.PresentAreaId.Value : null;
                $scope.ChannelAccProfileModel.PermanentCountryId = $scope.ChannelAccProfileModel.PermanentCountryId != null ? $scope.ChannelAccProfileModel.PermanentCountryId.Value : null;
                $scope.ChannelAccProfileModel.PermanentCityId = $scope.ChannelAccProfileModel.PermanentCityId != null ? $scope.ChannelAccProfileModel.PermanentCityId.Value : null;
                $scope.ChannelAccProfileModel.PermanentDistrictId = $scope.ChannelAccProfileModel.PermanentDistrictId != null ? $scope.ChannelAccProfileModel.PermanentDistrictId.Value : null;
                $scope.ChannelAccProfileModel.PermanentPoliceStationId = $scope.ChannelAccProfileModel.PermanentPoliceStationId != null ? $scope.ChannelAccProfileModel.PermanentPoliceStationId.Value : null;
                $scope.ChannelAccProfileModel.PermanentAreaId = $scope.ChannelAccProfileModel.PermanentAreaId != null ? $scope.ChannelAccProfileModel.PermanentAreaId.Value : null;
                $scope.ChannelAccProfileModel.BankId = $scope.ChannelAccProfileModel.BankId != null ? $scope.ChannelAccProfileModel.BankId.Value : null;
                $scope.ChannelAccProfileModel.BranchId = $scope.ChannelAccProfileModel.BranchId != null ? $scope.ChannelAccProfileModel.BranchId.Value : null;
                $scope.ChannelAccProfileModel.ParentAccountTypeId = $scope.ChannelAccProfileModel.ParentAccountTypeId != null ? $scope.ChannelAccProfileModel.ParentAccountTypeId.Value : null;
                $scope.ChannelAccProfileModel.ParentAccountProfileId = $scope.ChannelAccProfileModel.ParentAccountProfileId != null ? $scope.ChannelAccProfileModel.ParentAccountProfileId.Value : null;
                ////$scope.ChannelAccProfileModel.ManagerTypeId = $scope.ChannelAccProfileModel.ManagerTypeId != null ? $scope.ChannelAccProfileModel.ManagerTypeId.Value : null;
                $scope.ChannelAccProfileModel.ManagerAccountProfileId = $scope.ChannelAccProfileModel.ManagerAccountProfileId != null ? $scope.ChannelAccProfileModel.ManagerAccountProfileId.Value : null;
                $scope.ChannelAccProfileModel.TransDT = "";
                if ($scope.ChannelAccProfileModel.DateofBirth != null && $scope.ChannelAccProfileModel.DateofBirth != "" && $scope.ChannelAccProfileModel.DateofBirth != 'undefine')
                {
                    $scope.SplitDateofBirth = $scope.ChannelAccProfileModel.DateofBirth.toString();
                    $scope.DOBmonth = ($scope.SplitDateofBirth.split(' ')[1]);
                    monthstringtonumberconvert($scope.DOBmonth);
                    $scope.DOBmonth = $scope.month;
                    $scope.DOBday = ($scope.SplitDateofBirth.split(' ')[2]);
                    $scope.DOByear = ($scope.SplitDateofBirth.split(' ')[3]);
                    $scope.ChannelAccProfileModel.DateofBirth = ($scope.DOByear + '-' + $scope.DOBmonth + '-' + $scope.DOBday + 'T18:00:00.000Z');
                }
                else
                    $scope.ChannelAccProfileModel.DateofBirth = null;

                var data = { 'data': JSON.stringify($scope.ChannelAccProfileModel) };
                $http.post('ChannelAccProfile/Create', data, config)
                    .then(
                    function (response) {                        
                        if (response.data.Result == 1){
                            showSuccessMsg(response.data.ResponseMessage);
                            $scope.ClearFields();
                            loadData();
                        }                            
                        else
                            showErrorMsg(response.data.ResponseMessage);
                    }
                    );
            }
            else if ($scope.SubmitBtn === "Update") {
                $scope.ChannelAccProfileModel.FunctionId = FunctionId;
                //$scope.ChannelAccProfileModel.AccountCategoryId = $scope.ChannelAccProfileModel.AccountCategoryId != null ? $scope.ChannelAccProfileModel.AccountCategoryId.Value : null;
                $scope.ChannelAccProfileModel.AccountTypeId = $scope.ChannelAccProfileModel.AccountTypeId != null ? $scope.ChannelAccProfileModel.AccountTypeId.Value : null;
                $scope.ChannelAccProfileModel.Gender = $scope.ChannelAccProfileModel.Gender != null ? $scope.ChannelAccProfileModel.Gender.Value : null;
                $scope.ChannelAccProfileModel.PresentCountryId = $scope.ChannelAccProfileModel.PresentCountryId != null ? $scope.ChannelAccProfileModel.PresentCountryId.Value : null;
                $scope.ChannelAccProfileModel.PresentCityId = $scope.ChannelAccProfileModel.PresentCityId != null ? $scope.ChannelAccProfileModel.PresentCityId.Value : null;
                $scope.ChannelAccProfileModel.PresentDistrictId = $scope.ChannelAccProfileModel.PresentDistrictId != null ? $scope.ChannelAccProfileModel.PresentDistrictId.Value : null;
                $scope.ChannelAccProfileModel.PresentPoliceStationId = $scope.ChannelAccProfileModel.PresentPoliceStationId != null ? $scope.ChannelAccProfileModel.PresentPoliceStationId.Value : null;
                $scope.ChannelAccProfileModel.PresentAreaId = $scope.ChannelAccProfileModel.PresentAreaId != null ? $scope.ChannelAccProfileModel.PresentAreaId.Value : null;
                $scope.ChannelAccProfileModel.PermanentCountryId = $scope.ChannelAccProfileModel.PermanentCountryId != null ? $scope.ChannelAccProfileModel.PermanentCountryId.Value : null;
                $scope.ChannelAccProfileModel.PermanentCityId = $scope.ChannelAccProfileModel.PermanentCityId != null ? $scope.ChannelAccProfileModel.PermanentCityId.Value : null;
                $scope.ChannelAccProfileModel.PermanentDistrictId = $scope.ChannelAccProfileModel.PermanentDistrictId != null ? $scope.ChannelAccProfileModel.PermanentDistrictId.Value : null;
                $scope.ChannelAccProfileModel.PermanentPoliceStationId = $scope.ChannelAccProfileModel.PermanentPoliceStationId != null ? $scope.ChannelAccProfileModel.PermanentPoliceStationId.Value : null;
                $scope.ChannelAccProfileModel.PermanentAreaId = $scope.ChannelAccProfileModel.PermanentAreaId != null ? $scope.ChannelAccProfileModel.PermanentAreaId.Value : null;
                $scope.ChannelAccProfileModel.BankId = $scope.ChannelAccProfileModel.BankId != null ? $scope.ChannelAccProfileModel.BankId.Value : null;
                $scope.ChannelAccProfileModel.BranchId = $scope.ChannelAccProfileModel.BranchId != null ? $scope.ChannelAccProfileModel.BranchId.Value : null;
                $scope.ChannelAccProfileModel.ParentAccountTypeId = $scope.ChannelAccProfileModel.ParentAccountTypeId != null ? $scope.ChannelAccProfileModel.ParentAccountTypeId.Value : null;
                $scope.ChannelAccProfileModel.ParentAccountProfileId = $scope.ChannelAccProfileModel.ParentAccountProfileId != null ? $scope.ChannelAccProfileModel.ParentAccountProfileId.Value : null;
                $scope.ChannelAccProfileModel.AccountStatusId = $scope.ChannelAccProfileModel.AccountStatusId;
                ////$scope.ChannelAccProfileModel.ManagerTypeId = $scope.ChannelAccProfileModel.ManagerTypeId != null ? $scope.ChannelAccProfileModel.ManagerTypeId.Value : null;
                $scope.ChannelAccProfileModel.ManagerAccountProfileId = $scope.ChannelAccProfileModel.ManagerAccountProfileId != null ? $scope.ChannelAccProfileModel.ManagerAccountProfileId.Value : null;
                $scope.ChannelAccProfileModel.TransDT = "";
                //$scope.ChannelAccProfileModel.DateofBirth = $scope.ChannelAccProfileModel.DateofBirth != null ? $scope.ChannelAccProfileModel.DateofBirth : $scope.SessionDateofBirth;
                if ($scope.ChannelAccProfileModel.DateofBirth != null && $scope.ChannelAccProfileModel.DateofBirth != "" && $scope.ChannelAccProfileModel.DateofBirth != 'undefine') {
                    $scope.SplitDateofBirth = $scope.ChannelAccProfileModel.DateofBirth.toString();
                    $scope.DOBmonth = ($scope.SplitDateofBirth.split(' ')[1]);
                    monthstringtonumberconvert($scope.DOBmonth);
                    $scope.DOBmonth = $scope.month;
                    $scope.DOBday = ($scope.SplitDateofBirth.split(' ')[2]);
                    //$scope.day = (parseInt($scope.day1) + 1).toString();                
                    $scope.DOByear = ($scope.SplitDateofBirth.split(' ')[3]);
                    $scope.ChannelAccProfileModel.DateofBirth = ($scope.DOByear + '-' + $scope.DOBmonth + '-' + $scope.DOBday + 'T18:00:00.000Z');
                }
                else
                    $scope.ChannelAccProfileModel.DateofBirth = $scope.SessionDateofBirth;  

                var data = { 'data': JSON.stringify($scope.ChannelAccProfileModel) };
                $http.post('ChannelAccProfile/Edit', data, config)
                    .then(
                    function (response) {                        
                        if (response.data.Result == 1) {
                            showSuccessMsg(response.data.ResponseMessage);
                            $scope.ClearFields();
                            loadData();
                        }
                        else
                            showErrorMsg(response.data.ResponseMessage);
                    }
                    );
            }
        };
        $scope.changeChannelAccProfile = function (index) {
            debugger;
            var data = $scope.ChannelAccProfileList[index];
            $scope.ChannelAccProfileModel.AccountProfileId = data.AccountProfileId;            
            //accessArrayOfJsonObjectByKeyValue($scope.AccCategoryForDD, data.AccountCategoryId, "AccountCategoryId");
            //$scope.ChannelAccProfileModel.AccountCategoryId = $scope.selectedAccountCategoryId;
            accessArrayOfJsonObjectByKeyValue($scope.AccTypeForDD, data.AccountTypeId, "AccountTypeId");
            $scope.ChannelAccProfileModel.AccountTypeId = $scope.selectedAccountTypeId;            
            $scope.ChannelAccProfileModel.WalletAccountNo = data.WalletAccountNo;
            $scope.ChannelAccProfileModel.UserName = data.UserName;
            $scope.ChannelAccProfileModel.FatherNm = data.FatherNm;
            $scope.ChannelAccProfileModel.MotherNm = data.MotherNm;
            $scope.SessionDateofBirth = data.DateofBirth;
            $scope.ChannelAccProfileModel.DateofBirth = data.DateofBirth;
            $scope.ChannelAccProfileModel.NationalityId = data.NationalityId;
            accessArrayOfJsonObjectByKeyValue($scope.GenderForDD, data.Gender, "Gender");
            $scope.ChannelAccProfileModel.Gender = $scope.selectedGender;
            $scope.ChannelAccProfileModel.TAXIdNo = data.TAXIdNo;
            $scope.ChannelAccProfileModel.PassportNo = data.PassportNo;
            $scope.ChannelAccProfileModel.PresentAddress1 = data.PresentAddress1;
            $scope.ChannelAccProfileModel.PresentAddress2 = data.PresentAddress2;
            accessArrayOfJsonObjectByKeyValue($scope.CountryInfoForDD, data.PresentCountryId, "PresentCountryId");
            $scope.ChannelAccProfileModel.PresentCountryId = $scope.selectedPresentCountryId;
            accessArrayOfJsonObjectByKeyValue($scope.CityInfoForDD, data.PresentCityId, "PresentCityId");
            $scope.ChannelAccProfileModel.PresentCityId = $scope.selectedPresentCityId;
            accessArrayOfJsonObjectByKeyValue($scope.DistrictInfoForDD, data.PresentDistrictId, "PresentDistrictId");
            $scope.ChannelAccProfileModel.PresentDistrictId = $scope.selectedPresentDistrictId;
            accessArrayOfJsonObjectByKeyValue($scope.PSInfoForDD, data.PresentPoliceStationId, "PresentPoliceStationId");
            $scope.ChannelAccProfileModel.PresentPoliceStationId = $scope.selectedPresentPoliceStationId;
            accessArrayOfJsonObjectByKeyValue($scope.AreaInfoForDD, data.PresentAreaId, "PresentAreaId");
            $scope.ChannelAccProfileModel.PresentAreaId = $scope.selectedPresentAreaId;
            //$scope.ChannelAccProfileModel.PresentPhoneNo = data.PresentPhoneNo;
            $scope.ChannelAccProfileModel.PermanentAddress1 = data.PermanentAddress1;
            $scope.ChannelAccProfileModel.PermanentAddress2 = data.PermanentAddress2;
            accessArrayOfJsonObjectByKeyValue($scope.CountryInfoForDD, data.PermanentCountryId, "PermanentCountryId");
            $scope.ChannelAccProfileModel.PermanentCountryId = $scope.selectedPermanentCountryId;
            accessArrayOfJsonObjectByKeyValue($scope.CityInfoForDD, data.PermanentCityId, "PermanentCityId");
            $scope.ChannelAccProfileModel.PermanentCityId = $scope.selectedPermanentCityId;
            accessArrayOfJsonObjectByKeyValue($scope.DistrictInfoForDD, data.PermanentDistrictId, "PermanentDistrictId");
            $scope.ChannelAccProfileModel.PermanentDistrictId = $scope.selectedPermanentDistrictId;            
            accessArrayOfJsonObjectByKeyValue($scope.PSInfoForDD, data.PermanentPoliceStationId, "PermanentPoliceStationId");
            $scope.ChannelAccProfileModel.PermanentPoliceStationId = $scope.selectedPermanentPoliceStationId;
            accessArrayOfJsonObjectByKeyValue($scope.AreaInfoForDD, data.PermanentAreaId, "PermanentAreaId");
            $scope.ChannelAccProfileModel.PermanentAreaId = $scope.selectedPermanentAreaId;
            //$scope.ChannelAccProfileModel.PermanentPhoneNo = data.PermanentPhoneNo;
            accessArrayOfJsonObjectByKeyValue($scope.BankInfoForDD, data.BankId, "BankId");
            $scope.ChannelAccProfileModel.BankId = $scope.selectedBankId;
            accessArrayOfJsonObjectByKeyValue($scope.BranchInfoForDD, data.BranchId, "BranchId");
            $scope.ChannelAccProfileModel.BranchId = $scope.selectedBranchId;
            $scope.ChannelAccProfileModel.BankAccountNo = data.BankAccountNo;
            accessArrayOfJsonObjectByKeyValue($scope.AccTypeForDD, data.ParentAccountTypeId, "ParentAccountTypeId");
            $scope.ChannelAccProfileModel.ParentAccountTypeId = $scope.selectedParentAccountTypeId;
            accessArrayOfJsonObjectByKeyValue($scope.ChannelAccProfileForDD, data.ParentAccountProfileId, "ParentAccountProfileId");
            $scope.ChannelAccProfileModel.ParentAccountProfileId = $scope.selectedParentAccountProfileId;
            $scope.ChannelAccProfileModel.CompanyNm = data.CompanyNm;
            $scope.ChannelAccProfileModel.Occupation = data.Occupation;
            $scope.ChannelAccProfileModel.NationalIdNo = data.NationalIdNo;
            $scope.ChannelAccProfileModel.VatRegistrationNo = data.VatRegistrationNo;
            $scope.ChannelAccProfileModel.AccountStatusId = data.AccountStatusId;
            $scope.ChannelAccProfileModel.TradeLicenseNo = data.TradeLicenseNo;
            ////accessArrayOfJsonObjectByKeyValue($scope.ManagerTypeForDD, data.ManagerTypeId, "ManagerTypeId");
            ////$scope.ChannelAccProfileModel.ManagerTypeId = $scope.selectedManagerTypeId;
            accessArrayOfJsonObjectByKeyValue($scope.ManagerForDD, data.ManagerAccountProfileId, "ManagerAccountProfileId");
            $scope.ChannelAccProfileModel.ManagerAccountProfileId = $scope.selectedManagerAccountProfileId;
            $scope.ChannelAccProfileModel.dis = "dis";
            $scope.SubmitBtn = "Update";
        };
        $scope.deleteChannelAccProfile = function (index) {
            var data = { 'data': JSON.stringify($scope.ChannelAccProfileList[index]) };
            $http.post('ChannelAccProfile/Delete', data, config)
                .then(
                function (response) {
                    if (response.data.Result == 1)
                    {
                        showSuccessMsg(response.data.ResponseMessage);
                        $scope.ClearFields();
                        loadData();
                    }
                    else
                        showErrorMsg(response.data.ResponseMessage);
                }
                );
        };

        function accessArrayOfJsonObjectByKeyValue(Array, keyValue, callname) {
            debugger;
            //if (callname == "AccountCategoryId") {
            //    Array.forEach(function (object) {
            //        if (object.Value == keyValue) {
            //            $scope.selectedAccountCategoryId = object;
            //        }
            //    });
            //}
            if (callname == "AccountTypeId") {
                Array.forEach(function (object) {
                    if (object.Value == keyValue) {
                        $scope.selectedAccountTypeId = object;
                    }
                });
            }
            if (callname == "Gender") {
                Array.forEach(function (object) {
                    if (object.Value == keyValue) {
                        $scope.selectedGender = object;
                    }
                });
            }
            if (callname == "PresentCountryId") {
                Array.forEach(function (object) {
                    if (object.Value == keyValue) {
                        $scope.selectedPresentCountryId = object;
                    }
                });
            }
            if (callname == "PresentCityId") {
                Array.forEach(function (object) {
                    if (object.Value == keyValue) {
                        $scope.selectedPresentCityId = object;
                    }
                });
            }
            if (callname == "PresentDistrictId") {
                Array.forEach(function (object) {
                    if (object.Value == keyValue) {
                        $scope.selectedPresentDistrictId = object;
                    }
                });
            }
            if (callname == "PresentPoliceStationId") {
                Array.forEach(function (object) {
                    if (object.Value == keyValue) {
                        $scope.selectedPresentPoliceStationId = object;
                    }
                });
            }
            if (callname == "PresentAreaId") {
                Array.forEach(function (object) {
                    if (object.Value == keyValue) {
                        $scope.selectedPresentAreaId = object;
                    }
                });
            }
            if (callname == "PermanentCountryId") {
                Array.forEach(function (object) {
                    if (object.Value == keyValue) {
                        $scope.selectedPermanentCountryId = object;
                    }
                });
            }
            if (callname == "PermanentCityId") {
                Array.forEach(function (object) {
                    if (object.Value == keyValue) {
                        $scope.selectedPermanentCityId = object;
                    }
                });
            }
            if (callname == "PermanentDistrictId") {
                Array.forEach(function (object) {
                    if (object.Value == keyValue) {
                        $scope.selectedPermanentDistrictId = object;
                    }
                });
            }
            if (callname == "PermanentPoliceStationId") {
                Array.forEach(function (object) {
                    if (object.Value == keyValue) {
                        $scope.selectedPermanentPoliceStationId = object;
                    }
                });
            }
            if (callname == "PermanentAreaId") {
                Array.forEach(function (object) {
                    if (object.Value == keyValue) {
                        $scope.selectedPermanentPoliceStationId = object;
                    }
                });
            }
            if (callname == "BankId") {
                Array.forEach(function (object) {
                    if (object.Value == keyValue) {
                        $scope.selectedBankId = object;
                    }
                });
            }
            if (callname == "BranchId") {
                Array.forEach(function (object) {
                    if (object.Value == keyValue) {
                        $scope.selectedBranchId = object;
                    }
                });
            }
            if (callname == "ParentAccountTypeId") {
                Array.forEach(function (object) {
                    if (object.Value == keyValue) {
                        $scope.selectedParentAccountTypeId = object;
                    }
                });
            }
            if (callname == "ParentAccountProfileId") {
                Array.forEach(function (object) {
                    if (object.Value == keyValue) {
                        $scope.selectedParentAccountProfileId = object;
                    }
                });
            }
            ////if (callname == "ManagerTypeId") {
            ////    Array.forEach(function (object) {
            ////        if (object.Value == keyValue) {
            ////            $scope.selectedManagerTypeId = object;
            ////        }
            ////    });
            ////}
            if (callname == "ManagerAccountProfileId") {
                Array.forEach(function (object) {
                    if (object.Value == keyValue) {
                        $scope.selectedManagerAccountProfileId = object;
                    }
                });
            }            
        }

        function monthstringtonumberconvert(month) {
            debugger;
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

        $scope.ClearFields = function () {
            $scope.ChannelAccProfileModel.AccountProfileId = "";
            //$scope.ChannelAccProfileModel.AccountCategoryId = "";
            $scope.ChannelAccProfileModel.AccountTypeId = "";
            $scope.ChannelAccProfileModel.WalletAccountNo = "";
            $scope.ChannelAccProfileModel.UserName = "";
            $scope.ChannelAccProfileModel.FatherNm = "";
            $scope.ChannelAccProfileModel.MotherNm = "";
            $scope.ChannelAccProfileModel.DateofBirth = "";
            $scope.ChannelAccProfileModel.NationalityId = "";
            $scope.ChannelAccProfileModel.Gender = "";
            $scope.ChannelAccProfileModel.TAXIdNo = "";
            $scope.ChannelAccProfileModel.PassportNo = "";
            $scope.ChannelAccProfileModel.PresentAddress1 = "";
            $scope.ChannelAccProfileModel.PresentAddress2 = "";
            $scope.ChannelAccProfileModel.PresentCountryId = "";
            $scope.ChannelAccProfileModel.PresentCityId = "";
            $scope.ChannelAccProfileModel.PresentDistrictId = "";
            $scope.ChannelAccProfileModel.PresentPoliceStationId = "";
            $scope.ChannelAccProfileModel.PresentAreaId = "";
            //$scope.ChannelAccProfileModel.PresentPhoneNo = "";
            $scope.ChannelAccProfileModel.PermanentAddress1 = "";
            $scope.ChannelAccProfileModel.PermanentAddress2 = "";
            $scope.ChannelAccProfileModel.PermanentCountryId = "";
            $scope.ChannelAccProfileModel.PermanentCityId = "";
            $scope.ChannelAccProfileModel.PermanentDistrictId = "";
            $scope.ChannelAccProfileModel.PermanentPoliceStationId = "";
            $scope.ChannelAccProfileModel.PermanentAreaId = "";
            //$scope.ChannelAccProfileModel.PermanentPhoneNo = "";
            $scope.ChannelAccProfileModel.BankId = "";
            $scope.ChannelAccProfileModel.BranchId = "";
            $scope.ChannelAccProfileModel.BankAccountNo = "";
            $scope.ChannelAccProfileModel.ParentAccountTypeId = "";
            $scope.ChannelAccProfileModel.ParentAccountProfileId = "";
            $scope.ChannelAccProfileModel.CompanyNm = "";
            $scope.ChannelAccProfileModel.Occupation = "";
            $scope.ChannelAccProfileModel.NationalIdNo = "";
            $scope.ChannelAccProfileModel.VatRegistrationNo = "";
            $scope.ChannelAccProfileModel.AccountStatusId = "";
            $scope.ChannelAccProfileModel.TradeLicenseNo = "";
            //$scope.ChannelAccProfileModel.ManagerTypeId = "";
            $scope.ChannelAccProfileModel.ManagerAccountProfileId = "";
            $scope.ChannelAccProfileModel.dis = "";
            $scope.SubmitBtn = "Add";
        };

        function showSuccessMsg(_Msg) {
            toastr.success(_Msg);
        };
        function showErrorMsg(_Msg) {
            toastr.error(_Msg);
        };
    }
})();

