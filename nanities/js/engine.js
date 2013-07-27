document.write("<script type='text/javascript' src='js/entities.js'></script>");
document.write("<script type='text/javascript' src='js/testing.js'></script>");

// The Playgound as an two-dimensional Array of Objects / Arrays of Objects
var matrix = new Array;
for (var x=0;x<10;x++) {
	matrix[x] = new Array;
	for (var y=0;y<10;y++) {
		matrix[x][y] = null;
	}
}

// The future Event Loop. Here it just acts like a main() function
// and shouldn't be looped.
function evLoop() {

	// Test some cells:
	matrix[1][1] = new Entity(true);
	matrix[4][4] = new Actor("Otto","opponent");
	inspectMatrix(0,0,matrix[0][0]);
	inspectMatrix(1,1,matrix[1][1]);
	inspectMatrix(4,4,matrix[4][4]);	
}