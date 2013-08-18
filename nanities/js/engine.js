nanities.addComponent("engine");
nanities.engine = (function() {

	var dataModel,
		agentList = [];	// list of added agent objects, processed in the event loop
	
	return {

		setModel: function(model) {
			if (model instanceof nanities.Model) {
				dataModel = model;
				console.log("dataModel set.");
				return true;
			} else {
				console.log("failed to set dataModel (no Model given).");
				return false;
			}
		},

		model: function() {
			return dataModel;
		},

		addAgent: function(agent) {
			if (Object.prototype.toString.call(agent) === "[object Array]") {
				for (var element in agent) {
					if (element instanceof nanities.entities.Actor) {
						agentList.push(element);
						console.log("Agent added from Array:", element);
					}
				}
			} else if (agent instanceof nanities.entities.Actor) {
				agentList.push(agent);
				console.log("Agent added:", agent);
			} else {
				console.log("no Agent objects given:", agent);
			}
		},

		// Start the Event Loop as central unit. It controls model&view and deals
		// with communication of ingame-objects.
		exec: function() {
			// let's wait for events and respond to them.	
		}
	};
}) ();
