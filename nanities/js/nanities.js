// Global Enhancements and Additions:
Array.prototype.clear = function() {
	while (this.length > 0)
		this.pop();
};

// The Root Namespace. Every Module / Component need to add itself to it.
var nanities = {
	addComponent: function(name) {
		if (typeof this[name] === "undefined") {
			this[name] = {};
		}
		return this[name];
	}
};
