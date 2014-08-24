var app = angular.module('theWhiteboardModule', ['theWhiteboardModule.directives']);
var appDirectives = angular.module('theWhiteboardModule.directives', []);

function newLine() {
    var directive = {
        link: link,
        restrict: 'A',

        kineticObj: '=',
        kineticStageObj: '='
    };
    return directive;

    function link(scope, element, attrs) {
        console.log('Entered directive!');

        if (!scope.kineticStageObj) {
            var id = attr["id"];

            if (!id) {
                id = Math.random().toString(36).substring(7);
            }
            if (!scope.kineticStageObj) {
                scope.kineticStageObj = new Kinetic.Stage({
                    container: id,
                    width: 700, //TODO: not hardcode
                    height: 400
                });
            }
            if (!scope.kineticStageObj.container) {
                scope.kineticStageObj.attrs.container = id;
            }
        }

        var layer = new Kinetic.Layer();
        var lineX = 0;
        var lineY = 50;

        //kinetic object options
        var options = {
            x : lineX,
            y : lineY,
            points: [x,x,y,y]
        }
    }
}