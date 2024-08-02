function generateRookMovements(piece) {
    [a, b, aI, bI] = extractAB(piece);
    let color = piece.id;
    let coordinates = [];

    // + _
    for (let i = aI + 1; i < 8; i++) {
        let x = columns[i];
        let y = b;
        let xy = x + y;

        if (x == undefined) {
            break;
        }

        if (document.getElementById(xy).hasChildNodes() && document.getElementById(xy).firstChild.id == color) {
            break;
        }

        if (document.getElementById(xy).hasChildNodes() && document.getElementById(xy).firstChild.id != color) {
            coordinates.push(xy);
            break;
        }
    
        if (!document.getElementById(xy).hasChildNodes()) {
            coordinates.push(xy);
        }
    }

    // - _
    for (let i = aI - 1; i >= 0; i--) {
        let x = columns[i];
        let y = b;
        let xy = x + y;

        if (x == undefined) {
            break;
        }

        if (document.getElementById(xy).hasChildNodes() && document.getElementById(xy).firstChild.id == color) {
            break;
        }
    
        if (document.getElementById(xy).hasChildNodes() && document.getElementById(xy).firstChild.id != color) {
            coordinates.push(xy);
            break;
        }
    
        if (!document.getElementById(xy).hasChildNodes()) {
            coordinates.push(xy);
        }    
    }

    // _ +
    for (let j = bI + 1; j < 8; j++) {
        let x = a;
        let y = rows[j];
        let xy = x + y;

        if (y == undefined) {
            break;
        }

        if (document.getElementById(xy).hasChildNodes() && document.getElementById(xy).firstChild.id == color) {
            break;
        }
    
        if (document.getElementById(xy).hasChildNodes() && document.getElementById(xy).firstChild.id != color) {
            coordinates.push(xy);
            break;
        }
    
        if (!document.getElementById(xy).hasChildNodes()) {
            console.log(xy);
            coordinates.push(xy);
        }   
    }

    // _ -
    for (let j = bI - 1; j >= 0; j--) {
        let x = a;
        let y = rows[j];
        let xy = x + y;

        if (y == undefined) {
            break;
        }

        if (document.getElementById(xy).hasChildNodes() && document.getElementById(xy).firstChild.id == color) {
            break;
        }
    
        if (document.getElementById(xy).hasChildNodes() && document.getElementById(xy).firstChild.id != color) {
            coordinates.push(xy);
            break;
        }
    
        if (!document.getElementById(xy).hasChildNodes()) {
            coordinates.push(xy);
        }    
    }

    return coordinates;
}