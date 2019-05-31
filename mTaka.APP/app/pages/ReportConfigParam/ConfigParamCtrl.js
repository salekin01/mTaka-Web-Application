(function () {
    'use strict';

    angular.module('mTakaAPP.pages.ReportConfigParam')
        .controller('ReportConfigParamCtrl', ReportConfigParamCtrl);

    function ReportConfigParamCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
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

        $scope.ReportConfigParamModel = {};
        $scope.ReportConfigParamAddToListModel = {};
        $scope.ReportConfigParamModel.FunctionId = null;
        $scope.ReportConfigParamModel.DefaultValue = null;
        $scope.ReportConfigParamModel.ParamList = [];
        $scope.ConfigParamAddToList = [];
        $scope.ConfigParamList = [];

        $scope.SubmitBtn = "Add";
        $scope.ControlTypeForDD =
            [{
                "Text": "Text Box",
                "Value": "T",
                "Selected": false
            },
            {
                "Text": "Dropdown List",
                "Value": "L",
                "Selected": false
            }];
        $scope.DefaultValueForDD =
            [{
                "Text": "Home Branch",
                "Value": "@1",
                "Selected": false
            },
            {
                "Text": "Transaction Date",
                "Value": "@2",
                "Selected": false
            },
            {
                "Text": "System Date",
                "Value": "@3",
                "Selected": false
            },
            {
                "Text": "First Date of Month",
                "Value": "@4",
                "Selected": false
            },
            {
                "Text": "Last Date of Month",
                "Value": "@5",
                "Selected": false
            },
            {
                "Text": "First Date of Year",
                "Value": "@6",
                "Selected": false
            },
            {
                "Text": "Last Date of Year",
                "Value": "@7",
                "Selected": false
            },
            {
                "Text": "User ID",
                "Value": "@8",
                "Selected": false
            },
            {
                "Text": "Function ID",
                "Value": "@9",
                "Selected": false
            },
            {
                "Text": "Account Number",
                "Value": "@11",
                "Selected": false
            },
            {
                "Text": "Previous System Date",
                "Value": "@12",
                "Selected": false
            },
            {
                "Text": "Previous Transection Date",
                "Value": "@13",
                "Selected": false
            },
            {
                "Text": "None",
                "Value": "",
                "Selected": false
            }];


        $scope.GetReportFunctionIdForDD = function () {
            $http.get('ReportConfigParam/GetReportForDD').success(function (json) {
                $scope.ReportFunctionIdForDD = json;
            });
        };
        $scope.GetReportFunctionIdForDD();
        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        $scope.onSelected = function (selectedItem) {
            var data = { 'data': JSON.stringify(selectedItem.Value) };
            $http.post('ReportConfigParam/Index', data, config)
                .then(
                function (response) {
                    if (response.data != null) {
                        $scope.ReportConfigParamModel.ParamList = response.data;
                    }
                }
                );
        };
      
    $scope.loadData = function () {
        debugger;
        if ($scope.ReportConfigParamModel.FunctionId != null) {
            var data = { 'data': JSON.stringify($scope.ReportConfigParamModel.FunctionId.Value) };
            $http.post('ReportConfigParam/Index', data, config)
                .then(
                function (response) {
                    if (response.data != null) {
                        $scope.ReportConfigParamModel.ParamList = response.data;
                    }
                }
                );
        }
    };
    //$scope.loadData();

    $scope.addData = function () {
        debugger;
        if ($scope.SubmitBtn === "Add") {
            //$scope.ReportConfigParamModel.FunctionId = $scope.ReportConfigParamModel.FunctionId.Value;
            //$scope.ReportConfigParamModel.DefaultValue = $scope.ReportConfigParamModel.DefaultValue.Value;
            //$scope.ReportConfigParamModel.ControlType = $scope.ReportConfigParamModel.ControlType.Value;
            var data = { 'data': JSON.stringify($scope.ConfigParamAddToList) };
            $http.post('ReportConfigParam/Create', data, config)
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
            $scope.ReportConfigParamModel.FunctionId = $scope.ReportConfigParamModel.FunctionId== null ? '' :$scope.ReportConfigParamModel.FunctionId.Value;
            $scope.ReportConfigParamModel.DefaultValue = $scope.ReportConfigParamModel.DefaultValue == null ?'': $scope.ReportConfigParamModel.DefaultValue.Value;
            $scope.ReportConfigParamModel.ControlType = $scope.ReportConfigParamModel.ControlType == null ? '' :$scope.ReportConfigParamModel.ControlType.Value;
            var data = { 'data': JSON.stringify($scope.ReportConfigParamModel) };
            $http.post('ReportConfigParam/Edit', data, config)
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
    $scope.changeConfigParam = function (index) {
        debugger;
        var data = $scope.ReportConfigParamModel.ParamList[index];
        $scope.ReportConfigParamModel.FunctionId = data.FunctionId;
        $scope.ReportConfigParamModel.SlNo = data.SlNo;
        $scope.ReportConfigParamModel.Parameter = data.Parameter;
        $scope.ReportConfigParamModel.ParameterName = data.ParameterName;
        $scope.ReportConfigParamModel.ParameterDatatype = data.ParameterDatatype;

        $scope.ReportConfigParamModel.ParameterMaxlength = data.ParameterMaxlength;
        $scope.ReportConfigParamModel.ParameterUserAsist = data.ParameterUserAsist;
        $scope.ReportConfigParamModel.IsMandatory = data.IsMandatory == '1' ? true : false;
       
        $scope.ReportConfigParamModel.ListSpName = data.ListSpName;
        $scope.ReportConfigParamModel.IsReadonly = data.IsReadonly == '1' ? true : false;
        $scope.ReportConfigParamModel.MinValue = data.MinValue;
        $scope.ReportConfigParamModel.IsVisible = data.IsVisible == '1' ? true : false;
        $scope.ReportConfigParamModel.MaxValue = data.MaxValue;
        accessArrayOfJsonObjectByKeyValueFunction($scope.ReportFunctionIdForDD, data.FunctionId);
        $scope.ReportConfigParamModel.FunctionId = $scope.selectedFunctionIdForDD;
        accessArrayOfJsonObjectByKeyValueDefault($scope.DefaultValueForDD, data.DefaultValue);
        $scope.ReportConfigParamModel.DefaultValue = $scope.selectedDefaultValueForDD;
        //$scope.ReportConfigParamModel.DefaultValue = {};
        accessArrayOfJsonObjectByKeyValueFunctionCtrType($scope.ControlTypeForDD, data.ControlType);
        $scope.ReportConfigParamModel.ControlType = $scope.selectedControlTypeForDD;
        
        $scope.SubmitBtn = "Update";
    };

    function accessArrayOfJsonObjectByKeyValueFunction(Array, keyValue) {
        Array.forEach(function (object) {
            if (object.Value == keyValue) {
                $scope.selectedFunctionIdForDD = object;
            }
        });
    }
    function accessArrayOfJsonObjectByKeyValueDefault(Array, keyValue) {
        Array.forEach(function (object) {
            if (object.Value == keyValue) {
                $scope.selectedDefaultValueForDD = object;
            }
        });
    }
    function accessArrayOfJsonObjectByKeyValueFunctionCtrType(Array, keyValue) {
        Array.forEach(function (object) {
            if (object.Value == keyValue) {
                $scope.selectedControlTypeForDD = object;
            }
        });
    }

    $scope.ClearFields = function () {
        $scope.ReportConfigParamModel.Parameter = "";
        $scope.ReportConfigParamModel.ParameterName = "";
        $scope.ReportConfigParamModel.ParameterDatatype = "";
        $scope.ReportConfigParamModel.ParameterMaxlength = "";
        $scope.ReportConfigParamModel.DefaultValue = "";
        $scope.ReportConfigParamModel.ParameterUserAsist = "";
        $scope.ReportConfigParamModel.IsMandatory = false;
        $scope.ReportConfigParamModel.ControlType = "";
        $scope.ReportConfigParamModel.ListSpName = "";
        $scope.ReportConfigParamModel.IsReadonly = false;
        $scope.ReportConfigParamModel.MinValue = "";
        $scope.ReportConfigParamModel.IsVisible = false;
        $scope.ReportConfigParamModel.MaxValue = "";
        $scope.SubmitBtn = "Add";
    };
    $scope.ClearAddItems = function () {
        $scope.ConfigParamAddToList = "";
        $scope.ConfigParamList = "";
        $scope.SubmitBtn = "Add";
    };

    $scope.AddItem = function () {
        debugger;
       

        $scope.ReportConfigParamAddToListModel.FunctionId = $scope.ReportConfigParamModel.FunctionId != null ? $scope.ReportConfigParamModel.FunctionId.Value : '';
        $scope.ReportConfigParamAddToListModel.DefaultValue = $scope.ReportConfigParamModel.DefaultValue != null ? $scope.ReportConfigParamModel.DefaultValue.Value :'';
        $scope.ReportConfigParamAddToListModel.ControlType = $scope.ReportConfigParamModel.ControlType != null ? $scope.ReportConfigParamModel.ControlType.Value : '';
        $scope.ReportConfigParamAddToListModel.Parameter = $scope.ReportConfigParamModel.Parameter;
        $scope.ReportConfigParamAddToListModel.ParameterName = $scope.ReportConfigParamModel.ParameterName;
        $scope.ReportConfigParamAddToListModel.ParameterDatatype = $scope.ReportConfigParamModel.ParameterDatatype;
        $scope.ReportConfigParamAddToListModel.ParameterMaxlength = $scope.ReportConfigParamModel.ParameterMaxlength;
        $scope.ReportConfigParamAddToListModel.ParameterUserAsist = $scope.ReportConfigParamModel.ParameterUserAsist;
        $scope.ReportConfigParamAddToListModel.IsMandatory = $scope.ReportConfigParamModel.IsMandatory;
        $scope.ReportConfigParamAddToListModel.ListSpName = $scope.ReportConfigParamModel.ListSpName;
        $scope.ReportConfigParamAddToListModel.IsReadonly = $scope.ReportConfigParamModel.IsReadonly;
        $scope.ReportConfigParamAddToListModel.MinValue = $scope.ReportConfigParamModel.MinValue;
        $scope.ReportConfigParamAddToListModel.IsVisible = $scope.ReportConfigParamModel.IsVisible;
        $scope.ReportConfigParamAddToListModel.MaxValue = $scope.ReportConfigParamModel.MaxValue;

        $scope.ReportConfigParamModel.FunctionIdL = $scope.ReportConfigParamModel.FunctionId != null ? $scope.ReportConfigParamModel.FunctionId.Text : '';
        $scope.ReportConfigParamModel.DefaultValueL = $scope.ReportConfigParamModel.DefaultValue != null ? $scope.ReportConfigParamModel.DefaultValue.Text : '';
        $scope.ReportConfigParamModel.ControlTypeL = $scope.ReportConfigParamModel.ControlType != null ? $scope.ReportConfigParamModel.ControlType.Text : '';

      

        $scope.originalData = angular.copy($scope.ReportConfigParamAddToListModel);
        $scope.ConfigParamAddToList.push($scope.originalData);

        $scope.originalData = angular.copy($scope.ReportConfigParamModel);
        $scope.ConfigParamList.push($scope.originalData);
    }
    $scope.deleteItem = function ($index) {
        debugger;
        $scope.ConfigParamAddToList.splice($index, 1);
        $scope.ConfigParamList.splice($index, 1);
    }


    $scope.showSuccessMsg = function (_Msg) {
        toastr.success(_Msg);
    };
    $scope.showErrorMsg = function (_Msg) {
        toastr.error(_Msg);
    };
}
})();