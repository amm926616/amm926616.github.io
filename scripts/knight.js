function generateKnightMovements(piece) {
    [a, b, aI, bI] = extractAB(piece);
    let coordinates = []; 

    const knightCoordinates = [[aI+2, bI+1], [aI+2, bI-1], [aI-2, bI+1], [aI-2, bI-1], [aI+1, bI+2], [aI-1, bI+2], [aI+1, bI-2], [aI-1, bI-2]]

    for (let i = 0; i < 8; i++) {
        const x = columns[knightCoordinates[i][0]];
        const y = rows[knightCoordinates[i][1]];
        const xy = x+y;

        if (x != undefined && y != undefined && xy != NaN) {
            coordinates.push(xy);
        }
    }

    return coordinates;
}