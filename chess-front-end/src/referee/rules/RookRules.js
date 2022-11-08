import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";
export const rookMove = (px, py, x, y, team, boardState) => {
  if (x === px) {
    // Moving vertically
    for (let i = 1; i < 8; i++) {
      let direction = y < py ? -1 : 1;
      let passedPosition = { x: px, y: py + i * direction };
      if (passedPosition.x === x && passedPosition.y === y) {
        //check if the tile has an opponent or it's empty so we can move there
        if (
          tileIsOccupiedByOpponent(x, y, boardState, team) ||
          !tileIsOccupied(x, y, boardState)
        ) {
          return true;
        }
        return false;
      }
      // if there is a piece in the path we cancel the move
      if (tileIsOccupied(passedPosition.x, passedPosition.y, boardState)) {
        return false;
      }
    }

    return true;
  } else if (y === py) {
    // Moving horizontal
    for (let i = 1; i < 8; i++) {
      let direction = x < px ? -1 : 1;
      let passedPosition = { x: px + i * direction, y: py };
      if (passedPosition.x === x && passedPosition.y === y) {
        //check if the tile has an opponent or it's empty so we can move there
        if (
          tileIsOccupiedByOpponent(x, y, boardState, team) ||
          !tileIsOccupied(x, y, boardState)
        ) {
          return true;
        }
        return false;
      }
      // if there is a piece in the path we cancel the move
      if (tileIsOccupied(passedPosition.x, passedPosition.y, boardState)) {
        return false;
      }
    }
  }
  return false;
};

export const getPossibleRookMoves = (rook, boardState) => {
  const possibleMoves = [];
  let top = true;
  let bottom = true;
  let right = true;
  let left = true;
  // right path
  for (let i = 1; i < 8; i++) {
    const topDestination = { x: rook.x, y: rook.y + i };
    const bottomDestination = { x: rook.x, y: rook.y - i };
    const rightDestination = { x: rook.x + i, y: rook.y };
    const leftDestination = { x: rook.x - i, y: rook.y };

    if (top) {
      if (!tileIsOccupied(topDestination.x, topDestination.y, boardState)) {
        possibleMoves.push(topDestination);
      } else if (
        tileIsOccupiedByOpponent(
          topDestination.x,
          topDestination.y,
          boardState,
          rook.team
        )
      ) {
        possibleMoves.push(topDestination);
        top = false;
      } else {
        top = false;
      }
    }

    if (bottom) {
      if (
        !tileIsOccupied(bottomDestination.x, bottomDestination.y, boardState)
      ) {
        possibleMoves.push(bottomDestination);
      } else if (
        tileIsOccupiedByOpponent(
          bottomDestination.x,
          bottomDestination.y,
          boardState,
          rook.team
        )
      ) {
        possibleMoves.push(bottomDestination);
        bottom = false;
      } else {
        bottom = false;
      }
    }

    if (right) {
      if (!tileIsOccupied(rightDestination.x, rightDestination.y, boardState)) {
        possibleMoves.push(rightDestination);
      } else if (
        tileIsOccupiedByOpponent(
          rightDestination.x,
          rightDestination.y,
          boardState,
          rook.team
        )
      ) {
        possibleMoves.push(rightDestination);
        right = false;
      } else {
        right = false;
      }
    }

    if (left) {
      if (!tileIsOccupied(leftDestination.x, leftDestination.y, boardState)) {
        possibleMoves.push(leftDestination);
      } else if (
        tileIsOccupiedByOpponent(
          leftDestination.x,
          leftDestination.y,
          boardState,
          rook.team
        )
      ) {
        possibleMoves.push(leftDestination);
        left = false;
      } else {
        left = false;
      }
    }
  }

  return possibleMoves;
};
