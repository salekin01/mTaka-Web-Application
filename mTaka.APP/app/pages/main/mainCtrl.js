(function () {
    'use strict';
    angular.module('mTakaAPP.pages.main')
        .controller('mainCtrl', mainCtrl);

    function mainCtrl($scope, $timeout, baConfig, $rootScope, baUtil, colorHelper, $http, toastr, $state, getFunctionId,Idle) {
        var FunctionId = getFunctionId.FunctionId($rootScope.menuList, $state);
        var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);

        Idle.watch();

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
        //var AccList = [];
        $scope.MainModel = {};
        $scope.AccList = null;
        $scope.CusList = null;
        $scope.CashOut = null;
        $scope.CashIn = null;
        $scope.TotalUsb = null;
        $scope.DailyDescoList = null;
        var DailyDesco;


        $scope.GetCommonDashboardInfo = function () {
            debugger;
            $http.post('DashBoard/GetCommonDashboardInfo', Config).success(function (json) {

                $scope.AccList = json[0].Value;
                $scope.CusList = json[1].Value;
                $scope.CashIn = json[2].Value;
                $scope.CashOut = json[3].Value;
                $scope.TotalUsb = json[4].Value;
                DailyDesco = json[5].Value
                ShowData();
            });
        };
        $scope.GetCommonDashboardInfo();

        //$scope.loadAccInfo = function () {
        //    $http.post('AccInfo/Index', Config).success(function (json) {
        //        $scope.AccList = json;
        //         //ShowData();
        //    });
        //};
        //$scope.loadAccInfo();

        //$scope.loadCusInfo = function () {
        //    $http.get('CustomerAccProfile/Index').success(function (json) {
        //        $scope.CusList = json;
        //        //ShowData();
        //    });
        //};
        //$scope.loadCusInfo();

        //$scope.loadTotalCashOut = function () {
        //    $http.post('CashOut/TotalCashOut', Config).success(function (json) {
        //        if (json.Result == 0) {
        //            $scope.CashOut="Empty"
        //        }
        //        else {
        //            $scope.CashOut = "৳"+json;
        //        }
        //        //ShowData();
        //    });
        //};
        //$scope.loadTotalCashOut();
        ////console.log($scope.AccList.length);

        //$scope.loadTotalCashIn = function () {
        //    $http.post('CashIn/TotalCashIn', Config).success(function (json) {
        //        if (json.Result == 0) {
        //            $scope.CashIn = "Empty";
        //        } else {
        //            $scope.CashIn = "৳" + json;
        //        }
        //        //ShowData();
        //    });
        //};
        //$scope.loadTotalCashIn();

        //$scope.loadTotaUsb = function () {
        //    $http.post('UtilityServiceBillReceive/TotalUSBAmount', Config).success(function (json) {
        //        $scope.TotalUsb = json;
        //        //console.log($scope.TotalUsb);
        //    });
        //};
        //$scope.loadTotaUsb();


        //$scope.DailyDesco = function () {
        //    $http.get('UtilityServiceBillReceive/DescoDailyCollection').success(function (json) {
        //        $scope.DailyDescoList = json;
        //        if ($scope.DailyDescoList != null) {
        //            DailyDesco = parseInt($scope.DailyDescoList.length);
        //            ShowData();
        //        }
        //    });
        //    //ShowData();
        //};
        //$scope.DailyDesco();

        var Config = {
            headers: {
                'Content-Type': 'application/json;'
            }
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
                    stats: ($scope.AccList != null) ? $scope.AccList : 0,
                    icon: 'person',
                }, {
                    color: pieColor,
                    description: 'Cash Out',
                    stats: ($scope.CashOut != null) ? $scope.CashOut : 0,
                    icon: 'money',
                }, {
                    color: pieColor,
                    description: 'Cash In',
                    stats: ($scope.CashIn != null) ? $scope.CashIn : 0,
                    icon: 'money',
                }, {
                    color: pieColor,
                    description: 'Active User',
                    stats: ($scope.CusList != null) ? $scope.CusList : 0,
                    icon: 'face',
                }
                ];
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
                        data: [0, 0, 0, 0, 0],
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
                        percentage: [0, 0, 0, 0, 0]
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
        }, 2000);
       
    }

})();
