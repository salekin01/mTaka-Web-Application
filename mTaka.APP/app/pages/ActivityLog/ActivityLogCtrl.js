(function () {
    'use strict';

    angular.module('mTakaAPP.pages.ActivityLog')
        .controller('ActivityLogCtrl', ActivityLogCtrl);

    function ActivityLogCtrl($scope, $http, toastr, $rootScope) {

        $scope.ActivityLogModel = {};
        //$scope.ActivityLogModel.WalletAccountNo = {};
        var MTKSession = JSON.parse(sessionStorage.MTKSession);
        $scope.ActivityLogModel.WalletAccountNo = (MTKSession != null && MTKSession.CurrentUserId != null) ? MTKSession.CurrentUserId : null;
        $scope.ActivityLogModel.FormDate = null;
        $scope.ActivityLogModel.ToDate = null;
        $scope.dpOpenStatus = {};
        $scope.setDpOpenStatus = function (id) {
            $scope.dpOpenStatus[id] = true
        };

        $scope.dpOpenStatusEnd = {};
        $scope.setDpOpenStatusEnd = function (id) {
            $scope.dpOpenStatusEnd[id] = true
        };

        $scope.SearchTypeForDD =
            [{
                "Text": "Account No",
                "Value": "0",
                "Selected": false
            },
            {
                "Text": "Date",
                "Value": "1",
                "Selected": false
            }];

        $scope.SearchResult = function () {
            var data = { 'data': JSON.stringify($scope.ActivityLogModel.WalletAccountNo) };
            $http.post('UserActivityLog/UserActivityLogByAccNo', data, config).success(function (json) {
                $scope.SearchResultList = json;
                $scope.ClearFields();
                //if (json.data!= null)
                //    $scope.showSuccessMsg("Data Found");
                //else
                //    $scope.showErrorMsg("Data not Found");
                //if (json != null) {
                //    $scope.showSuccessMsg();
                //} else {
                //    $scope.showErrorMsg();
                //}
                
            });
        };

        $scope.SearchByDate = function () {

            //$scope.SplitDateofBirth = $scope.ActivityLogModel.FormDate.toString();
            //$scope.DOBmonth = ($scope.SplitDateofBirth.split(' ')[1]);
            //monthstringtonumberconvert($scope.DOBmonth);
            //$scope.DOBmonth = $scope.month;
            //$scope.DOBday = ($scope.SplitDateofBirth.split(' ')[2]);
            ////$scope.day = (parseInt($scope.day1) + 1).toString();                
            //$scope.DOByear = ($scope.SplitDateofBirth.split(' ')[3]);
            //$scope.ActivityLogModel.FormDate = ($scope.DOBday + '-' + $scope.DOBmonth + '-' + $scope.DOByear);


            //$scope.SplitDateofBirth = $scope.ActivityLogModel.ToDate.toString();
            //$scope.DOBmonth = ($scope.SplitDateofBirth.split(' ')[1]);
            //monthstringtonumberconvert($scope.DOBmonth);
            //$scope.DOBmonth = $scope.month;
            //$scope.DOBday = ($scope.SplitDateofBirth.split(' ')[2]);
            ////$scope.day = (parseInt($scope.day1) + 1).toString();                
            //$scope.DOByear = ($scope.SplitDateofBirth.split(' ')[3]);
            //$scope.ActivityLogModel.ToDate = ($scope.DOBday + '-' + $scope.DOBmonth + '-' + $scope.DOByear);

            var data = { 'data': JSON.stringify($scope.ActivityLogModel) };
            debugger;
            if ($scope.ActivityLogModel.FormDate != null && $scope.ActivityLogModel.ToDate != null) {
                $http.post('UserActivityLog/UserActivityLogByDate', data, config).success(function (json) {
                    $scope.SearchResultList = json;
                    $scope.ClearFields();
                    //if (json != null) {
                    //    $scope.showSuccessMsg("Data Found");
                    //} else {
                    //    $scope.showErrorMsg("Data not Found");
                    //}
                });
            }
        };




        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        function monthstringtonumberconvert(month) {
            debugger;
            switch (month) {
                case "Jan": month = "01"; break;
                case "Feb": month = "02"; break;
                case "Mar": month = "03"; break;
                case "Apr": month = "04"; break;
                case "May": month = "05"; break;
                case "Jun": month = "06"; break;
                case "Jul": month = "07"; break;
                case "Aug": month = "08"; break;
                case "Sep": month = "09"; break;
                case "Oct": month = "10"; break;
                case "Nov": month = "11"; break;
                case "Dec": month = "12"; break;
            }
            $scope.month = month;
        }

        $scope.ClearFields = function () {

            //$scope.ActivityLogModel.WalletAccountNo = "";
            $scope.ActivityLogModel.FormDate = "";
            $scope.ActivityLogModel.ToDate = "";
            $scope.ActivityLogModel.SearchType = "";
        };

        $scope.ClearTable = function () {
            $scope.SearchResultList = "";
        };


        $scope.showSuccessMsg = function (_Msg) {
            toastr.success(_Msg);
        };
        $scope.showErrorMsg = function (_Msg) {
            toastr.error(_Msg);
        };
        //$scope.showSuccessMsg = function () {
        //    toastr.success('Your information has been get successfully!', 'Congratulations');
        //};
        //$scope.showErrorMsg = function () {
        //    toastr.error("Your information hasn't been get!", 'Error!!');
        //};
    }
})();