// Test some cells:
Engine.matrixInit();
Engine.matrix[1][1] = new Entity(true);
Engine.matrix[4][4] = new Actor("Otto","opponent");
inspectMatrix(0,0,Engine.matrix[0][0]);
inspectMatrix(1,1,Engine.matrix[1][1]);
inspectMatrix(4,4,Engine.matrix[4][4]);