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


function createChessBoard() {
    const chessboard = document.getElementById("chessboard");

    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            const square = document.createElement("div");
            square.classList.add("square");
            if ((row + column) % 2 === 0) {
                square.classList.add("white");
            } else {
                square.classList.add("black");
            }

            pieceCode = initialBoard[row][column];
            if (pieceCode) {
                const pieceImage = document.createElement('img');
                pieceImage.src = pieceImages[pieceCode];                
                square.appendChild(pieceImage);
            }

            chessboard.appendChild(square);

        }
    }
}

createChessBoard();



