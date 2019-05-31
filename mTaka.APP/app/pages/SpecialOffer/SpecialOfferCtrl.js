(function () {
    'use strict';

    angular.module('mTakaAPP.pages.SpecialOffer')
        .controller('SpecialOfferCtrl', SpecialOfferCtrl);

    function SpecialOfferCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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

        $scope.SpecialOfferModel = {};
        $scope.SubmitBtn = "Add";

        $scope.SpecialOfferModel.StartDate = null;
        $scope.SpecialOfferModel.EndDate = null;
        $scope.dpOpenStatus = {};
        $scope.setDpOpenStatus = function (id) {
            $scope.dpOpenStatus[id] = true
        };
        $scope.dpOpenStatusEnd = {};
        $scope.setDpOpenStatusEnd = function (id) {
            $scope.dpOpenStatusEnd[id] = true
        };

        $scope.GetCustomerTypeForDD = function () {
            $http.get('AccType/GetAccTypeForDD').success(function (json) {
                $scope.CustomerTypeForDD = json;
            });
        };
        $scope.GetCustomerTypeForDD();

        $scope.GetDefineServiceForDD = function () {
            $http.get('DefineService/GetDefineServiceForDD').success(function (json) {
                $scope.ServiceForDD = json;
            });
        };
        $scope.GetDefineServiceForDD();

        $scope.GetDistrictInfoForDD = function () {
            $http.get('DistrictInfo/GetDistrictInfoForDD').success(function (json) {
                $scope.DistrictInfoForDD = json;
            });
        };
        $scope.GetDistrictInfoForDD();

        $scope.SpecialOfferModel.RateTypeId = null;
        $scope.GetChargeRateTypeForDD = function () {

            $http.get('ChargeRule/GetChargeRateTypeForDD').success(function (json) {
                $scope.ChargeRateTypeForDD = json;
            });
        };
        $scope.GetChargeRateTypeForDD();

        $scope.loadData = function () {
            $http.get('SpecialOffers/Index').success(function (json) {
                $scope.SpecialOfferList = json;
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

                $scope.SpecialOfferModel.AccTypeId = $scope.SpecialOfferModel.AccTypeId != null ? $scope.SpecialOfferModel.AccTypeId.Value : null;
                $scope.SpecialOfferModel.DefineServiceId = $scope.SpecialOfferModel.DefineServiceId != null ? $scope.SpecialOfferModel.DefineServiceId.Value : null;
                $scope.SpecialOfferModel.RateTypeId = $scope.SpecialOfferModel.RateTypeId != null ? $scope.SpecialOfferModel.RateTypeId.Value : null;
                $scope.SpecialOfferModel.DistrictId = $scope.SpecialOfferModel.DistrictId != null ? $scope.SpecialOfferModel.DistrictId.Value : null;
                var data = { 'data': JSON.stringify($scope.SpecialOfferModel) };
                $http.post('SpecialOffers/GetSpecialOffersBy', data, config)
                    .then(
                    function (response) {
                        $scope.ClearFields();
                        if (response.data.Result == 0)
                            $http.post('SpecialOffers/Create', data, config)
                                .then(
                                function (response) {
                                    $scope.ClearFields();
                                    if (response.data.Result == 1)
                                        $scope.showSuccessMsg(response.data.ResponseMessage);
                                    else
                                        $scope.showErrorMsg(response.data.ResponseMessage);
                                }
                                );
                        else
                            $scope.showErrorMsg(response.data.ResponseMessage);
                    }
                    );

            }
            else if ($scope.SubmitBtn === "Update") {
                debugger;
                $scope.SpecialOfferModel.FunctionId = FunctionId;
                var dataHasNotChanged = angular.equals($scope.originalData, $scope.SpecialOfferModel);
                if (dataHasNotChanged) {
                    $scope.showErrorMsg("No data has been modified");
                    return;
                }      
                $scope.SpecialOfferModel.AccTypeId = $scope.SpecialOfferModel.AccTypeId != null ? $scope.SpecialOfferModel.AccTypeId.Value : null;
                $scope.SpecialOfferModel.DefineServiceId = $scope.SpecialOfferModel.DefineServiceId != null ? $scope.SpecialOfferModel.DefineServiceId.Value : null;
                $scope.SpecialOfferModel.RateTypeId = $scope.SpecialOfferModel.RateTypeId != null ? $scope.SpecialOfferModel.RateTypeId.Value : null;
                $scope.SpecialOfferModel.DistrictId = $scope.SpecialOfferModel.DistrictId != null ? $scope.SpecialOfferModel.DistrictId.Value : null;
                var data = { 'data': JSON.stringify($scope.SpecialOfferModel) };
                $http.post('SpecialOffers/Edit', data, config)
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
        $scope.changeSpecialOffer = function (index) {
            debugger;
            var data = $scope.SpecialOfferList[index];
            $scope.SpecialOfferModel = angular.copy(data);

            $scope.SpecialOfferModel.StartDate = new Date(data.StartDate);
            $scope.SpecialOfferModel.EndDate = new Date(data.EndDate);

            accessArrayOfJsonObjectByKeyValueCusType($scope.CustomerTypeForDD, data.AccTypeId);
            $scope.SpecialOfferModel.AccTypeId = $scope.selectedCusTypeForDD;

            accessArrayOfJsonObjectByKeyValueService($scope.ServiceForDD, data.DefineServiceId);
            $scope.SpecialOfferModel.DefineServiceId = $scope.selectedServiceForDD;

            accessArrayOfJsonObjectByKeyValueRateType($scope.ChargeRateTypeForDD, data.RateTypeId);
            $scope.SpecialOfferModel.RateTypeId = $scope.selectedRateForDD;

            accessArrayOfJsonObjectByKeyValueDisctrict($scope.DistrictInfoForDD, data.DistrictId);
            $scope.SpecialOfferModel.DistrictId = $scope.selectedDistrictForDD;

            $scope.originalData = angular.copy($scope.SpecialOfferModel);

            $scope.SubmitBtn = "Update";
        };


        function accessArrayOfJsonObjectByKeyValueCusType(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedCusTypeForDD = object;
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

        function accessArrayOfJsonObjectByKeyValueRateType(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedRateForDD = object;
                }
            });
        }

        function accessArrayOfJsonObjectByKeyValueDisctrict(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedDistrictForDD = object;
                }
            });
        }

      
        $scope.deleteSpecialOffer = function (index) {
            if (confirm("Want To Delete?") == true) {
                var data = { 'data': JSON.stringify($scope.SpecialOfferList[index]) };
                $http.post('SpecialOffers/Delete', data, config)
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
        
        $scope.ClearFields = function () {
            $scope.SpecialOfferModel.OfferId = "";
            $scope.SpecialOfferModel.OfferName = "";
            $scope.SpecialOfferModel.DefineServiceId = "";
            $scope.SpecialOfferModel.RateTypeId = "";
            $scope.SpecialOfferModel.RateAmount = "";
            $scope.SpecialOfferModel.RatePersent = "";
            $scope.SpecialOfferModel.MinAmount = "";
            $scope.SpecialOfferModel.MaxAmount = "";
            $scope.SpecialOfferModel.AccTypeId = "";
            $scope.SpecialOfferModel.StartDate = "";
            $scope.SpecialOfferModel.EndDate = "";
            $scope.SpecialOfferModel.glAccount = "";
            $scope.SpecialOfferModel.offerMessage = "";
            $scope.SpecialOfferModel.DistrictId = "";
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