
(function () {
    'use strict';

    angular.module('mTakaAPP.theme')
        .service('authenticationToken', authenticationToken);

    function authenticationToken($http) {

        return {
            login: function (userlogin) {
                var resp =  $http({
                    url: "http://localhost:50380/TOKEN",
                    method: "POST",
                    data: $.param({ grant_type: 'password', username: userlogin.username, password: userlogin.password }),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                });
                return resp;
            }
        };

    }
})();