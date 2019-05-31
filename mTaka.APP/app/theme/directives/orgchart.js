(function () {
    'use strict';

    angular.module('mTakaAPP.theme')
        .directive('orgChart', orgChart);

    function orgChart() {
        debugger;
        return {
            link: function($scope, element, attrs) {
                var chart = new google.visualization.OrgChart(element[0]);
                $scope.$watch('chartData', function (value, oldvalue) {
                    if (!value) {                      
                        return;
                    }
                    var data = google.visualization.arrayToDataTable(value);                   
                    var options = {
                        'title': '',
                        'allowHtml': true
                    }
                    chart.draw(data, options);
                })
            }


        }
    }


})();

