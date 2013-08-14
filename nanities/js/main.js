nanities.engine.init(50, 50);	// ! engine needs initialization befor it can be used !
console.log("model dimensions:", nanities.engine.modelDimensions() );
nanities.resources.initDepots("*",0.1,0.3,20,2,5,0.5);
//tests.runTests();
tests.showFullMatrix();