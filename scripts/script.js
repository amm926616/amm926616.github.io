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
}

const initialBoard = [
    ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
    ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
    ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
]

const row_ties = ['8', '7', '6', '5', '4', '3', '2', '1'];
const column_ties = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const special_lines = [];

for (let i of column_ties) {
    special_lines.push(i + "1");
    special_lines.push(i + "8")
}

console.log("special lines " + special_lines)

var chessboard = document.getElementById('chessboard');
const board_size = 8;

let beingDragged;
let draggedPieceCoordinate;
let newCoordinates = [];
let pawnTakingCoordinates = [];
let checkChecking = [];

let kingPlacingPositions = {"white": ["c1", "g1"], "black": ["c8", "g8"]};

let whooseTurn = "w";

let kingInCheck = "";

function dragStart(e) {
    beingDragged = e.target;
    console.log(kingInCheck);
    if (kingInCheck == "") {
        draggedPieceCoordinate = e.target.parentNode.id;
        newCoordinates = chessLogic(beingDragged);
        hilightSquares();
    } else if (kingInCheck == "wkic" || kingInCheck == "bkic" && beingDragged.classList.contains("king")) {
        draggedPieceCoordinate = e.target.parentNode.id;
        newCoordinates = chessLogic(beingDragged);
        kingInCheck = "";
    }

}

function dragOver(e) {
    e.preventDefault();
}

function chessLogic(movingPiece) {
    var coordinates = [];
    const pieceName = movingPiece.className;

    if (pieceName.includes("#")) {
        coordinates = generatePawnMovements(movingPiece, true);
    } 
    
    else if (pieceName.includes('pawn')) {
        coordinates = generatePawnMovements(movingPiece, false);
        pawnTakingCoordinates = generatePawnTakingMovements(movingPiece);
        coordinates.push(pawnTakingCoordinates);

        console.log(pawnTakingCoordinates);
    }

    else if (pieceName.includes("king")) {
        coordinates = generateKingMovements(movingPiece);
    } 

    else if (pieceName.includes("bishop")) {
        coordinates = generateBishopMovements(movingPiece);
    }

    else if (pieceName.includes("rook")) {
        coordinates = generateRookMovements(movingPiece);
    }

    else if (pieceName.includes("queen")) {
        coordinates = generateQueenMovements(movingPiece);
    }

    else if (pieceName.includes("knight")) {
        coordinates = generateKnightMovements(movingPiece);
    }

    let new_coordinates = [];
    
    for (const i of coordinates) {
        if (!i.includes("undefined")) {
            new_coordinates.push(i);
        }
    }

    return new_coordinates;
}

function dragDrop(e) {
    var droppingSquare;
    droppingSquare = e.target;
    console.log("beingdragged is " + beingDragged);
    console.log(droppingSquare);

    if (beingDragged.id == whooseTurn) {
        if (droppingSquare.tagName == 'IMG') {
            // dropping square is image
            if (beingDragged.classList.contains('#') && droppingSquare != beingDragged && droppingSquare.id[0] != beingDragged.id[0] && newCoordinates.includes(droppingSquare.parentNode.id)) { 
                droppingSquare.parentNode.appendChild(beingDragged);
                droppingSquare.remove();
    
                beingDragged.classList.remove("#");
                beingDragged.classList.add("pawn");
                changeTurn();    
            } 
            
            else if (!beingDragged.classList.contains('pawn') && droppingSquare != beingDragged && droppingSquare.id[0] != beingDragged.id[0] && newCoordinates.includes(droppingSquare.parentNode.id)) {
                
                droppingSquare.parentNode.appendChild(beingDragged);
                droppingSquare.remove();  
    
                if (beingDragged.className == "king $" || beingDragged.className == "rook $") {
                    beingDragged.classList.remove("$");
                } 
                changeTurn();
            }
    
            else if ((beingDragged.classList.contains('pawn') || beingDragged.classList.contains('#')) && droppingSquare != beingDragged && droppingSquare.id[0] != beingDragged.id[0] && pawnTakingCoordinates.includes(droppingSquare.parentNode.id)) {
                if (special_lines.includes(droppingSquare.parentNode.id)) {
                    const whatcolor = prompt("What pieces do you want?")
                    promoteTaking(beingDragged, droppingSquare, dragStart, whatcolor);
                }
    
                else {
                    droppingSquare.parentNode.appendChild(beingDragged);
                    droppingSquare.remove(); 
                }
                changeTurn();
            }

            else {
                console.log("Dropping on img unsucessful")
            }
        }
    
        else if (droppingSquare.tagName == "DIV") {
            // advancing pieces
            console.log(newCoordinates);
    
            if (newCoordinates.includes(droppingSquare.id)) {
                droppingSquare.append(beingDragged);
    
                if (beingDragged.classList.contains("#")) {
                    beingDragged.classList.remove("#");
                    beingDragged.classList.add("pawn");
                } else if (special_lines.includes(droppingSquare.id) && beingDragged.classList.contains('pawn') ) {
                    const whatcolor = prompt("What pieces do you want?");
                    promoteAppending(beingDragged, droppingSquare, dragStart, whatcolor);
                } else if (beingDragged.className == "king $" || beingDragged.className == "rook $") {
                    beingDragged.classList.remove("$");
                }
                changeTurn();
            } 
    
            // for castling
    
            else if (beingDragged.classList.contains("king $") && beingDragged.id == "w" && kingPlacingPositions["white"].includes(droppingSquare.id)) {
                console.log("white castling");
                const side = droppingSquare.id;
                if (side == "g1") {
                    const rookPiece = document.getElementById("h1").firstChild;
                    if (runwayChecking(droppingSquare.id) && rookPiece.className == "rook $") {
                        console.log("runway checking is a success")
                        droppingSquare.appendChild(beingDragged);
                        document.getElementById("f1").appendChild(rookPiece);
                        rookPiece.classList.remove("$");
                    }
                }
    
                else if (side == "c1") {
                    const rookPiece = document.getElementById("a1").firstChild;
                    if (runwayChecking(droppingSquare.id) && rookPiece.className == "rook $") {
                        droppingSquare.appendChild(beingDragged);
                        document.getElementById("d1").appendChild(rookPiece);
                        rookPiece.classList.remove("$");
                    }
                }
    
                beingDragged.classList.remove("$");
                changeTurn();
            }
    
            else if (beingDragged.classList.contains("king $") && beingDragged.id == "b" && kingPlacingPositions["black"].includes(droppingSquare.id)) {
                const side = droppingSquare.id;
                if (side == "g8") {
                    const rookPiece = document.getElementById("h8").firstChild;
                    if (runwayChecking(droppingSquare.id) && rookPiece.className == "rook $") {
                        console.log("runway checking is a success")
                        droppingSquare.appendChild(beingDragged);
                        document.getElementById("f8").appendChild(rookPiece)
                        rookPiece.classList.remove("$");
                    }
                }
    
                else if (side == "c8") {
                    const rookPiece = document.getElementById("a8").firstChild;
                    if (runwayChecking(droppingSquare.id) && rookPiece.className == "rook $") {
                        droppingSquare.appendChild(beingDragged);
                        document.getElementById("d8").appendChild(rookPiece);
                        rookPiece.classList.remove("$");
                    }
                }
                beingDragged.classList.remove("$");
                changeTurn();
            }
    
            else {
                console.log("something went wrong on appending image")
            }
    
        }

    } 

    removehilight();

    newCoordinates = [];
    pawnTakingCoordinates = [];

    checkChecking = chessLogic(beingDragged);

    checkCheckingAndHilight();
}

