// Just to write testing results.
function inspectMatrix(x,y) {
	var cell = engine.cell(x,y);
	document.write("---------------<br />");
	if (cell == null) {
		document.write(x,",",y, " is NULL<br />");
	} else {
		document.write(x,",",y, " is not NULL<br />");
		document.write("It's of type: ",typeof(cell),"<br />");
		document.write("Is ",x,",",y," an Entity?: ",
			cell instanceof entities.Entity, "<br />");
		document.write("Is ",x,",",y," an Actor?: ",
			cell instanceof entities.Actor, "<br />");
		document.write("Passable?: ",cell.isPassable,"<br />");
	}
	document.write("---------------<br />");

}