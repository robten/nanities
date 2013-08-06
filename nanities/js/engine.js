var engine = (function() {

	var dim = {x: 0, y: 0};	// dimensions of the matrix
	var matrix = new Array;	// data structure as a 2-dimensional array
	var isInit = false;
	var agentList = new Array;			// list of added agent objects, processed in the event loop

	function isValid(x, y) {
		if (isInit && x <= (dim.x -1) && y <= (dim.y -1))
			return true;
		else
			return false;
	}
	
	return {

		init: function(width, height) {
			dim.x = width;
			dim.y = height;
			for (var x=0;x<dim.x;x++) {
				matrix[x] = new Array;
				for (var y=0;y<dim.y;y++) {
					matrix[x][y] = null;
				}
			}
			isInit = true;
			console.log("model initialized.");
		},

		modelDimensions: function() {
			// A copy by value. returning dim directly would
			// hand over a mutable reference of the private property
			var dimCopy = {x: dim.x, y: dim.y};
			return dimCopy;
		},

		cell: function(x, y) {
			if (isValid(x, y) ) {
				return matrix[x][y];
			} else {
				console.log("invalid index for ",x,",",y)
				return false;
			}
		},

		setCell: function(x, y, content) {
			if (isValid(x, y)) {
				matrix[x][y] = content;
				return true;
			} else {
				console.log("invalid index for ",x,",",y)
				return false;
			}
		},

		addAgent: function(agent) {
			if (Object.prototype.toString.call(agent) === "[object Array]") {
				for (var element of agent) {
					if (element instanceof entities.Actor) {
						agentList.push(element);
						console.log("Agent added from Array:", element);
					}
				}
			} else if (agent instanceof entities.Actor) {
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
	}
}) ();
