nanities.addComponent("View");
nanities.View = function(canvasId) {

	var canvas, context, model,
		grid = {},
		that = this;

	// graphics for tiles (need a better position to have them loaded before use):
	var sprite = new Image();
	sprite.frames = {
			gras: {
				"frame": {"x":2,"y":2,"w":20,"h":20},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":0,"y":0,"w":20,"h":20},
				"sourceSize": {"w":20,"h":20}
			},
			res1: {
				"frame": {"x":24,"y":2,"w":20,"h":20},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":0,"y":0,"w":20,"h":20},
				"sourceSize": {"w":20,"h":20}
			},
			res2: {
				"frame": {"x":46,"y":2,"w":20,"h":20},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":0,"y":0,"w":20,"h":20},
				"sourceSize": {"w":20,"h":20}
			}
	};
	sprite.meta = {
			"image": "testing.png",
			"size": {"w":68,"h":28},
			"scale": "1"
	};
	sprite.loaded = false;
	sprite.src = "assets/tilesets/" + sprite.meta.image;
	console.log("src tag:", sprite.src, sprite.meta.size);

	function paintGrid() {
		var modelDim;

		if (!model) {
			console.log("View: ERROR: trying to paint without a valid Model.");
			return false;
		} else {
			modelDim = model.dimensions();
		}

		// getting the size of each cell to paint
		grid["cellWidth"] = Math.floor(canvas.width / modelDim.x);
		grid["cellHeight"] = Math.floor(canvas.height / modelDim.y);
		console.log("grid: cell width & height:", grid.cellWidth, ",", grid.cellHeight);

		// painting a grid to the canvas context. (should be done in transformation matrix?)
		context.clearRect(0, 0, canvas.width, canvas.height);
		var width = grid.cellWidth,
			height = grid.cellHeight;
		for (var i = 1; i < modelDim.x; i++) {
			context.beginPath();
			context.moveTo(width, 0);
			context.lineTo(width, canvas.height);
			context.stroke();
			width += grid.cellWidth;
		}
		for (i = 1; i < modelDim.y; i++) {
			context.beginPath();
			context.moveTo(0, height);
			context.lineTo(canvas.width, height);
			context.stroke();
			height += grid.cellHeight;
		}
		grid["painted"] = true;	// set true to skip future repainting of the grid in updateView()
		return true;
	}

	function paintCell(coords, tile) {
		context.drawImage(sprite,
			tile.frame.x, tile.frame.y, tile.frame.w, tile.frame.h,
			(coords.x * grid.cellWidth + 1),
			(coords.y * grid.cellHeight + 1),
			(grid.cellWidth - 2),
			(grid.cellHeight - 2));
	}

	this.updateView = function(cells) {
		if (!model) {
			console.log("View: ERROR: trying to paint without a valid Model.");
			return false;
		}
		if (!grid.painted)
			paintGrid();
		// If sprite Image is not loaded yet, return false and recall this function on sprite.onload:
		if (!sprite.loaded) {
			sprite.onload = function() {
				this.loaded = true;
				console.log("sprite.onload: loaded:", this.loaded);
				that.updateView(cells);
			};
			return false;
		}

		// update painting of each cell in cells; if cells is undefined, update the entire model
		var dims = model.dimensions(),
			content;
		//	if cells is not given: paint the entire model
		if (!cells) {
			for (var x = 0; x < dims.x; x++) {
				for (var y = 0; y < dims.y; y++) {
					content = model.cell(x, y);

					switch(content) {
						case 0:
							paintCell({x: x, y: y}, sprite.frames.gras);
							break;
						case "x":
							paintCell({x: x, y: y}, sprite.frames.res1);
							break;
						case "*":
							paintCell({x: x, y: y}, sprite.frames.res2);
							break;
					}
				}
			}
			console.log("updateView(): updated all cells.");
			return true;
		}
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
			if (grid.painted)
				grid.painted = false;	// to let updateView() repaint the entire grid (and drop the old one)
			model = modelObj;
			this.updateView();
			console.log("View.setModel(): model set.", modelObj);
			return true;
		} else {
			console.log("View.setModel(): ERROR: no valid Model Object given.", modelObj);
			return false;
		}
	};

	// part of the constructor; Initialization of the View
	this.setCanvasId(canvasId);
};
