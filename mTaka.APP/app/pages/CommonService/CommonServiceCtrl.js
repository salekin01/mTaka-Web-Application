(function () {
    'use strict';

    angular.module('mTakaAPP.pages.CommonService')
        .controller('CommonServiceCtrl', CommonServiceCtrl);

    function CommonServiceCtrl($scope, $http, toastr) {
        $scope.CommonServiceModel = {};
        $scope.CommonServiceModel.ServiceType = {};
        $scope.SubmitBtn = "Add";

        $scope.CommonServiceModel.FunctionId = FunctionId;
        $scope.CommonServiceModel.UserName = $rootScope.UserName;

        $scope.ServiceTypeForDD =
            [{
                "Text": "Address",
                "Value": "0",
                "Selected": false
            },
            {
                "Text": "Gender",
                "Value": "1",
                "Selected": false
            },
            {
                "Text": "Nationality",
                "Value": "2",
                "Selected": false
            }
            ];

        $scope.loadData = function () {
            
        };
        $scope.loadData();

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        debugger;
        $scope.addData = function () {
            if ($scope.SubmitBtn === "Add") {
                debugger;
                $scope.CommonServiceModel.ServiceType = $scope.CommonServiceModel.ServiceType.Value;
                //$scope.CommonServiceModel.ServiceType = $scope.CommonServiceModel.ServiceType != null ? $scope.CommonServiceModel.ServiceType.Value : null;
                var data = { 'data': JSON.stringify($scope.CommonServiceModel) };
                $http.post('CommonService/Create', data, config)
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
        $scope.addData();

        $scope.ClearFields = function () {

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