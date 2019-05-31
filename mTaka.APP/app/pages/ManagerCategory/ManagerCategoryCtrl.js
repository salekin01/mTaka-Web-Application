(function () {
    'use strict';

    angular.module('mTakaAPP.pages.ManagerCategory')
        .controller('ManagerCategoryCtrl', ManagerCategoryCtrl);


    function ManagerCategoryCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
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

        $scope.ManagerCategory = {};
        $scope.SubmitBtn = "Add";

        $scope.ManagerCategory.FunctionId = FunctionId;
        $scope.ManagerCategory.UserName = $rootScope.UserName;


        $scope.loadData = function () {
            $http.get('ManagerCategory/Index').success(function (json) {
                $scope.ManagerCategoryList = json;
                //$scope.ActivityLog();
            });
        };
        $scope.loadData();


        //$scope.ActivityLog = function () {
        //    $scope.ManagerCategory.IpAddress = "172.68.0.1";//get Form session;
        //    $scope.ManagerCategory.BranchId = "185";//get Form session;
        //    $scope.ManagerCategory.AccountNo = "10224574221";//get Form session;
        //    $scope.ManagerCategory.UserId = "00124";//get Form session;
        //    $scope.ManagerCategory.Action = "Form:ManagerCategory To ManagerCategory/Index";
        //    var data = { 'data': JSON.stringify($scope.ManagerCategory) };
        //    $http.post('UserActivityLog/Create', data, config).then(
        //         function (response) {
        //         },
        //         function (response) {
        //         }
        //         );
        //};


        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        $scope.adddata = function () {
            if ($scope.SubmitBtn === "Add") {
                //$scope.ManagerCategory.FunctionId = FunctionId;
                var data = { 'data': JSON.stringify($scope.ManagerCategory) };
                $http.post('ManagerCategory/Create', data, config)
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
                //$scope.ManagerCategory.FunctionId = FunctionId;
                var data = { 'data': JSON.stringify($scope.ManagerCategory) };
                $http.post('ManagerCategory/Edit', data, config)
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

        $scope.deleteManagerCategory = function (index) {
            var data = { 'data': JSON.stringify($scope.ManagerCategoryList[index]) };
            $http.post('ManagerCategory/Delete', data, config)
                .then(
                function (response) {

                    $scope.getnewdata = $scope.loadData();
                    var cltFld = $scope.ClearFields();                },
                function (response) {
                    var error = $scope.showErrorMsg();
                }
                );
        };

        $scope.changeManagerCategory = function (index) {
            var data = $scope.ManagerCategoryList[index];
            $scope.ManagerCategory.ManagerCategoryId = data.ManagerCategoryId;
            $scope.ManagerCategory.ManagerCategoryNm = data.ManagerCategoryNm;
            $scope.SubmitBtn = "Update";
        };

        $scope.ClearFields = function () {

            $scope.ManagerCategory.ManagerCategoryId = "";
            $scope.ManagerCategory.ManagerCategoryNm = "";
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