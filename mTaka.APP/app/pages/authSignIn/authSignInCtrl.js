(function () {
    'use strict';

    angular.module('mTakaAPP.pages.authSignIn')
        .controller('authSignInCtrl', authSignInCtrl);

    /** @ngInject */
    function authSignInCtrl($scope, localStorage, $http, $state, $rootScope, $stateParams, toastr, $location, authenticationToken) {
        $scope.authSignIn = {};

        //Idle.watch();
        //Function to Login. This will generate Token 
        $scope.login = function () {
            //This is the information to pass for token based authentication
            var userLogin = {
                grant_type: 'password',
                username: $scope.authSignIn.UserId,
                password: $scope.authSignIn.Password
            };

            var promiselogin = authenticationToken.login(userLogin);

            promiselogin.then(function (resp) {
                $scope.userName = resp.data.userName;
                //Store the token information in the SessionStorage
                //So that it can be accessed for other views
                sessionStorage.setItem('userName', resp.data.userName);
                sessionStorage.setItem('accessToken', resp.data.access_token);
                sessionStorage.setItem('refreshToken', resp.data.refresh_token);

            }, function (err) {

                $scope.responseData = "Error " + err.status;
            });

        };

        $scope.addData = function () {
            var data = { 'data': JSON.stringify($scope.authSignIn) };
            $http.post('SignIn/Create', data, config)
                .then(
                function (response) {
                    //debugger;
                    //$scope.loadData();
                    //$scope.ClearFields();
                    //if (response.data.Result == 1)
                    //    $scope.showSuccessMsg(response.data.ResponseMessage);
                    //$scope.loadData();
                    //$scope.ClearFields();

                    if (response.data.Result == "1") {
                        $rootScope.authentic = true;
                        //$scope.login(); For Call Token base Authentication
                        var abc = response.data.MTKSession;
                        sessionStorage.MTKSession = JSON.stringify(response.data.MTKSession); 
                        $location.path("/main");
                        //$window.location.href = '/main/main.html';
                        //$scope.showSuccessMsg(response.data.ResponseMessage);
                    }
                    //else if (response.data.Result == "4")   //it will be open
                    //{
                    //    $location.path("/PasswordChange");
                    //}
                    else
                        $scope.showErrorMsg(response.data.ResponseMessage);
                }
                );
        };



        $rootScope.$on('$stateChangeSuccess',
          function (event, toState, toParams, fromState, fromParams) {
              $state.current = toState;
          })
        //console.log($state.current);


        $scope.ActivityLogModel = {};
        $rootScope.$state = $state
        $rootScope.$stateParams = $stateParams;

        $rootScope.ActivityLogIndex = function () {
            console.log($rootScope.$state);
            $scope.ActivityLogModel.IpAddress = "172.68.0.1";//get Form session;
            $scope.ActivityLogModel.BranchId = "185";//get Form session;
            $scope.ActivityLogModel.WalletAccountNo = "10224574221";//get Form session;
            $scope.ActivityLogModel.UserId = "00124";//get Form session;
            $scope.ActivityLogModel.Action = "Form: " + sessionStorage.OldState + " To " + $rootScope.$state.current.name + "/Index";
            var data = { 'data': JSON.stringify($scope.ActivityLogModel) };
            $http.post('UserActivityLog/Create', data, config).then(
                function (response) {
                },
                function (response) {
                }
            );
            sessionStorage.OldState = $rootScope.$state.current.name + "/Index";
            //$rootScope.OldState = JSON.parse(sessionStorage.OldState);
        };
        $rootScope.ActivityLogIndex();

        $rootScope.ActivityLogEdit = function () {
            $scope.ActivityLogModel.IpAddress = "172.68.0.1";//get Form session;
            $scope.ActivityLogModel.BranchId = "185";//get Form session;
            $scope.ActivityLogModel.WalletAccountNo = "10224574221";//get Form session;
            $scope.ActivityLogModel.UserId = "00124";//get Form session;
            $scope.ActivityLogModel.Action = "Form: " + sessionStorage.OldState + " To " + $rootScope.$state.current.name + "/Edit" + "/" + $scope.ActivityLogModel.indexValue;
            var data = { 'data': JSON.stringify($scope.ActivityLogModel) };
            $http.post('UserActivityLog/Create', data, config).then(
                function (response) {
                },
                function (response) {
                }
            );
            sessionStorage.OldState = $rootScope.$state.current.name + "/Edit";
            //$rootScope.OldState = JSON.parse(sessionStorage.OldState);
        };

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        var vm = this;
        vm.logar = logar;
        init();

        function init() {
            localStorage.clear();
        }

        function logar() {
            var dadosUser = {
                user: vm.user,
                passWord: vm.passWord
            };
            localStorage.setObject('dataUser', dadosUser);
            $state.go('authSignIn');
        }

        $scope.showSuccessMsg = function (_Msg) {
            toastr.success(_Msg);
        };
        $scope.showErrorMsg = function (_Msg) {
            toastr.error(_Msg);
        };
    }

})();