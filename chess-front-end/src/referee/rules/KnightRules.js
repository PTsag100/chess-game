import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";
export const knightMove = (px, py, x, y, team, boardState) => {
  if (Math.abs(y - py) === 2) {
    if (x - px === -1) {
      // if the tile is empty or is occupied by opponent move there
      return !(
        tileIsOccupied(x, y, boardState) &&
        !tileIsOccupiedByOpponent(x, y, boardState, team)
      );
    } else if (x - px === 1) {
      // if the tile is empty or is occupied by opponent move there
      return !(
        tileIsOccupied(x, y, boardState) &&
        !tileIsOccupiedByOpponent(x, y, boardState, team)
      );
    }
  } else if (Math.abs(x - px) === 2) {
    if (y - py === -1) {
      // if the tile is empty or is occupied by opponent move there
      return !(
        tileIsOccupied(x, y, boardState) &&
        !tileIsOccupiedByOpponent(x, y, boardState, team)
      );
    } else if (y - py === 1) {
      // if the tile is empty or is occupied by opponent move there
      return !(
        tileIsOccupied(x, y, boardState) &&
        !tileIsOccupiedByOpponent(x, y, boardState, team)
      );
    }
  }
  return false;
};

export const getPossibleKnightMoves = (knight, boardState) => {
  const possibleMoves = [];
  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      const verticalMove = { x: knight.x + j, y: knight.y + i * 2 };
      const horizontalMove = { x: knight.x + i * 2, y: knight.y + j };
      if (!tileIsOccupied(verticalMove.x, verticalMove.y, boardState)) {
        possibleMoves.push(verticalMove);
      }
      if (!tileIsOccupied(horizontalMove.x, horizontalMove.y, boardState)) {
        possibleMoves.push(horizontalMove);
      }
      if (
        tileIsOccupiedByOpponent(
          verticalMove.x,
          verticalMove.y,
          boardState,
          knight.team
        )
      ) {
        possibleMoves.push(verticalMove);
      }
      if (
        tileIsOccupiedByOpponent(
          horizontalMove.x,
          horizontalMove.y,
          boardState,
          knight.team
        )
      ) {
        possibleMoves.push(horizontalMove);
      }
    }
  }

  return possibleMoves;
};
