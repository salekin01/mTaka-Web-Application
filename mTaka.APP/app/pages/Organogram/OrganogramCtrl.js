
(function () {
    'use strict';

    angular.module('mTakaAPP.pages.Organogram')
        .controller('OrganogramCtrl', OrganogramCtrl);

    function OrganogramCtrl($scope, $http, toastr, $rootScope, $stateParams, $state, getFunctionId) {
        debugger;

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
        $scope.OrganogramModel = {};
        $scope.OrganogramModel.Title = null;
        $scope.SubmitBtn = "Search";
        $scope.OrganogramForDD =
            [{
                "Text": "Manager",
                "Value": "M",
                "Selected": false
            },
            {
                "Text": "DSR/Distributor/Agent",
                "Value": "D",
                "Selected": false
            }            
            ];
        //alert($scope.OrganogramModel.TypeID.Value);
        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        $scope.fetchData = function () {
             debugger;
             if ($scope.SubmitBtn === "Search") {
                 $scope.OrganogramModel.FunctionId = FunctionId;
                 $scope.OrganogramModel.Title = $scope.OrganogramModel.Title != null ? $scope.OrganogramModel.Title.Value : null;
                //$scope.OrganogramModel.UserName = $scope.OrganogramModel.UserName != null ? $scope.OrganogramModel.UserName.Value : null;
                //$scope.OrganogramModel.Cellno = $scope.OrganogramModel.Cellno != null ? $scope.OrganogramModel.Cellno.Text : null;

                var data = { 'data': JSON.stringify($scope.OrganogramModel) };
                $http.post('Organogram/Search', data, config).then(function (response) {
                    console.log(response);
                    var newobject = [['Name', 'ReportsTo', 'tooltip']];
                    angular.forEach(response.data, function (val) {
                        newobject.push(
                            [
                                {
                                    v: val.EmployeeID.toString(),
                                    f: '<div class="customBox"><div>' + (val.FirstName + ' ' + val.LastName) + '</div><div class="title">' + val.Title + '</div></div>'
                                },
                                (val.ReportsTo.toString() == "0" ? "" : val.ReportsTo.toString()),
                                (val.FirstName + ' ' + val.LastName)
                            ]
                        );

                    })
                    $scope.chartData = newobject;
                    //$scope.ClearFields();
                    if (response.data.Result == 1)
                         $scope.showSuccessMsg(response.data.ResponseMessage);
                    else
                         $scope.showErrorMsg(response.data.ResponseMessage);
                    },
                    function (response) {
                        $scope.showErrorMsg();
                    }
                    );

            }
        }

        $scope.ClearFields = function () {
            $scope.OrganogramModel.Title = null;
            $scope.chartData = [];
        };
    }
})();
