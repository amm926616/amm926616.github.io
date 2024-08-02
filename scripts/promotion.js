function promoteTaking(beingDragged, droppingSquare, dragStart, whatPiece) {
    const promotionImage = createPiece(beingDragged, whatPiece, dragStart);

    droppingSquare.parentNode.appendChild(promotionImage);
    droppingSquare.remove();
    beingDragged.remove();
}

function promoteAppending(beingDragged, droppingSquare, dragStart, whatPiece) {
    const promotionImage = createPiece(beingDragged, whatPiece, dragStart);

    droppingSquare.appendChild(promotionImage);
    beingDragged.remove()
}

function createPiece(beingDragged, whatPiece, dragStart) {
    const color = beingDragged.id;
    promotionImage = document.createElement('img');
    
    if (whatPiece == "queen") {
        promotionImage.src = "images/"+ color + "q.png";
        promotionImage.classList.add('queen');
    } else if (whatPiece == "bishop") {
        promotionImage.src = "images/"+ color + "b.png";
        promotionImage.classList.add('bishop');
    } else if (whatPiece == "knight") {
        promotionImage.src = "images/"+ color + "n.png";
        promotionImage.classList.add('knight');
    } else if (whatPiece == "rook") {
        promotionImage.src = "images/"+ color + "r.png";
        promotionImage.classList.add('rook');
    }

    promotionImage.id = color;
    promotionImage.addEventListener('dragstart', dragStart);

    return promotionImage;
}