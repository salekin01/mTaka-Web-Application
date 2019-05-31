(function () {
    'use strict';

    angular.module('mTakaAPP.pages.AccLimit')
        .controller('AccLimitCtrl', AccLimitCtrl);

    function AccLimitCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
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


        $scope.AccLimitModel = {};
        $scope.SubmitBtn = "Add";

        $scope.GetAccCategoryForDD = function () {
            $http.get('AccCategory/GetAccCategoryForDD').success(function (json) {
                $scope.AccCategoryForDD = json;

            });
        };
        $scope.GetAccCategoryForDD();

        $scope.GetAccTypeForDD = function () {
            $http.get('AccType/GetAccTypeForDD').success(function (json) {
                $scope.AccTypeForDD = json;
            });
        };
        $scope.GetAccTypeForDD();

        $scope.GetDefineServiceForDD = function () {
            //$http.get('DefineService/GetDefineServiceForDD').success(function (json) 
            $http.get('DefineService/GetDefineServiceForDD').success(function (json) {
                $scope.DefineServiceForDD = json;
            });
        };
        $scope.GetDefineServiceForDD();

        if ($scope.AllAccCategory == true) {
        }
        $scope.loadData = function () {
            $http.get('AccountLimit/Index').success(function (json) {
                $scope.AcclimitList = json;
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
                $scope.AccLimitModel.FunctionId = FunctionId;
                    $scope.AccLimitModel.AccCategoryId = $scope.AccLimitModel.AccCategoryId != null ? $scope.AccLimitModel.AccCategoryId.Value : null;
                    $scope.AccLimitModel.AccTypeId = $scope.AccLimitModel.AccTypeId != null ? $scope.AccLimitModel.AccTypeId.Value : null;
                    $scope.AccLimitModel.DefineServiceId = $scope.AccLimitModel.DefineServiceId != null ? $scope.AccLimitModel.DefineServiceId.Value : null;
                    var data = { 'data': JSON.stringify($scope.AccLimitModel) };
                $http.post('AccountLimit/Create', data, config)
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
                $scope.AccLimitModel.AccCategoryId = $scope.AccLimitModel.AccCategoryId.Value;
                $scope.AccLimitModel.AccTypeId = $scope.AccLimitModel.AccTypeId.Value;
                $scope.AccLimitModel.DefineServiceId = $scope.AccLimitModel.DefineServiceId.Value;
                var data = { 'data': JSON.stringify($scope.AccLimitModel) };
                $http.post('AccountLimit/Edit', data, config)
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
        $scope.changeAccLimit = function (index) {
            var data = $scope.AcclimitList[index];
            $scope.AccLimitModel.AccLimitId = data.AccLimitId;
            $scope.AccLimitModel.NoOfOccurrence = data.NoOfOccurrence;
            $scope.AccLimitModel.AmountOfOccurrence = data.AmountOfOccurrence;
            $scope.AccLimitModel.AmountOftotalOccurrences = data.AmountOftotalOccurrences;
            $scope.AccLimitModel.AllAccCategory = data.AllAccCategory;
            $scope.AccLimitModel.AllAccType = data.AllAccType;
            $scope.AccLimitModel.AllDefineService = data.AllDefineService;
            SelectedAccountCategoryFromJson($scope.AccCategoryForDD, data.AccCategoryId);
            $scope.AccLimitModel.AccCategoryId = $scope.selectedAccCategoryForDD;

            SelectedAccountTypeFromJson($scope.AccTypeForDD, data.AccTypeId);
            $scope.AccLimitModel.AccTypeId = $scope.selectedAccTypeForDD;

            SelectedDefineServiceFromJson($scope.DefineServiceForDD, data.DefineServiceId);
            $scope.AccLimitModel.DefineServiceId = $scope.selectedDefineServiceForDD;

            $scope.SubmitBtn = "Update";
        };

        function SelectedAccountCategoryFromJson(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedAccCategoryForDD = object;
                }
            });
        }

        function SelectedAccountTypeFromJson(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedAccTypeForDD = object;
                }
            });
        }

        function SelectedDefineServiceFromJson(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedDefineServiceForDD = object;
                }
            });
        }


        $scope.deleteAccLimit = function (index) {
            var data = { 'data': JSON.stringify($scope.AcclimitList[index]) };
            $http.post('AccountLimit/Delete', data, config)
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
            $scope.AccLimitModel.AccLimitId = "";
            $scope.AccLimitModel.AccCategoryId = "";
            $scope.AccLimitModel.AccTypeId = "";
            $scope.AccLimitModel.DefineServiceId = "";
            $scope.AccLimitModel.NoOfOccurrence = "";
            $scope.AccLimitModel.AmountOfOccurrence = "";
            $scope.AccLimitModel.AmountOftotalOccurrences = "";
            $scope.AccLimitModel.AllAccCategory = "";
            $scope.AccLimitModel.AllAccType = "";
            $scope.AccLimitModel.AllDefineService = "";
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