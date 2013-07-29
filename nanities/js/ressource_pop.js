var Field_Width = 100;
var Field_Height = 100;
var Startpos_X = Math.floor(Field_Width/2);  	//abrunden
var Startpos_Y = Math.floor(Field_Height/2);	//abrunden
var OUR_MAIN_PLAYGROUND_ARRAY;
fInit_Deposits("iron", 0.1, 0.3, 20, 1, 5, 0.5);

function fInit_Deposits(	resource_type,		//Ressourcentyp - ID oder Name
							radius_start,		//innerer Kreisradius ("ab hier darf ressource spawnen")
							radius_stop,		//äußerer Kreisradius ("bis hier darf ressource spawnen")
							resource_amount,	//gesamte Anzahl an Ressourcenfeldern
							deposit_size_min,	//miteinander verknüpfte Ressourcen - noch nicht implementiert
							deposit_size_max)	//miteinander verknüpfte Ressourcen - noch nicht implementiert
{
	//array mit feldern für ressource erzeugen
	var radius_min = Math.floor(radius_start*Field_Width);
	var radius_max = Math.floor(radius_stop*Field_Height);
	var Ressource_Array = new Array(ressource_amount);
	var OptionalFields_Array = new Array();
	OptionalFields_array = fAvailable_for_Resource(radius_min, radius_max, 0.5);
	
	
	
	//felder aus array in spielfeld eintragen
	//return true
}

//	******************************************************************************************************
//	fAvailable_for_Resource creates and returns array of IDs of fields who are within minimum and maximum range
//	offset polishs the circleshape
//	iterates through all Fields that are within a square for startposition XY minus and plus radius
//	distance is calculated with euclidean distance formula
//	returns the array
//	******************************************************************************************************
function fAvailable_for_Resource(radius_min, radius_max, offset)
{
	var aAvailable = new Array();
	var distance;
	for (var i = (Startpos_X - radius_max) ; i <= (Startpos_X + radius_max) ; i++)
	{
		for (var j = (Startpos_Y - radius_max) ; j <= (Startpos_Y + radius_max) ; j++)
		{
			distance = Math.sqrt((i-Startpos_X)*(i-Startpos_X) + (j-Startpos_Y)*(j-Startpos_Y)); //euclid
			if (distance > (radius_min+offset) && distance < (radius_max+offset))
			{
				aAvailable.push(OUR_MAIN_PLAYGROUND_ARRAY[i,j].id);
			}
		}
	}
	return aAvailable;
}
