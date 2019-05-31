(function () {
    'use strict';

    angular.module('mTakaAPP.pages.UserProfile')
        .controller('UserProfileCtrl', UserProfileCtrl);

    function UserProfileCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {

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

        $scope.UserProfileModel = {};
        $scope.UserProfileModel.CusCategoryId = null;
        var gender = null;

        var MTKSession = JSON.parse(sessionStorage.MTKSession);
        $scope.UserProfileModel.WalletAccountNo = (MTKSession != null && MTKSession.CurrentUserId != null) ? MTKSession.CurrentUserId : null;

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        var data = { 'data': JSON.stringify($scope.UserProfileModel) };
        $http.post('CustomerAccProfile/UserInfo', data, config)
            .then(
            function (response) {
                //console.log(response.data[0].UserName);
                $scope.UserProfileModel = response.data[0];
                //gender = response.data[0].Gender;
                //.UserProfileModel.Address = response.data[0].PresentAddress1
            }
        );

        $scope.GetGender = function () {

            $http.get('CommonService/GetAllGender').success(function (json) {
                $scope.GenderForDD = json;
            });
        };
        $scope.GetGender();

        $scope.showSuccessMsg = function (_Msg) {
            toastr.success(_Msg);
        };
        $scope.showErrorMsg = function (_Msg) {
            toastr.error(_Msg);
        };
    }
})();