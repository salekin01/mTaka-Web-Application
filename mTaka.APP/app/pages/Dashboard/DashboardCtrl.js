(function () {
    'use strict';
    angular.module('mTakaAPP.pages.Dashboard')
        .controller('DashboardCtrl', DashboardCtrl);

    function DashboardCtrl($scope, $timeout, baConfig, $rootScope, baUtil, colorHelper, $http, toastr, $state, $stateParams, getFunctionId) {
        var FunctionId = getFunctionId.FunctionId($rootScope.menuList, $state);
        var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);

        //var AccList = [];
        $scope.DashboardModel = {};
        $scope.AccList = null;
        $scope.NoOfUsb = null;
        $scope.CashOut = null;
        $scope.CashIn = null;
        $scope.TotalUsb = null;
        $scope.DailyDescoList = null;
        var DailyDesco;

        var Config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        $scope.GetCustomerTypeForDD = function () {
            debugger;
            $http.get('AccType/GetAccTypeForDD').success(function (json) {
                $scope.CustomerTypeForDD = json;
            });
        };
        $scope.GetCustomerTypeForDD();

        $scope.onSelected = function (selectedItem) {
            debugger;
            $scope.AccountTypeId = "";
            $scope.DashboardModel.CustomerId = "";
            $scope.AccountTypeId = selectedItem.Value;
            var data = { 'data': JSON.stringify(selectedItem.Value) };
            $http.post('CustomerAccProfile/AccTypeWiseCustomer', data, Config).success(function (json) {
                $scope.CustomerForDD = json;
            });
        };

        //$scope.loadAccInfo = function () {
        //    $http.post('AccInfo/Index', Config).success(function (json) {
        //        $scope.AccList = json;
        //         //ShowData();
        //    });
        //};
        //$scope.loadAccInfo();

        //$scope.loadCusInfo = function () {
        //    $http.get('CustomerAccProfile/Index').success(function (json) {
        //        $scope.NoOfUsb = json;
        //        //ShowData();
        //    });
        //};
        //$scope.loadCusInfo();


        $scope.DashboardModel.StartDate = null;
        $scope.DashboardModel.EndDate = null;
        $scope.dpOpenStatus = {};
        $scope.setDpOpenStatus = function (id) {
            $scope.dpOpenStatus[id] = true
        };
        $scope.dpOpenStatusEnd = {};
        $scope.setDpOpenStatusEnd = function (id) {
            $scope.dpOpenStatusEnd[id] = true
        };

        $scope.SubmitBtn = function () {
            $scope.DashboardModel.AccountTypeId = $scope.DashboardModel.AccountTypeId != null ? $scope.DashboardModel.AccountTypeId.Value : null;
            $scope.DashboardModel.AccProfileId = $scope.DashboardModel.AccProfileId != null ? $scope.DashboardModel.AccProfileId.Value : null;
            var data = { 'data': JSON.stringify($scope.DashboardModel) };
            $http.post('DashBoard/GetDashBoardInfo', data, baConfig)
                .then(
                function (response) {
                    $scope.ClearFields();
                    $scope.CashIn = "৳ "+ response.data[0].ReceiveAmount;
                    $scope.CashOut = "৳ " +response.data[1].ReceiveAmount;
                    $scope.TotalUsb = " ৳ " + response.data[2].ReceiveAmount;
                    $scope.NoOfUsb = response.data[3].ReceiveAmount;
                    DailyDesco = parseInt($scope.NoOfUsb);
                    console.log($scope.NoOfUsb);
                    ShowData();
                    //graphData = response.data;
                }
                );
        }

        $scope.ClearFields = function () {
            $scope.DashboardModel.AccountTypeId = "";
            $scope.DashboardModel.AccProfileId = "";
            $scope.DashboardModel.StartDate = "";
            $scope.DashboardModel.EndDate = "";
            $scope.CashIn = "";
            $scope.CashOut = "";
            $scope.TotalUsb = "";
        }

        function ShowData() {
            //$scope.loadAccInfo();
            //$scope.loadCusInfo();
            //$scope.loadTotalCashIn();
            //$scope.loadTotalCashOut();
            //$scope.loadTotaUsb();
                $scope.charts = [{
                    color: pieColor,
                    description: 'Accounts',
                    stats: ($scope.AccList != null) ? $scope.AccList.length : 0,
                    icon: 'person',
                }, {
                    color: pieColor,
                        description: 'Top Up',
                    stats: ($scope.CashOut != null) ? $scope.CashOut : 0,
                    icon: 'money',
                }, {
                    color: pieColor,
                        description: 'Remittances',
                    stats: ($scope.CashIn != null) ? $scope.CashIn : 0,
                    icon: 'money',
                }, {
                    color: pieColor,
                    description: 'Collected Utility Bill',
                    stats: ($scope.NoOfUsb != null) ? $scope.NoOfUsb : 0,
                    icon: 'number',
                }
                ];

            loadPieCharts();
            Fload();
        }
        ShowData();

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        function loadPieCharts() {
            $('.chart').each(function () {
                var chart = $(this);
                chart.easyPieChart({
                    easing: 'easeOutBounce',
                    onStep: function (from, to, percent) {
                        $(this.el).find('.percent').text(Math.round(percent));
                    },
                    barColor: chart.attr('rel'),
                    trackColor: 'rgba(0,0,0,0)',
                    size: 84,
                    scaleLength: 0,
                    animation: 2000,
                    lineWidth: 9,
                    lineCap: 'round',
                });
            });

            $('.refresh-data').on('click', function () {
                updatePieCharts();
            });
        }

        function updatePieCharts() {
            $('.pie-charts .chart').each(function (index, chart) {
                $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
            });
        }
        function Fload() {
            $scope.transparent = baConfig.theme.blur;
            var dashboardColors = baConfig.colors.dashboard;
            $scope.doughnutData = {
                labels: [
                    'DESCO',
                    'DPDC',
                    'WASA',
                    'BDGCL',
                    'NSU'
                ],
                datasets: [
                    {
                        data: [DailyDesco, 0, 0, 0, 0],
                        backgroundColor: [
                            dashboardColors.blueStone,
                            dashboardColors.white,
                            dashboardColors.surfieGreen,
                            dashboardColors.silverTree,
                            dashboardColors.gossip

                        ],
                        hoverBackgroundColor: [
                            colorHelper.shade(dashboardColors.blueStone, 15),
                            colorHelper.shade(dashboardColors.white, 15),
                            colorHelper.shade(dashboardColors.surfieGreen, 15),
                            colorHelper.shade(dashboardColors.silverTree, 15),
                            colorHelper.shade(dashboardColors.gossip, 15)
                        ],
                        percentage: [DailyDesco, 0, 0, 0, 0]
                    }]
            };

            var ctx = document.getElementById('chart-area').getContext('2d');
            window.myDoughnut = new Chart(ctx, {
                type: 'doughnut',
                data: $scope.doughnutData,
                options: {
                    cutoutPercentage: 64,
                    responsive: true,
                    elements: {
                        arc: {
                            borderWidth: 0
                        }
                    }
                }
            });
        }
        $timeout(function () {
            loadPieCharts();
            updatePieCharts();
            Fload();
        }, 5000);
       
    }

})();
