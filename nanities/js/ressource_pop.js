var FieldWidth = 100;
var FieldHeight = 100;
var StartposX = Math.floor(FieldWidth/2);		//abrunden
var StartposY = Math.floor(FieldHeight/2);	//abrunden
var OUR_MAIN_PLAYGROUND_ARRAY;
InitDeposits("iron", 0.1, 0.3, 20, 1, 5, 0.5);

function InitDeposits(		resourceType,	//Ressourcentyp - ID oder Name
							radiusStart,	//innerer Kreisradius ("ab hier darf ressource spawnen")
							radiusStop,		//äußerer Kreisradius ("bis hier darf ressource spawnen")
							resourceAmount,	//gesamte Anzahl an Ressourcenfeldern
							depositSizeMin,	//miteinander verknüpfte Ressourcen - noch nicht implementiert
							depositSizeMax, //miteinander verknüpfte Ressourcen - noch nicht implementiert
							offset)			//kreisverfeinerung
{
	//array mit feldern für ressource erzeugen
	var radiusMin = Math.floor(radiusStart*FieldWidth);
	var radiusMax = Math.floor(radiusStop*FieldHeight);
	var RessourceArray = new Array(ressourceAmount);
	var OptionalFieldsArray = new Array();
	OptionalFieldsArray = AvailableForResource(radiusMin, radiusMax, offset);
	CreateDeposits(OptionalFieldsArray, resourceType, resourceAmount);
}

//	******************************************************************************************************
//	AvailableForResource creates and returns array of Coordinates of fields who are within minimum and maximum range
//	offset polishs the circleshape
//	iterates through all Fields that are within a square for startposition XY minus and plus radius
//	distance is calculated with euclidean distance formula
//	returns the array
//	******************************************************************************************************
function AvailableForResource(radiusMin, radiusMax, offset)
{
	var Available = new Array();
	var distance;
	for (var i = (StartposX - radiusMax) ; i <= (StartposX + radiusMax) ; i++)
	{
		for (var j = (StartposY - radiusMax) ; j <= (StartposY + radiusMax) ; j++)
		{
			distance = Math.sqrt((i-StartposX)*(i-StartposX) + (j-StartposY)*(j-StartposY)); //euclid
			if (distance > (radiusMin+offset) && distance < (radiusMax+offset))
			{
				Available.push([i,j]);
			}
		}
	}
	return Available;
}

//	******************************************************************************************************
//	creates array of resourceAmount random nonrepeating numbers between 0 and OptionalFieldsArray.length
//	injects these fieldcoordinates into the main matrix
//	******************************************************************************************************
function CreateDeposits(OptionalFieldsArray, resourceType, resourceAmount)
{
	var resourceField = new Array();
	var exist = false;
    var random;
    for (var i=0;i<resourceAmount;)
    {
		random=Math.floor(Math.random()*(OptionalFieldsArray.length));
		for (var j=0;j<resourceAmount;j++)
		{
			if (resourceField[j] == random) exist = true; 
		}
		if (!exist) 
		{
			resourceField[i]=random;
			i++;
		}
		exist = false;
	}
	/*
	for (var k=0;k<(resourceField.length);k++)
	{
		OUR_MAIN_PLAYGROUND_ARRAY[OptionalFieldArray[resourceField[k]][0]][OptionalFieldArray[resourceField[k]][1]].klassehinzufügen(resourceType);
	}
	*/
}
