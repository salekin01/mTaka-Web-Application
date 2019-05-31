(function () {
    'use strict';
    angular.module('mTakaAPP.pages.PromoCodeConfig')
        .controller('PromoCodeConfigCtrl', PromoCodeConfigCtrl);

    function PromoCodeConfigCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
        debugger;
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

        function loadData() {
            debugger;
            $http.get('PromoCodeConfig/Index').success(function (json) {
                $scope.PromoCodeConfigList = json;
            });
        };
        loadData();
        $scope.PromoCodeConfigModel = {};
        $scope.SubmitBtn = "Add";

        $scope.GetTokenFormatForDD = function () {
            $http.get('CommonService/GetTokenFormatForDD').success(function (json) {
                $scope.TokenFormatForDD = json;
            });
        };
        $scope.GetTokenFormatForDD();

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        $scope.addData = function () {
            debugger;
            if ($scope.SubmitBtn === "Add") {
                $scope.PromoCodeConfigModel.FunctionId = FunctionId;
                $scope.PromoCodeConfigModel.TokenFormatId = $scope.PromoCodeConfigModel.TokenFormatId.Value;
                var data = { 'data': JSON.stringify($scope.PromoCodeConfigModel) };
                $http.post('PromoCodeConfig/Create', data, config)
                    .then(
                    function (response) {
                        debugger;
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
            else if ($scope.SubmitBtn === "Update") {
                $scope.PromoCodeConfigModel.FunctionId = FunctionId;
                $scope.PromoCodeConfigModel.TokenFormatId = $scope.PromoCodeConfigModel.TokenFormatId.Value;
                var data = { 'data': JSON.stringify($scope.PromoCodeConfigModel) };
                $http.post('PromoCodeConfig/Edit', data, config)
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

        $scope.deletePromoCodeConfig = function (index) {
            var data = { 'data': JSON.stringify($scope.define_service[index]) };
            $http.post('PromoCodeConfig/Delete', data, config)
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
        };

        $scope.changePromoCodeConfig = function (index) {
            var data = $scope.define_service[index];
            $scope.PromoCodeConfigModel.ConfigurationId = data.ConfigurationId;
            $scope.PromoCodeConfigModel.IntroducerControlFlag = data.IntroducerControlFlag;
            $scope.PromoCodeConfigModel.EmailFlag = data.EmailFlag;
            $scope.PromoCodeConfigModel.SMSFlag = data.SMSFlag;
            $scope.PromoCodeConfigModel.PromoCodeLength = data.PromoCodeLength;
            accessArrayOfJsonObjectByKeyValueTokenFormat($scope.TokenFormatForDD, data.TokenFormatId);
            $scope.StatusWiseServiceModel.TokenFormatId = $scope.selectedTokenFormatDD;
            $scope.PromoCodeConfigModel.TokenFormatId = data.TokenFormatId;
            $scope.PromoCodeConfigModel.TotalNoOfUseForIntroducer = data.TotalNoOfUseForIntroducer;
            $scope.PromoCodeConfigModel.TotalNoOfUse = data.TotalNoOfUse;
            $scope.SubmitBtn = "Update";
        };

        function accessArrayOfJsonObjectByKeyValueTokenFormat(Array, keyValue) {
            debugger;
            Array.forEach(function (object) {
                debugger;
                if (object.Value == keyValue) {
                    $scope.selectedTokenFormatDD = object;
                }
            });
        }

        $scope.ClearFields = function () {
            $scope.PromoCodeConfigModel.ConfigurationId = "";
            $scope.PromoCodeConfigModel.IntroducerControlFlag = "";
            $scope.PromoCodeConfigModel.EmailFlag = "";
            $scope.PromoCodeConfigModel.SMSFlag = "";
            $scope.PromoCodeConfigModel.PromoCodeLength = "";
            $scope.PromoCodeConfigModel.TokenFormatId = "";
            $scope.PromoCodeConfigModel.TotalNoOfUseForIntroducer = "";
            $scope.PromoCodeConfigModel.TotalNoOfUse = "";
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