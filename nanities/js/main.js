nanities.engine.setModel(new nanities.Model(60, 60));
nanities.resources.initDepots("*",0.1,0.3,20,2,5,0.5);
var testView = new nanities.View("canvas1");
testView.setModel(nanities.engine.model());
testView.setShowGrid(true);
//tests.showFullMatrix();
