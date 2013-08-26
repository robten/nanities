nanities.addComponent("View");
nanities.View = function(canvasId) {

	var canvas, context, model,
		grid = {};

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

	this.updateView = function(cells) {
		if (!model) {
			console.log("View: ERROR: trying to paint without a valid Model.");
			return false;
		}
		if (!grid.painted)
			paintGrid();
		// update painting of each cell in cells; if cells is undefined, update the entire model 
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
			console.log("View.setModel(): model set. View updated.", modelObj);
			return true;
		} else {
			console.log("View.setModel(): ERROR: no valid Model Object given.", modelObj);
			return false;
		}
	};

	// part of the constructor; Initialization of the View
	this.setCanvasId(canvasId);
};
