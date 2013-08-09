// The Root Namespace. Every Module / Component need to add itself to it.
var nanities = {
	addComponent: function(name) {
		if (typeof this[name] === "undefined") {
			this[name] = {};
		}
		return this[name];
	}
};
