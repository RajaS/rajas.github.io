
var CaliperCanvas = function (canvas){
    
    this.canvas = canvas; //document.getElementById("caliperCanvas");
    var cx = canvas.getContext("2d");
var calibration = canvas.getAttribute("img-length") / canvas.getAttribute("width");

var buffer = 5; // zone around line to hit
var caliper = {
    x1 : 0,
    x2 : 0,
    y  : 0,
    
    x3 : 0,    // midpoint
    x1x2: 0,  // measurement
    
    x1Offset : 0,  // When carrying whole caliper
    x2Offset : 0,
    state : 0,
    hittable : 0
};

// state:
//        0 - no caliper
//        1 - one leg fixed
//        2 - both legs fixed
//        3 - both legs free (move)

// hittable:
//        0 - no
//        1 - x1
//        2 - x2
//        3 - whole caliper

caliper.draw = function (cx, height) {
    // draw x1 line
    if (caliper.hittable == 1 || caliper.hittable == 3) {
        cx.strokeStyle = "#FF0000";
    }
    else {
	cx.strokeStyle = "#000000";
    }
    cx.beginPath();
    cx.moveTo(caliper.x1, 0);
    cx.lineTo(caliper.x1, height);
    cx.stroke();

    // draw horizontal line
    if (caliper.hittable == 3) {
	cx.strokeStyle = "#FF0000";
    }
    else {
	cx.strokeStyle = "#000000";
    }
    cx.beginPath();
    cx.moveTo(caliper.x1, caliper.y);
    cx.lineTo(caliper.x2, caliper.y);
    cx.stroke();
    
    // draw x2 line
    if (caliper.hittable == 2 || caliper.hittable == 3) {
	cx.strokeStyle = "#FF0000";
    }
    else {
	cx.strokeStyle = "#000000";
    }
    cx.beginPath();
    cx.moveTo(caliper.x2, 0);
    cx.lineTo(caliper.x2, height);
    cx.stroke();

    // draw mid and outer lines
    cx.strokeStyle = "#ACACAC";
    cx.beginPath();
    cx.moveTo(caliper.x3, caliper.y + height / 20);
    cx.lineTo(caliper.x3, caliper.y - height / 20);

    cx.moveTo(caliper.x3 + caliper.x1x2 * 1.5, caliper.y + height / 20);
    cx.lineTo(caliper.x3 + caliper.x1x2 * 1.5, caliper.y - height / 20);
    
    cx.moveTo(caliper.x3 - caliper.x1x2 * 1.5, caliper.y + height / 20);
    cx.lineTo(caliper.x3 - caliper.x1x2 * 1.5, caliper.y - height / 20);

    cx.stroke();

    writeMuted(cx, '+1', caliper.x3 + 5 + caliper.x1x2 * 1.5, caliper.y);
    writeMuted(cx, '-1', caliper.x3 - 10 - caliper.x1x2 * 1.5, caliper.y);
    writeMuted(cx, '0.5', caliper.x3 + 5, caliper.y);
}


// Load image
var img = document.createElement("img");
img.src = canvas.getAttribute("img-src");

// Get mouse position
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    // console.log(rect);
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function writeMeasurement(context, message, x, y) {
    context.font = '12pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message + ' ms', x, y);
}

function writeMuted(context, message, x, y) {
    context.font = '8pt Calibri';
    context.fillStyle = 'grey';
    context.fillText(message, x, y);
}

// Mouse move
canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    switch (caliper.state){
    case 0:
	break;
    case 1:
	caliper.x2 = mousePos.x;
	caliper.y = mousePos.y;
	caliper.x3 = (caliper.x1 + caliper.x2) / 2;
	caliper.x1x2 = Math.floor(Math.abs(caliper.x2 - caliper.x1))
	break;
    case 2:
	// swap x1 x2 if required
	if (caliper.x2 < caliper.x1){
	    caliper.x2 = [caliper.x1, caliper.x1 = caliper.x2][0];
	}
	
	if (mousePos.x > caliper.x1+buffer &&
	    mousePos.x < caliper.x2-buffer &&
	    mousePos.y - caliper.y > -1 * buffer &&
	    mousePos.y - caliper.y < buffer
	   ){
	    caliper.hittable = 3;
	}
	else if (mousePos.x - caliper.x1 > -1 * buffer &&
		 mousePos.x - caliper.x1 < buffer){
	    caliper.hittable = 1;
	}
	else if (mousePos.x - caliper.x2 > -1 * buffer &&
		 mousePos.x - caliper.x2 < buffer){
	    caliper.hittable = 2;
	}
	else {
	    caliper.hittable = 0;
	}
	break;
    case 3:
	caliper.x1 = mousePos.x - caliper.x1Offset;
	caliper.x2 = mousePos.x + caliper.x2Offset;
	caliper.y = mousePos.y;
	caliper.x3 = (caliper.x1 + caliper.x2) / 2;
	break;
    }

    // writeMessage(canvas, message);
    cx.clearRect(0, 0, canvas.width, canvas.height);
    cx.drawImage(img, 0, 0, img.width, img.height,
                 0, 0, canvas.width, canvas.height);
    caliper.draw(cx, canvas.height);
    writeMeasurement(cx, Math.floor(caliper.x1x2 * calibration),
		 caliper.x3, caliper.y - 40);
}, false);

//mouse click
canvas.addEventListener('mousedown', function(evt){
    var mousePos = getMousePos(canvas, evt);
    console.log(mousePos);
    if (caliper.state == 0){
	caliper.state = 1;
	caliper.x1 = mousePos.x;
	caliper.x2 = mousePos.x;
    }
    else if (caliper.state == 1){
	caliper.state = 2;
	caliper.x2 = mousePos.x;
    }
    else if (caliper.state == 2){
	// middle click to close
	if ("which" in evt) {
	    isMiddle = evt.which == 2;
	}
	else if ("button" in evt){
	    isMiddle = evt.button == 4;
	}

	if (isMiddle === true && caliper.hittable != 0){
	    caliper.x1 = -40;
	    caliper.x2 = -40;
	    caliper.x3 = -40;
	    caliper.x1x2 = 0;
	    caliper.state = 0;
	    caliper.hittable = 0;
	    cx.clearRect(0, 0, canvas.width, canvas.height);
	    cx.drawImage(img, 0, 0, img.width, img.height,
			 0, 0, canvas.width, canvas.height);
	    //break
	}

	else if (isMiddle === true){
	    // do nothing
	}
	
	else {
	    if (caliper.hittable == 1){
		caliper.x2 = [caliper.x1, caliper.x1 = caliper.x2][0];
		caliper.state = 1;
		caliper.hittable = 0;
	    }
	    else if (caliper.hittable == 2){
		caliper.state = 1;
		caliper.hittable = 0;
	    }
	    else if (caliper.hittable == 3){
		caliper.x1Offset = mousePos.x - caliper.x1;
		caliper.x2Offset = caliper.x2 - mousePos.x;
		caliper.state = 3;
		caliper.hittable = 0;
	    }
	}
    }
    else if (caliper.state == 3){
	caliper.state = 2;
	caliper.hittable = 0;
    }
}, false);



// <!-- img.addEventListener("load", function() { -->
// <!--     cx.drawImage(img, 10, 10); -->
// <!-- }); -->
}
