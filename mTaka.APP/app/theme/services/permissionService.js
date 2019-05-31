
(function () {
    'use strict';

    angular.module('mTakaAPP.theme')
        .factory('permissions', permissions);

    function permissions($state) {
        var permissionList = [];
        return {
            setPermissions: function (permissions) {
                permissionList = permissions;
                //$rootScope.$broadcast('permissionsChanged');
            },
            hasPermission: function (permission) {
                permission = permission.trim();

                return permissionList.some(item => {
                    if (typeof item.PERMISSION_DETAILS !== 'string') { // item.Name is only used because when I called setPermission, I had a Name property
                        return false;
                    }
                    return item.PERMISSION_DETAILS.trim() === $state.current.name + "-" + permission;
                });
            }
        };
    }
})();