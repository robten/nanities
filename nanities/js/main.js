// Test some cells:
engine.setCell(1,1, new entities.Entity(true));
engine.setCell(4,4, new entities.Actor("Otto", "opponent"));
inspectMatrix(0,0);
inspectMatrix(1,1);
inspectMatrix(4,4);