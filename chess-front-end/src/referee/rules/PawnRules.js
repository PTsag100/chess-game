import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";
export const pawnMove = (px, py, x, y, team, boardState) => {
  // if it's in the first row so the pawn can move up to 2 tiles
  const specialRow = team === "OUR" ? 1 : 6;
  const pawnDirection = team === "OUR" ? 1 : -1;

  if (px === x && y - py === 2 * pawnDirection && py === specialRow) {
    if (
      !tileIsOccupied(x, y, boardState) &&
      !tileIsOccupied(x, y - pawnDirection, boardState)
    )
      return true;
  } else if (px === x && y - py === 1 * pawnDirection) {
    if (!tileIsOccupied(x, y, boardState)) return true;
  } else if (x - px === -1 && y - py === pawnDirection) {
    if (tileIsOccupiedByOpponent(x, y, boardState, team)) {
      return true;
    }
  } else if (x - px === 1 && y - py === pawnDirection) {
    if (tileIsOccupiedByOpponent(x, y, boardState, team)) {
      return true;
    }
  }
  return false;
};

export const getPossiblePawnMoves = (pawn, boardState) => {
  const possibleMoves = [];
  const pawnDirection = pawn.team === "OUR" ? 1 : -1;
  const specialRow = pawn.team === "OUR" ? 1 : 6;

  // To show normal move path
  if (!tileIsOccupied(pawn.x, pawn.y + pawnDirection, boardState)) {
    possibleMoves.push({ x: pawn.x, y: pawn.y + pawnDirection });
    // if the pawn is moving for the first time
    if (
      pawn.y === specialRow &&
      !tileIsOccupied(pawn.x, pawn.y + pawnDirection * 2, boardState)
    ) {
      possibleMoves.push({ x: pawn.x, y: pawn.y + pawnDirection * 2 });
    }
  }

  //To show attack path
  const upperRightAttack = { x: pawn.x + 1, y: pawn.y + pawnDirection };
  const upperLeftAttack = { x: pawn.x - 1, y: pawn.y + pawnDirection };
  if (
    tileIsOccupiedByOpponent(
      upperRightAttack.x,
      upperRightAttack.y,
      boardState,
      pawn.team
    )
  ) {
    possibleMoves.push(upperRightAttack);
  } else if (
    !tileIsOccupied(upperRightAttack.x, upperRightAttack, boardState)
  ) {
    const rightPiece = boardState.find(
      (p) => p.x === pawn.x + 1 && p.y === pawn.y
    );
    if (
      rightPiece != null &&
      rightPiece.type === "PAWN" &&
      rightPiece.enPassant
    ) {
      possibleMoves.push(upperRightAttack);
    }
  }
  if (
    tileIsOccupiedByOpponent(
      upperLeftAttack.x,
      upperLeftAttack.y,
      boardState,
      pawn.team
    )
  ) {
    possibleMoves.push(upperLeftAttack);
  }
  // To show en passant path
  else if (!tileIsOccupied(upperLeftAttack.x, upperLeftAttack.y, boardState)) {
    const leftPiece = boardState.find(
      (p) => p.x === pawn.x - 1 && p.y === pawn.y
    );
    if (leftPiece != null && leftPiece.type === "PAWN" && leftPiece.enPassant) {
      possibleMoves.push(upperLeftAttack);
    }
  }
  return possibleMoves;
};
