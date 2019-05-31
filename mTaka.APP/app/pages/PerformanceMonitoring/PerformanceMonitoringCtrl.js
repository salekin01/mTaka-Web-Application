(function () {
    'use strict';
    angular.module('mTakaAPP.pages.main')
        .controller('PerformanceMonitoringCtrl', PerformanceMonitoringCtrl);

    function PerformanceMonitoringCtrl($scope, $timeout, $http, toastr, $filter, $element, baConfig, layoutPaths) {

        $scope.SubmitBtn = "Submit";
        $scope.PerformanceModel = {};

        $scope.PerformanceModel.FormDate = null;
        $scope.PerformanceModel.ToDate = null;
        $scope.dpOpenStatus = {};
        $scope.setDpOpenStatus = function (id) {
            $scope.dpOpenStatus[id] = true
        };
        $scope.dpOpenStatusEnd = {};
        $scope.setDpOpenStatusEnd = function (id) {
            $scope.dpOpenStatusEnd[id] = true
        };


        var graphData = null;

        $scope.GetAccCategoryForDD = function () {
            $http.get('AccCategory/GetAccCategoryForDD').success(function (json) {
                $scope.AccCategoryForDD = json;

            });
        };
        $scope.GetAccCategoryForDD();

        //$scope.GetAccTypeForDD = function () {
        //    $http.get('AccType/GetAccTypeForDD').success(function (json) {
        //        debugger;
        //        $scope.AccTypeForDD = json;
        //    });
        //};
        //$scope.GetAccTypeForDD();

        $scope.GetDistrictInfoForDD = function () {
            $http.get('DistrictInfo/GetDistrictInfoForDD').success(function (json) {
                $scope.DistrictInfoForDD = json;
            });
        };
        $scope.GetDistrictInfoForDD();

        $scope.GetAreaInfoForDD = function () {
            $http.get('AreaInfo/GetAreaInfoForDD').success(function (json) {
                $scope.AreaInfoForDD = json;
            });
        };
        $scope.GetAreaInfoForDD();

        $scope.GetDefineServiceForDD = function () {
            $http.get('DefineService/GetDefineServiceForDD').success(function (json) {
                $scope.ServiceForDD = json;
            });
        };
        $scope.GetDefineServiceForDD();

        $scope.GetCalenderPeriodForDD = function () {

            $http.get('ChargeRule/GetCalenderPeriodForDD').success(function (json) {
                $scope.CalenderPeriodForDD = json;
            });
        };
        $scope.GetCalenderPeriodForDD();

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        $scope.onSelected = function (selectedItem) {
            debugger;
            $scope.PerformanceModel.AccTypeId = "";
            $scope.AccCategoryId = selectedItem.Value;
            var data = { 'data': JSON.stringify(selectedItem.Value) };
            $http.post('CusTypeWiseService/CusTypeForAccCategory', data, config).success(function (json) {
                $scope.AccTypeForDD = json;
            });
        };

        $scope.ButtonSubmit = function() {
            $scope.PerformanceModel.AccCategoryId = $scope.PerformanceModel.AccCategoryId != null ? $scope.PerformanceModel.AccCategoryId.Value : null;
            $scope.PerformanceModel.AccTypeId = $scope.PerformanceModel.AccTypeId != null ? $scope.PerformanceModel.AccTypeId.Value : null;
            $scope.PerformanceModel.DefineServiceId = $scope.PerformanceModel.DefineServiceId != null ? $scope.PerformanceModel.DefineServiceId.Value : null;
            $scope.PerformanceModel.District = $scope.PerformanceModel.District != null ? $scope.PerformanceModel.District.Value : null;
            $scope.PerformanceModel.Area = $scope.PerformanceModel.Area != null ? $scope.PerformanceModel.Area.Value : null;
            $scope.PerformanceModel.CalenderPrdId = $scope.PerformanceModel.CalenderPrdId != null ? $scope.PerformanceModel.CalenderPrdId.Value : null;
            var data = { 'data': JSON.stringify($scope.PerformanceModel) };
            $http.post('AccTypeWiseTarget/GetTargetInfoForGraph', data, baConfig)
                .then(
                function (response) {
                    $scope.ClearFields();
                    debugger;
                    graphData = response.data;
                    //console.log(graphData[0].actual);
                   // if (graphData[0].actual != null)
                     $scope.draw();
                   // else

                     //$scope.showErrorMsg("Data Not Found");
                }
             );
        }
       
        $scope.draw = function () {

            var layoutColors = baConfig.colors;
            var id = $element[0].getAttribute('id');
            var chart = AmCharts.makeChart(id, {
                "type": "serial",
                "theme": "none",
                "color": layoutColors.defaultText,
                "dataDateFormat": "YYYY-MM-DD",
                "precision": 2,
                "valueAxes": [{
                    color: layoutColors.defaultText,
                    axisColor: layoutColors.defaultText,
                    gridColor: layoutColors.defaultText, 
                    "id": "v1",
                    "title": "Amount",
                    "position": "left",
                    "autoGridCount": false,
                    "labelFunction": function (value) {
                        return "৳" + Math.round(value) + "  ";
                    }
                }, {
                    color: layoutColors.defaultText,
                    axisColor: layoutColors.defaultText,
                    gridColor: layoutColors.defaultText,
                    "id": "v2",
                    "title": "Days",
                    "gridAlpha": 0,
                    "position": "right",
                    "autoGridCount": false
                }],
                "graphs": [{
                    "id": "g3",
                    color: layoutColors.defaultText,
                    "valueAxis": "v1",
                    "lineColor": "#0d707c",
                    "fillColors": "#0d707c",
                    "fillAlphas": 0.8,
                    "lineAlpha": 0.8,
                    "type": "column",
                    "title": "Actual Amount",
                    "valueField": "actual",
                    "clustered": false,
                    "columnWidth": 0.5,
                    "lineColorField": layoutColors.defaultText,
                    "legendValueText": "৳[[value]]",
                    "balloonText": "[[title]]<br/><b style='font-size: 130%'>৳[[value]]</b>"
                }, {
                    "id": "g4",
                    "valueAxis": "v1",
                    color: layoutColors.defaultText,
                    "lineColor": "#0989b6",
                    "fillColors": "#0989b6",
                    "fillAlphas": 0.9,
                    "lineAlpha": 0.9,
                    "type": "column",
                    "title": "Target Amount",
                    "valueField": "target",
                    "clustered": false,
                    "columnWidth": 0.3,
                    "legendValueText": "৳[[value]]",
                    "balloonText": "[[title]]<br/><b style='font-size: 130%'>৳[[value]]</b>"
                }, {
                    
                }, {
                    
                }],
                "chartScrollbar": {
                    "graph": "g1",
                    "oppositeAxis": false,
                    "offset": 30,
                    gridAlpha: 0,
                    color: layoutColors.defaultText,
                    scrollbarHeight: 50,
                    backgroundAlpha: 0,
                    selectedBackgroundAlpha: 0.05,
                    selectedBackgroundColor: layoutColors.defaultText,
                    graphFillAlpha: 0,
                    autoGridCount: true,
                    selectedGraphFillAlpha: 0,
                    graphLineAlpha: 0.2,
                    selectedGraphLineColor: layoutColors.defaultText,
                    selectedGraphLineAlpha: 1
                },
                "chartCursor": {
                    "pan": true,
                    "cursorColor": layoutColors.danger,
                    "valueLineEnabled": true,
                    "valueLineBalloonEnabled": true,
                    "cursorAlpha": 0,
                    "valueLineAlpha": 0.2
                },
                "categoryField": "name",
                "categoryAxis": {
                    "axisColor": layoutColors.defaultText,
                    "color": layoutColors.defaultText,
                    "gridColor": layoutColors.defaultText,
                    //"parseDates": true,
                    "dashLength": 1,
                    "minorGridEnabled": true
                },
                "legend": {
                    "useGraphSettings": true,
                    "position": "top",
                    "color": layoutColors.defaultText
                },
                "balloon": {
                    "borderThickness": 1,
                    "shadowAlpha": 0
                },
                "export": {
                    "enabled": true
                },
                "dataProvider": graphData,
               
                pathToImages: layoutPaths.images.amChart
            });

            chart.write("zoomAxisChart");
                       
        }

        //$scope.draw();
        $scope.ClearFields = function () {
            $scope.PerformanceModel.AccCategoryId = null;
            $scope.PerformanceModel.AccTypeId = null;
            $scope.PerformanceModel.DefineServiceId = null;
            $scope.PerformanceModel.District =null;
            $scope.PerformanceModel.Area = null;
            $scope.PerformanceModel.CalenderPrdId = null;
            graphData = null;
            $scope.draw();           
            
        }

        $scope.showSuccessMsg = function (_Msg) {
            toastr.success(_Msg);
        };
        $scope.showErrorMsg = function (_Msg) {
            toastr.error();
        };

        
  }
})();