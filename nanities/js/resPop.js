var resource = (function() {
	var fieldWidth = 100;
	var fieldHeight = 100;
	var startPosX = Math.floor(fieldWidth/2);	//abrunden
	var startPosY = Math.floor(fieldHeight/2);	//abrunden
	var OUR_MAIN_PLAYGROUND_ARRAY;

	return {
		initDeposits: function(	resourceType,	//Ressourcentyp - ID oder Name
								radiusStart,	//innerer Kreisradius ("ab hier darf resource spawnen")
								radiusStop,		//äußerer Kreisradius ("bis hier darf resource spawnen")
								resourceAmount,	//gesamte Anzahl an Resourcenfeldern
								depositSizeMin,	//miteinander verknüpfte Resourcen - noch nicht implementiert
								depositSizeMax, //miteinander verknüpfte Resourcen - noch nicht implementiert
								offset)			//kreisverfeinerung
		{
			//array mit feldern für resource erzeugen
			var radiusMin = Math.floor(radiusStart*fieldWidth);
			var radiusMax = Math.floor(radiusStop*fieldHeight);
			var resourceArray = new Array(resourceAmount);
			var optionalFieldsArray = new Array();
			optionalFieldsArray = this.availableForResource(radiusMin, radiusMax, offset);
			this.createDeposits(optionalFieldsArray, resourceType, resourceAmount);
		},

		//	******************************************************************************************************
		//	availableForResource creates and returns array of Coordinates of fields who are within minimum and maximum range
		//	offset polishs the circleshape
		//	iterates through all Fields that are within a square for startposition XY minus and plus radius
		//	distance is calculated with euclidean distance formula
		//	returns the array
		//	******************************************************************************************************
		availableForResource: function(radiusMin, radiusMax, offset)
		{
			var available = new Array();
			var distance;
			for (var i = (startPosX - radiusMax) ; i <= (startPosX + radiusMax) ; i++) {
				for (var j = (startPosY - radiusMax) ; j <= (startPosY + radiusMax) ; j++) {
					distance = Math.sqrt((i-startPosX)*(i-startPosX) + (j-startPosY)*(j-startPosY)); //euclid
					if (distance > (radiusMin+offset) && distance < (radiusMax+offset)) {
						available.push([i,j]);
					}
				}
			}
			return available;
		},

		//	******************************************************************************************************
		//	creates array of resourceAmount random nonrepeating numbers between 0 and OptionalFieldsArray.length
		//	injects these fieldcoordinates into the main matrix
		//	******************************************************************************************************
		createDeposits: function(optionalFieldsArray, resourceType, resourceAmount)
		{
			var resourceField = new Array();
			var exist = false;
		    var random;
		    for (var i=0;i<resourceAmount;) {
				random=Math.floor(Math.random()*(optionalFieldsArray.length));
				for (var j=0;j<resourceAmount;j++) {
					if (resourceField[j] == random) exist = true; 
				}
				if (!exist) {
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
	}
}) ();

resource.initDeposits("iron", 0.1, 0.3, 20, 1, 5, 0.5);