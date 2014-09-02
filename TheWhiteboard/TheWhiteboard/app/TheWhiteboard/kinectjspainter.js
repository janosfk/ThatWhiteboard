var DrawState = {
    Started: 0,
    Inprogress: 1,
    Completed: 2
}
var DrawTool = {
    Pencil: 0,
    Line: 1,
    Text: 2,
    Rectangle: 3,
    Erase: 4
}

var whiteboardHub;

var layer = null;
var stage = null;


var tools = {};
var currentTool;
var drawObjectsCollection = [];

$(document).ready(function () {
    JoinHub();

    try {

        var mainContainer = document.getElementById('container');
        var circle;
        layer = new Kinetic.Layer();
        stage = new Kinetic.Stage({
            container: mainContainer,
            width: mainContainer.clientWidth,
            height: mainContainer.clientHeight
        });

        var background = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: stage.getWidth(),
            height: stage.getHeight()
        });

        layer.add(background);
        stage.add(layer);

        var moving = false;

        //select default tool
        SelectTool('line');

        //events region
        layer.on('mousedown', function () {
            canvasEvents({ type: 'mousedown' });
        });

        layer.on('mousemove', function () {
            canvasEvents({ type: 'mousemove' });
        });

        layer.on('mouseup', function () {
            canvasEvents({ type: 'mouseup' });
        });
        //layer.on('mouseout', canvasEvents, false);

        //context.clearRect(0, 0, canvas.width, canvas.height);
    } catch (error) {
        alert(error.message);
    }
});

function JoinHub() {

    whiteboardHub = $.connection.whiteBoard;
    whiteboardHub.client.handleDraw = function (message) {

        var drawObjectCollection = jQuery.parseJSON(message)
        for (var i = 0; i < drawObjectCollection.length; i++) {
            DrawIt(drawObjectCollection[i], false);
        }
    }
}

function SelectTool(toolName) {
    if (tools[toolName]) {
        currentTool = new tools[toolName]();
    }

    //if (toolName == "line" || toolName == "pencil" || toolName == "rectangle") {
    //    mainCanvas.style.cursor = "crosshair";
    //    canvas.style.cursor = "crosshair";
    //}
    //else if (toolName == "erase") {
    //    mainCanvas.style.cursor = "pointer";
    //    canvas.style.cursor = "pointer";
    //}
    //else if (toolName == "text") {
    //    mainCanvas.style.cursor = "text";
    //    canvas.style.cursor = "text";
    //}
}
function SaveDrawings() {
    var img = mainCanvas.toDataURL("image/png");

    WindowObject = window.open('', "Save/Print", "toolbars = no, scrollbars = yes, status = no, resizable = no");
    WindowObject.document.open();
    WindowObject.document.writeln('<img src="' + img + '"/>');
    WindowObject.document.close();
    WindowObject.focus();
}

function canvasEvents(ev) {     //TODO: review, more generic

    console.log('Event in canvas');
    try {
        var func = currentTool[ev.type];

        if (func) {
            func(ev);
        }
    }
    catch (error) {
        alert(error.message);
    }
}

