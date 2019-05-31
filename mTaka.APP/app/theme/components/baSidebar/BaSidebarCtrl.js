
(function () {
    'use strict';

    angular.module('mTakaAPP.theme.components')
        .controller('BaSidebarCtrl', BaSidebarCtrl);
    //debugger;
    //alert("BaSidebarCtrlTest");
    /** @ngInject */
    function BaSidebarCtrl($scope, $rootScope, baSidebarService, $http, permissions) {
        //$scope.menuItems = baSidebarService.getMenuItems();
        $rootScope.menuList = null;
        $scope.loadData = function () {
            $http.get('SignIn/GetMenuWithPermittedFunctions').success(function (json) {
                $scope.menuItems = json.LIST_MENU_MAP;
                $scope.defaultSidebarState = $scope.menuItems[0].stateRef;
                $rootScope.menuList = $scope.menuItems;
                permissions.setPermissions(json.PERMISSIONS);
            });
        };
        $scope.loadData();


        //$scope.defaultSidebarState = $scope.menuItems[0].stateRef;

        $scope.hoverItem = function ($event) {
            $scope.showHoverElem = true;
            $scope.hoverElemHeight = $event.currentTarget.clientHeight;
            var menuTopValue = 66;
            $scope.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - menuTopValue;
        };

        $scope.$on('$stateChangeSuccess', function () {
            if (baSidebarService.canSidebarBeHidden()) {
                baSidebarService.setMenuCollapsed(true);
            }
        });
    }
})();