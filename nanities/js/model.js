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

	return {

		isValid: function(x, y) {
			if (x <= (dimension.x -1) && y <= (dimension.y -1))
				return true;
			else
				return false;
		},

		dimensions: function() {
			// A copy by value. returning dimension directly would
			// hand over a mutable reference of the private property
			var dimensionCopy = {x: dimension.x, y: dimension.y};
			return dimensionCopy;
		},

		cell: function(x, y) {
			if (this.isValid(x, y)) {
				return data[x][y];
			} else {
				console.log("invalid index for ", x, ",", y);
				return false;
			}
		},

		setCell: function(x, y, content) {
			if (this.isValid(x, y)) {
				data[x][y] = content;
				return true;
			} else {
				console.log("invalid index for ", x, ",", y);
				return false;
			}
		}

	};
};