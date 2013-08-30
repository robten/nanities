nanities.addComponent("View");
nanities.View = function(canvasId) {

	var canvas, context, model,
		grid = {},
		paintEventStack = [],
		that = this;
	grid.show = false;

	// Tiles graphics in a spritesheet:
	var sprite = new Image();
	sprite.frames = {
		gras: {
			"frame": {"x":2,"y":2,"w":20,"h":20},
			"rotated": false,
			"trimmed": false,
		},
		res1: {
			"frame": {"x":24,"y":2,"w":20,"h":20},
			"rotated": false,
			"trimmed": false,
		},
		res2: {
			"frame": {"x":46,"y":2,"w":20,"h":20},
			"rotated": false,
			"trimmed": false,
		}
	};
	sprite.meta = {
		"image": "testing.png",
		"size": {"w":68,"h":28},
		"scale": "1"
	};
	sprite.loaded = false;
	sprite.src = "assets/tilesets/" + sprite.meta.image;
	sprite.onload = function() {
		this.loaded = true;
		paintEventStack.forEach(function(entry, index) {
			that.updateView(entry);
			console.log("paintEventStack Index#", index, ": ",entry, "done.");
		});
		paintEventStack.clear();
	};

	function paintGrid() {
		var modelDim;

		if (!model) {
			console.log("View: ERROR: trying to paint without a valid Model.");
			return false;
		} else {
			modelDim = model.dimensions();
		}

		// painting a grid to the canvas context. (should be done in transformation matrix?)
		var width = 0,
			height = 0;
		context.strokeStyle = "#303030";
		for (var i = 1; i < modelDim.x + 2; i++) {
			context.beginPath();
			context.moveTo(width, 0);
			context.lineTo(width, canvas.height);
			context.closePath();
			context.stroke();
			width += grid.cellWidth;
		}
		for (i = 1; i < modelDim.y + 2; i++) {
			context.beginPath();
			context.moveTo(0, height);
			context.lineTo(canvas.width, height);
			context.closePath();
			context.stroke();
			height += grid.cellHeight;
		}
		return true;
	}

	function filterPaintCell(coord, content) {
		switch(content) {
			case 0:
				paintCell(coord, sprite.frames.gras);
				break;
			case "x":
				paintCell(coord, sprite.frames.res1);
				break;
			case "*":
				paintCell(coord, sprite.frames.res2);
				break;
		}
	}

	function paintCell(coords, tile) {
		context.drawImage(sprite,
			tile.frame.x, tile.frame.y, tile.frame.w, tile.frame.h,
			(coords.x * grid.cellWidth),
			(coords.y * grid.cellHeight),
			(grid.cellWidth),
			(grid.cellHeight));
	}

	this.updateView = function(cells) {
		console.log("updateView() called with cells=", cells, "and sprite.loaded=", sprite.loaded);
		if (!model) {
			console.log("View: ERROR: trying to paint without a valid Model.");
			return false;
		}
		// If sprite Image is not loaded yet, return false and recall this function on sprite.onload:
		if (!sprite.loaded) {
			paintEventStack.push(cells);
			return false;
		}

		// Update painting of each cell in cells; if cells is undefined, update the entire model
		var dims = model.dimensions(),
			content;
		//	If cells is not given: repaint the entire model
		if (!cells) {
			context.clearRect(0, 0, canvas.width, canvas.height);
			for (var x = 0; x < dims.x; x++) {
				for (var y = 0; y < dims.y; y++) {
					content = model.cell(x, y);
					filterPaintCell({x: x, y: y}, content);
				}
			}
			console.log("updateView(): updated all cells.");
		}
		// If only a single coordinats object is given: only repaint that cell
		else if (cells.x && cells.y) {
			content = model.cell(cells.x, cells.y);
			filterPaintCell(cells, content);
			console.log("updateView(): updated a single cell:", cells);
		}
		// If an Array of coords is given: update only those
		else if (Object.prototype.toString.call(cells) === "[object Array]") {
			cells.forEach(function(element) {
				content = model.cell(element.x, element.y);
				filterPaintCell({x: element.x, y: element.y}, content);
			});
			console.log("updateView(): updated a list of cells:", cells);
		}
		if (grid.show)
			paintGrid();
		return true;
	};

	this.setCanvasId = function(id) {
		if (typeof id === "string") {
			canvas = document.getElementById(id);
			console.log("setCanvasId(): canvasId set.", id, canvas);
			if (Object.prototype.toString.call(canvas) === "[object HTMLCanvasElement]") {
				console.log("setCanvasId(): canvasId is valid.");
				context = canvas.getContext("2d");
				return true;
			} else {
				canvas = "undefined";
				console.log("setCanvasId(): ERROR: canvasId denotes no valid canvas element in the DOM.");
				return false;
			}
		} else {
			console.log("setCanvasId(): WARNING: no canvasId given.", id);
			return false;
		}
	};

	this.setModel = function(modelObj) {
		if (modelObj instanceof nanities.Model) {
			model = modelObj;
			// getting the size of each cell to paint
			modelDim = model.dimensions();
			grid.cellWidth = Math.floor(canvas.width / modelDim.x);
			grid.cellHeight = Math.floor(canvas.height / modelDim.y);
			console.log("grid: cell width & height:", grid.cellWidth, ",", grid.cellHeight);
			this.updateView();
			console.log("View.setModel(): model set.", modelObj);
			return true;
		} else {
			console.log("View.setModel(): ERROR: no valid Model Object given.", modelObj);
			return false;
		}
	};

	this.setShowGrid = function(state) {
		grid.show = Boolean(state);
	};

	// part of the constructor; Initialization of the View
	this.setCanvasId(canvasId);
};