tools.line = function () {
    var tool = this;
    var drawObject = new DrawObject();
    drawObject.Tool = DrawTool.Line;
    this.started = false;

    this.mousedown = function (ev) {
        drawObject.currentState = DrawState.Started;
        var mousePos = stage.getPointerPosition();
        drawObject.StartX = mousePos.x;
        drawObject.StartY = mousePos.y;
        DrawIt(drawObject, true);
        tool.started = true;
    };
    this.mousemove = function (ev) {
        if (!tool.started) {
            return;
        }
        drawObject.currentState = DrawState.Inprogress;
        var mousePos = stage.getPointerPosition();
        drawObject.CurrentX = mousePos.x;
        drawObject.CurrentY = mousePos.y;
        DrawIt(drawObject, true);
    };
    this.mouseup = function (ev) {
        if (tool.started) {
            drawObject.currentState = DrawState.Completed;
            var mousePos = stage.getPointerPosition();
            drawObject.CurrentX = mousePos.x;
            drawObject.CurrentY = mousePos.y;
            DrawIt(drawObject, true);
            tool.started = false;
        }
    };
};
tools.pencil = function () {
    var tool = this;
    this.started = false;
    drawObjectsCollection = [];

    this.mousedown = function (ev) {
        var drawObject = new DrawObject();
        drawObject.Tool = DrawTool.Pencil;
        tool.started = true;
        drawObject.currentState = DrawState.Started;
        var mousePos = stage.getPointerPosition();
        drawObject.StartX = mousePos.x;
        drawObject.StartY = mousePos.y;
        drawObject.CurrentX = mousePos.x;
        drawObject.CurrentY = mousePos.y;
        DrawIt(drawObject, true);
        drawObjectsCollection.push(drawObject);
    };
    this.mousemove = function (ev) {
        if (tool.started) {
            var drawObject = new DrawObject();
            drawObject.Tool = DrawTool.Pencil;
            drawObject.currentState = DrawState.Inprogress;
            var mousePos = stage.getPointerPosition();
            drawObject.CurrentX = mousePos.x;
            drawObject.CurrentY = mousePos.y;
            DrawIt(drawObject, true);
            drawObjectsCollection.push(drawObject);
        }
    };
    this.mouseup = function (ev) {
        if (tool.started) {
            var drawObject = new DrawObject();
            drawObject.Tool = DrawTool.Pencil;
            tool.started = false;
            drawObject.currentState = DrawState.Completed;
            var mousePos = stage.getPointerPosition();
            drawObject.CurrentX = mousePos.x;
            drawObject.CurrentY = mousePos.y;
            DrawIt(drawObject, true);
            drawObjectsCollection.push(drawObject);
            var message = JSON.stringify(drawObjectsCollection);
            whiteboardHub.server.sendDraw(message);
        }
    };
    this.mouseout = function (ev) {
        if (tool.started) {
            var message = JSON.stringify(drawObjectsCollection);
            whiteboardHub.server.sendDraw(message);
        }
        tool.started = false;
    }
};
tools.rectangle = function () {
    var tool = this;
    var drawObject = new DrawObject();
    drawObject.Tool = DrawTool.Rectangle;
    this.started = false;

    this.mousedown = function (ev) {
        drawObject.currentState = DrawState.Started;
        var mousePos = stage.getPointerPosition();
        drawObject.StartX = mousePos.x;
        drawObject.StartY = mousePos.y;
        drawObject.CurrentX = 0;
        drawObject.CurrentY = 0;
        tool.started = true;
        DrawIt(drawObject, true);
    };
    this.mousemove = function (ev) {
        if (!tool.started) {
            return;
        }
        drawObject.currentState = DrawState.Inprogress;
        var mousePos = stage.getPointerPosition();
        drawObject.CurrentX = mousePos.x;
        drawObject.CurrentY = mousePos.y;
        DrawIt(drawObject, true);
    };
    this.mouseup = function (ev) {
        if (tool.started) {
            drawObject.currentState = DrawState.Completed;
            var mousePos = stage.getPointerPosition();
            drawObject.CurrentX = mousePos.x;
            drawObject.CurrentY = mousePos.y;
            DrawIt(drawObject, true);
            tool.started = false;

        }
    };
};
tools.text = function () {
    var tool = this;
    this.started = false;
    var drawObject = new DrawObject();
    drawObject.Tool = DrawTool.Text;

    this.mousedown = function (ev) {

        if (!tool.started) {
            tool.started = true;
            drawObject.currentState = DrawState.Started;
            var mousePos = stage.getPointerPosition();
            drawObject.StartX = mousePos.x;
            drawObject.StartY = mousePos.y;
            drawObject.CurrentX = 0;
            drawObject.CurrentY = 0;

            var textToAdd = prompt('Enter the text:', ' ', 'Add Text');
            drawObject.Text = textToAdd;

            if (textToAdd.length < 1) {
                tool.started = false;
                return;
            }

            DrawIt(drawObject, true);
            tool.started = false;
            updateCanvas();
        }
    };
    this.mousemove = function (ev) {
        if (!tool.started) {
            return;
        }
    };
    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;
            updateCanvas();
        }
    };
}
tools.erase = function () {
    var tool = this;
    this.started = false;
    var drawObject = new DrawObject();
    drawObject.Tool = DrawTool.Erase;

    this.mousedown = function (ev) {  //TODO: review with param -> (ev)
        tool.started = true;
        drawObject.currentState = DrawState.Started;
        var mousePos = stage.getPointerPosition();
        drawObject.StartX = mousePos.x;
        drawObject.StartY = mousePos.y;
        drawObject.CurrentX = mousePos.x;
        drawObject.CurrentY = mousePos.y;
        DrawIt(drawObject, true);
    };
    this.mousemove = function (ev) {
        if (!tool.started) {
            return;
        }
        drawObject.currentState = DrawState.Inprogress;
        var mousePos = stage.getPointerPosition();
        drawObject.CurrentX = mousePos.x;
        drawObject.CurrentY = mousePos.y;
        DrawIt(drawObject, true);
    };
    this.mouseup = function (ev) {
        drawObject.currentState = DrawState.Completed;
        var mousePos = stage.getPointerPosition();
        drawObject.CurrentX = mousePos.x;
        drawObject.CurrentY = mousePos.y;
        DrawIt(drawObject, true);
        tool.started = false;
    }
}

