var Entities = {

	// The future base class for all objects (rudimentary)
	Entity: function(passable) {
		this.isPassable = Boolean(passable) || false;
	},

	Actor: function(caption, type) {
		Entities.Entity.call(this, false);
		this.name = caption || "default Actor";
		this.type = type || "actor";
		this.behaviourLoop = function behaviourLoop() {
			// Input-Output for behaviour strategies
		}
	}

};

Entities.Actor.prototype = new Entities.Entity();