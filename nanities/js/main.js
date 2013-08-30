nanities.engine.setModel(new nanities.Model(60, 60));
var model;
if (!model) {
    model = nanities.engine.model();
    matrixSize = model.dimensions();
}

nanities.resources.initDepots("*",0.1,0.4,200,2,5,0.5);
model.setCell(30, 30, "S"); //start
model.setCell(0, 0, "G");   //target
var myPath = nanities.path.aStar(30, 30, 0, 0, true);

var testView = new nanities.View("canvas1");
testView.setModel(nanities.engine.model());
//tests.showFullMatrix();