nanities.addComponent("resources");
nanities.resources = (function () {
    var resource, matrixSize, startPosX, startPosY, radiusMin, radiusMax, model;
    

    var availForRes = function(radiusMin, radiusMax, offSet) {
        var available = [];
        var distance;
        for (var i=(startPosX - radiusMax); i<=(startPosX + radiusMax); i++) {
            for (var j=(startPosY - radiusMax); j<=(startPosY + radiusMax); j++) {
                distance=Math.sqrt((i - startPosX) * (i - startPosX) +
                                   (j - startPosY) * (j - startPosY));
                if (distance>(radiusMin + offSet) 
                    && distance<(radiusMax + offSet) 
                    && (i>=0) 
                    && (i<matrixSize.x) 
                    && (j>=0) 
                    && (j<matrixSize.y)) {
                    if (model.cell(i, j) == 0){
                        model.setCell(i, j, 0);
                    }
                    available.push([i, j]);
                }
            }
        }
        return available;
    };

    var createDepots = function(OptFields, resType, depotAmount) {
        var resField = [];
        var exist = false;
        var random;
        for (var i=0; i<depotAmount; ) {
            random = Math.floor(Math.random()*(OptFields.length));
            for (var j=0; j<resField.length; j++) {
                if (resField[j] == OptFields[random]){exist = true;}
            }
            if (!exist) {
                resField[i] = OptFields[random];
                i++;
            }
            exist = false;            
        }
        return resField;
    };

    var incDepots = function(resField, depotMin, depotMax) {
        var rndDepotSize, rndDepotSel, rndNeighbX, rndNeighbY;
        var left, right, topp, bottom;
        for (i=0; i<resField.length; i++) {
            var depot = [];
            depot.push(resField[i]);
            rndDepotSize = Math.floor((Math.random() * (depotMax-1)) + depotMin);
            for (j=depotMin; j<=rndDepotSize; j++) {
                rndDepotSel = Math.floor(Math.random() * (depot.length-1));
                var drop = 0;
                do {
                    do {
                        rndNeighbX = Math.floor((Math.random() * 3) -1);
                        rndNeighbY = Math.floor((Math.random() * 3) -1);
                        left = Boolean((depot[rndDepotSel][0] + rndNeighbX) < 0);
                        topp = Boolean((depot[rndDepotSel][1] + rndNeighbY) < 0);
                        right = Boolean((depot[rndDepotSel][0] + rndNeighbX) > matrixSize.x-1);
                        bottom = Boolean((depot[rndDepotSel][1] + rndNeighbY) > matrixSize.y-1);
                    }while (left || topp || right || bottom);
                    exist = !!(model.cell((depot[rndDepotSel][0] + rndNeighbX), 
                                                    (depot[rndDepotSel][1] + rndNeighbY))
                                                    == resource);
                    drop++;
                }while (exist && drop < 20);
                model.setCell((depot[rndDepotSel][0] + rndNeighbX),
                                        (depot[rndDepotSel][1] + rndNeighbY), resource);
                depot.push([depot[rndDepotSel][0] + rndNeighbX,
                            depot[rndDepotSel][1] + rndNeighbY]);
            }
        }
    };

    return {
        initDepots: function(resType,
                             radiusStart,
                             radiusStop,
                             depotAmount,
                             depotSizeMin,
                             depotSizeMax,
                             offSet) {
            resource = resType;
            if (!model) {
                model = nanities.engine.model();
                matrixSize = model.dimensions();
            }
            startPosX = Math.floor(matrixSize.x / 2);
            startPosY = Math.floor(matrixSize.y / 2);
            radiusMin = Math.floor(radiusStart * (matrixSize.x));
            radiusMax = Math.floor(radiusStop * (matrixSize.y));
            var resArray = new Array(depotAmount);
            var OptFields = [];
            OptFields = availForRes(radiusMin, radiusMax, offSet);
            resArray = createDepots(OptFields, resType, depotAmount);
            incDepots(resArray, depotSizeMin, depotSizeMax);
            console.log('resource ' + resource + ' initialized.');
        }
    };
})();