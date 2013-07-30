var Engine = {

	// The Playgound model as an two-dimensional Array of
	// Objects / Arrays of Objects
	matrix: new Array,

	matrixInit: function() {
		for (var x=0;x<10;x++) {
			this.matrix[x] = new Array;
			for (var y=0;y<10;y++) {
				this.matrix[x][y] = null;
			}
		}
	},
	// The Event Loop as central unit. It controls model&view and deals
	// with communication of ingame-objects.
	evLoop: function() {
		// let's wait for events and respond to them.	
	}
}

