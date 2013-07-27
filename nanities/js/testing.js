// Just to write testing results.
function inspectMatrix(x,y,value){
	document.write("---------------<br />");
	if (value == null) {
		document.write(x,",",y, " is NULL<br />");
	} else {
		document.write(x,",",y, " is not NULL<br />");
		document.write("It's of type: ",typeof(value),"<br />");
		document.write("Is ",x,",",y," an Entity?: ",value instanceof Entity, "<br />");
		document.write("Is ",x,",",y," an Actor?: ",value instanceof Actor, "<br />");
		document.write("Passable?: ",value.isPassable,"<br />");
	}
	document.write("---------------<br />");

}