nanities.addComponent("engine");
nanities.engine = (function() {

	var dimension = {x: 0, y: 0};	// dimensions of the model
	var model = [];	// data structure as a 2-dimensional array
	var isInit = false;
	var agentList = [];	// list of added agent objects, processed in the event loop

	function isValid(x, y) {
		if (isInit && x <= (dimension.x -1) && y <= (dimension.y -1))
			return true;
		else
			return false;
	}
	
	return {

		init: function(width, height) {
			dimension.x = width;
			dimension.y = height;
			for (var x=0;x<dimension.x;x++) {
				model[x] = [];
				for (var y=0;y<dimension.y;y++) {
					model[x][y] = null;
				}
			}
			isInit = true;
			console.log("model initialized.");
		},

		modelDimensions: function() {
			// A copy by value. returning dimension directly would
			// hand over a mutable reference of the private property
			var dimensionCopy = {x: dimension.x, y: dimension.y};
			return dimensionCopy;
		},

		cell: function(x, y) {
			if (isValid(x, y)) {
				return model[x][y];
			} else {
				console.log("invalid index for ",x,",",y);
				return false;
			}
		},

		setCell: function(x, y, content) {
			if (isValid(x, y)) {
				model[x][y] = content;
				return true;
			} else {
				console.log("invalid index for ",x,",",y);
				return false;
			}
		},

		addAgent: function(agent) {
			if (Object.prototype.toString.call(agent) === "[object Array]") {
				for (var element in agent) {
					if (element instanceof nanities.entities.Actor) {
						agentList.push(element);
						console.log("Agent added from Array:", element);
					}
				}
			} else if (agent instanceof nanities.entities.Actor) {
				agentList.push(agent);
				console.log("Agent added:", agent);
			} else {
				console.log("no Agent objects given:", agent);
			}
		},

		// Start the Event Loop as central unit. It controls model&view and deals
		// with communication of ingame-objects.
		exec: function() {
			// let's wait for events and respond to them.	
		}
	};
}) ();
