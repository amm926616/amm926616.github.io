function generateQueenMovements(piece) {
    let coordinates = [];

    diagonalCoordinates = generateBishopMovements(piece)
    crossSectionCoordinates = generateRookMovements(piece);

    coordinates = diagonalCoordinates.concat(crossSectionCoordinates);

    console.log("queen moves " + coordinates);

    return coordinates;
}   