function DrawObject() {     
}

function DrawIt(drawObject, syncServer) {

    if (drawObject.Tool == DrawTool.Line) {
        switch (drawObject.currentState) {
            case DrawState.Started:
                currentLine = new Kinetic.Line({
                    points: [drawObject.StartX, drawObject.StartY, drawObject.CurrentX, drawObject.CurrentY],
                    stroke: 'red'
                });
                layer.add(currentLine);
                layer.drawScene();
                break;

            case DrawState.Inprogress:
                var prevPoints = currentLine.points();
                currentLine.points([prevPoints[0], prevPoints[1], drawObject.CurrentX, drawObject.CurrentY]);

                layer.drawScene();
                break;

            case DrawState.Completed:
                if (drawObject.currentState == DrawState.Completed) {
                    updateCanvas();
                }
                break;
        }
    }
    else if (drawObject.Tool == DrawTool.Pencil) {
        switch (drawObject.currentState) {
            case DrawState.Started:
                currentLine = new Kinetic.Line({
                    points: [drawObject.StartX, drawObject.StartY, drawObject.CurrentX, drawObject.CurrentY],
                    stroke: 'green'
                });
                layer.add(currentLine);
                currentLine.points([drawObject.StartX, drawObject.StartY, drawObject.CurrentX, drawObject.CurrentY]);
                layer.drawScene();

                break;
            case DrawState.Inprogress:
                prevPoints = currentLine.points();
                currentLine.points(prevPoints.concat([drawObject.CurrentX, drawObject.CurrentY]));
                layer.drawScene();
                break;

            case DrawState.Completed:
                if (drawObject.currentState == DrawState.Completed) {
                    updateCanvas();
                }
                break;
        }
    }
    else if (drawObject.Tool == DrawTool.Text) {
        switch (drawObject.currentState) {
            case DrawState.Started:
                currentText = new Kinetic.Text({
                    x: drawObject.StartX,
                    y: drawObject.StartY,
                    text: drawObject.Text,
                    fontFamily: 'Calibri',
                    fontSize: 18,
                    fontStyle: 'normal',
                    stroke: 'black'
                });
                layer.add(currentText);

                layer.drawScene();

                break;

        }


    }
    else if (drawObject.Tool == DrawTool.Erase) {
        switch (drawObject.currentState) {

            case DrawState.Started:
                eraseLine = new Kinetic.Line({
                    points: [drawObject.StartX, drawObject.StartY, drawObject.CurrentX, drawObject.CurrentY],
                    stroke: "#FFFFFF",
                    strokeWidth: 20
                });
                layer.add(eraseLine);
                layer.drawScene();


                break;
            case DrawState.Inprogress:
                prevPoints = eraseLine.points();
                eraseLine.points(prevPoints.concat([drawObject.CurrentX, drawObject.CurrentY]));
                layer.drawScene();
                break;

            case DrawState.Completed:
                break;
        }


    }
    else if (drawObject.Tool == DrawTool.Rectangle) {
        switch (drawObject.currentState) {
            case DrawState.Started:
                currentRect = new Kinetic.Rect({
                    x: drawObject.StartX,
                    y: drawObject.StartY,
                    width: 0,
                    height: 0,
                    stroke: 'blue'
                });
                layer.add(currentRect);
                layer.drawScene();
                break;

            case DrawState.Inprogress:
                currentRect.setWidth(drawObject.CurrentX - currentRect.x());
                currentRect.setHeight(drawObject.CurrentY - currentRect.y());
                layer.drawScene();
                break;

            case DrawState.Completed:
                if (drawObject.currentState == DrawState.Completed) {
                    updateCanvas();
                }
                break;
        }

    }

    if (syncServer && drawObject.Tool != DrawTool.Pencil) {

        drawObjectsCollection = [];
        drawObjectsCollection.push(drawObject);
        var message = JSON.stringify(drawObjectsCollection);
        whiteboardHub.server.sendDraw(message);
    }
}

function updateCanvas() {
}
function clearContext(c) {
}