function generateBishopMovements(piece) {
    [a, b, aI, bI] = extractAB(piece);
    let color = piece.id;
    let coordinates = [];

    // i + j + 
    for (let i = aI + 1, j = bI + 1; i < 8; i++) {
        let x = columns[i];
        let y = rows[j++];
        let xy = x + y;

        if (y == undefined) {
            break;
        }

        if (document.getElementById(xy).hasChildNodes() && document.getElementById(xy).firstChild.id == color) {
            break;
        }
    
        if (document.getElementById(xy).hasChildNodes() && document.getElementById(xy).firstChild.id != color) {
            coordinates.push(xy);
            console.log(document.getElementById(xy).firstChild.id);
            break;
        }
    
        if (!document.getElementById(xy).hasChildNodes()) {
            coordinates.push(xy);
        }
    }

    // i - j + 
    for (let i = aI - 1, j = bI + 1; i >= 0; i--) {
        let x = columns[i]
        let y = rows[j++]
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

    // i - j - 
    for (let i = aI - 1, j = bI - 1; i >= 0; i--) {
        let x = columns[i]
        let y = rows[j--]
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

    // i + j - 
    for (let i = aI + 1, j = bI - 1; i < 8; i++) {
        let x = columns[i]
        let y = rows[j--]
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