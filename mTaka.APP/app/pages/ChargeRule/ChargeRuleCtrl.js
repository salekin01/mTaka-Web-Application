(function () {
    'use strict';

    angular.module('mTakaAPP.pages.ChargeRule')
        .controller('ChargeRuleCtrl', ChargeRuleCtrl);

    function ChargeRuleCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, $window, getFunctionId) {
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

        $scope.ChargeRuleModel = {};
        $scope.ListDeductCustModel = {};
        $scope.ListChargeRule_API = [];
        $scope.ListChargeRule = [];

        $scope.SubmitBtn = "Add";
        $scope.ChargeRuleModel.UserName = $rootScope.UserName;

        //-------------------------------------------
        $scope.ChargeRuleModel.ParentChargeRuleID = null;
        $scope.GetChargeRuleForDD = function () {

            $http.get('ChargeRule/GetChargeRuleForDD').success(function (json) {
                $scope.ChargeRuleForDD = json;
            });
        };
        $scope.GetChargeRuleForDD();

        $scope.ChargeRuleModel.ChargeCtgLogId = null;
        $scope.GetChargesCategoryForDD = function () {

            $http.get('ChargeRule/GetChargesCategoryForDD').success(function (json) {
                $scope.ChargesCategoryForDD = json;
            });
        };
        $scope.GetChargesCategoryForDD();

        $scope.ChargeRuleModel.ChargeRuleTypeId = null;
        $scope.GetChargeRuleTypeForDD = function () {

            $http.get('ChargeRule/GetChargeRuleTypeForDD').success(function (json) {
                $scope.ChargeRuleTypeForDD = json;
            });
        };
        $scope.GetChargeRuleTypeForDD();

        $scope.ChargeRuleModel.RateMethodId = null;
        $scope.GetChargeRateMethodForDD = function () {

            $http.get('ChargeRule/GetChargeRateMethodForDD').success(function (json) {
                $scope.ChargeRateMethodForDD = json;
            });
        };
        $scope.GetChargeRateMethodForDD();

        $scope.ChargeRuleModel.RateTypeId = null;
        $scope.GetChargeRateTypeForDD = function () {

            $http.get('ChargeRule/GetChargeRateTypeForDD').success(function (json) {
                $scope.ChargeRateTypeForDD = json;
            });
        };
        $scope.GetChargeRateTypeForDD();

        $scope.ChargeRuleModel.CustomerFilterAppId = null;
        $scope.GetCustomerFilterForDD = function () {

            $http.get('ChargeRule/GetCustomerFilterForDD').success(function (json) {
                $scope.CustomerFilterForDD = json;
            });
        };
        $scope.GetCustomerFilterForDD();

        $scope.ChargeRuleModel.DecRndId = null;
        $scope.GetDecimalRoundingForDD = function () {

            $http.get('ChargeRule/GetDecimalRoundingForDD').success(function (json) {
                $scope.DecimalRoundingForDD = json;
            });
        };
        $scope.GetDecimalRoundingForDD();

        $scope.ChargeRuleModel.RatePrdId = null;
        $scope.GetCalenderPeriodForDD = function () {

            $http.get('ChargeRule/GetCalenderPeriodForDD').success(function (json) {
                $scope.CalenderPeriodForDD = json;
            });
        };
        $scope.GetCalenderPeriodForDD();

        $scope.ChargeRuleModel.ChargeEventId = null;
        $scope.GetDefineServiceForDD = function () {
            $http.get('ChargeRule/GetDefineServiceForDD').success(function (json) {
                $scope.DefineServiceForDD = json;
            });
        };
        $scope.GetDefineServiceForDD();

        $scope.ChargeRuleModel.ChargeActTypeId = null;
        $scope.GetChargeActTypeForDD = function () {
            $http.get('ChargeRule/GetChargeActTypeForDD').success(function (json) {
                $scope.ChargeActTypeForDD = json;
            });
        };
        $scope.GetChargeActTypeForDD();

        $scope.ChargeRuleModel.CusCatId = null;
        $scope.GetCusCategoryForDD = function () {
            $http.get('CusType/GetCusCategoryForDD').success(function (json) {
                $scope.CusCategoryForDD = json;
            });
        };
        $scope.GetCusCategoryForDD();

        $scope.ChargeRuleModel.GLAccSl = null;
        $scope.GetGLAccForDD = function () {
            $http.get('ChargeRule/GetGLAccForDD').success(function (json) {
                $scope.GLAccForDD = json;
            });
        };
        $scope.GetGLAccForDD();

        $scope.DebitOrCreditForDD = [];
        $scope.DebitOrCreditForDD =
            [{
                "Text": "Debit",
                "Value": "D",
                "Selected": false
            },
            {
                "Text": "Credit",
                "Value": "C",
                "Selected": false
            }];

        $scope.GetAccTypeForDD = function () {
            $http.get('AccType/GetAccTypeForDD').success(function (json) {
                $scope.AccTypeForDD = json;
            });
        };
        $scope.GetAccTypeForDD();
        //-----------------------------------
        $scope.loadData = function () {
            $http.get('ChargeRule/Index').success(function (json) {

                $scope.ChargeRuleList = json;
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
                $scope.ChargeRuleModel.ParentChargeRuleID = $scope.ChargeRuleModel.ParentChargeRuleID == null ? null : $scope.ChargeRuleModel.ParentChargeRuleID.Value;;
                $scope.ChargeRuleModel.ChargeCtgLogId = $scope.ChargeRuleModel.ChargeCtgLogId == null ? null : $scope.ChargeRuleModel.ChargeCtgLogId.Value;;
                $scope.ChargeRuleModel.ChargeRuleTypeId = $scope.ChargeRuleModel.ChargeRuleTypeId == null ? null : $scope.ChargeRuleModel.ChargeRuleTypeId.Value;;
                $scope.ChargeRuleModel.RateMethodId = $scope.ChargeRuleModel.RateMethodId == null ? null : $scope.ChargeRuleModel.RateMethodId.Value;;
                $scope.ChargeRuleModel.RateTypeId = $scope.ChargeRuleModel.RateTypeId == null ? null : $scope.ChargeRuleModel.RateTypeId.Value;;
                $scope.ChargeRuleModel.CustomerFilterAppId = $scope.ChargeRuleModel.CustomerFilterAppId == null ? null : $scope.ChargeRuleModel.CustomerFilterAppId.Value;;
                $scope.ChargeRuleModel.DecRndId = $scope.ChargeRuleModel.DecRndId == null ? null : $scope.ChargeRuleModel.DecRndId.Value;;
                $scope.ChargeRuleModel.RatePrdId = $scope.ChargeRuleModel.RatePrdId == null ? null : $scope.ChargeRuleModel.RatePrdId.Value;
                $scope.ChargeRuleModel.ChargeEventId = $scope.ChargeRuleModel.ChargeEventId == null ? null : $scope.ChargeRuleModel.ChargeEventId.Value;;
                $scope.ChargeRuleModel.ChargeActTypeId = $scope.ChargeRuleModel.ChargeActTypeId == null ? null : $scope.ChargeRuleModel.ChargeActTypeId.Value;;
                $scope.ChargeRuleModel.CusCatId = $scope.ChargeRuleModel.CusCatId == null ? null : $scope.ChargeRuleModel.CusCatId.Value;;
                $scope.ChargeRuleModel.GLAccSl = $scope.ChargeRuleModel.GLAccSl == null ? null : $scope.ChargeRuleModel.GLAccSl.Value;;
                $scope.ChargeRuleModel.ListChargeDeductCust = $scope.ListChargeRule_API;
                $scope.ChargeRuleModel.ChildChargeRuleFlag = $scope.ChargeRuleModel.ChildChargeRuleFlag == true ? 1 : 0;
                $scope.ChargeRuleModel.ChargeActulaFlag = $scope.ChargeRuleModel.ChargeActulaFlag == true ? 1 : 0;
                $scope.ChargeRuleModel.ChargeOndemandFlag = $scope.ChargeRuleModel.ChargeOndemandFlag == true ? 1 : 0;
                $scope.ChargeRuleModel.CustomerFilterAppFlag = $scope.ChargeRuleModel.CustomerFilterAppFlag == true ? 1 : 0;
                $scope.ChargeRuleModel.AccBalance = ($scope.ChargeRuleModel.AccBalance == null || $scope.ChargeRuleModel.AccBalance == "" || $scope.ChargeRuleModel.AccBalance == " " ) ? 0 : $scope.ChargeRuleModel.AccBalance;
                $scope.ChargeRuleModel.DebitOrCredit = $scope.ChargeRuleModel.DebitOrCredit != null ? $scope.ChargeRuleModel.DebitOrCredit.Value : null;
                $scope.ChargeRuleModel.AccountTypeId = $scope.ChargeRuleModel.AccountTypeId != null ? $scope.ChargeRuleModel.AccountTypeId.Value : null;

                $scope.ChargeRuleModel.ListChargeApplyDT = $scope.ChargeDateTime;

                $scope.ChargeRuleModel.FunctionId = FunctionId;
                var data = { 'data': JSON.stringify($scope.ChargeRuleModel) };
                $http.post('ChargeRule/Create', data, config)
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

                $scope.ChargeRuleModel.UpazilaId = $scope.ChargeRuleModel.UpazilaId.Value;
                $scope.ChargeRuleModel.FunctionId = FunctionId;
                var data = { 'data': JSON.stringify($scope.ChargeRuleModel) };
                $http.post('ChargeRule/Edit', data, config)
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
        $scope.changeChargeRule = function (index) {
            var data = $scope.ChargeRuleList[index];
            $scope.ChargeRuleModel.UnionId = data.UnionId;
            $scope.ChargeRuleModel.UnionNm = data.UnionNm;
            $scope.ChargeRuleModel.UnionShortNm = data.UnionShortNm;
            accessArrayOfJsonObjectByKeyValue($scope.UpazilaInfoForDD, data.UpazilaId);
            $scope.ChargeRuleModel.UpazilaId = $scope.selectedUpazilaInfoDD;
            $scope.SubmitBtn = "Update";
        };
        $scope.deleteChargeRule = function (index) {
            var data = { 'data': JSON.stringify($scope.ChargeRuleList[index]) };
            $http.post('ChargeRule/Delete', data, config)
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
            $scope.ChargeRuleModel.ChargeRuleId = "";
            $scope.ChargeRuleModel.ChargeRuleName = "";
            $scope.ChargeRuleModel.ChargeRuleTypeId = "";
            $scope.ChargeRuleModel.ChargeCtgLogId = "";

            $scope.ChargeRuleModel.RateMethodId = "";
            $scope.ChargeRuleModel.RateTypeId = "";
            $scope.ChargeRuleModel.RatePersent = "";
            $scope.ChargeRuleModel.RateAmount = "";

            $scope.ChargeRuleModel.MinAmount = "";
            $scope.ChargeRuleModel.MaxAmount = "";
            $scope.ChargeRuleModel.RatePrdNo = "";
            $scope.ChargeRuleModel.RatePrdId = "";

            $scope.ChargeRuleModel.DecRndId = "";
            $scope.ChargeRuleModel.GLAccSl = "";
            $scope.ChargeRuleModel.ChargeEventId = "";
            $scope.ChargeRuleModel.ChildChargeRuleFlag = "";
            $scope.ChargeRuleModel.DebitOrCredit = "";
            $scope.ChargeRuleModel.AccountTypeId = "";

            $scope.ChargeRuleModel.ParentChargeRuleID = "";
            $scope.ChargeRuleModel.ChargeActulaFlag = "";
            $scope.ChargeRuleModel.ChargeActTypeId = "";
            $scope.ChargeRuleModel.SwapAccSl = "";

            $scope.ChargeRuleModel.ChargeOndemandFlag = "";
            $scope.ChargeRuleModel.AccBalanceFlag = "";
            $scope.ChargeRuleModel.AccBalance = "";
            $scope.ChargeRuleModel.TaxPenaltyRate = "";

            $scope.ChargeRuleModel.BalanceTypeId = "";
            $scope.ChargeRuleModel.BalanceMethodId = "";
            $scope.ChargeRuleModel.PointTimeBalFlag = "";
            $scope.ChargeRuleModel.InsuffBalRefId = "";

            $scope.ChargeRuleModel.DeductPrdId = "";
            $scope.ChargeRuleModel.DeductCondtionFlag = "";
            $scope.ChargeRuleModel.DeductCondtionId = "";
            $scope.ChargeRuleModel.DeductCondtionValue = "";

            $scope.ChargeRuleModel.CustomerFilterAppFlag = "";
            $scope.ChargeRuleModel.CustomerFilterAppId = "";
            $scope.ChargeRuleModel.StaffAccExcFlag = "";
            $scope.ChargeRuleModel.NextApplyDate = "";

            $scope.ChargeRuleModel.ChargeAppConFlag = "";
            $scope.ChargeRuleModel.ExchangeRateId = "";
            $scope.ChargeRuleModel.NBRCatgoryId = "";
            $scope.ChargeDateTime = [];
            $scope.ClearAddItems();
            $scope.SubmitBtn = "Add";
        };
        //---------------------------------------------------------
        $scope.ClearAddItems = function () {
            $scope.ListChargeRule = [];
            $scope.ListChargeRule_API = [];
           
        };

        $scope.AddItem = function () {
            $scope.ListDeductCustModel.CusCatId = $scope.ChargeRuleModel.CusCatId != null ? $scope.ChargeRuleModel.CusCatId.Value : null;
            $scope.ChargeRuleModel.CusCategoryNm = $scope.ChargeRuleModel.CusCatId != null ? $scope.ChargeRuleModel.CusCatId.Text : null;
            var flag = true;
            $scope.ListChargeRule_API.some(item => {
                if (item.CusCatId == $scope.ListDeductCustModel.CusCatId) { // item.Name is only used because when I called setPermission, I had a Name property
                    alert("Cutomer Type Alrady Added.");
                    flag = false;
                }
                else if ($scope.ListDeductCustModel.CusCatId == null)
                {
                    alert("Please Select Customer Category.");
                    flag = false;
                }
               
            });


            

            if (flag === true && $scope.ListDeductCustModel.CusCatId !== null) {
              
                $scope.originalData = angular.copy($scope.ListDeductCustModel);
                $scope.ListChargeRule_API.push($scope.originalData);

                $scope.originalData = angular.copy($scope.ChargeRuleModel);
                $scope.ListChargeRule.push($scope.originalData);
            }
        }
        $scope.deleteItem = function ($index) {
            $scope.ListChargeRule_API.splice($index, 1);
            $scope.ListChargeRule.splice($index, 1);
        }
        //-------------------------------------------------------------------------------------------------------
        $scope.ChargeDateTime = [];
        $scope.ChargeDateTimeModel = {};
        //$scope.ChargeDateTimeModel.AllDays = false;
        $scope.ChargeDateTimeModel.Saturday = false;
        $scope.ChargeDateTimeModel.Sunday = false;
        $scope.ChargeDateTimeModel.Monday = false;
        $scope.ChargeDateTimeModel.Tuesday = false;
        $scope.ChargeDateTimeModel.Wednesday = false;
        $scope.ChargeDateTimeModel.Thursday = false;
        $scope.ChargeDateTimeModel.Friday = false;
        $scope.ChargeDateTimeModel.FromHour = "";
        $scope.ChargeDateTimeModel.ToHour = "";
        $scope.Add = function () {

            debugger;
            //Add the new item to the Array.
            var chargeDateTime = {};
            if ($scope.ChargeDateTimeModel.FromHour != "" && $scope.ChargeDateTimeModel.ToHour !="") {
                //chargeDateTime.AllDays = $scope.ChargeDateTimeModel.AllDays;
                chargeDateTime.Saturday = $scope.ChargeDateTimeModel.Saturday;
                chargeDateTime.Sunday = $scope.ChargeDateTimeModel.Sunday;
                chargeDateTime.Monday = $scope.ChargeDateTimeModel.Monday;
                chargeDateTime.Tuesday = $scope.ChargeDateTimeModel.Tuesday;
                chargeDateTime.Wednesday = $scope.ChargeDateTimeModel.Wednesday;
                chargeDateTime.Thursday = $scope.ChargeDateTimeModel.Thursday;
                chargeDateTime.Friday = $scope.ChargeDateTimeModel.Friday;
                chargeDateTime.FromHour = $scope.ChargeDateTimeModel.FromHour;
                chargeDateTime.ToHour = $scope.ChargeDateTimeModel.ToHour;
            
                $scope.ChargeDateTime.push(chargeDateTime);
            }
            else
            {
                $window.confirm("Please Write Start and End Time.");
            }

            //Clear the TextBoxes.
            //$scope.ChargeDateTimeModel.AllDays = false;
            $scope.ChargeDateTimeModel.Saturday = false;
            $scope.ChargeDateTimeModel.Sunday = false;
            $scope.ChargeDateTimeModel.Monday = false;
            $scope.ChargeDateTimeModel.Tuesday = false;
            $scope.ChargeDateTimeModel.Wednesday = false;
            $scope.ChargeDateTimeModel.Thursday = false;
            $scope.ChargeDateTimeModel.Friday = false;
            $scope.ChargeDateTimeModel.FromHour = "";
            $scope.ChargeDateTimeModel.ToHour = "";
        };

        $scope.Remove = function (index) {
            //Find the record using Index from Array.
            //var name = $scope.ChargeDateTime[index].Name;
            if ($window.confirm("Do you want to delete record number : " + index+1)) {
                //Remove the item from Array using Index.
                $scope.ChargeDateTime.splice(index, 1);
            }
        }
        //$scope.SelectAll = function () {
        //    debugger;
        //    if ($scope.ChargeDateTimeModel.AllDays)
        //    {
        //        $scope.ChargeDateTimeModel.Saturday = true;
        //        $scope.ChargeDateTimeModel.Sunday = true;
        //        $scope.ChargeDateTimeModel.Monday = true;
        //        $scope.ChargeDateTimeModel.Tuesday = true;
        //        $scope.ChargeDateTimeModel.Wednesday = true;
        //        $scope.ChargeDateTimeModel.Thursday = true;
        //        $scope.ChargeDateTimeModel.Friday = true;
        //    }
        //    else
        //    {
        //        $scope.ChargeDateTimeModel.Saturday = false;
        //        $scope.ChargeDateTimeModel.Sunday = false;
        //        $scope.ChargeDateTimeModel.Monday = false;
        //        $scope.ChargeDateTimeModel.Tuesday = false;
        //        $scope.ChargeDateTimeModel.Wednesday = false;
        //        $scope.ChargeDateTimeModel.Thursday = false;
        //        $scope.ChargeDateTimeModel.Friday = false;
        //    }
        //}
//--------------------------------------------


        $scope.showSuccessMsg = function (_Msg) {
            toastr.success(_Msg);
        };
        $scope.showErrorMsg = function (_Msg) {
            toastr.error(_Msg);
        };
    }
})();