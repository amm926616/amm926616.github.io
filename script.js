const pieceImages = {
    "wp": "images/wp.png",
    "wr": "images/wr.png",
    "wn": "images/wn.png",
    "wb": "images/wb.png",
    "wq": "images/wq.png",
    "wk": "images/wk.png",
    "bp": "images/bp.png",
    "br": "images/br.png",
    "bn": "images/bn.png",
    "bb": "images/bb.png",
    "bq": "images/bq.png",
    "bk": "images/bk.png",
};


const initialBoard = [
    ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
    ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
    ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
];


// Define an array to store coordinates for each square
const coordinates = [
    ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
    ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
    ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
    ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
    ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
    ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
    ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
    ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
];


let draggedImage;

function dragStart(e) {
    draggedImage = e.target;
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop(e) {
    e.preventDefault();
    const targetSquare = e.target;
    console.log("target square", targetSquare);

    if (targetSquare.tagName === "DIV") {
        targetSquare.appendChild(draggedImage);
        console.log("****", draggedImage, "on", targetSquare, "****");
    } else if (targetSquare.tagName === "IMG") {
        targetSquare.replaceWith(draggedImage);
        console.log("****", targetSquare, "is replaced with", draggedImage, "****")
    }
}

function createChessBoard() {
    const chessboard = document.getElementById("chessboard");

    // Define an array to store coordinates for each square
    const coordinates = [
        ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
        ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
        ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
        ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
        ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
        ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
        ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
        ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
    ];

    // to define the type of pieces
    const pieceTypes = [
        ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"],
        ["p", "p", "p", "p", "p", "p", "p", "p"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["p", "p", "p", "p", "p", "p", "p", "p"],
        ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"]
    ]

    // to define team
    const teamColors = [
        ["w", "w", "w", "w", "w", "w", "w", "w"],
        ["w", "w", "w", "w", "w", "w", "w", "w"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["b", "b", "b", "b", "b", "b", "b", "b"],
        ["b", "b", "b", "b", "b", "b", "b", "b"]
    ]

    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            const square = document.createElement("div");
            square.classList.add("square");
            if ((row + column) % 2 === 0) {
                square.classList.add("white");
            } else {
                square.classList.add("black");
            }

            // Adding event listener to each square
            square.addEventListener('dragover', dragOver);
            square.addEventListener('drop', dragDrop);

            // Create an inner container div for the image
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');

            const pieceCode = initialBoard[row][column];
            if (pieceCode) {
                const pieceImage = document.createElement('img');
                pieceImage.src = pieceImages[pieceCode];
                pieceImage.draggable = true; // Make the image draggable
                pieceImage.setAttribute("type", pieceTypes[row][column]);
                pieceImage.setAttribute("team-color", teamColors[row][column]);
                imageContainer.appendChild(pieceImage);

                // Adding event listener to image
                pieceImage.addEventListener('dragstart', dragStart);
            }

            square.appendChild(imageContainer);

            // Set the data-coordinate attribute to store the coordinate
            square.setAttribute('coordinate', coordinates[row][column]);

            chessboard.appendChild(square);
        }
    }
}



createChessBoard();



