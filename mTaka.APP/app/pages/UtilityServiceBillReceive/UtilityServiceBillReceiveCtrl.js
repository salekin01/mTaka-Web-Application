(function () {
    'use strict';

    angular.module('mTakaAPP.pages.UtilityServiceBillReceive')
        .controller('UtilityServiceBillReceiveCtrl', UtilityServiceBillReceiveCtrl, '$sce');

    function UtilityServiceBillReceiveCtrl($scope, $http, toastr, $sce, $rootScope, $state, $stateParams, getFunctionId) {

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

        $scope.UtilityServiceBillReceiveModel = {};
        $scope.UtilityServiceBillReceiveModel.PvId = null;
        $scope.UtilityServiceBillReceiveModel.PvApiAddress = null;
        $scope.BillInfo = null;


        //Session
        
        $scope.UtilityServiceBillReceiveModel.FromAccountBalance = null;
        $scope.UtilityServiceBillReceiveModel.FromSystemAccountNo = null;
        var MTKSession = JSON.parse(sessionStorage.MTKSession);
        console.log("MTK :" + MTKSession.AccTypeId);
        $scope.UtilityServiceBillReceiveModel.FromSystemAccountNo = (MTKSession != null && MTKSession.CurrentUserId != null) ? MTKSession.CurrentUserId : null;
        //


        $scope.StorePvId = null;
        //$scope.HeaderInfo = null;

        $scope.formControlsHtml = "";
        $scope.formControls = [];

        $scope.formControlsHtml1 = "";
        $scope.formControls1 = [];

        $scope.formControlsHtml2 = "";
        $scope.formControls2 = [];

        $scope.formControlsHtml3 = "";
        $scope.formControls3 = [];

        $scope.AutoHtmlParam = this;
        $scope.AutoHtmlParam1 = this;
        $scope.AutoHtmlParam2 = this;
        $scope.AutoHtmlParam3 = this;

        var _AutoHtmlParam = {};
        var _AutoHtmlParam1 = {};
        var _AutoHtmlParam2 = {};
        var _AutoHtmlParam3 = {};


        $scope.GetProviderForDD = function () {
            $http.get('UtilityServiceBillReceive/GetProviderForDD').success(function (json) {
                $scope.ProviderForDD = json;
            });
        };
        $scope.GetProviderForDD();

        $scope.GetMobileOperatorForDD = function () {
            $http.get('CommonService/GetMobileOperator').success(function (json) {
                $scope.MblOperatorForDD = json;
            });
        };
        $scope.GetMobileOperatorForDD();

        //First HTML
        $scope.onSelected = function (selectedItem) {
            $scope.formControls = [];
            $scope.formControls1 = [];
            $scope.formControls2 = [];
            $scope.formControls3 = [];
            $scope.UtilityServiceBillReceiveModel.OfferName = null;
            $scope.StorePvId = selectedItem.Value;
            $scope.UtilityServiceBillReceiveModel.PvId = $scope.StorePvId;
            if ($scope.StorePvId !== "012") {
                CheckOffer();
                var data = { 'data': JSON.stringify(selectedItem.Value) };
                $http.post('UtilityServiceBillReceive/GetProviderInfo', data, config).success(function (json) {
                    _AutoHtmlParam = json;
                    $scope.changeColor = {
                        "background-color": "#209E91",
                    }
                    console.log(_AutoHtmlParam);
                    AutoHtmlFunction();
                    //$scope.GetHeaderValue();
                });
            }
        };

        function CheckOffer() {

            $scope.UtilityServiceBillReceiveModel.DefineServiceId = $scope.UtilityServiceBillReceiveModel.PvId;
            $scope.UtilityServiceBillReceiveModel.WalletAccountNo = $scope.UtilityServiceBillReceiveModel.FromSystemAccountNo;
            var data = { 'data': JSON.stringify($scope.UtilityServiceBillReceiveModel) };
            $http.post('SpecialOffers/CheckOffer', data, config).success(function (json) {
                $scope.UtilityServiceBillReceiveModel.OfferName = json.OfferName;
                $scope.UtilityServiceBillReceiveModel.offerMessage = json.offerMessage;
                console.log(json.OfferName);
            });
        }

        $scope.GetOperatorInfo = function () {
            $scope.formControls = [];
            $scope.formControls1 = [];
            $scope.formControls2 = [];
            $scope.formControls3 = [];
            $scope.UtilityServiceBillReceiveModel.PvId = $scope.UtilityServiceBillReceiveModel.PvIdDD.Value
            $scope.UtilityServiceBillReceiveModel.OperatorId = $scope.UtilityServiceBillReceiveModel.OperatorId.Value;
            var data = { 'data': JSON.stringify($scope.UtilityServiceBillReceiveModel) };
            $http.post('UtilityServiceBillReceive/GetOperatorInfo', data, config).success(function (json) {
                _AutoHtmlParam = json;

                if (_AutoHtmlParam[0].OperatorId == "001") {
                    $scope.changeColor = {
                        "background-color": "#EB2227",
                    }
                }
                else if (_AutoHtmlParam[0].OperatorId == "002") {
                    $scope.changeColor = {
                        "background-color": "#F36523",
                    }
                }
                else if (_AutoHtmlParam[0].OperatorId == "003") {
                    $scope.changeColor = {
                        "background-color": "#00ADEF",
                    }
                } else if (_AutoHtmlParam[0].OperatorId == "004") {
                    $scope.changeColor = {
                        "background-color": "red",
                    }
                }
                else if (_AutoHtmlParam[0].OperatorId == "005") {
                    $scope.changeColor = {
                        "background-color": "#008D41",
                    }
                }else {
                    $scope.changeColor = {
                        "background-color": "#209E91",
                    }
                }
                
                console.log(_AutoHtmlParam);
                AutoHtmlFunction();
            });
        }

        $scope.GetHeaderValue = function () {
            //var data = { 'data': JSON.stringify($scope.StorePvId) };
            //$http.post('UtilityServiceBillReceive/GetHeaderValue', data, config).success(function (json) {
            //    HeaderInfo = json;
            //    console.log(HeaderInfo);
            //});
        };
        $scope.GetHeaderValue();

        //Second HTML
        $scope.GetProviderRPTInfoFormBU = function () {
            for (var i = 0; i < $scope.formControls.length; i++) {
                debugger;
                $scope.UtilityServiceBillReceiveModel[$scope.formControls[i].id] = $scope.formControls[i].value;
            }
            var PVData = { 'data': JSON.stringify($scope.UtilityServiceBillReceiveModel.PvIdDD.Value) };
            $http.post('UtilityServiceBillSetup/GetAPI', PVData, config).success(function (json) {
                var getApi = json;
                //console.log(getApi[0].PvApiAddress);
                $scope.UtilityServiceBillReceiveModel.PvApiAddress = getApi[0].PvApiAddress;
                //alert($scope.UtilityServiceBillReceiveModel.PvApiAddress);
            });

            var data = { 'data': JSON.stringify($scope.StorePvId) };
            $http.post('UtilityServiceBillReceive/GetHeaderValue', data, config).success(function (json) {
                $scope.HeaderInfo = json;

                $scope.UtilityServiceBillReceiveModel.UtilityServiceBillType = $scope.HeaderInfo[0].UtilityServiceBillType;
                $scope.UtilityServiceBillReceiveModel.UtilityServiceBillActionType = $scope.HeaderInfo[0].UtilityServiceBillActionType;
                $scope.UtilityServiceBillReceiveModel.UtilityServiceBillPaymentMode = $scope.HeaderInfo[0].UtilityServiceBillPaymentMode;
                $scope.UtilityServiceBillReceiveModel.ServiceUserId = $scope.HeaderInfo[0].ServiceUserId;
                $scope.UtilityServiceBillReceiveModel.ServicePassword = $scope.HeaderInfo[0].ServicePassword;
                $scope.UtilityServiceBillReceiveModel.transactionSourceName = $scope.HeaderInfo[0].transactionSourceName;
                $scope.UtilityServiceBillReceiveModel.transactionSourceId = $scope.HeaderInfo[0].transactionSourceId;
                $scope.UtilityServiceBillReceiveModel.requestDateTime = $scope.HeaderInfo[0].requestDateTime,
                $scope.UtilityServiceBillReceiveModel.RequestId = $scope.HeaderInfo[0].RequestId;
                $scope.UtilityServiceBillReceiveModel.SubmitBy = $scope.HeaderInfo[0].SubmitBy;
                $scope.UtilityServiceBillReceiveModel.Comments = $scope.HeaderInfo[0].Comments;
                $scope.UtilityServiceBillReceiveModel.PaymentBranchId = $scope.HeaderInfo[0].PaymentBranchId;

                $scope.UtilityServiceBillReceiveModel.PvId = $scope.UtilityServiceBillReceiveModel.PvIdDD.Value;

                debugger;

                var data = { 'data': JSON.stringify($scope.UtilityServiceBillReceiveModel) };

                $http.post('UtilityServiceBillReporting/GetProviderRPTInfoFormBU', data, config).success(function (json) {
                    debugger;
                    if (json.Result == 0) {
                        $scope.showErrorMsg(json.ResponseMessage);
                    }
                    $scope.BillInfo = json;
                    console.log($scope.BillInfo);
                    //console.log($scope.BillInfo.body.billInfromationDetails.descoBillInfromationDetails.LPC);
                    //$scope.ClearInputHtml();
                    $scope.GetProviderRPTInfo();
                });
            });
        }

        $scope.GetProviderRPTInfo = function () {
            debugger;
            var data = { 'data': JSON.stringify($scope.UtilityServiceBillReceiveModel.PvId) };
            $http.post('UtilityServiceBillReporting/GetProviderRPTInfo', data, config).success(function (json) {
                _AutoHtmlParam2 = json;
                AutoHtmlFunction2();
            });
        };
        $scope.GetProviderRPTInfo();

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        function AutoHtmlFunction() {
            if (_AutoHtmlParam.length > 0) {
                $scope.formControls = [];
                for (var i = 0; i < _AutoHtmlParam.length; i++) {
                    var paramObj = { paramObj };
                    paramObj.htmlcode = null;
                    paramObj.selectlist = [];
                    $scope.AutoHtmlParam.formControlsHtml = "";
                    //alert(_AutoHtmlParam[i].ReportingType);
                    if (_AutoHtmlParam[i].FieldType == "001") {
                        paramObj.id = "billNumber";
                    } else if (_AutoHtmlParam[i].FieldType == "002") {
                        paramObj.id = "paymentAccountNumber";
                        //$scope.UtilityServiceBillReceiveModel.dynamicId = "paymentAccountNumber";
                    } else if (_AutoHtmlParam[i].FieldType == "003") {
                        paramObj.id = "paymentBillAmount";
                    } else if (_AutoHtmlParam[i].FieldType == "004") {
                        paramObj.id = "paymentBranchId";
                    }
                    //if (_AutoHtmlParam[i].FieldType == "001") {
                    //    paramObj.type = "billNumber";
                    //} else if (_AutoHtmlParam[i].FieldType == "002") {
                    //    paramObj.type = "paymentAccountNumber";
                    //} 
                    paramObj.name = _AutoHtmlParam[i].FieldName;
                    paramObj.type = _AutoHtmlParam[i].InputType;
                    paramObj.length = _AutoHtmlParam[i].FieldLength;
                    paramObj.Prefix = _AutoHtmlParam[i].FieldPrefix;
                    if (_AutoHtmlParam[i].FieldName == "Amount") {
                        paramObj.htmlcode = $sce.trustAsHtml('<div class="col-md-4">\
                                                                <div class="input-group ng-scope">\
                                                                    <span ng-style="changeColor" class="input-group-addon input-group-addon-primary addon-left" id="basic-addon1">{{input.Prefix}}</span>\
                                                                    <input type="{{input.type}}" \
                                                                           class="form-control" id="{{input.id}}"\
                                                                           ng-model="input.value"\
                                                                           onkeyup="word.innerHTML=convertNumberToWords(this.value)"\
                                                                           maxlength="{{input.length}}" \
                                                                           title="{{input.name}}" \
                                                                           placeholder="{{input.name}}">\
                                                                </div>\
                                                                     <h5 id="word"></h5>\
                                                             </div>'
                        );
                    }
                    else {
                        paramObj.htmlcode = $sce.trustAsHtml('<div class="col-md-4">\
                                                                <div class="input-group ng-scope">\
                                                                    <span ng-style="changeColor" class="input-group-addon input-group-addon-primary addon-left" id="basic-addon1">{{input.Prefix}}</span>\
                                                                    <input type="{{input.type}}" \
                                                                           class="form-control" id="{{input.id}}"\
                                                                           ng-model="input.value"\
                                                                           maxlength="{{input.length}}" \
                                                                           title="{{input.name}}" \
                                                                           placeholder="{{input.name}}">\
                                                                </div>\
                                                             </div>'
                        );
                    }
                    $scope.formControls.push(paramObj);


                }

                $scope.formControls1 = [];
                var paramObj1 = { paramObj1 };
                paramObj1.htmlcode = null;
                $scope.formControls1.push(paramObj1);
                paramObj1.htmlcode = $sce.trustAsHtml('<div class="input-group">\
                                                                    <div class="col-md-4">\
                                                                        <button type="button" class="btn btn-primary editable-table-button btn-xs" ng-click="GetProviderRPTInfoFormBU()">Check</button>\
                                                                        <button type="button" class="btn btn-primary editable-table-button btn-xs" ng-click="ClearInputHtml()">Clear</button>\
                                                                    </div>\
                                                                </div>'

                );
            }


        }

        //PayBill
        $scope.PayBill = function () {

            for (var i = 0; i < $scope.formControls.length; i++) {
                $scope.UtilityServiceBillReceiveModel[$scope.formControls[i].id] = $scope.formControls[i].value;
            }
            debugger;
            var currentBalannce = $scope.UtilityServiceBillReceiveModel.FromAccountBalance;
            var payAmount = parseInt($scope.UtilityServiceBillReceiveModel.paymentBillAmount);

            $scope.UtilityServiceBillReceiveModel.CurrentBalance = currentBalannce - payAmount;
            $scope.UtilityServiceBillReceiveModel.FunctionId = "0006031";
            $scope.UtilityServiceBillReceiveModel.FunctionName = "UtilityBill";
            alert(currentBalannce);
            alert(payAmount);

            if (payAmount <= currentBalannce) {

                for (var i = 0; i < $scope.formControls.length; i++) {
                    $scope.UtilityServiceBillReceiveModel[$scope.formControls[i].id] = $scope.formControls[i].value;
                }
                debugger;

                var PVData = { 'data': JSON.stringify($scope.UtilityServiceBillReceiveModel.PvIdDD.Value) };
                $http.post('UtilityServiceBillSetup/GetAPI', PVData, config).success(function (json) {
                    var getApi = json;
                    //console.log(getApi[0].PvApiAddress);
                    $scope.UtilityServiceBillReceiveModel.PvApiAddress = getApi[0].PvApiAddress;
                    //alert($scope.UtilityServiceBillReceiveModel.PvApiAddress);
                });

                var data = { 'data': JSON.stringify($scope.StorePvId) };
                $http.post('UtilityServiceBillReceive/GetHeaderValue', data, config).success(function (json) {
                    $scope.HeaderInfo = json;

                    $scope.UtilityServiceBillReceiveModel.UtilityServiceBillType = $scope.HeaderInfo[0].UtilityServiceBillType;
                    $scope.UtilityServiceBillReceiveModel.UtilityServiceBillActionType = "2";
                    $scope.UtilityServiceBillReceiveModel.UtilityServiceBillPaymentMode = $scope.HeaderInfo[0].UtilityServiceBillPaymentMode;
                    $scope.UtilityServiceBillReceiveModel.ServiceUserId = $scope.HeaderInfo[0].ServiceUserId;
                    $scope.UtilityServiceBillReceiveModel.ServicePassword = $scope.HeaderInfo[0].ServicePassword;
                    $scope.UtilityServiceBillReceiveModel.transactionSourceName = $scope.HeaderInfo[0].transactionSourceName;
                    $scope.UtilityServiceBillReceiveModel.transactionSourceId = $scope.HeaderInfo[0].transactionSourceId;
                    $scope.UtilityServiceBillReceiveModel.requestDateTime = $scope.HeaderInfo[0].requestDateTime,
                        $scope.UtilityServiceBillReceiveModel.RequestId = $scope.HeaderInfo[0].RequestId;
                    $scope.UtilityServiceBillReceiveModel.SubmitBy = $scope.HeaderInfo[0].SubmitBy;
                    $scope.UtilityServiceBillReceiveModel.Comments = $scope.HeaderInfo[0].Comments;
                    $scope.UtilityServiceBillReceiveModel.PaymentBranchId = $scope.HeaderInfo[0].PaymentBranchId;

                    $scope.UtilityServiceBillReceiveModel.PvId = $scope.UtilityServiceBillReceiveModel.PvIdDD.Value;

                    debugger;

                    var data = { 'data': JSON.stringify($scope.UtilityServiceBillReceiveModel) };

                    $http.post('UtilityServiceBillReporting/GetProviderRPTInfoFormBU', data, config).success(function (json) {
                        debugger;
                        $scope.BillInfo = json;

                        $scope.GetProviderRPTInfo();
                    });

                    if ($scope.BillInfo.header.successFalg == 1) {
                        debugger;
                        for (var i = 0; i < $scope.formControls2.length; i++) {
                            //$scope.UtilityServiceBillReceiveModel.concat('.').concat(_AutoHtmlParam2[i].FieldNameForAPI) = getValues(js, _AutoHtmlParam2[i].FieldNameForAPI);
                            //alert($scope.formControls2[i].id);
                            $scope.UtilityServiceBillReceiveModel[$scope.formControls2[i].id] = $scope.formControls2[i].value[0];
                        }
                        var data = { 'data': JSON.stringify($scope.UtilityServiceBillReceiveModel) };
                        $http.post('UtilityServiceBillReceive/SaveUSB', data, config)
                            .then(
                            function (response) {
                                //$scope.loadData();
                                //$scope.ClearFields();
                                //if (response.data.Result == 1)
                                //    $scope.showSuccessMsg(response.data.ResponseMessage);
                                //else
                                //    $scope.showErrorMsg(response.data.ResponseMessage);
                            }
                            );
                    }
                });
            } else {
                alert("Insufficent Balance!")
            }
        }

        function AutoHtmlFunction2() {
            if (_AutoHtmlParam2.length > 0) {
                debugger;
                $scope.formControls2 = [];
                if ($scope.BillInfo.header.errorMessage != null) {

                }
                for (var i = 0; i < _AutoHtmlParam2.length; i++) {
                    var paramObj2 = { paramObj2 };
                    paramObj2.htmlcode2 = null;
                    paramObj2.selectlist = [];
                    $scope.AutoHtmlParam2.formControlsHtml2 = "";
                    paramObj2.name = _AutoHtmlParam2[i].FieldName;
                    paramObj2.type = _AutoHtmlParam2[i].InputType;
                    paramObj2.id = _AutoHtmlParam2[i].FieldNameForAPI;
                    debugger;
                    paramObj2.value = getValues(js, _AutoHtmlParam2[i].FieldNameForAPI);
                    if (paramObj2.value == "") {
                        if (paramObj2.name == "Message") {
                            paramObj2.value = { '0': $scope.BillInfo.header.errorMessage };
                        } else {
                            paramObj2.value = { '0': 'N/A' };

                        }

                    }
                    var js = JSON.parse(JSON.stringify($scope.BillInfo));

                    console.log(getValues(js, _AutoHtmlParam2[i].FieldNameForAPI));
                    //console.log(getObjects(js, 'accountNumber', ''));
                    //console.log(getKeys(js, '24258'));

                    //paramObj2.name = _AutoHtmlParam2[i].ReportFieldAccNo;
                    //alert(paramObj2.name);
                    paramObj2.htmlcode = $sce.trustAsHtml('<div class="col-md-4">\
                                                                <div class="input-group ng-scope">\
                        <span class="input-group-addon input-group-addon-primary addon-left" id="basic-addon1">{{input.name}}</span>\
                                                                    <input type="{{input.type}}" \
                                                                           class="form-control" id="{{input.id}}" \
                                                                           "ng-model="{{input.name}}"\
                                                                           maxlength="{{input.name}}" \
                                                                           title="{{input.name}}" \
                                                                           value="{{input.value[0]}}" \
                                                                           readonly\
                                                                           placeholder="{{input.name}}">\
                                                                </div>\
                                                          </div>\
                                                        '
                    );
                    $scope.formControls2.push(paramObj2);
                }
                $scope.formControls3 = [];
                var paramObj3 = { paramObj3 };
                paramObj3.htmlcode = null;
                $scope.formControls3.push(paramObj3);
                paramObj3.htmlcode = $sce.trustAsHtml('<div class="input-group">\
                                                                    <div class="col-md-4">\
                                                                        <button type="button" class="btn btn-primary editable-table-button btn-xs" ng-click="PayBill()">Save</button>\
                                                                        <button type="button" class="btn btn-primary editable-table-button btn-xs" ng-click="ClearInputHtml2()">Clear</button>\
                                                                    </div>\
                                                                </div>'

                );
            }
        }

        $scope.ClearInputHtml = function () {
            for (var i = 0; i < $scope.formControls.length; i++) {
                $scope.formControls[i].value = "";
                i++;
                $scope.formControls[i].value = "";
            }
        };

        $scope.ClearInputHtml2 = function () {
            for (var i = 0; i < $scope.formControls2.length; i++) {
                $scope.formControls2[i].value = "";
                i++;
                $scope.formControls2[i].value = "";
            }
        };



        function getObjects(obj, key, val) {
            var objects = [];
            for (var i in obj) {
                if (!obj.hasOwnProperty(i)) continue;
                if (typeof obj[i] == 'object') {
                    objects = objects.concat(getObjects(obj[i], key, val));
                } else
                    //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
                    if (i == key && obj[i] == val || i == key && val == '') { //
                        objects.push(obj);
                    } else if (obj[i] == val && key == '') {
                        //only add if the object is not already in the array
                        if (objects.lastIndexOf(obj) == -1) {
                            objects.push(obj);
                        }
                    }
            }
            return objects;
        }

        function getKeys(obj, val) {
            debugger;
            var objects = [];
            for (var i in obj) {
                if (!obj.hasOwnProperty(i)) continue;
                if (typeof obj[i] == 'object') {
                    objects = objects.concat(getKeys(obj[i], val));
                } else if (obj[i] == val) {
                    objects.push(i);
                }
            }
            return objects;
        }

        function getValues(obj, key) {
            var objects = [];
            for (var i in obj) {
                if (!obj.hasOwnProperty(i)) continue;
                if (typeof obj[i] == 'object') {
                    objects = objects.concat(getValues(obj[i], key));
                } else if (i == key) {
                    objects.push(obj[i]);
                }
            }
            return objects;
        }


        $scope.GetAccMasterInfoByAccNo = function() {
            debugger;
            if ($scope.UtilityServiceBillReceiveModel.FromSystemAccountNo == null) {
                $scope.UtilityServiceBillReceiveModel.FromAccountBalance = null;
                showErrorMsg("You are not a valid account holder.");
            }
            else {
                var data = { 'data': JSON.stringify($scope.UtilityServiceBillReceiveModel) };
                $http.post('Ledger/GetAccMasterInfoByAccNo', data, config)
                    .then(
                    function (response) {
                        debugger;
                        if (response.data.AccBalance == null) {
                            $scope.UtilityServiceBillReceiveModel.FromAccountBalance = null;
                            showErrorMsg(response.data.ResponseMessage);
                        }
                        if (response.data.AccBalance != null) {
                            $scope.UtilityServiceBillReceiveModel.FromAccountBalance = response.data.AccBalance;
                        }
                    }
                    );
            }
        };
        $scope.GetAccMasterInfoByAccNo();


        $scope.CheckOnline = function () {
            alert("CHECKED!");
        }

        $scope.showSuccessMsg = function (_Msg) {
            toastr.success(_Msg);
        };
        $scope.showErrorMsg = function (_Msg) {
            toastr.error(_Msg);
        };
    }
})();