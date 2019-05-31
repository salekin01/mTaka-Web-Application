
(function () {
    'use strict';

    angular.module('mTakaAPP.theme')
        .directive('hasPermission', hasPermission);

    /** @ngInject */
    function hasPermission(permissions) {
        //permissions = $rootScope.PermissionList;
        return {   
            link: function (scope, element, attrs) {
                if (!angular.isString(attrs.hasPermission)) {
                    throw 'hasPermission value must be a string'
                }
                var value = attrs.hasPermission.trim();
                var notPermissionFlag = value[0] === '!';
                if (notPermissionFlag) {
                    value = value.slice(1).trim();
                }

                function toggleVisibilityBasedOnPermission() {
                    var hasPermission = permissions.hasPermission(value);
                    if (hasPermission && !notPermissionFlag || !hasPermission && notPermissionFlag) {
                        //element[0].style.display = 'block';
                    }
                    else {
                        //element[0].style.display = 'none';                 //uncomment this line & comment the line bellow in order to enable Hide & Show button feature
                        element[0].setAttribute('disabled', 'disabled');
                    }
                }

                toggleVisibilityBasedOnPermission();
                scope.$on('permissionsChanged', toggleVisibilityBasedOnPermission);
            }
        };
    }

    
})();


