(function () {
    'use strict';
    angular.module('mTakaAPP.pages.main')
        .controller('IndPerformanceMonitoringCtrl', IndPerformanceMonitoringCtrl);

    function IndPerformanceMonitoringCtrl($scope, $timeout, baConfig, $http, $filter, $element, layoutPaths, $sce) {

        $scope.SubmitBtn = "Submit";
        var graphData = null;

        $scope.IndPerformanceModel = {};
        $scope.IndPerformanceModel.PanelName = "Performance Chart";
        $scope.IndPerformanceModel.ServiceId = null;

        $scope.IndPerformanceModel.FromDate = null;
        $scope.IndPerformanceModel.ToDate = null;
        $scope.dpOpenStatus = {};
        $scope.setDpOpenStatus = function (id) {
            $scope.dpOpenStatus[id] = true
        };

        $scope.ExportToForDD =
            [{
                "Text": "PDF",
                "Value": "001",
                "Selected": false
            },
            {
                "Text": "WORD",
                "Value": "002",
                "Selected": false
            },
            {
                "Text": "EXCEL",
                "Value": "003",
                "Selected": false
            }];

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        $scope.dpOpenStatusEnd = {};
        $scope.setDpOpenStatusEnd = function (id) {
            $scope.dpOpenStatusEnd[id] = true
        };

        $scope.GetDefineServiceForDD = function () {
            $http.get('DefineService/GetDefineServiceForDD').success(function (json) {
                $scope.ServiceForDD = json;
            });
        };
        $scope.GetDefineServiceForDD();

        function DailyCashIn() {
            debugger;
            var data = { 'data': JSON.stringify($scope.IndPerformanceModel) };
            $http.post('CashIn/DailyCashIn', data, baConfig).success(function (json) {
                debugger;
                for (var i = 0; i < json.length; i++) {
                    cashIn.push(json[i].Amount);
                    CashInlevel.push(json[i].TransDT);
                }
                level = CashInlevel;
            });
        };

        $scope.onSelected = function (selectedItem) {
            debugger;
            $scope.IndPerformanceModel.ExportTo = "";
            $scope.ExportTo = selectedItem.Value;
            var data = { 'data': JSON.stringify(selectedItem.Value) };
            //$http.get('FileExport/FileExport', data, config) {responseType: 'arraybuffer'}
            $http.get('FileExport/FileExport', data, config, { responseType: 'arraybuffer' })
                .then(
                function (response) {
                    debugger;
                    var file = new Blob([response.data], { type: 'application/pdf' });
                    var fileURL = URL.createObjectURL(file);
                    console.log(fileURL);
                    window.open(fileURL);




                    //var file = new Blob([response.data], { type: 'application/pdf' });
                    //var fileURL = URL.createObjectURL(file);
                    //$scope.content = $sce.trustAsResourceUrl(fileURL);
                    //window.open(fileURL);



                    //dataStream = response.GetResponseStream();
                    //Response.Clear();
                    //Response.Buffer = true;
                    //Response.AddHeader("content-disposition", "attachment;filename=test.pdf");
                    //Response.ContentType = "application/pdf";
                    //dataStream.CopyTo(Response.OutputStream);
                    //dataStream.Close();
                    //dataStream.Dispose();
                    //response.Close();
                    //Response.End();




                    //var ieEDGE = navigator.userAgent.match(/Edge/g);
                    //var ie = navigator.userAgent.match(/.NET/g); // IE 11+
                    //var oldIE = navigator.userAgent.match(/MSIE/g);
                    //var name = "file";
                    //var blob = new window.Blob([response.data], { type: 'application/pdf' });

                    //if (ie || oldIE || ieEDGE) {
                    //    var fileName = name + '.pdf';
                    //    window.navigator.msSaveBlob(blob, fileName);
                    //}
                    //else {
                    //    var file = new Blob([response.data], {
                    //        type: 'application/pdf'
                    //    });
                    //    var fileURL = URL.createObjectURL(file);
                    //    var a = document.createElement('a');
                    //    a.href = fileURL;
                    //    a.target = '_blank';
                    //    a.download = name + '.pdf';
                    //    document.body.appendChild(a);
                    //    a.click();
                    //}


                    //var reader = new FileReader();
                    //reader.readAsDataURL(new Blob([response.data], { type: 'application/pdf' }));

                    //reader.onload = function (e) {
                    //    window.open(decodeURIComponent(reader.result), '_self', '', false);
                    //}
                    //window.open("~/Reports/PerformanceReport.rdlc", '_blank', '');
                },
                function (error) {
                    debugger;
                    //error
                });
        };




        //$scope.onSelected = function (selectedItem) {
        //    debugger;
        //    $scope.IndPerformanceModel.ExportTo = "";
        //    $scope.ExportTo = selectedItem.Value;
        //    var data = { 'data': JSON.stringify(selectedItem.Value) };
        //    $http.get('FileExport/FileExport', data, config)
        //        .then(
        //        function (response) {
        //            debugger;
        //            var reader = new FileReader();
        //            reader.readAsDataURL(new Blob([response.data], { type: 'application/pdf' }));

        //            reader.onload = function (e) {
        //                window.open(decodeURIComponent(reader.result), '_self', '', false);
        //            }
        //            //window.open("~/Reports/PerformanceReport.rdlc", '_blank', '');
        //        }
        //        )
        //};
        

        $scope.ButtonSubmit = function () {
            debugger;
            if ($scope.IndPerformanceModel.ServiceId != null && $scope.IndPerformanceModel.ServiceId != "") {
                $scope.IndPerformanceModel.ServiceId = $scope.IndPerformanceModel.ServiceId != null ? $scope.IndPerformanceModel.ServiceId.Value : null;

                if ($scope.IndPerformanceModel.ServiceId.Text == "Cash In") {
                    graphData = null;
                    var data = { 'data': JSON.stringify($scope.IndPerformanceModel) };
                    $http.post('CashIn/DailyCashIn', data, baConfig)
                        .then(
                        function (response) {
                            graphData = response.data;
                            $scope.draw();
                            if (response.data.Result == 1)
                                $scope.showSuccessMsg(response.data.ResponseMessage);
                            else
                                $scope.showErrorMsg(response.data.ResponseMessage)
                        }
                        );
                }
                if ($scope.IndPerformanceModel.ServiceId.Text == "Cash Out") {
                    graphData = null;
                    var data = { 'data': JSON.stringify($scope.IndPerformanceModel) };
                    $http.post('CashOut/DailyCashOut', data, baConfig)
                        .then(
                        function (response) {
                            graphData = response.data;
                            $scope.draw();
                        }
                        );
                }
                if ($scope.IndPerformanceModel.ServiceId.Text == "Fund In") {
                    graphData = null;
                    var data = { 'data': JSON.stringify($scope.IndPerformanceModel) };
                    $http.post('FundIn/DailyFundIn', data, baConfig)
                        .then(
                        function (response) {
                            graphData = response.data;
                            $scope.draw();
                        }
                        );
                }
                if ($scope.IndPerformanceModel.ServiceId.Text == "Fund Out") {
                    graphData = null;
                    var data = { 'data': JSON.stringify($scope.IndPerformanceModel) };
                    $http.post('FundOut/DailyFundOut', data, baConfig)
                        .then(
                        function (response) {
                            graphData = response.data;
                            $scope.draw();
                        }
                        );
                }
            } 
        }
        $scope.draw = function () {
            debugger;
            var layoutColors = baConfig.colors;
            var id = $element[0].getAttribute('id');
            var barChart = AmCharts.makeChart(id, {
                type: 'serial',
                theme: 'blur',
                color: layoutColors.defaultText,
                dataProvider: graphData,
                valueAxes: [
                    {
                        axisAlpha: 0,
                        position: 'left',
                        title: 'Amount',
                        gridAlpha: 0.5,
                        gridColor: layoutColors.border,
                    }
                ],
                startDuration: 1,
                graphs: [
                    {
                        balloonText: '[[value]]</b>',
                        fillColorsField: 'color',
                        fillAlphas: 0.7,
                        lineAlpha: 0.2,
                        type: 'column',
                        valueField: 'amount'
                    }
                ],
                chartCursor: {
                    categoryBalloonEnabled: false,
                    cursorAlpha: 0,
                    zoomable: false
                },
                categoryField: 'time',
                categoryAxis: {
                    gridPosition: 'start',
                    labelRotation: 45,
                    gridAlpha: 0.5,
                    gridColor: layoutColors.border,
                },
                export: {
                    enabled: true
                },
                creditsPosition: 'top-right',
                pathToImages: layoutPaths.images.amChart
            });
            barChart.write("barChart");
        }

        $scope.ClearFields = function () {
            $scope.IndPerformanceModel.WalletAccountNo = "";
            $scope.IndPerformanceModel.ServiceId = "";
            $scope.IndPerformanceModel.FromDate = "";
            $scope.IndPerformanceModel.ToDate = "";
            $scope.IndPerformanceModel.ExportTo = "";
            graphData = null;
            $scope.draw();
        }

        $scope.showSuccessMsg = function (_Msg) {
            toastr.success(_Msg);
        };
        $scope.showErrorMsg = function (_Msg) {
            toastr.error(_Msg);
        };
    }
})();