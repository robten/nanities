// A Constructor for a 2-dimensional datamodel.
nanities.addComponent("Model");
nanities.Model = function(width, height) {
	var dimension,
		data = [];

	if (typeof width === "number" && typeof height === "number") {
		dimension = {x: width, y: height};
		console.log("model initialized per numbers.");
	} else {
		dimension = {x: 10, y: 10};
		console.log("model initialized per standard 10x10.");
	}
	for (var x=0; x<dimension.x; x++) {
		data[x] = [];
		for (var y=0; y<dimension.y; y++) {
			data[x][y] = 0;
		}
	}

	this.isValid = function(x, y) {
		var xCoord, yCoord;
		if (x.x && x.y) {
			xCoord = x.x;
			yCoord = x.y;
		} else {
			xCoord = x;
			yCoord = y;
		}

		if (xCoord <= (dimension.x -1) &&
			xCoord >= 0 &&
			yCoord <= (dimension.y -1) &&
			yCoord >= 0) {
			return true;
		} else {
			return false;
		}
	};

	this.isEqual = function(coord1, coord2) {
		if (coord1.x && coord1.y && coord2.x && coord2.y) {
			if ((coord1.x === coord2.x) && (coord1.y === coord2.y))
				return true;
			else
				return false;
		} else {
			console.log("isEqual: parameters are no valid coordinats objects");
			return false;
		}
	};

	this.dimensions = function() {
		// A copy by value. returning dimension directly would
		// hand over a mutable reference of the private property
		var dimensionCopy = {x: dimension.x, y: dimension.y};
		return dimensionCopy;
	};

	this.cell = function(x, y) {
		if (this.isValid(x, y)) {
			return data[x][y];
		} else {
			console.log("invalid index for ", x, ",", y);
			return false;
		}
	};

	this.setCell = function(x, y, content) {
		if (this.isValid(x, y)) {
			data[x][y] = content;
			return true;
		} else {
			console.log("invalid index for ", x, ",", y);
			return false;
		}
	};

};