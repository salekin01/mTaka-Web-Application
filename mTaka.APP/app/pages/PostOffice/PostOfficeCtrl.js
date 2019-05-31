(function () {
    'use strict';

    angular.module('mTakaAPP.pages.PostOffice')
        .controller('PostOfficeCtrl', PostOfficeCtrl);

    function PostOfficeCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
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

        $scope.PostOfficeModel = {};
        $scope.SubmitBtn = "Add";
        $scope.GetUpazilaInfoForDD = function () {
            $http.get('UpazilaInfo/GetUpazilaInfoForDD').success(function (json) {
                $scope.UpazilaForDD = json;
            });
        };
        $scope.GetUpazilaInfoForDD();

        $scope.loadData = function () {
            $http.get('PostOffice/Index').success(function (json) {
                $scope.PostOfficeList = json;
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
                $scope.PostOfficeModel.FunctionId = FunctionId;
                $scope.PostOfficeModel.UpazilaId = $scope.PostOfficeModel.UpazilaId.Value;
                var data = { 'data': JSON.stringify($scope.PostOfficeModel) };
                $http.post('PostOffice/Create', data, config)
                    .then(
                    function (response) {
                        debugger;
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
                $scope.PostOfficeModel.FunctionId = FunctionId;
                    $scope.PostOfficeModel.UpazilaId = $scope.PostOfficeModel.UpazilaId.Value;
                    var data = { 'data': JSON.stringify($scope.PostOfficeModel) };
                    $http.post('PostOffice/Edit', data, config)
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
        $scope.changePostOffice = function (index) {
                var data = $scope.PostOfficeList[index];
                $scope.PostOfficeModel.PostOfficeId = data.PostOfficeId;
                $scope.PostOfficeModel.PostOfficeNM = data.PostOfficeNM;
                $scope.PostOfficeModel.PostOfficeShortNM = data.PostOfficeShortNM;
                accessArrayOfJsonObjectByKeyValue($scope.UpazilaForDD, data.UpazilaId);
                $scope.PostOfficeModel.UpazilaId = $scope.selectedUpazilaForDD;
                $scope.SubmitBtn = "Update";
            };
        $scope.deletePostOffice = function (index) {
            var data = { 'data': JSON.stringify($scope.PostOfficeList[index]) };
            $http.post('PostOffice/Delete', data, config)
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
                        $scope.selectedUpazilaForDD = object;
                    }
                });
            }

            $scope.showSuccessMsg = function (_Msg) {
                toastr.success(_Msg);
            };
            $scope.showErrorMsg = function (_Msg) {
                toastr.error(_Msg);
            };;

            $scope.ClearFields = function () {
                $scope.PostOfficeModel.PostOfficeId = "";
                $scope.PostOfficeModel.PostOfficeNM = "";
                $scope.PostOfficeModel.PostOfficeShortNM = "";
                $scope.PostOfficeModel.UpazilaId = "";
                $scope.SubmitBtn = "Add";
            };
        
    }
})();