for (let row=0; row<board_size; row++) {
    for (let column=0; column<board_size; column++) {
        const square = document.createElement('div');

        square.classList.add('square');

        if ((row+column) % 2 === 0) {
            square.classList.add('light');
        } else {
            square.classList.add('dark');
        }

        square.id = column_ties[column] + row_ties[row];

        // adding event to each square
        square.addEventListener('dragover', dragOver);
        square.addEventListener('drop', dragDrop);
        square.addEventListener('click', (e) => {
            console.log(e.target);
            if (e.target.id == "w") {
                console.log('white big fat ass king\'s pecents');
            } else if (e.target.id == "b") {
                console.log('it is nigga');
            }  else {
                console.log("it is on board");
            }
        });

        const pieceCode = initialBoard[row][column];

        if (pieceCode) {
            const pieceImage = document.createElement('img');
            pieceImage.src = pieceImages[pieceCode];
            pieceImage.id = pieceCode[0];

            checkPieceType(pieceCode, pieceImage);

            if (pieceCode == "bk") {
                pieceImage.classList.add("b");
            }

            else if (pieceCode == "wk") {
                pieceImage.classList.add("w");
            }
            
            square.appendChild(pieceImage);
            pieceImage.addEventListener('dragstart', dragStart)
        }
        
        chessboard.appendChild(square);
    }
}

function changeTurn() {
    if (whooseTurn == "w") {
        whooseTurn = "b";
    } else {
        whooseTurn = "w";
    }
}

function hilightSquares() {
    for (const i of getCoordinateSquares()) {
        i.classList.add('hilight');
    }
}

function removehilight() {
    for (const i of getCoordinateSquares()) {
        i.classList.remove('hilight');
    }
}

function getCoordinateSquares () {
    let thesquares = [];
    for (const i of newCoordinates) {
        if (!i.includes('undefined')) {
            thesquares.push(document.getElementById(i));
        }
    }

    for (const j of pawnTakingCoordinates) {
        if (!j.includes('undefined')) {
            thesquares.push(document.getElementById(j));
        }
    }

    return thesquares;
}

function getWhiteKing() {
    return document.querySelector('[class="king $ w"]') || document.querySelector('[class="king w"]');

}

function getBlackKing() {
    return document.querySelector('[class="king $ b"]') || document.querySelector('[class="king b"]');
}

function checkWhiteKingCheck () {
    const whiteKingPiece = getWhiteKing();
    const thesquare = whiteKingPiece.parentNode.id;

    if (checkChecking.includes(thesquare) && beingDragged.id != whiteKingPiece.id) {
        whiteKingPiece.parentNode.classList.add("checkhilight");
        kingInCheck = "wkic";
    }

    else {
        stop;
    }
}

function checkBlackKingCheck () {
    const blackKingPiece = getBlackKing();
    const thesquare = blackKingPiece.parentNode.id;

    if (checkChecking.includes(thesquare) && blackKingPiece.id != beingDragged.id) {
        blackKingPiece.parentNode.classList.add('checkhilight');
        kingInCheck = "bkic";
    }

    else {
        stop;
    }
}

function checkCheckingAndHilight () {
    checkWhiteKingCheck();
    checkBlackKingCheck();
}











