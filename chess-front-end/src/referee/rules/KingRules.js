import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";
export const kingMove = (px, py, x, y, team, boardState) => {
  if (x === px) {
    let multiplier = y > py ? 1 : -1;
    let passedPosition = { x: px, y: py + 1 * multiplier };
    if (passedPosition.x === x && passedPosition.y === y) {
      if (
        tileIsOccupiedByOpponent(x, y, boardState, team) ||
        !tileIsOccupied(x, y, boardState)
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (tileIsOccupied(passedPosition.x, passedPosition.y, boardState)) {
      return false;
    }
  }

  //Horizontal movement
  else if (y === py) {
    let multiplier = x > px ? 1 : -1;
    let passedPosition = { x: px + 1 * multiplier, y: py };
    if (passedPosition.x === x && passedPosition.y === y) {
      if (
        tileIsOccupiedByOpponent(x, y, boardState, team) ||
        !tileIsOccupied(x, y, boardState)
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (tileIsOccupied(passedPosition.x, passedPosition.y, boardState)) {
      return false;
    }
  }
  // diagonal movement
  else {
    let multiplierX = x > px ? 1 : -1;
    let multiplierY = y > py ? 1 : -1;
    let passedPosition = {
      x: px + 1 * multiplierX,
      y: py + 1 * multiplierY,
    };
    if (passedPosition.x === x && passedPosition.y === y) {
      if (
        tileIsOccupiedByOpponent(x, y, boardState, team) ||
        !tileIsOccupied(x, y, boardState)
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (tileIsOccupied(passedPosition.x, passedPosition.y, boardState)) {
      return false;
    }
  }

  return false;
};

export const getPossibleKingMoves = (king, boardState) => {
  const possibleMoves = [];
  const topDestination = { x: king.x, y: king.y + 1 };
  const bottomDestination = { x: king.x, y: king.y - 1 };
  const rightDestination = { x: king.x + 1, y: king.y };
  const leftDestination = { x: king.x - 1, y: king.y };
  const topLeftDestination = { x: king.x - 1, y: king.y + 1 };
  const topRightDestination = { x: king.x + 1, y: king.y + 1 };
  const bottomLeftDestination = { x: king.x - 1, y: king.y - 1 };
  const bottomRightDestination = { x: king.x + 1, y: king.y - 1 };

  // top path
  if (!tileIsOccupied(topDestination.x, topDestination.y, boardState)) {
    possibleMoves.push(topDestination);
  } else if (
    tileIsOccupiedByOpponent(
      topDestination.x,
      topDestination.y,
      boardState,
      king.team
    )
  ) {
    possibleMoves.push(topDestination);
  }

  //bottom path
  if (!tileIsOccupied(bottomDestination.x, bottomDestination.y, boardState)) {
    possibleMoves.push(bottomDestination);
  } else if (
    tileIsOccupiedByOpponent(
      bottomDestination.x,
      bottomDestination.y,
      boardState,
      king.team
    )
  ) {
    possibleMoves.push(bottomDestination);
  }

  // left path
  if (!tileIsOccupied(leftDestination.x, leftDestination.y, boardState)) {
    possibleMoves.push(leftDestination);
  } else if (
    tileIsOccupiedByOpponent(
      leftDestination.x,
      leftDestination.y,
      boardState,
      king.team
    )
  ) {
    possibleMoves.push(leftDestination);
  }

  // right path
  if (!tileIsOccupied(rightDestination.x, rightDestination.y, boardState)) {
    possibleMoves.push(rightDestination);
  } else if (
    tileIsOccupiedByOpponent(
      rightDestination.x,
      rightDestination.y,
      boardState,
      king.team
    )
  ) {
    possibleMoves.push(rightDestination);
  }

  // top right path
  if (
    !tileIsOccupied(topRightDestination.x, topRightDestination.y, boardState)
  ) {
    possibleMoves.push(topRightDestination);
  } else if (
    tileIsOccupiedByOpponent(
      topRightDestination.x,
      topRightDestination.y,
      boardState,
      king.team
    )
  ) {
    possibleMoves.push(topRightDestination);
  }

  // top left path
  if (!tileIsOccupied(topLeftDestination.x, topLeftDestination.y, boardState)) {
    possibleMoves.push(topLeftDestination);
  } else if (
    tileIsOccupiedByOpponent(
      topLeftDestination.x,
      topLeftDestination.y,
      boardState,
      king.team
    )
  ) {
    possibleMoves.push(topLeftDestination);
  }

  // bottom right path
  if (
    !tileIsOccupied(
      bottomRightDestination.x,
      bottomRightDestination.y,
      boardState
    )
  ) {
    possibleMoves.push(bottomRightDestination);
  } else if (
    tileIsOccupiedByOpponent(
      bottomRightDestination.x,
      bottomRightDestination.y,
      boardState,
      king.team
    )
  ) {
    possibleMoves.push(bottomRightDestination);
  }

  // bottom left path
  if (
    !tileIsOccupied(
      bottomLeftDestination.x,
      bottomLeftDestination.y,
      boardState
    )
  ) {
    possibleMoves.push(bottomLeftDestination);
  } else if (
    tileIsOccupiedByOpponent(
      bottomLeftDestination.x,
      bottomLeftDestination.y,
      boardState,
      king.team
    )
  ) {
    possibleMoves.push(bottomLeftDestination);
  }
  return possibleMoves;
};
