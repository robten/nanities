nanities.addComponent("resources");
nanities.resources = (function () {

	return {

		initDesposits: function(resourceType,
									radiusStart,
									radiusStop,
									depositAmount,
									depositSizeMin,
									depositSizeMax,
									offset) {
			var radiusMin = Math.floor(radiusStart*FieldWidth);
			var radiusMax = Math.floor(radiusStop*FieldHeight);
			var ResourceArray = new Array(depositAmount);
			var OptionalFieldsArray = [];
			
			OptionalFieldsArray = availableForResource(radiusMin, radiusMax, offset);
			ResourceArray = createDeposits(OptionalFieldsArray, resourceType, depositAmount);
			increaseDeposits(ResourceArray, depositSizeMin, depositSizeMax);

		},
		//	folgende funktionen oben einbauen
		//	availableForResource
		//	createDeposits
		//	increaseDeposits

		availableForResource: function(radiusMin, radiusMax, offset) {
			var available = [];
			var distance;
			for (var i = (startposX - radiusMax) ; i <= (startposX + radiusMax) ; i++) {
				for (var j = (startposY - radiusMax) ; j <= (startposY + radiusMax) ; j++) {
					distance = Math.sqrt((i-startposX)*(i-startposX) + (j-startposY)*(j-startposY)); //euclid
					if (distance > (radiusMin+offset) && distance < (radiusMax+offset) && (i>=0) && (i<FieldHeight) && (j>=0) && (j<FieldWidth)){
						matrix[i][j]="x";
						available.push([i,j]);
					}
				}
			}
			return available;
		},

		createDeposits: function(OptionalFieldsArray, resourceType, depositAmount) {
			var resourceField = [];
			var exist = false;
			var random;
			for (var i=0;i<depositAmount;) {
				random=Math.floor(Math.random()*(OptionalFieldsArray.length));
				
				for (var j=0;j<resourceField.length;j++) {
					if (resourceField[j] == OptionalFieldsArray[random]){exist = true;}
				}
				
				if (!exist) {
					resourceField[i] = OptionalFieldsArray[random];
					i++;
				}
				exist = false;
			}
			return resourceField;
		},

		increaseDeposits: function(resourceField, depositMin, depositMax) {
			var randomDepositSize, randomDepositSelector, randomNeighbourX, randomNeighbourY;
			var left, right, topp, bottom;
			for (i=0;i<resourceField.length;i++) {//iteriere durch einerfelder
				var deposit = [];
				deposit.push(resourceField[i]);//erstes einerfeld rein
				randomDepositSize = Math.floor((Math.random()*(depositMax-1))+depositMin);//zufallszahl für depositgröße(2-5)
				for (j=depositMin;j<=randomDepositSize;j++) {//von 2 bis (2 bis 5)
					randomDepositSelector = Math.floor(Math.random()*(deposit.length-1));//wähle zufälliges feld aus deposit
					do {
						randomNeighborX = Math.floor((Math.random()*3)-1);//zufallsnachbarX
						randomNeighborY = Math.floor((Math.random()*3)-1);//zufallsnachbarY
						//left			= !!((deposit[randomDepositSelector][0]+randomNeighborX) < 0);
						//topp			= !!((deposit[randomDepositSelector][1]+randomNeighborY) < 0);
						//right			= !!((deposit[randomDepositSelector][0]+randomNeighborX) > FieldWidth-1);
						//bottom		= !!((deposit[randomDepositSelector][1]+randomNeighborY) > FieldWidth-1);
						exist			= !!(matrix[(deposit[randomDepositSelector][0])+randomNeighborX][(deposit[randomDepositSelector][1])+randomNeighborY]=="*");//noch kein iron
					}
					while((randomNeighborX === 0) && (randomNeighborY === 0) || exist); //wenn zufallsnachbar nicht manselbst ist(0,0) und noch kein "*" gesetzt
					matrix[deposit[randomDepositSelector][0]+randomNeighborX][deposit[randomDepositSelector][1]+randomNeighborY] = "*";//setze iron
					deposit.push([deposit[randomDepositSelector][0]+randomNeighborX,deposit[randomDepositSelector][1]+randomNeighborY]);//füge neues ironfeld in deposit
				}
			}
		}
	};
}) ();
