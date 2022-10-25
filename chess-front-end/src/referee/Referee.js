class Referee {
  tileIsOccupied(x, y, boardState) {
    const piece = boardState.find((p) => p.x === x && p.y === y);
    // if there is no piece in the specific tile it returns true but if there is it return true
    return piece !== undefined;
  }

  tileIsOccupiedByOpponent(x, y, boardState, team) {
    const piece = boardState.find(
      (p) => p.x === x && p.y === y && p.team !== team
    );
    return piece !== undefined;
  }

  isEnPassantMove(px, py, x, y, type, team, boardState) {
    const pawnDirection = team === "OUR" ? 1 : -1;

    if (type === "PAWN") {
      if ((x - px === -1 || x - px === 1) && y - py === pawnDirection) {
        const piece = boardState.find(
          (p) => p.x === x && p.y === y - pawnDirection && p.enPassant
        );
        return piece !== undefined;
      }
    }

    //check upper left, upper right, bottom left and bottom right

    return false;
  }

  isValidMove(px, py, x, y, type, team, boardState) {
    //---------PAWN MOVMENT--------------

    if (type === "PAWN") {
      // if it's in the first row so the pawn can move up to 2 tiles
      const specialRow = team === "OUR" ? 1 : 6;
      const pawnDirection = team === "OUR" ? 1 : -1;

      if (px === x && y - py === 2 * pawnDirection && py === specialRow) {
        if (
          !this.tileIsOccupied(x, y, boardState) &&
          !this.tileIsOccupied(x, y - pawnDirection, boardState)
        )
          return true;
      } else if (px === x && y - py === 1 * pawnDirection) {
        if (!this.tileIsOccupied(x, y, boardState)) return true;
      } else if (x - px === -1 && y - py === pawnDirection) {
        if (this.tileIsOccupiedByOpponent(x, y, boardState, team)) {
          return true;
        }
      } else if (x - px === 1 && y - py === pawnDirection) {
        if (this.tileIsOccupiedByOpponent(x, y, boardState, team)) {
          return true;
        }
      }
    }

    //-------------------------------------------------

    return false;
  }
}

export default Referee;
