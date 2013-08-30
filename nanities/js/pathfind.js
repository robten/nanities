nanities.addComponent("path");
nanities.path = (function () {
    var model, contender;
    var openList = [], 
        closedList = [];
    var initModel = function() {
        if (!model) {
            model = nanities.engine.model();
            matrixSize = model.dimensions();
        }
    }
    // finds element with lowest F-value
    var findBestChoice = function(list) {
        var iterator,
            bestChoice =(matrixSize.x * matrixSize.y);
        for (var i=0; i<list.length; i++) {
            if (bestChoice>list[i][4]) {
                contender = list[i];
                iterator = i;
                bestChoice = list[i][4];
            }
        }
        return iterator
    }
    // finds element closest to target
    var findClosestChoice = function(list) {
        var iterator,
            bestChoice =(matrixSize.x * matrixSize.y);
        for (var i=0; i<list.length; i++) {
            if (bestChoice>list[i][3]) {
                contender = list[i];
                iterator = i;
                bestChoice = list[i][3];
            }
        }
        return iterator
    }
    // checks for elementcoordinates in list
    var inList = function(list, item) {
        if (list.length) {
            for (var i=0; i<list.length; i++) {
                if ((item[0] == list[i][0][0]) &&
                    (item[1] == list[i][0][1])) {
                    return i
                }
            }
        } else { return false }
    }
    
    return {
        aStar: function(startX, startY, targetX, targetY, bool) { // bool deciding diagonal movement
            initModel();
            var neighb = [],
                path = [];
            var inOpen,
                inClosed,
                movingCost;
            var dist = nanities.tools.manhDist(startX,
                                               startY,
                                               targetX, targetY)*10;
            openList.push([[startX, startY],[-1,-1], 0, dist, 0]);
            do {
                var finish = false,
                    openListLength = false;
                bestChoice = findBestChoice(openList);
                closedList.push(contender);
                openList.splice(bestChoice, 1);
                neighb = nanities.tools.getNeighb(contender[0][0],contender[0][1], bool);
                for (var i=0; i<neighb.length; i++) { // go through neighbours of contender
                    var nextNeighb = neighb[i];
                    inClosed = inList(closedList, nextNeighb); // testing next Neighbour inClosed
                    movingCost = 10
                    if (bool && (Math.abs(nextNeighb[0] - contender[0][0]) +
                                 Math.abs(nextNeighb[1] - contender[0][1]) > 1)) {
                        movingCost = 14;
                    }
                    if ((model.cell(nextNeighb[0],
                                    nextNeighb[1]) == 0) && !inClosed) { // 0 represents passable
                        var dist = nanities.tools.manhDist(nextNeighb[0],
                                                           nextNeighb[1],
                                                           targetX, targetY)*10;
                        inOpen = inList(openList, nextNeighb); // testing next Neighbour inOpen
                        if (inOpen) {
                            if ((contender[2])<(openList[inOpen][2])) {
                                openList[inOpen][1][0] = contender[0][0];
                                openList[inOpen][1][1] = contender[0][1];
                                openList[inOpen][4] = dist+contender[2]+movingCost;
                            }
                        } else {
                            openList.push([[nextNeighb[0],nextNeighb[1]],
                                           [contender[0][0],contender[0][1]],
                                            contender[2]+movingCost,
                                            dist, dist+contender[2]+movingCost]);
                        }
                    }
                    // reaching target
                    if (nextNeighb[0] == targetX &&
                        nextNeighb[1] == targetY) {
                        finish = true;
                        closedList.push([[targetX,targetY],
                                         [contender[0][0],contender[0][1]],
                                          0, 0, 0]);
                    }
                }
                // path to target
                if (finish) {
                    var x1 = targetX,
                        y1 = targetY;
                // path to nearest field
                } else if (openList.length == 0){
                    var closest = findClosestChoice(closedList);
                    var x1 =closedList[closest][0][0];
                    var y1 =closedList[closest][0][1];
                }
                // creating path
                if (finish || !openList.length > 0) {
                    for (var j = closedList.length-1;j>=0;j--) {
                        if (closedList[j][0][0] == x1 && closedList[j][0][1] == y1) {
                            x1 = closedList[j][1][0];
                            y1 = closedList[j][1][1];
                            // visual: 'x' calls res1.png in view
                            model.setCell(closedList[j][0][0],closedList[j][0][1],'x');
                            path.unshift([closedList[j][0][0],closedList[j][0][1]]);
                        }
                    }
                }
            } while((openList.length>0) && !finish);
            return path;
        }
    }        
})();