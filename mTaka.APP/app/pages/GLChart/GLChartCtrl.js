(function () {
    'use strict';

    angular.module('mTakaAPP.pages.GLChart')
        .controller('GLChartCtrl', GLChartCtrl);

    function GLChartCtrl($scope, $http, $filter, toastr, $rootScope, $stateParams, $state, getFunctionId, editableOptions, editableThemes) {
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
        console.log("Extra Perams");
        console.log($stateParams);
       
        $scope.GLChartModel = {};
        $scope.GLCartList = [];
        $scope.RowCollection = [];
        $scope.SubmitBtn = "Add";
        $scope.dpOpenStatus = {};
        $scope.GLChartModel.smartTablePageSize = 10;

        $scope.setDpOpenStatus = function (id) {
            $scope.dpOpenStatus[id] = true
        };
        $scope.StatementCycleForDD =
            [{
                "Text": "Daily",
                "Value": "D",
                "Selected": false
            },
            {
                "Text": "Weekly",
                "Value": "W",
                "Selected": false
            },
            {
                "Text": "Monthly",
                "Value": "M",
                "Selected": false
            },
            {
                "Text": "Quarterly",
                "Value": "Q",
                "Selected": false
            },
            {
                "Text": "Half-yearly",
                "Value": "H",
                "Selected": false
            },
            {
                "Text": "Yearly",
                "Value": "Y",
                "Selected": false
            },
            {
                "Text": "None",
                "Value": "",
                "Selected": false
            }];

        $scope.GetGLTypeForDD = function () {
           
            $http.get('GLChart/GetGLTypeForDD').success(function (json) {
                $scope.GLTypeForDD = json;
            });
        };
        $scope.GetGLTypeForDD();

        $scope.GetCurrencyForDD = function () {

            $http.get('GLChart/GetCurrencyForDD').success(function (json) {
                $scope.CurrencyForDD = json;
            });
        };
        $scope.GetCurrencyForDD();

        $scope.GetLevelForDD = function () {

            $http.get('GLChart/GetLevelForDD').success(function (json) {
                $scope.LevelForDD = json;
            });
        };
        $scope.GetLevelForDD();

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        $scope.onSelected = function (selectedItem) {
            $scope.GLChartModel.GLPrefix = selectedItem.Value; 
            $scope.GLChartModel.GLLevel = '';
        };
        $scope.onLevelSelected = function (selectedItem) {
            debugger;
            var data = { 'data': JSON.stringify(selectedItem.Value +'-'+ $scope.GLChartModel.GLPrefix) };
            
            $http.post('GLChart/GetTotalingAccForDD', data, config).success(function (json) {
                $scope.TotalingAccForDD = json;
            });
        };
        $scope.checkAccNoAvailable = function (selectedItem) {
            debugger;
            var data = { 'data': $scope.GLChartModel.GLPrefix + $scope.GLChartModel.GLAccNo  };
          
            $http.post('GLChart/CheckGLAccNo', data, config)
                .then(
                function (response) {
                   
                    if (response.data.Result == 1)
                        $scope.showSuccessMsg(response.data.ResponseMessage);
                    else
                        $scope.showErrorMsg(response.data.ResponseMessage);
                }
                );
           
        };
        $scope.loadData = function () {
            debugger;
            $http.get('GLChart/Index').success(function (json) {
              
                $scope.GLCartList = json;
                $scope.RowCollection = json;
            });
        };
        $scope.loadData();

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        $scope.addData = function () {           
            debugger;
            if ($scope.SubmitBtn === "Add") {
                $scope.GLChartModel.GLCurrencyId = $scope.GLChartModel.GLCurrencyId.Value;
                $scope.GLChartModel.GLLevel = $scope.GLChartModel.GLLevel.Value;
                $scope.GLChartModel.TotalingAccSl = ($scope.GLChartModel.TotalingAccSl == null || $scope.GLChartModel.TotalingAccSl == "" || $scope.GLChartModel.TotalingAccSl == " ") ? "" : $scope.GLChartModel.TotalingAccSl.Value;
                $scope.GLChartModel.StatementCycle = $scope.GLChartModel.StatementCycle.Value;
                $scope.GLChartModel.GLType = $scope.GLChartModel.GLType.Text;

                var data = { 'data': JSON.stringify($scope.GLChartModel) };
                $http.post('GLChart/Create', data, config)
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
                
                $scope.GLChartModel.GLCurrencyId = $scope.GLChartModel.GLCurrencyId.Value;
                $scope.GLChartModel.GLLevel = $scope.GLChartModel.GLLevel.Value;
                $scope.GLChartModel.TotalingAccSl = ($scope.GLChartModel.TotalingAccSl == null || $scope.GLChartModel.TotalingAccSl == "" || $scope.GLChartModel.TotalingAccSl == " ") ? "" : $scope.GLChartModel.TotalingAccSl.Value;
                $scope.GLChartModel.StatementCycle = $scope.GLChartModel.StatementCycle.Value;
                var data = { 'data': JSON.stringify($scope.GLChartModel) };
                $http.post('GLChart/Edit', data, config)
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
        $scope.changeGLChart = function (index) {
            var data = $scope.GLCartList[index];
            debugger;

            $scope.GLChartModel.GLAccSl = data.GLAccSl;
            $scope.GLChartModel.GLPrefix = data.GLPrefix;
            $scope.GLChartModel.GLAccNo = data.GLAccNo;
            $scope.GLChartModel.GLAccName = data.GLAccName;
            $scope.GLChartModel.OpeningDate = new Date(data.OpeningDate);

            $scope.GLChartModel.GLAccType = data.GLAccType ;
        
            $scope.GLChartModel.Postable = data.Postable ;
     
            $scope.GLChartModel.OffBSFlag = data.OffBSFlag;
    

            accessArrayOfJsonObjectByKeyValue($scope.GLTypeForDD, data.GLType);
            $scope.GLChartModel.GLType = $scope.selectedGLTypeDD;

            accessArrayOfJsonObjectByKeyValue1($scope.CurrencyForDD, data.GLCurrencyId);
            $scope.GLChartModel.GLCurrencyId = $scope.selectedCurrencyIdDD;

            accessArrayOfJsonObjectByKeyValue2($scope.LevelForDD, data.GLLevel);
            $scope.GLChartModel.GLLevel = $scope.selectedGLLevelDD;

            accessArrayOfJsonObjectByKeyValue3($scope.TotalingAccForDD, data.TotalingAccSl);
            $scope.GLChartModel.TotalingAccSl = $scope.selectedTotalingAccSlDD;

            accessArrayOfJsonObjectByKeyValue4($scope.StatementCycleForDD, data.StatementCycle);
            $scope.GLChartModel.StatementCycle = $scope.selectedStatementCycleDD;
            $scope.SubmitBtn = "Update";
        };

        function accessArrayOfJsonObjectByKeyValue(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedGLTypeDD = object;
                }
            });
        }
        function accessArrayOfJsonObjectByKeyValue1(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedCurrencyIdDD = object;
                }
            });
        }
        function accessArrayOfJsonObjectByKeyValue2(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedGLLevelDD = object;
                }
            });
        }
        function accessArrayOfJsonObjectByKeyValue3(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedTotalingAccSlDD = object;
                }
            });
        }
        function accessArrayOfJsonObjectByKeyValue4(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedStatementCycleDD = object;
                }
            });
        }

        $scope.deleteGLChart = function (index) {
            var data = { 'data': JSON.stringify($scope.GLChartList[index]) };
            $http.post('GLChart/Delete', data, config)
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
        
        $scope.ClearFields = function () {
            $scope.GLChartModel.GLAccSl = "";
            $scope.GLChartModel.GLPrefix = "";
            $scope.GLChartModel.GLAccNo = "";
            $scope.GLChartModel.GLAccName = "";
            $scope.GLChartModel.OpeningDate = "";
            $scope.GLChartModel.GLType = "";
            $scope.GLChartModel.GLAccType = null;
            $scope.GLChartModel.OffBSFlag = null;
            $scope.GLChartModel.Postable = null;
            $scope.GLChartModel.GLCurrencyId = "";
            $scope.GLChartModel.GLLevel = "";
            $scope.GLChartModel.TotalingAccSl = "";
            $scope.GLChartModel.StatementCycle = "";

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