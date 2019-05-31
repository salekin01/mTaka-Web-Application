


(function () {
    'use strict';

    angular.module('mTakaAPP.pages.Report')
        .controller('ReportCtrl', ReportCtrl, '$sce');


    function ReportCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, $sce, getFunctionId) {
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

        $scope.reportParameters = this;
        $scope.reportParameters.frmObj = {};
        var _reportParameters = {};
        $scope.reportParameters.FunctionId = "";
        $scope.formControls = [];
        $scope.formControlsHtml = "";

        $scope.SubmitBtn = "View Report";

        $scope.GetProviderForDD = function () {
            $http.get('Report/GetProviderForDD').success(function (json) {
                $scope.ProviderForDD = json;
            });
        };
        $scope.GetProviderForDD();


        $scope.onSelected = function (selectedItem) {
             var data = { 'data': JSON.stringify(selectedItem.Value) };
            $http.post('Report/Index', data, config).success(function (json) {
                _reportParameters = json;
                renderHtmlControlls();
            });
        };


        //$scope.onSelected = function (selectedItem) {
        //    alert(selectedItem);
        //    $scope.formControls = [];
        //    $scope.reportParameters.FunctionId = '5405003'; //$scope.reportParameters.FunctionId != null ? $scope.reportParameters.FunctionId.Value : null;// '5405003';
        //    var data = { 'data': JSON.stringify($scope.reportParameters.FunctionId) };
        //    $http.post('Report/Index', data, config).success(function (json) {
          
        //        _reportParameters = json;
        //        renderHtmlControlls();
        //    });
        //};
        //$scope.onSelected(selectedItem);

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        function renderHtmlControlls() {

            if (_reportParameters.length > 0) {
                $scope.reportParameters.formControls = [];
                $scope.formControls = [];
                $scope.reportParameters.formControlsHtml = "";

                for (var i = 0; i < _reportParameters.length; i++) {
                    var paramObj = {};
                    paramObj.readonly = "false";
                    paramObj.accPadding = "false";
                    paramObj.accPadding = "reportParameters.formControls.doNothig()";

                    paramObj.label = _reportParameters[i].ParameterName;
                    paramObj.name = _reportParameters[i].Parameter;

                    if (_reportParameters[i].ParameterDatatype == "N")
                        paramObj.type = "number";
                    else
                        paramObj.type = "text";
                    if (_reportParameters[i].ParameterMaxlength != ""
                        && _reportParameters[i].ParameterMaxlength != null)
                        paramObj.maxlength = "maxlength = '" + _reportParameters[i].ParameterMaxlength + "'";
                    else
                        paramObj.maxlength = "";

                    if (_reportParameters[i].DefaultValue != "" &&
                        _reportParameters[i].DefaultValue != null) {

                        if (_reportParameters[i].DefaultValue.indexOf("@") !== -1) {

                            if (_reportParameters[i].DefaultValue == "@1") // Home Branch
                            {

                                paramObj.value = $scope.$parent.rtctrl.session.LoginUser.HomeBranchId;

                                //Getting User is able to view all branch or not                            
                                var any_br_report_access_flag = $scope.$parent.rtctrl.session.LoginUser.AnyBrReportAccessFlag;
                                if (any_br_report_access_flag == "0")
                                    paramObj.readonly = "true";
                                else
                                    paramObj.readonly = "false";

                            }
                            else if (_reportParameters[i].DefaultValue == "@2") // Transaction Date
                            {
                                //if ($scope.$parent.rtctrl.session.LoginUser.TransDate != "" && $scope.$parent.rtctrl.session.LoginUser.TransDate != null) {


                                //    paramObj.value = getFormatedDate($scope.$parent.rtctrl.session.LoginUser.TransDate);

                                //}
                                //else {

                                paramObj.value = getFormatedDate(new Date());
                                //}

                            }
                            else if (_reportParameters[i].DefaultValue == "@3") // System Date
                            {
                                paramObj.value = getFormatedDate(new Date());
                                //_text.ReadOnly = true;
                            }
                            else if (_reportParameters[i].DefaultValue == "@4") // First Date of Month
                            {
                                var date = new Date(), year = date.getFullYear(), month = date.getMonth();
                                var firstDay = new Date(year, month, 1);
                                paramObj.value = getFormatedDate(firstDay);

                                //_text.ReadOnly = true;
                            }
                            else if (_reportParameters[i].DefaultValue == "@5") // Last Date of Month
                            {

                                var date = new Date(), year = date.getFullYear(), month = date.getMonth();
                                var lastDay = new Date(year, month + 1, 0);
                                paramObj.value = getFormatedDate(lastDay);
                                //_text.ReadOnly = true;
                            }
                            else if (_reportParameters[i].DefaultValue == "@6") // First Date of Year
                            {
                                var date = new Date(), year = date.getFullYear();
                                paramObj.value = getFormatedDate(toDate("01/01/" + year));
                                //_text.ReadOnly = true;
                            }
                            else if (_reportParameters[i].DefaultValue == "@7") // Last Date of Year
                            {
                                var date = new Date(), year = date.getFullYear();
                                paramObj.value = getFormatedDate(toDate("31/12/" + year));
                                //_text.ReadOnly = true;
                            }
                            else if (_reportParameters[i].DefaultValue == "@8") // User ID
                            {
                                //_text.Text = BUSessionUtility.BUSessionContainer.USER_ID;
                                paramObj.value = $scope.$parent.rtctrl.session.LoginUser.LoginId;
                            }
                            else if (_reportParameters[i].DefaultValue == "@9") // Function ID
                            {
                                //_text.Text = BUSessionUtility.BUSessionContainer.FUNCTION_ID;
                                paramObj.value = $scope.$parent.rtctrl.session.FunctionId;
                            }
                            else if (_reportParameters[i].DefaultValue == "@11") // Account Number
                            {
                                paramObj.accPadding = "rptctrl.getPaddedAccount(input.name, input.value)";
                            }
                            else if (_reportParameters[i].DefaultValue == "@12") // Previous System Date 
                            {
                                ////DateTime yesterday = DateTime.Now.Date.AddDays(-1);
                                ////_text.Text = yesterday.ToString("dd/MM/yyyy");
                                var date = new Date();
                                paramObj.value = getFormatedDate(date.setDate(date.getDate() - 1));
                            }
                            else if (_reportParameters[i].DefaultValue == "@13") // Previous Transection Date
                            {
                                ////_text.Text = ClsBranchOperation.GetLastEOD(BUSessionUtility.BUSessionContainer.HOME_BRANCH_ID).TRAN_DT;
                            }

                        }
                        else {
                            paramObj.value = _reportParameters[i].DefaultValue;
                        }
                    }
                    else
                        paramObj.value = "";

                    if (_reportParameters[i].IsMandatory == "1")
                        paramObj.required = "true";
                    else
                        paramObj.required = "false";

                    if (paramObj.readonly == "false") {
                        if (_reportParameters[i].IsReadonly == "1")
                            paramObj.readonly = "true";
                        else
                            paramObj.readonly = "false";
                    }

                    if (_reportParameters[i].IsVisible == "0")
                        paramObj.show = "false";
                    else
                        paramObj.show = "true";


                    if (_reportParameters[i].ControlType == "L") {

                        var spName = _reportParameters[i].ListSpName;

                        if (spName !== "" && spName !== null) {
                            paramObj.selectlist = [];
                            //  getSelectList(spName);
                            //paramObj.selectlist = vselectList;
                        }
                        else {
                            paramObj.selectlist = [];
                        }

                        paramObj.htmlcode = $sce.trustAsHtml('<div class="input-group form-inline col-md-4"> \
                                                               <div class="col-md-2"> \
                                  <label class="control-label label-lg required">Home Branch</label> \
                                  <select class="form-control ls-control" ng-model="input.value" name="{{input.value}}" ng-required="{{input.required}}" ng-readonly="{{input.readonly}}" ng-show="{{input.show}}"> \
                                     <option value="">---Please select---</option> \
                                     <option ng-repeat="x in input.selectlist" value="{{x.value}}">{{ x.value +"-"+ x.label}}</option> \
                                  </select> \
                              </div>');
                    }
                    else {
                        debugger;
                        var blur = "'blur'";
                        //paramObj.htmlcode = $sce.trustAsHtml('<div class="input-group form-inline col-md-6"> \
                        //                                       <div class="col-md-2"> \
                        //                                      <label class="control-label label-lg">{{input.label}}</label></div> \
                        //                                      <div class="col-md-4"> \
                        //                                      <input class="form-control ls-control" type="{{input.type}}" \
                        //                                       ng-model="input.value" name="{{input.name}}" id="{{input.name}}" \
                        //                                       ng-change="{{input.accPadding}}" ng-model-options="{updateOn: '+ blur + '}" \
                        //                                       ng-required="{{input.required}}" ng-readonly="{{input.readonly}}" ng-show="{{input.show}}" /></div>\
                        //                                   </div>');

                        //paramObj.htmlcode = $sce.trustAsHtml('<div class="col-md-4">\
                        //                                        <div class="input-group ng-scope">\
                        //                                             <input class="form-control" type="{{input.type}}" \
                        //                                       ng-model="input.value" name="{{input.name}}" id="{{input.name}}" \
                        //                                      ng-change="{{input.accPadding}}" ng-model-options="{updateOn: '+ blur + '}" \
                        //                                      ng-required="{{input.required}}" ng-readonly="{{input.readonly}}" ng-show="{{input.show}}" title="{{input.label}}" \
                        //                                                   placeholder="{{input.label}}" />\
                        //                                        </div>\
                        //                                  </div>\
                        //                                ');

                        paramObj.htmlcode = $sce.trustAsHtml('<div class="col-md-4" >\
                                                                <div class="input-group ng-scope">\
                                                                    <input type="{{input.type}}" \
                                                                           class="form-control" id="{{input.name}}"\
                                                                            ng-model="input.value"\
                                                                           maxlength="{{input.length}}" \
                                                                           title="{{input.label}}" \
                                        ng-required="{{input.required}}" ng-readonly="{{input.readonly}}" ng-show="{{input.show}}"\
                                                                           placeholder="{{input.label}}">\
                                                                </div>\
                                                          </div>\
                                                        ');
                    }

                    $scope.formControls.push(paramObj);
                    
                }



            }

        }
        function toDate(dateStr) {
            var parts = dateStr.split("/");
            return new Date(parts[2], parts[1] - 1, parts[0]);
        }
        function getFormatedDate(pDate) {
            var transDt = new Date(pDate);
            var year = transDt.getFullYear().toString(), month = (transDt.getMonth() + 1).toString(), day = transDt.getDate().toString();
            if (day.length < 2)
                day = "0" + day;

            if (month.length < 2)
                month = "0" + month;

            return day + "/" + month + "/" + year;
        }

        this.getPaddedAccount = function (id, val) {

            //alert(id + ":" + value);
            //var target = angular.element(document[0].querySelector('#'+id));
            //target.value = "your name";
            for (i = 0; i < reportParameters.formControls.length; i++) {
                if (reportParameters.formControls[i].name == id) {

                    if (val.length > 3) {
                        var paddedVal = val.substring(0, 3) + Array(9 - val.substring(3, val.length).length).join('0')
                                      + val.substring(3, val.length);
                        reportParameters.formControls[i].value = paddedVal;
                    }

                    break;
                }
            }

        };
        this.doNothig = function () {

        }

        function getSelectList(spname, currentselect) {
            //blockUI.start("Loading.....");
            var Data = { "SpName": spname };
            debugger;
            LSParameterData.getComboListData(Data, reportParameters.getSelectListSucc);


        }

        this.getSelectListSucc = function (getResponse) {
            vselectList = [];
            debugger;
            if (getResponse) {

                if (getResponse.Error == "" || getResponse.Error == null) {
                    //alert(currentselect);
                    //for (i = 0; i < reportParameters.formControls.length; i++) {
                    //    if (reportParameters.formControls[i].name == currentselect) {
                    //        reportParameters.formControls[i].selectlist = JSON.parse(getResponse.BizData);
                    //    }
                    //}


                }
                else {
                    alertService.add("danger", getResponse.Error);
                }

                // blockUI.stop();
            }
            else {
                window.location.href = window.applicationBaseUrl + '/Home/Index';
            }

        }

        $scope.viewReport = function () {

            debugger;
            var param = {};
            param.prameters = {};
           
            for (var i = 0; i < $scope.formControls.length; i++) {
                param.prameters[$scope.formControls[i].name] = $scope.formControls[i].value;
            }
            //param.prameters['FunctionId'] = $scope.reportParameters.FunctionId;
            //var data = { 'data': JSON.stringify(param.prameters) };
            //var querystr = serializerptparamrecur(param);
           // $http.post('Report/ViewReportPDF', data, config);
                //.then(
                //function (response) {

                //    if (response.data.Result == 1)
                //        $scope.showSuccessMsg(response.data.ResponseMessage);
                //    else
                //        $scope.showErrorMsg(response.data.ResponseMessage);
                //}
                //);
            var querystr = serializerptparamrecur(param);
            mywindow = window.open(window.applicationBaseUrl + 'Report/ViewReportPDF?' + querystr, "mywindow", "resizable=yes,titlebar=yes,location=no,toolbar=no,status=no,menubar=no,scrollbars=yes,width=950,height=600");
            mywindow.moveTo(30, 30);
        }

        function serializerptparamrecur(obj, prefix) {
            var str = [], p;
            for (p in obj) {
                if (obj.hasOwnProperty(p)) {
                    var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                    str.push((v !== null && typeof v === "object") ?
                      serialize(v, k) :
                      encodeURIComponent(k) + "=" + encodeURIComponent(v));
                }
            }
            return str.join("&");
        }


        function serialize(obj) {
            var str = [];
            for (var p in obj)
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            return str.join("&");
        }




        //$scope.viewReport = function () {

        //    if ($scope.SubmitBtn === "View Report") {
        //        var data = { 'data': JSON.stringify($scope.reportParameters.formControls) };
        //        $http.post('Report/ViewReport', data, config)
        //            .then(
        //            function (response) {

        //                if (response.data.Result == 1)
        //                    $scope.showSuccessMsg(response.data.ResponseMessage);
        //                else
        //                    $scope.showErrorMsg(response.data.ResponseMessage);
        //            }
        //            );

        //    }

        //};

        function accessArrayOfJsonObjectByKeyValue(Array, keyValue) {
            Array.forEach(function (object) {
                if (object.Value == keyValue) {
                    $scope.selectedUpazilaInfoDD = object;
                }
            });
        }

        $scope.showSuccessMsg = function (_Msg) {
            toastr.success(_Msg);
        };
        $scope.showErrorMsg = function (_Msg) {
            toastr.error(_Msg);
        };


    }
})();