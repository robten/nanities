// The future base class for all objects (rudimentary)
function Entity(passable) {
	this.isPassable = Boolean(passable) || false;
}

function Actor(caption, type) {
	Entity.call(this, false);
	this.name = caption || "default Actor";
	this.type = type || "actor";
	this.behaviourLoop = function behaviourLoop() {
		// Input-Output for behaviour strategies
	}
}
Actor.prototype = new Entity;

// Just to write testing results.
function test(x,y,value){
	document.write("---------------<br />");
	if (value == null) {
		document.write(x,",",y, " is NULL<br />");
	} else {
		document.write(x,",",y, " is not NULL<br />");
		document.write("It's of type: ",typeof(value),"<br />");
		document.write("Is ",x,",",y," an Entity?: ",value instanceof Entity, "<br />");
		document.write("Is ",x,",",y," an Actor?: ",value instanceof Actor, "<br />");
		document.write("Passable?: ",value.isPassable,"<br />");
	}
	document.write("---------------<br />");

}

// The future Event Loop. Here it just acts like a main() function.
function evLoop() {

	// Every cell gets a NULL value. Might be better then 'undefiend'.
	// But I still need to do some research on it.
	var matrix = new Array;
	for (var x=0;x<10;x++) {
		matrix[x] = new Array;				// Is this really necessary?
		for (var y=0;y<10;y++) {
			matrix[x][y] = null;
		}
	}

	// Test some cells:
	matrix[1][1] = new Entity(true);
	matrix[4][4] = new Actor("Otto","opponent");
	test(0,0,matrix[0][0]);
	test(1,1,matrix[1][1]);
	test(4,4,matrix[4][4]);

	matrix[1][1] = null;
	// The Entity Object becomes fodder for carbage collection
	// because nothing is referencing it anymore.
	test(1,1,matrix[1][1]);
	
}