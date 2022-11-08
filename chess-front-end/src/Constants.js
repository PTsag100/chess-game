import b_pawn from "./assets/pawn_b.png";
import w_pawn from "./assets/pawn_w.png";
import b_rook from "./assets/rook_b.png";
import w_rook from "./assets/rook_w.png";
import w_knight from "./assets/knight_w.png";
import b_knight from "./assets/knight_b.png";
import b_bishop from "./assets/bishop_b.png";
import w_bishop from "./assets/bishop_w.png";
import w_queen from "./assets/queen_w.png";
import b_queen from "./assets/queen_b.png";
import b_king from "./assets/king_b.png";
import w_king from "./assets/king_w.png";

export const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const GRID_SIZE = 100;

export class Piece {
  constructor(image, x, y, type, team, enPassant) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.type = type;
    this.team = team;
    this.enPassant = enPassant;
    this.possibleMoves = [];
  }
}

// Initialize pieces positions
export const initialBoardState = [
  new Piece(b_pawn, 0, 6, "PAWN", "OPPONENT"),
  new Piece(b_pawn, 1, 6, "PAWN", "OPPONENT"),
  new Piece(b_pawn, 2, 6, "PAWN", "OPPONENT"),
  new Piece(b_pawn, 3, 6, "PAWN", "OPPONENT"),
  new Piece(b_pawn, 4, 6, "PAWN", "OPPONENT"),
  new Piece(b_pawn, 5, 6, "PAWN", "OPPONENT"),
  new Piece(b_pawn, 6, 6, "PAWN", "OPPONENT"),
  new Piece(b_pawn, 7, 6, "PAWN", "OPPONENT"),
  new Piece(w_pawn, 0, 1, "PAWN", "OUR"),
  new Piece(w_pawn, 1, 1, "PAWN", "OUR"),
  new Piece(w_pawn, 2, 1, "PAWN", "OUR"),
  new Piece(w_pawn, 3, 1, "PAWN", "OUR"),
  new Piece(w_pawn, 4, 1, "PAWN", "OUR"),
  new Piece(w_pawn, 5, 1, "PAWN", "OUR"),
  new Piece(w_pawn, 6, 1, "PAWN", "OUR"),
  new Piece(w_pawn, 7, 1, "PAWN", "OUR"),
  new Piece(w_pawn, 8, 1, "PAWN", "OUR"),
  new Piece(b_rook, 0, 7, "ROOK", "OPPONENT"),
  new Piece(b_rook, 7, 7, "ROOK", "OPPONENT"),
  new Piece(w_rook, 0, 0, "ROOK", "OUR"),
  new Piece(w_rook, 7, 0, "ROOK", "OUR"),
  new Piece(b_knight, 1, 7, "KNIGHT", "OPPONENT"),
  new Piece(b_knight, 6, 7, "KNIGHT", "OPPONENT"),
  new Piece(w_knight, 1, 0, "KNIGHT", "OUR"),
  new Piece(w_knight, 6, 0, "KNIGHT", "OUR"),
  new Piece(b_bishop, 2, 7, "BISHOP", "OPPONENT"),
  new Piece(b_bishop, 5, 7, "BISHOP", "OPPONENT"),
  new Piece(w_bishop, 2, 0, "BISHOP", "OUR"),
  new Piece(w_bishop, 5, 0, "BISHOP", "OUR"),
  new Piece(b_queen, 3, 7, "QUEEN", "OPPONENT"),
  new Piece(w_queen, 3, 0, "QUEEN", "OUR"),
  new Piece(b_king, 4, 7, "KING", "OPPONENT"),
  new Piece(w_king, 4, 0, "KING", "OUR"),
];
