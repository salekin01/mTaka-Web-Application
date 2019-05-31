
(function () {
    'use strict';

    angular.module('mTakaAPP.theme')
        .factory('getFunctionId', getFunctionId);
    var FID = '';
    var find = false;

    function getFunctionId() {
        //var state = $state

        return {
            FunctionId: function (items, state) {
                find = false;
                test2(items, state);
                //debugger;
                //if (FID == '') {
                //    $state.go('authSignIn');
                //}
                return FID;
            }
        };
    };
    function test2(items, state) {
        return printList(items, state);
    };

    function printList(items, state) {

        //debugger;
        switch ($.type(items)) {
            case "object":
                return getChildren(items, state);
                break;

            case "array":
                printArray(items, state);
                break;

        }

        //return FID;
    };

    function printArray(myArray, state) {
        //debugger;
        for (var i = 0; i < myArray.length; i++) {

            if (find == true)
                break;
            printList(myArray[i], state);
        }
    };



    function getChildren(parent, state) {



        for (var child in parent) {
            if (find == true) {
                break;
            }
            else {
                switch ($.type(parent[child])) {
                    case "array":
                        printList(parent[child], state);
                        break;
                    case "string":
                        if (state.current.name === parent.stateRef) { // item.Name is only used because when I called setPermission, I had a Name property
                            find = true;
                            FID = parent.FUNCTION_ID;

                            break;
                        }
                        break;
                }
            }

        }

    };

})();