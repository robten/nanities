var engine = (function() {

	// private model as a 2-dimensional array
	var matrix = new Array;
	for (var x=0;x<10;x++) {
		matrix[x] = new Array;
		for (var y=0;y<10;y++) {
			matrix[x][y] = null;
		}
	}
	
	return {
		cell: function(x, y) {
			return matrix[x][y];
		},
		setCell: function(x, y, content) {
			matrix[x][y] = content;
		},
		// Start the Event Loop as central unit. It controls model&view and deals
		// with communication of ingame-objects.
		exec: function() {
			// let's wait for events and respond to them.	
		}
	}
}) ();
