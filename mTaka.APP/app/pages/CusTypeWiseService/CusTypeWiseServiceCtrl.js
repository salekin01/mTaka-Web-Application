(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CusTypeWiseService')
        .controller('CusTypeWiseServiceCtrl', CusTypeWiseServiceCtrl);

    function CusTypeWiseServiceCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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

        //There is an incomplete loop.... 
        $scope.CusTypeWiseServiceModel = {};

        $scope.CusTypeWiseServiceModel.FunctionId = FunctionId;
        $scope.CusTypeWiseServiceModel.UserName = $rootScope.UserName;

        //$scope.CusTypeWiseServiceModel.DefineServiceArray = null;

        // $scope.CusTypeWiseServiceModel.AccCategoryId = ;
        $scope.AccountTypeForDDTemp = {};
        $scope.SubmitBtn = "Add";

        $scope.GetAccCategoryForDD = function () {
            $http.get('AccCategory/GetAccCategoryForDD').success(function (json) {
                $scope.AccCategoryForDD = json;
            });
        };
        $scope.GetAccCategoryForDD();


        $scope.GetDefineServiceForDD = function () {
            $http.get('DefineService/GetDefineServiceForDD').success(function (json) {
                $scope.AccountServiceForDD = json;
            });
        };
        $scope.GetDefineServiceForDD();


        //Test cascading

        //$scope.GetCusTypeForDDNew = function () {
        //    $http.get('CusType/GetCusTypeForDD').success(function (json) {
        //        $scope.AccountTypeForDD = json;
        //        $scope.newLoopLength = $scope.AccountTypeForDD.length;


        //        for (var i = 0; i < $scope.newLoopLength ; i++) {
        //            //if()
        //            //$scope.AccCategoryForDD=$scope.
        //        }
        //    });
        //};
        //$scope.GetCusTypeForDDNew();

        $scope.onSelected = function (selectedItem) {
            $scope.CusTypeWiseServiceModel.AccTypeId = "";
            $scope.AccCategoryId = selectedItem.Value;
            var data = { 'data': JSON.stringify(selectedItem.Value) };
            $http.post('CusTypeWiseService/CusTypeForAccCategory', data, config).success(function (json) {
                $scope.AccountTypeForDD = json;
            });
        };

        $scope.loadData = function () {
            $http.get('CusTypeWiseService/Index').success(function (json) {
                $scope.CusTypeWiseServiceList = json;
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
                $scope.CusTypeWiseServiceModel.FunctionId = FunctionId;
                $scope.CusTypeWiseServiceModel.AccCategoryId = $scope.CusTypeWiseServiceModel.AccCategoryId != null ? $scope.CusTypeWiseServiceModel.AccCategoryId.Value : null;
                $scope.CusTypeWiseServiceModel.AccTypeId = $scope.CusTypeWiseServiceModel.AccTypeId != null ? $scope.CusTypeWiseServiceModel.AccTypeId.Value : null;
                $scope.CusTypeWiseServiceModel.DefineServiceId = ($scope.CusTypeWiseServiceModel.DefineServiceArray != null && $scope.CusTypeWiseServiceModel.DefineServiceArray.length > 0) ? $scope.CusTypeWiseServiceModel.DefineServiceArray[0].Value : null;
                var data = { 'data': JSON.stringify($scope.CusTypeWiseServiceModel) };
                $http.post('CusTypeWiseService/Create', data, config)
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

            // This will happen in API...
            //$scope.LoopLength = $scope.CusTypeWiseServiceModel.DefineServiceArray.length;
            //for (var i = 0; i < $scope.LoopLength ; i++) {
            //    $scope.CusTypeWiseServiceModel.DefineServiceId = $scope.CusTypeWiseServiceModel.DefineServiceArray[i].Value;
            //    var data = { 'data': JSON.stringify($scope.CusTypeWiseServiceModel) };
            //    $http.post('CusTypeWiseService/Create', data, config)
            //        .then(
            //        function (response) {
            //            debugger; 
            //            $scope.loadData();
            //            $scope.ClearFields();
            //            if (response.data.Result == 1)
            //                $scope.showSuccessMsg(response.data.ResponseMessage);
            //            else
            //                $scope.showErrorMsg(response.data.ResponseMessage);
            //        }
            //      );
            //}

            else if ($scope.SubmitBtn === "Update") {
                $scope.CusTypeWiseServiceModel.FunctionId = FunctionId;
                $scope.CusTypeWiseServiceModel.AccCategoryId = $scope.CusTypeWiseServiceModel.AccCategoryId != null ? $scope.CusTypeWiseServiceModel.AccCategoryId.Value : null;
                $scope.CusTypeWiseServiceModel.AccTypeId = $scope.CusTypeWiseServiceModel.AccTypeId != null ? $scope.CusTypeWiseServiceModel.AccTypeId.Value : null;

                $scope.LoopLength = $scope.CusTypeWiseServiceModel.DefineServiceId.length;
                for (var i = 0; i < $scope.LoopLength; i++) {
                    $scope.CusTypeWiseServiceModel.DefineServiceId = $scope.CusTypeWiseServiceModel.DefineServiceId[i].Value;
                    var data = { 'data': JSON.stringify($scope.CusTypeWiseServiceModel) };
                    $http.post('CusTypeWiseService/Edit', data, config)
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
            }
        };
        $scope.changeCusTypeWiseService = function (index) {
            var data = $scope.CusTypeWiseServiceList[index];
            $scope.CusTypeWiseServiceModel.CusTypeWiseServiceId = data.CusTypeWiseServiceId;

            accessArrayOfJsonObjectByKeyValueAccountType($scope.AccountTypeForDD, data.AccTypeId);
            $scope.CusTypeWiseServiceModel.AccTypeId = $scope.selecteAccountTypeForDD;
            //alert("Hello");

            //accessArrayOfJsonObjectByKeyValueAccountService($scope.AccountTypeForDD, data.DefineServiceId);
            //$scope.CusTypeWiseServiceModel.DefineServiceId = $scope.selecteAccountTypeForDD;

            accessArrayOfJsonObjectByKeyValueAccCategory($scope.AccCategoryForDD, data.AccCategoryId);
            $scope.CusTypeWiseServiceModel.AccCategoryId = $scope.selecteAccCategoryForDD;

            $scope.SubmitBtn = "Update";
        };


        function accessArrayOfJsonObjectByKeyValueAccountType(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteAccountTypeForDD = object;
                }
            });
        }

        //function accessArrayOfJsonObjectByKeyValueAccountService(Array, keyValue) {
        //    Array.forEach(function (object) {
        //        if (object.Value == keyValue) {
        //            $scope.selecteAccountTypeForDD = object;
        //        }
        //    });
        //}

        function accessArrayOfJsonObjectByKeyValueAccCategory(Array, keyValue) {
            if (keyValue == null) {
                $scope.selecteAccCategoryForDD = "";
            }
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selecteAccCategoryForDD = object;
                }
            });
        }


        $scope.deleteCusTypeWiseService = function (index) {
            var data = { 'data': JSON.stringify($scope.CusTypeWiseServiceList[index]) };

            $http.post('CusTypeWiseService/Delete', data, config)
                .then(
                function (response) {
                    $scope.loadData();
                    $scope.ClearFields();
                    $scope.showSuccessMsg();
                },
                function (response) {
                    $scope.showErrorMsg();
                }
                );
        };


        $scope.ClearFields = function () {
            $scope.CusTypeWiseServiceModel.AccTypeId = "";
            $scope.CusTypeWiseServiceModel.DefineServiceArray = "";
            $scope.CusTypeWiseServiceModel.AccCategoryId = "";
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