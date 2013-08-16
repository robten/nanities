var dims;
nanities.engine.model = nanities.Model(60, 30);
dims = nanities.engine.model.dimensions();
console.log("model dimensions:", dims.x, "x", dims.y);
nanities.resources.initDepots("*",0.1,0.3,20,2,5,0.5);
//tests.runTests();
tests.showFullMatrix();