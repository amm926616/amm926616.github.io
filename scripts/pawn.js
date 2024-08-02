function generatePawnMovements(piece, energized) {
    let cc = piece.parentNode.id;
    const a = cc[0];
    const aI = columns.indexOf(a); // index of column
    const bI = Number(cc[1]); // index of row
    const b = cc[1];
    const color = piece.id; // w or b

    if (energized) {
        if (color == "w") {
            coordinates = [a + String(bI + 1), a + String(bI + 2)];
        } else {
            coordinates = [a + String(bI - 1), a + String(bI - 2)];
        }
    } else {
        if (color == "w") {
            coordinates = [a + String(bI + 1)];
        } else {
            coordinates = [a + String(bI - 1)];
        }
    }

    console.log(coordinates)

    return coordinates;
}

function generatePawnTakingMovements(piece) {
    let cc = piece.parentNode.id;
    const a = cc[0];
    const aI = columns.indexOf(a); // index of column
    const bI = Number(cc[1]); // index of row
    const b = cc[1];
    const color = piece.id; // w or b

    if (color == "w") {
        pawnTakingCoordinates = [columns[aI + 1] + String(bI + 1), columns[aI - 1] + String(bI + 1)]
    } else {
        pawnTakingCoordinates = [columns[aI + 1] + String(bI - 1), columns[aI - 1] + String(bI - 1)]
    }

    return pawnTakingCoordinates;
}


