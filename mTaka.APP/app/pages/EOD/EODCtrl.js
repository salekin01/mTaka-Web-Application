(function () {
    'use strict';

    angular.module('mTakaAPP.pages.EOD')
        .controller('EODCtrl', EODCtrl);

    function EODCtrl($scope, $http, toastr) {
        $scope.EODModel = {};
        $scope.SubmitBtn = "Add";


        $scope.WeekForDD =
            [{
                "Text": "Saturday",
                "Value": "001",
                "Selected": false
            },
            {
                "Text": "Sunday",
                "Value": "002",
                "Selected": false
            },
            {
                "Text": "Monday",
                "Value": "003",
                "Selected": false
            },
            {
                "Text": "Tuesday",
                "Value": "004",
                "Selected": false
            },
            {
                "Text": "Wednesday",
                "Value": "005",
                "Selected": false
            },
            {
                "Text": "Thursday",
                "Value": "006",
                "Selected": false
            },
            {
                "Text": "Friday",
                "Value": "007",
                "Selected": false
            }];

        $scope.loadData = function () {
            $http.get('EOD/Index').success(function (json) {
                $scope.EODList = json;
                myFunction();
            });
        };
        $scope.loadData();

        function toTime(timeString) {
            var timeTokens = timeString.split(':');
            return new Date(1970, 0, 1, timeTokens[0], timeTokens[1]);
        }

        function myFunction() {
            debugger;
            var date = toTime("14:00")
            $scope.EODModel.EODTime1 = date;

            var date = toTime("17:30")
            $scope.EODModel.EODTime2 = date;

            var date = toTime("18:00")
            $scope.EODModel.EODTime3 = date;

            var date = toTime("15:45")
            $scope.EODModel.EODTime4 = date;

            var date = toTime("14:00")
            $scope.EODModel.EODTime5 = date;

            var date = toTime("18:20")
            $scope.EODModel.EODTime6 = date;

            var date = toTime("19:00")
            $scope.EODModel.EODTime7 = date;
        }

        $scope.addData = function () {
            debugger;
            if ($scope.SubmitBtn === "Add") {
                $scope.EODModel.DayId = $scope.EODModel.DayId != null ? $scope.EODModel.DayId.Text : null;
                var data = { 'data': JSON.stringify($scope.EODModel) };
                $http.post('EOD/Create', data, config)
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

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        
        $scope.ClearFields = function () {

            debugger;
            $scope.EODModel.EodId = "";
            $scope.EODModel.EodName  = "";
            $scope.EODModel.DayId = "";
            $scope.EODModel.EODTime = "";
            $scope.SubmitBtn = "Add";
        };


        //$scope.showSuccessMsg = function (_Msg) {
        //    toastr.success(_Msg);
        //};
        //$scope.showErrorMsg = function (_Msg) {
        //    toastr.error(_Msg);
        //};
    }
})();