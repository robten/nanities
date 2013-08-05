engine.init(10, 10);	// ! engine needs initialization befor it can be used !
console.log("model dimensions:", engine.modelDimensions() );

// Test if engine's dimensions are not mutable from outside
var copy = engine.modelDimensions();
console.log("copy dimensions:", copy);
copy.x = 1;
copy.y = 2;
console.log("model dimensions after:", engine.modelDimensions() );
console.log("copy dimensions after:", copy);

// Test some cells:
engine.setCell(1,1, new entities.Entity(true));
engine.setCell(4,4, new entities.Actor("Otto", "opponent"));
inspectMatrix(0,0);
inspectMatrix(1,1);
inspectMatrix(4,4);

// Test for cells outside of dimension (returns an error if invalid)
//inspectMatrix(10,10);
inspectMatrix(22,12);
inspectMatrix(2,11);
inspectMatrix(11,4);