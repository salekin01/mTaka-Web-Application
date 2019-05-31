(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CustomerAccProfile')
        .controller('CustomerAccProfileCtrl', CustomerAccProfileCtrl);

    function CustomerAccProfileCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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

        $scope.CusModel = {};
        $scope.CusModel.AddressIdFromDD = null;
        //$scope.CusModel.ParentAccountTypeId = null;

        $scope.CusModel.FunctionId = FunctionId;
        $scope.CusModel.UserName = $rootScope.UserName;

        $scope.SubmitBtn = "Add";
        $scope.dpOpenStatus = {};

        $scope.setDpOpenStatus = function (id) {
            $scope.dpOpenStatus[id] = true
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

        $scope.GetAllNationality = function () {

            $http.get('CommonService/GetAllNationality').success(function (json) {
                $scope.NationalityForDD = json;
            });
        };
        $scope.GetAllNationality();

        $scope.GetCusCategoryForDD = function () {
            $http.get('CusType/GetCusCategoryForDD').success(function (json) {
                $scope.CusCategoryForDD = json;
            });
        };
        $scope.GetCusCategoryForDD();

        $scope.GetAccTypeForDD = function () {
            $http.get('AccType/GetAccTypeForDD').success(function (json) {
                debugger;
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
        
        $scope.GetBranchInfoForDD = function () {
            $http.get('BranchInfo/GetBranchInfoForDD').success(function (json) {
                $scope.BranchForDD = json;
            });
        };
        $scope.GetBranchInfoForDD();

        $scope.GetIdentificationTypeForDD = function () {
            $http.get('IdentificationType/GetIdentificationTypeForDD').success(function (json) {
                $scope.CustomerIdentificationForDD = json;
            });
        };
        $scope.GetIdentificationTypeForDD();
        
        $scope.GetChannelInfobyWalletAccNo = function () {
            debugger;
            //dropdownValidation();
            var data = { 'data': JSON.stringify($scope.CusModel.ParentAccountProfileId) };
            //alert(data);
            $http.get('ChannelAccProfile/GetChannelInfobyWalletAccNo', data, config)
                .then(
                function (response) {
                    debugger;
                    
                    if (response.data.AuthStatusId != null) {

                        showSuccessMsg("Account Name: "+response.data.UserName);
                        $scope.CusModel.ChannelMFSAccName = response.data.UserName;
                        //$scope.CusModel.ParentAccountProfileId = response.data.AccountProfileId;
                        $scope.CusModel.ParentAccountTypeId = response.data.AccountTypeId;
                    }

                    if (response.data.AuthStatusId==null) {
                        showErrorMsg(response.data.ResponseMessage);
                        $scope.CusModel.ChannelMFSAccName = "";
                    }


                }
                );
        }
        //$scope.GetChannelAccNo = function () {
        //    //$http.get('IdentificationType/GetIdentificationTypeForDD').success(function (json) {
        //    //    $scope.CustomerIdentificationForDD = json;
        //    //});
        //};
        //$scope.GetChannelAccNo();
        
        function loadData() {
            $http.get('CustomerAccProfile/Index').success(function (json) {
                $scope.CusList = json;
            });
        };
        loadData();

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        $scope.addData = function () {
            if ($scope.SubmitBtn === "Add") {
                debugger;
                //$scope.CusModel.SystemAccountNo = (Math.ceil(Math.random() * 999999999999999));
                $scope.CusModel.FunctionId = FunctionId;
                $scope.CusModel.CustomerCategory = $scope.CusModel.CustomerCategory != null ? $scope.CusModel.CustomerCategory.Value : null;
                $scope.CusModel.AccTypeId = $scope.CusModel.AccTypeId != null ? $scope.CusModel.AccTypeId.Value: null;
                $scope.CusModel.IdentificationType = $scope.CusModel.IdentificationType != null ? $scope.CusModel.IdentificationType.Value : null;
                $scope.CusModel.CountryId = $scope.CusModel.CountryId != null ? $scope.CusModel.CountryId.Value : null;
                $scope.CusModel.PresentCity = $scope.CusModel.PresentCity != null ? $scope.CusModel.PresentCity.Value : null;
                $scope.CusModel.PresentDistrict = $scope.CusModel.PresentDistrict != null ? $scope.CusModel.PresentDistrict.Value : null;
                $scope.CusModel.PresentThana = $scope.CusModel.PresentThana != null ? $scope.CusModel.PresentThana.Value : null;
                $scope.CusModel.PresentArea = $scope.CusModel.PresentArea != null ? $scope.CusModel.PresentArea.Value : null;
                $scope.CusModel.PermanentCountry = $scope.CusModel.PermanentCountry != null ? $scope.CusModel.PermanentCountry.Value : null;
                $scope.CusModel.PermanentCity = $scope.CusModel.PermanentCity != null ? $scope.CusModel.PermanentCity.Value : null;
                $scope.CusModel.PermanentDistrict = $scope.CusModel.PermanentDistrict != null ? $scope.CusModel.PermanentDistrict.Value : null;
                $scope.CusModel.PermanentThana = $scope.CusModel.PermanentThana != null ? $scope.CusModel.PermanentThana.Value : null;
                $scope.CusModel.PermanentArea = $scope.CusModel.PermanentArea != null ? $scope.CusModel.PermanentArea.Value : null;
                //$scope.CusModel.Branch = $scope.CusModel.Branch != null ? $scope.CusModel.Branch.Value : null;
                $scope.CusModel.Gender = $scope.CusModel.Gender != null ? $scope.CusModel.Gender.Value : null;
                $scope.CusModel.Nationality = $scope.CusModel.Nationality != null ? $scope.CusModel.Nationality.Value : null;

                var data = { 'data': JSON.stringify($scope.CusModel) };
                $http.post('CustomerAccProfile/Create', data, config)
                    .then(
                    function (response) {            
                        debugger;
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

            }
            else if ($scope.SubmitBtn === "Update") {
                $scope.CusModel.FunctionId = FunctionId;
                $scope.CusModel.CustomerCategory = $scope.CusModel.CustomerCategory != null ? $scope.CusModel.CustomerCategory.Value : null;
                $scope.CusModel.AccTypeId = $scope.CusModel.AccTypeId != null ? $scope.CusModel.AccTypeId.Value : null;
                $scope.CusModel.IdentificationType = $scope.CusModel.IdentificationType != null ? $scope.CusModel.IdentificationType.Value : null;
                $scope.CusModel.CountryId = $scope.CusModel.CountryId != null ? $scope.CusModel.CountryId.Value : null;
                $scope.CusModel.PresentCity = $scope.CusModel.PresentCity != null ? $scope.CusModel.PresentCity.Value : null;
                $scope.CusModel.PresentDistrict = $scope.CusModel.PresentDistrict != null ? $scope.CusModel.PresentDistrict.Value : null;
                $scope.CusModel.PresentThana = $scope.CusModel.PresentThana != null ? $scope.CusModel.PresentThana.Value : null;
                $scope.CusModel.PresentArea = $scope.CusModel.PresentArea != null ? $scope.CusModel.PresentArea.Value : null;
                $scope.CusModel.PermanentCountry = $scope.CusModel.PermanentCountry != null ? $scope.CusModel.PermanentCountry.Value : null;
                $scope.CusModel.PermanentCity = $scope.CusModel.PermanentCity != null ? $scope.CusModel.PermanentCity.Value : null;
                $scope.CusModel.PermanentDistrict = $scope.CusModel.PermanentDistrict != null ? $scope.CusModel.PermanentDistrict.Value : null;
                $scope.CusModel.PermanentThana = $scope.CusModel.PermanentThana != null ? $scope.CusModel.PermanentThana.Value : null;
                $scope.CusModel.PermanentArea = $scope.CusModel.PermanentArea != null ? $scope.CusModel.PermanentArea.Value : null;
                //$scope.CusModel.Branch = $scope.CusModel.Branch != null ? $scope.CusModel.Branch.Value : null;
                $scope.CusModel.Gender = $scope.CusModel.Gender != null ? $scope.CusModel.Gender.Value : null;
                $scope.CusModel.Nationality = $scope.CusModel.Nationality != null ? $scope.CusModel.Nationality.Value : null;
                var data = { 'data': JSON.stringify($scope.CusModel) };
                $http.post('CustomerAccProfile/Edit', data, config)
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
            }
        };
        $scope.changeCustomer = function (index) {
            var data = $scope.CusList[index];
            console.log($scope.CusList[index]);
            $scope.CusModel.AccountProfileId = data.AccountProfileId;
            $scope.CusModel.UserName = data.UserName;
            $scope.CusModel.CustomerCategory = data.CustomerCategory;
            $scope.CusModel.AccTypeId = data.AccTypeId;
            $scope.CusModel.FatherName = data.FatherName;
            $scope.CusModel.MotherName = data.MotherName;

            $scope.CusModel.DOB = new Date(data.DOB);

            $scope.CusModel.WalletAccountNo = data.WalletAccountNo;
            $scope.CusModel.IdentificationNo = data.IdentificationNo;
            $scope.CusModel.PresentAddress1 = data.PresentAddress1;
            $scope.CusModel.PresentAddress2 = data.PresentAddress2;
            $scope.CusModel.PresentPhone = data.PresentPhone;
            $scope.CusModel.PermanentAddress1 = data.PermanentAddress1;
            $scope.CusModel.PermanentAddress2 = data.PermanentAddress2;
            $scope.CusModel.PermanentPhone = data.PermanentPhone;
            $scope.CusModel.CBSCustomerId = data.CBSCustomerId;
            $scope.CusModel.BankAccountNo = data.BankAccountNo;
            $scope.CusModel.AccName = data.AccName;
            $scope.CusModel.ParentAccountTypeId = data.ParentAccountTypeId;
            $scope.CusModel.ParentAccountProfileId = data.ParentAccountProfileId;
            $scope.CusModel.Occupation = data.Occupation;
            $scope.CusModel.AlternativeMblNo = data.AlternativeMblNo;
            $scope.CusModel.TransPurpose = data.TransPurpose;
            $scope.CusModel.IntroducerNM = data.IntroducerNM;
            $scope.CusModel.IntroducerAddress = data.IntroducerAddress;
            $scope.CusModel.IntroducerOccupation = data.IntroducerOccupation;
            $scope.CusModel.IntroducerSysAccNo = data.IntroducerSysAccNo;
            $scope.CusModel.NID = data.NID;

            accessArrayOfJsonObjectByKeyValueAccTypeId($scope.AccTypeForDD, data.AccTypeId);
            $scope.CusModel.AccTypeId = $scope.selectedAccTypeIdForDD;

            accessArrayOfJsonObjectByKeyValueCustomerCategory($scope.CusCategoryForDD, data.CustomerCategory);
            $scope.CusModel.CustomerCategory = $scope.selectedCusCategoryForDD;

            accessArrayOfJsonObjectByKeyValueGender($scope.GenderForDD, data.Gender);
            $scope.CusModel.Gender = $scope.selectedGenderForDD;

            accessArrayOfJsonObjectByKeyValueIdentificationType($scope.CustomerIdentificationForDD, data.IdentificationType);
            $scope.CusModel.IdentificationType = $scope.selectedCustomerIdentificationType;

            accessArrayOfJsonObjectByKeyValueCountry($scope.CountryInfoForDD, data.CountryId);
            $scope.CusModel.CountryId = $scope.selecteCountryDD;

            accessArrayOfJsonObjectByKeyValueCity($scope.CityInfoForDD, data.PresentCity);
            $scope.CusModel.PresentCity = $scope.selecteCityForDD;

            accessArrayOfJsonObjectByKeyValueDistrict($scope.DistrictInfoForDD, data.PresentDistrict);
            $scope.CusModel.PresentDistrict = $scope.selecteDistrictInfoForDD;

            accessArrayOfJsonObjectByKeyValueThana($scope.PSInfoForDD, data.PresentThana);
            $scope.CusModel.PresentThana = $scope.selecteThanaForDD;

            accessArrayOfJsonObjectByKeyValueArea($scope.AreaInfoForDD, data.PresentArea);
            $scope.CusModel.PresentArea = $scope.selecteAreaForDD;

            accessArrayOfJsonObjectByKeyValueNationality($scope.NationalityForDD, data.Nationality);
            $scope.CusModel.Nationality = $scope.selecteNationalityForDD;

            //Permanent Address

            accessArrayOfJsonObjectByKeyValueCountry($scope.CountryInfoForDD, data.PermanentCountry);
            $scope.CusModel.PermanentCountry = $scope.selecteCountryDD;

            accessArrayOfJsonObjectByKeyValueCity($scope.CityInfoForDD, data.PermanentCity);
            $scope.CusModel.PermanentCity = $scope.selecteCityForDD;

            accessArrayOfJsonObjectByKeyValueDistrict($scope.DistrictInfoForDD, data.PermanentDistrict);
            $scope.CusModel.PermanentDistrict = $scope.selecteDistrictInfoForDD;

            accessArrayOfJsonObjectByKeyValueThana($scope.PSInfoForDD, data.PermanentThana);
            $scope.CusModel.PermanentThana = $scope.selecteThanaForDD;

            accessArrayOfJsonObjectByKeyValueArea($scope.AreaInfoForDD, data.PermanentArea);
            $scope.CusModel.PermanentArea = $scope.selecteAreaForDD;

            //Others

            //accessArrayOfJsonObjectByKeyValueBranch($scope.BranchForDD, data.Branch);
            //$scope.CusModel.Branch = $scope.selecteBranchForDD;

            $scope.SubmitBtn = "Update";
            loadData();
        };
        $scope.deleteAccTypeId = function (index) {
            var data = { 'data': JSON.stringify($scope.CusList[index]) };
            $http.post('AccTypeId/Delete', data, config)
                .then(
                function (response) {                    
                    if (response.data.Result == 1)
                    {
                        showSuccessMsg(response.data.ResponseMessage);
                        loadData();
                        $scope.ClearFields();
                    }
                    else
                        showErrorMsg(response.data.ResponseMessage);
                }
                );
        };
        
        function accessArrayOfJsonObjectByKeyValueAccTypeId(Array, keyValue) {
            if (keyValue == null) {
                $scope.selectedAccTypeIdForDD = "";
                return;
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedAccTypeIdForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueCustomerCategory(Array, keyValue) {
            if (keyValue == null) {
                $scope.selectedCusCategoryForDD = "";
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedCusCategoryForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueGender(Array, keyValue) {
            if (keyValue == null) {
                $scope.selectedGenderForDD = "";
                return;
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedGenderForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueCountry(Array, keyValue) {
            if (keyValue == null) {
                $scope.selecteCountryDD = "";
                return;
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteCountryDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueCity(Array, keyValue) {
            if (keyValue == null) {
                $scope.selecteCityForDD = "";
                return;
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteCityForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueDistrict(Array, keyValue) {
            if (keyValue == null) {
                $scope.selecteDistrictInfoForDD = "";
                return;
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteDistrictInfoForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueThana(Array, keyValue) {
            if (keyValue == null) {
                $scope.selecteThanaForDD = "";
                return;
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteThanaForDD = object;
                }
            });
        }
        
        function accessArrayOfJsonObjectByKeyValueArea(Array, keyValue) {
            if (keyValue == null) {
                $scope.selecteAreaForDD = "";
                return;
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteAreaForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueIdentificationType(Array, keyValue) {
            if (keyValue == null) {
                $scope.selectedCustomerIdentificationType = "";
                return;
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedCustomerIdentificationType = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueBranch(Array, keyValue) {
            if (keyValue == null) {
                $scope.selecteBranchForDD = "";
                return;
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteBranchForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueNationality(Array, keyValue) {
            if (keyValue == null) {
                $scope.selecteNationalityForDD = "";
                return;
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteNationalityForDD = object;
                }
            });
        }

        $scope.ClearFields = function () {
            $scope.CusModel.AccountProfileId = "";
            $scope.CusModel.UserName = "";
            $scope.CusModel.FatherName = "";
            $scope.CusModel.MotherName = "";
            $scope.CusModel.DOB = "";
            $scope.CusModel.Nationality = "";
            $scope.CusModel.Gender = "";
            $scope.CusModel.WalletAccountNo = "";
            $scope.CusModel.IdentificationNo = "";
            $scope.CusModel.PresentAddress1 = "";
            $scope.CusModel.PresentAddress2 = "";
            $scope.CusModel.PresentPhone = "";
            $scope.CusModel.PermanentAddress1 = "";
            $scope.CusModel.PermanentAddress2 = "";
            $scope.CusModel.PermanentPhone = "";
            $scope.CusModel.WalletAccountNo = "";

            $scope.CusModel.ChannelMFSAccName = "";
            $scope.CusModel.BankAccountNo = "";
            $scope.CusModel.AccName = "";
            $scope.CusModel.ParentAccountTypeId = "";
            $scope.CusModel.ParentAccountProfileId = "";
            $scope.CusModel.IntroducerNM = "";
            $scope.CusModel.IntroducerAddress = "";
            $scope.CusModel.IntroducerOccupation = "";
            $scope.CusModel.IntroducerSysAccNo = "";
            $scope.CusModel.Occupation = "";
            $scope.CusModel.Address = "";
            $scope.CusModel.NID = "";
            $scope.CusModel.AlternativeMblNo = "";
            $scope.CusModel.TransPurpose = "";

            $scope.CusModel.CustomerCategory = "";
            $scope.CusModel.AccTypeId = "";
            $scope.CusModel.IdentificationType = "";
            $scope.CusModel.CountryId = "";
            $scope.CusModel.PresentCity = "";
            $scope.CusModel.PresentDistrict = "";
            $scope.CusModel.PresentThana = "";
            $scope.CusModel.PresentArea = "";
            $scope.CusModel.PermanentCountry = "";
            $scope.CusModel.PermanentCity = "";
            $scope.CusModel.PermanentDistrict = "";
            $scope.CusModel.PermanentThana = "";
            $scope.CusModel.PermanentArea = "";
            $scope.CusModel.Branch = "";

            $scope.CusModel.SourceOfFund = "";
            $scope.CusModel.Email = "";

            $scope.SubmitBtn = "Add";
        };
        
        function dropdownValidation() {
            $scope.CusModel.CustomerCategory = $scope.CusModel.CustomerCategory != null ? $scope.CusModel.CustomerCategory.Value : null;
            $scope.CusModel.AccTypeId = $scope.CusModel.AccTypeId != null ? $scope.CusModel.AccTypeId.Value : null;
            $scope.CusModel.IdentificationType = $scope.CusModel.IdentificationType != null ? $scope.CusModel.IdentificationType.Value : null;
            $scope.CusModel.CountryId = $scope.CusModel.CountryId != null ? $scope.CusModel.CountryId.Value : null;
            $scope.CusModel.PresentCity = $scope.CusModel.PresentCity != null ? $scope.CusModel.PresentCity.Value : null;
            $scope.CusModel.PresentDistrict = $scope.CusModel.PresentDistrict != null ? $scope.CusModel.PresentDistrict.Value : null;
            $scope.CusModel.PresentThana = $scope.CusModel.PresentThana != null ? $scope.CusModel.PresentThana.Value : null;
            $scope.CusModel.PresentArea = $scope.CusModel.PresentArea != null ? $scope.CusModel.PresentArea.Value : null;
            $scope.CusModel.PermanentCountry = $scope.CusModel.PermanentCountry != null ? $scope.CusModel.PermanentCountry.Value : null;
            $scope.CusModel.PermanentCity = $scope.CusModel.PermanentCity != null ? $scope.CusModel.PermanentCity.Value : null;
            $scope.CusModel.PermanentDistrict = $scope.CusModel.PermanentDistrict != null ? $scope.CusModel.PermanentDistrict.Value : null;
            $scope.CusModel.PermanentThana = $scope.CusModel.PermanentThana != null ? $scope.CusModel.PermanentThana.Value : null;
            $scope.CusModel.PermanentArea = $scope.CusModel.PermanentArea != null ? $scope.CusModel.PermanentArea.Value : null;
            $scope.CusModel.Branch = $scope.CusModel.Branch != null ? $scope.CusModel.Branch.Value : null;
            $scope.CusModel.Gender = $scope.CusModel.Gender != null ? $scope.CusModel.Gender.Value : null;
            $scope.CusModel.Nationality = $scope.CusModel.Nationality != null ? $scope.CusModel.Nationality.Value : null;
        }

        function showSuccessMsg(_Msg) {
            toastr.success(_Msg);
        };
        function showErrorMsg(_Msg) {
            toastr.error(_Msg);
        };
    }
})();
