var tests = {
	runTests: function() {
		// Test if engine's dimensions are not mutable from outside
		var copy = nanities.engine.model.dimensions();
		console.log("copy dimensions:", copy);
		copy.x = 1;
		copy.y = 2;
		console.log("model dimensions after:", nanities.engine.model.dimensions() );
		console.log("copy dimensions after:", copy);

		// Test some cells:
		nanities.engine.model.setCell(1,1, new nanities.entities.Entity(true));
		nanities.engine.model.setCell(4,4, new nanities.entities.Actor("Otto", "opponent"));
		this.inspectModel(0,0);
		this.inspectModel(1,1);
		this.inspectModel(4,4);

		// Test for cells outside of dimension (returns an error if invalid)
		this.inspectModel(10,10);	// should be an invalid call..
		this.inspectModel(22,12);
		this.inspectModel(2,11);
		this.inspectModel(11,4);

		// Test addAgent()
		nanities.engine.addAgent("no Array");
		nanities.engine.addAgent(nanities.engine.model.cell(4,4));
		nanities.engine.addAgent([nanities.engine.model.cell(4,4), nanities.engine.model.cell(1,1)]);

		// Test nanities dynamic namespacing through addComponent()
		nanities.addComponent("test");
		console.log(typeof nanities.test);
		nanities.test = function() {
			console.log("running nanities.test().");
		};
		console.log(typeof nanities.test);
		nanities.test();
		console.log(Object.prototype.toString.call(nanities));
	},

	inspectModel: function(x,y) {
		var cell = nanities.engine.model.cell(x,y);
		if (cell !== false) {
			document.write("---------------<br />");
			if (cell === null) {
				document.write(x,",",y, " is NULL<br />");
			} else {
				document.write(x,",",y, " is not NULL<br />");
				document.write("It's of type: ",typeof(cell),"<br />");
				document.write("Is ",x,",",y," an Entity?: ",
					cell instanceof nanities.entities.Entity, "<br />");
				document.write("Is ",x,",",y," an Actor?: ",
					cell instanceof nanities.entities.Actor, "<br />");
				document.write("Passable?: ",cell.isPassable,"<br />");
			}
			document.write("---------------<br />");
			return true;
		} else {
			console.log("could not test, cell retrieval failed for", x,",",y);
			return false;
		}

	},
	
	showFullMatrix: function (){
		var blah = 0;
		matrixSize = nanities.engine.model.dimensions();
		for (var y=0;y<matrixSize.y;y++) {
			for (var x=0;x<matrixSize.x;x++) {
				if (!(blah%matrixSize.x)){
					document.write('<br>');
				}
				document.write(nanities.engine.model.cell(x,y));
				blah++
			}
		}
	}
};
