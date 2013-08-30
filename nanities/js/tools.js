nanities.addComponent("tools");
nanities.tools = (function () {
    var model;
    var initModel = function() {
        if (!model) {
            model = nanities.engine.model();
            matrixSize = model.dimensions();
        }
    };
    return {
        //returns true euclidean distance between 2 fields
        trueDist: function(x1, y1, x2, y2) {
            initModel();
            if (model.isValid(x1, y1) && model.isValid(x2, y2)) {
                return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
            } else {
                console.log("invalid field");
                return false;
            }
        },
        
        //returns integer distance between 2 fields by only moving horizontally and vertically
        manhDist: function(x1, y1, x2, y2) {
            initModel();
            if (model.isValid(x1, y1) && model.isValid(x2, y2)) {
                return Math.abs(x1 - x2) + Math.abs(y1 - y2);
            } else {
                console.log("invalid field");
                return false;
            }
        },
        
        //returns array of 4 or 8 neighbours of a field depending on bool value (true -> 8)
        getNeighb: function(x, y, bool) {
            initModel();
            var possNeighbours =[];
            var neighbours = [];
                if (bool) {
                    possNeighbours.push([x-1, y-1],[x-1,y],[x-1,y+1],[x,y-1],
                                    [x,y+1],[x+1,y-1],[x+1,y],[x+1,y+1]);
                    for (i=0;i<possNeighbours.length;i++) {
                        if ((model.isValid(possNeighbours[i][0], possNeighbours[i][1]))) {
                            neighbours.push(possNeighbours[i]);
                        }
                    }
                } else {
                    possNeighbours.push([x-1,y],[x,y-1],[x+1,y],[x,y+1])
                    for (i=0;i<possNeighbours.length;i++) {
                        if ((model.isValid(possNeighbours[i][0], possNeighbours[i][1]))) {
                            neighbours.push(possNeighbours[i]);
                        }
                    }
                }
                return neighbours;
        }
        //more to come baby
    }
})();