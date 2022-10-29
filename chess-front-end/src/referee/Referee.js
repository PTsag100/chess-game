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
    //---------PAWN MOVEMENT--------------

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
    //---------------KNIGHT MOVEMENT-------------------
    else if (type === "KNIGHT") {
      if (Math.abs(y - py) === 2) {
        if (x - px === -1) {
          // if the tile is empty or is occupied by opponent move there
          return !(
            this.tileIsOccupied(x, y, boardState) &&
            !this.tileIsOccupiedByOpponent(x, y, boardState, team)
          );
        } else if (x - px === 1) {
          // if the tile is empty or is occupied by opponent move there
          return !(
            this.tileIsOccupied(x, y, boardState) &&
            !this.tileIsOccupiedByOpponent(x, y, boardState, team)
          );
        }
      } else if (Math.abs(x - px) === 2) {
        if (y - py === -1) {
          // if the tile is empty or is occupied by opponent move there
          return !(
            this.tileIsOccupied(x, y, boardState) &&
            !this.tileIsOccupiedByOpponent(x, y, boardState, team)
          );
        } else if (y - py === 1) {
          // if the tile is empty or is occupied by opponent move there
          return !(
            this.tileIsOccupied(x, y, boardState) &&
            !this.tileIsOccupiedByOpponent(x, y, boardState, team)
          );
        }
      }
    }
    //----------------------------------------------------
    //----------BISHOP MOVEMENT---------------------------
    else if (type === "BISHOP") {
      for (let i = 1; i < 8; i++) {
        // check if there is a piece in the top right path
        if (x > px && y > py) {
          let passedPosition = { x: px + i, y: py + i };
          if (
            this.tileIsOccupied(passedPosition.x, passedPosition.y, boardState)
          ) {
            console.log("illegal move");
            break;
          }
        }
        // check if there is a piece in the bottom right path
        else if (x > px && y < py) {
          let passedPosition = { x: px + i, y: py - i };
          if (
            this.tileIsOccupied(passedPosition.x, passedPosition.y, boardState)
          ) {
            console.log("illegal move");
            break;
          }
        }
        // check if there is a piece in the top left path
        else if (x < px && y > py) {
          let passedPosition = { x: px - i, y: py + i };
          if (
            this.tileIsOccupied(passedPosition.x, passedPosition.y, boardState)
          ) {
            console.log("illegal move");
            break;
          }
        }
        // check if there is a piece in the bottom left path
        else if (x < px && y < py) {
          let passedPosition = { x: px - i, y: py - i };
          if (
            this.tileIsOccupied(passedPosition.x, passedPosition.y, boardState)
          ) {
            console.log("illegal move");
            break;
          }
        }
        // if it reaches in any of these conditions it means it never found any piece in it's path so it can move there
        if (x - px === i && y - py === i) {
          return true;
        } else if (x - px === -i && y - py === i) {
          return true;
        } else if (x - px === i && y - py === -i) {
          return true;
        } else if (x - px === -i && y - py === -i) {
          return true;
        }
      }
    }
    return false;
  }
}

export default Referee;
