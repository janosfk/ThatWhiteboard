'use strict';

var theWhiteboardModule = angular.module('theWhiteboardModule', ['ngRoute']);

(function() {
    theWhiteboardModule.value('$', $);
})();