// The Playgound as an two-dimensional Array of Objects / Arrays of Objects
var matrix = new Array;
for (var x=0;x<10;x++) {
	matrix[x] = new Array;
	for (var y=0;y<10;y++) {
		matrix[x][y] = null;
	}
}

// The Event Loop as central unit. It controls model&view and deals
// with communication of ingame-objects.
function evLoop() {
	// let's wait for events and respond to them.	
}