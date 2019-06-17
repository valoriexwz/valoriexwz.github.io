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
		var painting = true;
		if (painting === true) {
			drawRect(x - 15, y - 15, drawColor);
		}
	}

	function onTouchMove(e) {
		console.log("touched");
		var x = e.touches[0].clientX;
		var y = e.touches[0].clientY;
		if (painting === true) {
			drawRect(x - 15, y - 15, drawColor);
		}
	}


	document.onkeydown = (e) => {
		console.log("key");
		if (e.keyCode === 32) {
			console.log("space key");
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.restore();
		} else if (e.keyCode === 66) {
			console.log("b key");
			drawColor = "#0000ff";
		} else if (e.keyCode === 71) {
			console.log("g key");
			drawColor = "#00ff00";
		} else if (e.keyCode === 82) {
			console.log("r key");
			drawColor = "#ff0000";
		} else if (e.keyCode === 89) {
			console.log("y key");
			drawColor = "#ffff00";
		} else if (e.keyCode === 38) {
			console.log("arrowUp pressed");
			painting = true;
			document.getElementById('annotation').innerHTML = "You've picked up a pen. Enjoy drawing!";
		} else if (e.keyCode === 40) {
			console.log("arrowDown pressed");
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
	canvas.addEventListener("touchmove", onTouchMove);



});