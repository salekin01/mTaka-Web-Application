(function () {
    'use strict';

    angular.module('mTakaAPP.pages.UnionInfo')
        .controller('UnionInfoCtrl', UnionInfoCtrl);

    function UnionInfoCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
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
        console.log("Extra Perams");
        console.log($stateParams);
       
        $scope.UnionInfoModel = {};
        $scope.UnionInfoModel.UpazilaId = null;
        $scope.SubmitBtn = "Add";
        $scope.GetUpazilaInfoForDD = function () {
           
            $http.get('UpazilaInfo/GetUpazilaInfoForDD').success(function (json) {
                $scope.UpazilaInfoForDD = json;
            });
        };
        $scope.GetUpazilaInfoForDD();

        $scope.loadData = function () {
            debugger;
            //var accesstoken = sessionStorage.getItem('accessToken');
            //var authHeaders = {};
            //if (accesstoken) {
            //    authHeaders.Authorization = 'Bearer ' + accesstoken;

            //}
            //var config = {
            //    headers: {
            //        'Content-Type': 'application/json;',
            //        'headers': authHeaders
            //    }
            //}
            //var data = { 'data': JSON.stringify(authHeaders) };
            $http.get('UnionInfo/Index').success(function (json) {
              
                $scope.UnionInfoList = json;
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
                $scope.UnionInfoModel.UpazilaId = $scope.UnionInfoModel.UpazilaId.Value;
                $scope.UnionInfoModel.FunctionId = FunctionId;
                var data = { 'data': JSON.stringify($scope.UnionInfoModel) };
                $http.post('UnionInfo/Create', data, config)
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
                
                $scope.UnionInfoModel.UpazilaId = $scope.UnionInfoModel.UpazilaId.Value;
                $scope.UnionInfoModel.FunctionId = FunctionId;
                var data = { 'data': JSON.stringify($scope.UnionInfoModel) };
                $http.post('UnionInfo/Edit', data, config)
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
        $scope.changeUnionInfo = function (index) {
            var data = $scope.UnionInfoList[index];
            $scope.UnionInfoModel.UnionId = data.UnionId;
            $scope.UnionInfoModel.UnionNm = data.UnionNm;
            $scope.UnionInfoModel.UnionShortNm = data.UnionShortNm;
            accessArrayOfJsonObjectByKeyValue($scope.UpazilaInfoForDD, data.UpazilaId);
            $scope.UnionInfoModel.UpazilaId = $scope.selectedUpazilaInfoDD;
            $scope.SubmitBtn = "Update";
        };
        $scope.deleteUnionInfo = function (index) {
            var data = { 'data': JSON.stringify($scope.UnionInfoList[index]) };
            $http.post('UnionInfo/Delete', data, config)
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
            $scope.UnionInfoModel.UnionId = "";
            $scope.UnionInfoModel.UnionNm = "";
            $scope.UnionInfoModel.UnionShortNm = "";
            $scope.UnionInfoModel.UpazilaId = "";
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