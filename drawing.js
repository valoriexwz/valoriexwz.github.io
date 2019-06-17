window.addEventListener("load", () => {
	let canvas = document.getElementById("drawing-board");
	let ctx = canvas.getContext("2d");

	let pageWidth = document.documentElement.clientWidth;
	let pageHeight = document.documentElement.clientHeight;

	let drawColor = "#ff0000"
	let colorPicker = document.getElementById("colorpicker");


	var painting = false;

	canvas.width = 0.8 * pageWidth;
	canvas.height = 0.8 * pageHeight;


	function drawRect(x1, y1, color) {
		if (!painting) return;
		ctx.fillRect(x1, y1, 30, 30);
		ctx.fillStyle = color;
	}

	function onMouseMove(e) {
		console.log("move");
		var x = e.clientX;
		var y = e.clientY;
		
		if (painting === true) {
			drawRect(x - 15, y - 15, drawColor);
		}
	}


	    // Draw something when a touch start is detected
    function sketchpad_touchStart() {
        // Update the touch co-ordinates
        getTouchPos();

        drawRect(x - 15, y - 15, drawColor);

        // Prevents an additional mousedown event being triggered
        event.preventDefault();
    }

    // Draw something and prevent the default scrolling when touch movement is detected
    function sketchpad_touchMove(e) { 
        // Update the touch co-ordinates
        getTouchPos(e);

        // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
        drawRect(x - 15, y - 15, drawColor);

        // Prevent a scrolling action as a result of this touchmove triggering.
        event.preventDefault();
    }

    // Get the touch position relative to the top-left of the canvas
    // When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
    // but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
    // "target.offsetTop" to get the correct values in relation to the top left of the canvas.
    function getTouchPos(e) {
        if (!e)
            var e = event;

        if(e.touches) {
            if (e.touches.length == 1) { // Only deal with one finger
                var x = e.touches[0].clientX;
				var y = e.touches[0].clientY; // Get the information for finger #1
            }
        }
    }



	// function onTouchMove(e) {
	// 	console.log("touched");
	// 	painting = true;
	// 	var x = e.touches[0].clientX;
	// 	var y = e.touches[0].clientY;
	// 	if (painting === true) {
	// 		drawRect(x - 15, y - 15, drawColor);
	// 	}
	// }


	document.onkeydown = (e) => {
		console.log("key");
		if (e.keyCode === 32) {
			console.log("space key");
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.restore();
		} else if (e.keyCode === 66) {
			console.log("b key");
			drawColor = "#2A87D9";
		} else if (e.keyCode === 71) {
			console.log("g key");
			drawColor = "#17C04F";
		} else if (e.keyCode === 82) {
			console.log("r key");
			drawColor = "#ff0000";
		} else if (e.keyCode === 89) {
			console.log("y key");
			drawColor = "#EDED0D";
		} else if (e.keyCode === 38) {
			console.log("arrowUp key");
			painting = true;
			document.getElementById('annotation').innerHTML = "You've picked up a pen. Enjoy drawing!";
		} else if (e.keyCode === 40) {
			console.log("arrowDown key");
			painting = false;
			document.getElementById('annotation').innerHTML = 'Hit "arrow up" key to pick up the pen and start drawing.';
		}
	};

	colorPicker.addEventListener("input", e => drawColor = colorPicker.value);
	window.onresize = resizeCanvas;

	function resizeCanvas() {
		let currHeight = document.documentElement.clientHeight;
		let currWidth = document.documentElement.clientWidth;
		let canvasHeight = 0.8 * currHeight;
		let canvasWidth = 0.8 * currWidth;
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
	}

	canvas.addEventListener("mousemove", onMouseMove);
       canvas.addEventListener('touchstart', sketchpad_touchStart, false);
            canvas.addEventListener('touchmove', sketchpad_touchMove, false);


});