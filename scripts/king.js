function generateKingMovements(piece) {
    [a, b, aI, bI] = extractAB(piece);

    var coordinates = [a + rows[bI+1], columns[aI+1] + b, a + rows[bI-1], columns[aI-1] + b,
columns[aI+1] + rows[bI+1], columns[aI+1] + rows[bI-1], columns[aI-1] + rows[bI-1], columns[aI-1] + rows[bI+1]];

    console.log(coordinates);

    return coordinates;
}

function castling(piece, toWhere) {
    const color = piece.id;

    const runwaySquares = {"white" : {"left": ["b1", "c1", "d1"], "right": ["f1", "g1"]}, "black" : {"left": ["b8", "c8", "d8"], "right": ["f8", "g8"]}};
}

let runwaySquares = {"c1": ["b1", "d1"], "g1": ["f1"], "c8": ["b8", "d8"], "g8": ["f8"]}

function runwayChecking(droppingSquare) {
    console.log(droppingSquare)
    console.log(runwaySquares[droppingSquare]);
    let checking = true;
    for (i of runwaySquares[droppingSquare]) {
        const groundsquare = document.getElementById(i);
        if (groundsquare.childNodes.length != 0) {
            checking = false;
        }
    }
    return checking;
}

