(function () {
    'use strict';
    angular.module('mTakaAPP.pages.main')
        .controller('TopPerformerCtrl', TopPerformerCtrl);

    function TopPerformerCtrl($scope, toastr, $timeout, baConfig, $http, $filter, $element, layoutPaths) {

        $scope.SubmitBtn = "Submit";
        var graphData = null;

        $scope.TopPerformerModel = {};

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        $scope.GetAccCategoryForDD = function () {
            $http.get('AccCategory/GetAccCategoryForDD').success(function (json) {
                $scope.AccCategoryForDD = json;

            });
        };
        $scope.GetAccCategoryForDD();

        $scope.onSelected = function (selectedItem) {
            debugger;
            $scope.TopPerformerModel.AccountTypeId = "";
            $scope.AccCategoryId = selectedItem.Value;
            var data = { 'data': JSON.stringify(selectedItem.Value) };
            $http.post('CusTypeWiseService/CusTypeForAccCategory', data, config).success(function (json) {
                $scope.AccTypeForDD = json;
            });
        };


        $scope.dpOpenStatus = {};
        $scope.setDpOpenStatus = function (id) {
            $scope.dpOpenStatus[id] = true
        };

        $scope.dpOpenStatusEnd = {};
        $scope.setDpOpenStatusEnd = function (id) {
            $scope.dpOpenStatusEnd[id] = true
        };

        $scope.Submit = function () {
            $scope.TopPerformerModel.AccCategoryId = $scope.TopPerformerModel.AccCategoryId != null ? $scope.TopPerformerModel.AccCategoryId.Value : null;
            $scope.TopPerformerModel.AccountTypeId = $scope.TopPerformerModel.AccountTypeId != null ? $scope.TopPerformerModel.AccountTypeId.Value : null;
            var data = { 'data': JSON.stringify($scope.TopPerformerModel) };
            $http.post('TopPerformer/TopPerformer', data, config).success(function (json) {
                if (json.Result == 0) {
                    $scope.showErrorMsg(json.ResponseMessage);
                    $scope.ClearFields();
                }
                else {
                    $scope.TopList = json;
                    $scope.ClearDates();
                }
            });
            var data = { 'data': JSON.stringify($scope.TopPerformerModel) };
            $http.post('TopPerformer/LowestPerformer', data, config).success(function (json) {
                if (json.Result == 0) {
                    $scope.showErrorMsg(json.ResponseMessage);
                    $scope.ClearFields();
                }
                else {
                    $scope.LowList = json;
                    $scope.ClearDates();
                }
            });
        }

        $scope.ClearFields = function () {
            $scope.TopPerformerModel.AccCategoryId = "";
            $scope.TopPerformerModel.AccountTypeId = "";
            $scope.TopPerformerModel.TotalAmountOfTransaction = "";
            $scope.TopPerformerModel.TotalNoOfTransaction = "";
            $scope.AccTypeForDD = "";
            $scope.TopList = "";
            $scope.LowList = "";
            $scope.ClearDates();
        }
        $scope.ClearDates = function () {
            $scope.TopPerformerModel.FromDate = "";
            $scope.TopPerformerModel.ToDate = "";
        }

        $scope.showSuccessMsg = function (_Msg) {
            toastr.success(_Msg);
        };
        $scope.showErrorMsg = function (_Msg) {
            toastr.error(_Msg);
        };
    }
})();