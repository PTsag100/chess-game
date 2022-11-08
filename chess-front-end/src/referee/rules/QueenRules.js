import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";
export const queenMove = (px, py, x, y, team, boardState) => {
  //Vertical movement
  for (let i = 1; i < 8; i++) {
    if (x === px) {
      let multiplier = y > py ? 1 : -1;
      let passedPosition = { x: px, y: py + i * multiplier };
      if (passedPosition.x === x && passedPosition.y === y) {
        if (
          tileIsOccupiedByOpponent(x, y, boardState, team) ||
          !tileIsOccupied(x, y, boardState)
        ) {
          return true;
        } else {
          break;
        }
      }
      if (tileIsOccupied(passedPosition.x, passedPosition.y, boardState)) {
        break;
      }
    }

    //Horizontal movement
    else if (y === py) {
      let multiplier = x > px ? 1 : -1;
      let passedPosition = { x: px + i * multiplier, y: py };
      if (passedPosition.x === x && passedPosition.y === y) {
        if (
          tileIsOccupiedByOpponent(x, y, boardState, team) ||
          !tileIsOccupied(x, y, boardState)
        ) {
          return true;
        } else {
          break;
        }
      }
      if (tileIsOccupied(passedPosition.x, passedPosition.y, boardState)) {
        break;
      }
    }
    // diagonal movement
    else {
      let multiplierX = x > px ? 1 : -1;
      let multiplierY = y > py ? 1 : -1;
      let passedPosition = {
        x: px + i * multiplierX,
        y: py + i * multiplierY,
      };
      if (passedPosition.x === x && passedPosition.y === y) {
        if (
          tileIsOccupiedByOpponent(x, y, boardState, team) ||
          !tileIsOccupied(x, y, boardState)
        ) {
          return true;
        } else {
          break;
        }
      }
      if (tileIsOccupied(passedPosition.x, passedPosition.y, boardState)) {
        break;
      }
    }
  }
  return false;
};

export const getPossibleQueenMoves = (queen, boardState) => {
  const possibleMoves = [];
  let top = true;
  let bottom = true;
  let right = true;
  let left = true;
  let topLeft = true;
  let topRight = true;
  let bottomLeft = true;
  let bottomRight = true;

  // top path
  for (let i = 1; i < 8; i++) {
    const topDestination = { x: queen.x, y: queen.y + i };
    const bottomDestination = { x: queen.x, y: queen.y - i };
    const rightDestination = { x: queen.x + i, y: queen.y };
    const leftDestination = { x: queen.x - i, y: queen.y };
    const topLeftDestination = { x: queen.x - i, y: queen.y + i };
    const topRightDestination = { x: queen.x + i, y: queen.y + i };
    const bottomLeftDestination = { x: queen.x - i, y: queen.y - i };
    const bottomRightDestination = { x: queen.x + i, y: queen.y - i };

    if (top) {
      if (!tileIsOccupied(topDestination.x, topDestination.y, boardState)) {
        possibleMoves.push(topDestination);
      } else if (
        tileIsOccupiedByOpponent(
          topDestination.x,
          topDestination.y,
          boardState,
          queen.team
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
          queen.team
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
          queen.team
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
          queen.team
        )
      ) {
        possibleMoves.push(leftDestination);
        left = false;
      } else {
        left = false;
      }
    }
    if (topLeft) {
      if (
        !tileIsOccupied(topLeftDestination.x, topLeftDestination.y, boardState)
      ) {
        possibleMoves.push(topLeftDestination);
      } else if (
        tileIsOccupiedByOpponent(
          topLeftDestination.x,
          topLeftDestination.y,
          boardState,
          queen.team
        )
      ) {
        possibleMoves.push(topLeftDestination);
        topLeft = false;
      } else {
        topLeft = false;
      }
    }
    if (topRight) {
      if (
        !tileIsOccupied(
          topRightDestination.x,
          topRightDestination.y,
          boardState
        )
      ) {
        possibleMoves.push(topRightDestination);
      } else if (
        tileIsOccupiedByOpponent(
          topRightDestination.x,
          topRightDestination.y,
          boardState,
          queen.team
        )
      ) {
        possibleMoves.push(topRightDestination);
        topRight = false;
      } else {
        topRight = false;
      }
    }
    if (bottomLeft) {
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
          queen.team
        )
      ) {
        possibleMoves.push(bottomLeftDestination);
        bottomLeft = false;
      } else {
        bottomLeft = false;
      }
    }
    if (bottomRight) {
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
          queen.team
        )
      ) {
        possibleMoves.push(bottomRightDestination);
        bottomRight = false;
      } else {
        bottomRight = false;
      }
    }
  }

  return possibleMoves;
};
