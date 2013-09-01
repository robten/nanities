nanities.engine.setModel(new nanities.Model(60, 60));
nanities.resources.initDepots("*",0.1,0.3,20,2,5,0.5);
var testView = new nanities.View("canvas1");
testView.setModel(nanities.engine.model());
testView.setShowGrid(false);
//tests.showFullMatrix();

var gridToggleButton = document.getElementById("gridToggle");
var toggle = false;
gridToggleButton.innerHTML = "Grid ON";
gridToggleButton.onclick = function() {
	toggle = !toggle;
	testView.setShowGrid(toggle);
	testView.updateView();
	if (toggle)
		gridToggleButton.innerHTML = "Grid OFF";
	else
		gridToggleButton.innerHTML = "Grid ON";
};