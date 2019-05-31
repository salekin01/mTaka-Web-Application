//pageTopCtrl.js Adeed by salekin - 21.01.2018

(function () {
    'use strict';

    angular.module('mTakaAPP.theme.components')
        .controller('pageTopCtrl', pageTopCtrl);

    /** @ngInject */
    function pageTopCtrl($scope, $location, $http, $rootScope) {
        var vm = this;
        $scope.propic = null;

        vm.Logout = function () {
            $http.post('SignIn/Logout').success(function (data) {
                if (data == "1") {
                    $location.path("/authSignIn");
                    $rootScope.menuList = null;
                }
            });
        };

        $rootScope.UserProfileModel = {};
        $scope.UserProfileModel.CusCategoryId = null;
        $rootScope.UserName = null;

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
                $scope.propic = response.data[0].WalletAccountNo+".png";
                console.log(response.data[0].WalletAccountNo);
                $rootScope.UserProfileModel = response.data[0];
                $rootScope.UserName = response.data[0].UserName;
                //.UserProfileModel.Address = response.data[0].PresentAddress1
            }
        );

        vm.Profile = function () {
            $location.path("/UserProfile");
            $rootScope.menuList = null;
        };
    }
})();