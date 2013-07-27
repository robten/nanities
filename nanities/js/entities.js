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
