const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];

var coordinates = [];
var pawnTakingCoordinates = [];

function checkPieceType(pieceCode, image) {
    const type = pieceCode[1];
    if (type == 'k') {
        image.classList.add('king');
        image.classList.add('$')
    }

    else if (type == 'q') {
        image.classList.add('queen');
    } 
    
    else if (type == 'r') {
        image.classList.add('rook');
        image.classList.add('$');
    }

    else if (type == 'b') {
        image.classList.add('bishop');
    }

    else if (type == 'n') {
        image.classList.add('knight');
    }

    else if (type == 'p') {
        image.classList.add('#')
    }
}

