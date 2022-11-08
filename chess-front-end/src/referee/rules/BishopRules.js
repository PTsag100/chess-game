import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";
export const bishopMove = (px, py, x, y, team, boardState) => {
  for (let i = 1; i < 8; i++) {
    // check if there is a piece in the top right path
    if (x > px && y > py) {
      let passedPosition = { x: px + i, y: py + i };

      //check if the tile we want to move the bishop has an enemy or an ally piece
      if (
        passedPosition.x === x &&
        passedPosition.y === y &&
        tileIsOccupiedByOpponent(x, y, boardState, team)
      ) {
        return true;
      }
      if (tileIsOccupied(passedPosition.x, passedPosition.y, boardState)) {
        break;
      }
    }
    // check if there is a piece in the bottom right path
    else if (x > px && y < py) {
      let passedPosition = { x: px + i, y: py - i };

      //check if the tile we want to move the bishop has an enemy or an ally piece
      if (
        passedPosition.x === x &&
        passedPosition.y === y &&
        tileIsOccupiedByOpponent(x, y, boardState, team)
      ) {
        return true;
      }
      if (tileIsOccupied(passedPosition.x, passedPosition.y, boardState)) {
        break;
      }
    }
    // check if there is a piece in the top left path
    else if (x < px && y > py) {
      let passedPosition = { x: px - i, y: py + i };

      //check if the tile we want to move the bishop has an enemy or an ally piece
      if (
        passedPosition.x === x &&
        passedPosition.y === y &&
        tileIsOccupiedByOpponent(x, y, boardState, team)
      ) {
        return true;
      }
      if (tileIsOccupied(passedPosition.x, passedPosition.y, boardState)) {
        break;
      }
    }
    // check if there is a piece in the bottom left path
    else if (x < px && y < py) {
      let passedPosition = { x: px - i, y: py - i };

      //check if the tile we want to move the bishop has an enemy or an ally piece
      if (
        passedPosition.x === x &&
        passedPosition.y === y &&
        tileIsOccupiedByOpponent(x, y, boardState, team)
      ) {
        return true;
      }
      if (tileIsOccupied(passedPosition.x, passedPosition.y, boardState)) {
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
  return false;
};

export const getPossibleBishopMoves = (bishop, boardState) => {
  let possibleMoves = [];
  let upperRight = true;
  let upperLeft = true;
  let BottomRight = true;
  let BottomLeft = true;

  for (let i = 1; i < 8; i++) {
    const upperRightDestination = { x: bishop.x + i, y: bishop.y + i };
    const upperLeftDestination = { x: bishop.x - i, y: bishop.y + i };
    const BottomRightDestination = { x: bishop.x + i, y: bishop.y - i };
    const BottomLeftDestination = { x: bishop.x - i, y: bishop.y - i };

    // top right path
    if (upperRight) {
      if (
        !tileIsOccupied(
          upperRightDestination.x,
          upperRightDestination.y,
          boardState
        )
      ) {
        possibleMoves.push(upperRightDestination);
      } else if (
        tileIsOccupiedByOpponent(
          upperRightDestination.x,
          upperRightDestination.y,
          boardState,
          bishop.team
        )
      ) {
        possibleMoves.push(upperRightDestination);
        upperRight = false;
      } else {
        upperRight = false;
      }
    }

    // top left path
    if (upperLeft) {
      if (
        !tileIsOccupied(
          upperLeftDestination.x,
          upperLeftDestination.y,
          boardState
        )
      ) {
        possibleMoves.push(upperLeftDestination);
      } else if (
        tileIsOccupiedByOpponent(
          upperLeftDestination.x,
          upperLeftDestination.y,
          boardState,
          bishop.team
        )
      ) {
        possibleMoves.push(upperLeftDestination);
        upperLeft = false;
      } else {
        upperLeft = false;
      }
    }

    // bottom left path
    if (BottomLeft) {
      if (
        !tileIsOccupied(
          BottomLeftDestination.x,
          BottomLeftDestination.y,
          boardState
        )
      ) {
        possibleMoves.push(BottomLeftDestination);
      } else if (
        tileIsOccupiedByOpponent(
          BottomLeftDestination.x,
          BottomLeftDestination.y,
          boardState,
          bishop.team
        )
      ) {
        possibleMoves.push(BottomLeftDestination);
        BottomLeft = false;
      } else {
        BottomLeft = false;
      }
    }

    // bottom right path
    if (BottomRight) {
      if (
        !tileIsOccupied(
          BottomRightDestination.x,
          BottomRightDestination.y,
          boardState
        )
      ) {
        possibleMoves.push(BottomRightDestination);
      } else if (
        tileIsOccupiedByOpponent(
          BottomRightDestination.x,
          BottomRightDestination.y,
          boardState,
          bishop.team
        )
      ) {
        possibleMoves.push(BottomRightDestination);
        BottomRight = false;
      } else {
        BottomRight = false;
      }
    }
  }
  return possibleMoves;
};
