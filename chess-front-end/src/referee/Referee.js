import { pawnMove, getPossiblePawnMoves } from "./rules/PawnRules";
import { knightMove, getPossibleKnightMoves } from "./rules/KnightRules";
import { bishopMove, getPossibleBishopMoves } from "./rules/BishopRules";
import { rookMove } from "./rules/RookRules";
import { getPossibleQueenMoves, queenMove } from "./rules/QueenRules";
import { getPossibleKingMoves, kingMove } from "./rules/KingRules";

class Referee {
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

  //check if the move is valid based on piece type

  isValidMove(px, py, x, y, type, team, boardState) {
    let validMove;
    switch (type) {
      case "PAWN":
        validMove = pawnMove(px, py, x, y, team, boardState);
        break;
      case "KNIGHT":
        validMove = knightMove(px, py, x, y, team, boardState);
        break;
      case "BISHOP":
        validMove = bishopMove(px, py, x, y, team, boardState);
        break;
      case "ROOK":
        validMove = rookMove(px, py, x, y, team, boardState);
        break;
      case "QUEEN":
        validMove = queenMove(px, py, x, y, team, boardState);
        break;
      case "KING":
        validMove = kingMove(px, py, x, y, team, boardState);
        break;
      default:
        validMove = false;
    }
    return validMove;
  }

  // Give a preview of all the available moves for each piece
  getValidMoves(piece, boardState) {
    switch (piece.type) {
      case "PAWN":
        return getPossiblePawnMoves(piece, boardState);

      case "KNIGHT":
        return getPossibleKnightMoves(piece, boardState);
      case "BISHOP":
        return getPossibleBishopMoves(piece, boardState);
      case "ROOK":
        return getPossibleKnightMoves(piece, boardState);
      case "QUEEN":
        return getPossibleQueenMoves(piece, boardState);
      case "KING":
        return getPossibleKingMoves(piece, boardState);
      default:
        return [];
    }
  }
}

export default Referee;
