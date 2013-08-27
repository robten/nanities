nanities.engine.setModel(new nanities.Model(60, 60));
nanities.resources.initDepots("*",0.1,0.3,20,2,5,0.5);
nanities.pathfinder.aStarFind(0,0,4,1);
//var testView = new nanities.View("canvas1");
//testView.setModel(nanities.engine.model());
tests.showFullMatrix();
