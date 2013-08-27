nanities.addComponent("pathfinder");
nanities.pathfinder = (function () {
    var model;
    return {
        aStarFind: function(startX, startY, goalX, goalY) {
            if (!model) {
                model = nanities.engine.model();
                matrixSize = model.dimensions();
            }
            
            var openList = [];
            var closedList = [];
            var neighbours = [];
            var inOpen = false;
            var inClosed = false;
            var bla =0;
            var aktuellesQuadrat;
            openList.push([[startX, startY],[-1,-1],0, 0, 0]);
            do {
                document.write('<br>durchlauf: '+bla+'<br>');
                console.log(' ');
                console.log('durchlauf: '+bla);
                
                var finish = false;
                var openListLength = false;
                minimumF =(matrixSize.x + matrixSize.y);
                for (var i=0; i<openList.length; i++) {
                    if (minimumF>openList[i][4]) {
                        aktuellesQuadrat = openList[i]
                        var iterator = i;
                        minimumF = openList[i][4];
                    }
                }
                closedList.push(aktuellesQuadrat);
                openList.splice(iterator, 1);
                neighbours = nanities.tools.getNeighbours(aktuellesQuadrat[0][0],aktuellesQuadrat[0][1],false);
                for (var i=0; i<neighbours.length; i++) {
                    console.log('pruefe neighbour['+i+']: '+neighbours[i]);
                    for (var j=0; j<closedList.length; j++) {
                        
                        if ((neighbours[i][0] == closedList[j][0][0]) &&
                            (neighbours[i][1] == closedList[j][0][1])) {
                            inClosed = true;
                            console.log('neighbour['+i+'] in closedList');
                        } else {
                            inClosed = false;
                        }
                    }
                    
                    if ((model.cell(neighbours[i][0],
                                    neighbours[i][1]) == "0") || !inClosed) {
                        console.log('neighbour['+i+'] nicht in closedList oder passable...');
                        var distance = nanities.tools.manhattenDist(neighbours[i][0],
                                                                    neighbours[i][1],
                                                                    goalX, goalY);
                        console.log('neighbour['+i+'] distance zum Ziel: '+distance);
                        for (var k=0; k<openList.length; k++) {
                            if ((neighbours[i][0] == openList[k][0][0]) &&
                                (neighbours[i][1] == openList[k][0][1])) {
                                inOpen = true;
                                console.log('neighbour['+i+'] in openList');
                            } else {
                                inOpen = false;
                                console.log('neighbour['+i+'] nicht in openList');
                            }
                        }
                        if (inOpen) {
                            if ((neighbours[i][2])<(openList[k][2])) {
                                openList[k][1][0] = aktuellesQuadrat[0][0];
                                openList[k][1][1] = aktuellesQuadrat[0][1];
                                openList[k][2] = 0;
                                openList[k][4] = aktuellesQuadrat[2]+distance;
                                console.log('durchlauf '+bla+': '+neighbours[i]+'updated');
                            }
                        } else {
                            openList.push([[neighbours[i][0],neighbours[i][1]],
                                           [aktuellesQuadrat[0][0],aktuellesQuadrat[0][1]],
                                            0,
                                            distance,
                                            aktuellesQuadrat[2]+distance]);
                                            console.log('durchlauf '+bla+': '+neighbours[i]+'gepusht');
                        }
                    }
                    if (neighbours[i][0] == goalX &&
                        neighbours[i][1] == goalY) { finish = true; }
                    if (openList.length == 0) { 
                    openListLength = true; }
                }
                
                
                document.write('***AKTUELLES QUADRAT**<br>')
                document.write('aktuelles Quadrat: '+aktuellesQuadrat+'<br>');
                /*
                document.write('***NEIGHBOURS***<br>')
                for (var i=0; i<neighbours.length; i++) {
                    document.write('neighbours['+i+']: '+neighbours[i]+'<br>');
                }
*/
                document.write('***OPENLIST***<br>')
                for (var i=0; i<openList.length; i++) {
                    document.write('openList['+i+']: '+openList[i]+'<br>');
                }
                document.write('***CLOSEDLIST***<br>')
                for (var i=0; i<closedList.length; i++) {
                    document.write('closedList['+i+']: '+closedList[i]+'<br>');
                }
                bla++
            } while(!finish && !openListLength && bla < 20);
        }
    }        
})();
/*

1)  	Füge das Startquadrat der offenen Liste hinzu.
2)  	Wiederhole das Folgende:
  	a) 	Suche in der offenen Liste nach dem Quadrat mit dem niedrigsten F-Wert. Wir bezeichnen dieses Quadrat im Folgenden als das aktuelle Quadrat.
  	b) 	Verschiebe es in die geschlossene Liste.
  	c) 	Für jedes der 8 an das aktuelle Quadrat angrenzenden Quadrate:

    Wenn es nicht begehbar ist oder sich bereits in der geschlossenen Liste befindet, ignoriere es; andernfalls mach das Folgende:
    Wenn es nicht in der offenen Liste ist, füge es der offenen Liste hinzu. 
    Trage das aktuelle Quadrat als Vorgängerquadrat dieses Quadrats ein.
    Trage zusätzlich die Werte für die F-, G- und H-Kosten dieses Quadrates ein.
    done!



    Falls es bereits in der offenen Liste ist, prüfe, ob der Pfad vom aktuellen Quadrat zu ihm - gemessen am G-Wert -, 
    besser ist, als der Pfad von seinem eingetragenen Vorgängerquadrat (ein geringerer G-Wert bedeutet einen besseren Pfad). 
    Falls dem so ist, ändere sein Vorgängerquadrat auf das aktuelle Quadrat und berechne seine Werte für G und F neu. 
    Sofern Du Deine offene Liste nach dem F-Wert sortiert hast, ist möglicherweise eine Neusortierung dieser Liste erforderlich, um dieser Veränderung Rechnung zu tragen.

  	d) 	Beende den Prozess, falls:

    Du das Zielquadrat in die geschlossene Liste verschoben hast; in diesem Fall hast Du den Pfad ermittelt
    kein Zielquadrat gefunden werden konnte und die offene Liste leer ist; in diesem Fall gibt es keinen Pfad.

3)  	Sichere den Pfad. Der Pfad erschließt sich, indem Du vom Zielquadrat aus Quadrat für Quadrat rückwärts schreitend das Startquadrat erreichst. */