function extractAB(piece) {
    const coordinates = piece.parentNode.id;
    const a = coordinates[0];
    const b = coordinates[1];
    const aI = columns.indexOf(a);
    const bI = Number(b - 1);

    return [a, b, aI, bI];
}