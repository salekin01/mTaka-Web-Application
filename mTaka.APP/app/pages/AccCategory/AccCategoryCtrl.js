(function () {
    'use strict';

    angular.module('mTakaAPP.pages.AccCategory')
        .controller('AccCategoryCtrl', AccCategoryCtrl);


    function AccCategoryCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

        var FunctionId = getFunctionId.FunctionId($rootScope.menuList, $state);
        $rootScope.$on('$stateChangeSuccess',
          function (event, toState, toParams, fromState, fromParams) {
              $state.current = toState;
          })        

        $state.go($state.current.name, { funtionid: FunctionId });

        console.log($state.current);
        console.log("Extra Perams");
        console.log($stateParams);


        $scope.loadData = function () {
            $http.post('AccCategory/GetAccCategory').success(function (json) {
                $scope.AccCategory = json;
                $rootScope.ActivityLogIndex();
            });
        };

        $scope.loadData();       
        $scope.AccCategoryModel = {};
        $scope.AccCategoryModel.FunctionId = null;
        $scope.SubmitBtn = "Add";

        $scope.AccCategoryModel.UserName = $rootScope.UserName;

        var config = {
           headers: {
                'Content-Type': 'application/json;'
            }
        }

        $scope.adddata = function () {            

            if ($scope.SubmitBtn === "Add") {
                debugger;
                $scope.AccCategoryModel.FunctionId = FunctionId;
                var data = { 'data': JSON.stringify($scope.AccCategoryModel) };
                $http.post('AccCategory/AddAccCategory', data, config)
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
                $scope.AccCategoryModel.FunctionId = FunctionId;
                var data = { 'data': JSON.stringify($scope.AccCategoryModel) };
                $http.post('AccCategory/EditAccCategory', data, config)
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

        $scope.deleteAccCategory = function (index) {            
            var data = { 'data': JSON.stringify($scope.AccCategory[index]) };
            $http.post('AccCategory/DeleteAccCategory', data, config)
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

        $scope.changeAccCategory = function (index) {
            var data = $scope.AccCategory[index];
            $scope.AccCategoryModel.AccCategoryId = data.AccCategoryId;
            $scope.AccCategoryModel.AccCategoryNm = data.AccCategoryNm;
            $scope.SubmitBtn = "Update";
        };

        $scope.ClearFields = function () {

            $scope.AccCategoryModel.AccCategoryId = "";
            $scope.AccCategoryModel.AccCategoryNm = "";
            $scope.SubmitBtn = "Add";
        };


        //directive('myCustomValidation', [function () {
        //    return {
        //        restrict: 'A',
        //        require: 'ngModel',
        //        link: function (scope, el, att, ngModel) {
        //            ngModel.$validators['my-custom-validation'] = function (theName) {
        //                if (theName.length < 5) {
        //                    return false;
        //                }
        //                return true;
        //            }
        //        }
        //    }
        //}])
        //;

        $scope.showSuccessMsg = function (_Msg) {
            toastr.success(_Msg);
        };
        $scope.showErrorMsg = function (_Msg) {
            toastr.error(_Msg);
        };

    }


})();