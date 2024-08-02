function checkSpace(coordinate) {
    const square = document.getElementById(coordinate);
    
    if (square.childNodes.length == 0) {
        return coordinate;
    }

    else {
        con = false;
        console.log("turning false works")
        return false;
    }
}