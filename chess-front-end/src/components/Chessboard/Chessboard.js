import Tile from "../Tile/Tile";
import React, { useRef, useState } from "react";
import "./Chessboard.css";
import b_pawn from "../../assets/pawn_b.png";
import w_pawn from "../../assets/pawn_w.png";
import b_rook from "../../assets/rook_b.png";
import w_rook from "../../assets/rook_w.png";
import w_knight from "../../assets/knight_w.png";
import b_knight from "../../assets/knight_b.png";
import b_bishop from "../../assets/bishop_b.png";
import w_bishop from "../../assets/bishop_w.png";
import w_queen from "../../assets/queen_w.png";
import b_queen from "../../assets/queen_b.png";
import b_king from "../../assets/king_b.png";
import w_king from "../../assets/king_w.png";
import Referee from "../../referee/Referee";

const VerticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const HorizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

class Piece {
  constructor(image, x, y, type, team, enPassant) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.type = type;
    this.team = team;
    this.enPassant = enPassant;
  }
}

function Chessboard() {
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [activePiece, setActivePiece] = useState(null);

  const chessboardRef = useRef(null);
  const referee = new Referee();

  // Initialize pieces positions
  const initialBoardState = [];

  //---------pawns----------
  for (let i = 0; i < 8; i++) {
    initialBoardState.push(new Piece(b_pawn, i, 6, "PAWN", "OPPONENT"));
  }

  for (let i = 0; i < 8; i++) {
    initialBoardState.push(new Piece(w_pawn, i, 1, "PAWN", "OUR"));
  }

  //--------rooks----------
  initialBoardState.push(new Piece(b_rook, 0, 7, "ROOK", "OPPONENT"));
  initialBoardState.push(new Piece(b_rook, 7, 7, "ROOK", "OPPONENT"));
  initialBoardState.push(new Piece(w_rook, 0, 0, "ROOK", "OUR"));
  initialBoardState.push(new Piece(w_rook, 7, 0, "ROOK", "OUR"));

  //--------knights-----------
  initialBoardState.push(new Piece(b_knight, 1, 7, "KNIGHT", "OPPONENT"));
  initialBoardState.push(new Piece(b_knight, 6, 7, "KNIGHT", "OPPONENT"));
  initialBoardState.push(new Piece(w_knight, 1, 0, "KNIGHT", "OUR"));
  initialBoardState.push(new Piece(w_knight, 6, 0, "KNIGHT", "OUR"));

  //----------bishops---------------
  initialBoardState.push(new Piece(b_bishop, 2, 7, "BISHOP", "OPPONENT"));
  initialBoardState.push(new Piece(b_bishop, 5, 7, "BISHOP", "OPPONENT"));
  initialBoardState.push(new Piece(w_bishop, 2, 0, "BISHOP", "OUR"));
  initialBoardState.push(new Piece(w_bishop, 5, 0, "BISHOP", "OUR"));

  //------------queens--------
  initialBoardState.push(new Piece(b_queen, 3, 7, "QUEEN", "OPPONENT"));
  initialBoardState.push(new Piece(w_queen, 3, 0, "QUEEN", "OUR"));

  //------------kings------------
  initialBoardState.push(new Piece(b_king, 4, 7, "KING", "OPPONENT"));
  initialBoardState.push(new Piece(w_king, 4, 0, "KING", "OUR"));

  const [pieces, setPieces] = useState(initialBoardState);

  //For piece grabbing and moving

  function grabPiece(e) {
    const element = e.target;
    const chessboard = chessboardRef.current;
    if (element.classList.contains("chess-piece") && chessboard) {
      const gridX = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const gridY = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)
      );
      setGridX(gridX);
      setGridY(gridY);
      const x = e.clientX - 50; // -50 is the offset of the image
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      setActivePiece(element);
    }
  }

  function movePiece(e) {
    const chessboard = chessboardRef.current;

    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
      const x = e.clientX - 50; // -50 is the offset of the image
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";

      // constraint the pieces so that we won't be able to move them outside the map
      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }

      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

  function dropPiece(e) {
    const chessboard = chessboardRef.current;

    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)
      );

      const currentPiece = pieces.find((p) => p.x === gridX && p.y === gridY);
      const attackedPiece = pieces.find((p) => p.x === x && p.y === y);

      if (currentPiece) {
        const validMove = referee.isValidMove(
          gridX,
          gridY,
          x,
          y,
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const isEnPassantMove = referee.isEnPassantMove(
          gridX,
          gridY,
          x,
          y,
          currentPiece.type,
          currentPiece.team,
          pieces
        );
        const pawnDirection = currentPiece.team === "OUR" ? 1 : -1;
        if (isEnPassantMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (piece.x === gridX && piece.y === gridY) {
              piece.enPassant = false;
              piece.x = x;
              piece.y = y;
              results.push(piece);
            } else if (!(piece.x === x && piece.y === y - pawnDirection)) {
              if (Math.abs(gridY - y) === 2 && piece.type === "PAWN") {
                piece.enPassant = false;
              }
              results.push(piece);
            }
            return results;
          }, []);
          setPieces(updatedPieces);
        }
        //update piece position
        else if (validMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            // if this is the piece we moved move it
            if (piece.x === gridX && piece.y === gridY) {
              if (Math.abs(gridY - y) === 2 && piece.type === "PAWN") {
                piece.enPassant = true;
              } else {
                piece.enPassant = false;
              }
              piece.x = x;
              piece.y = y;
              results.push(piece);
              //else if this is just another piece in the board leave it as it is
            } else if (!(piece.x === x && piece.y === y)) {
              if (Math.abs(gridY - y) === 2 && piece.type === "PAWN") {
                piece.enPassant = false;
              }
              results.push(piece);
            }
            // if no one of the above is executed this means this peace was attacked so we don't add it in the array and it's been removed from the game

            return results;
          }, []);
          setPieces(updatedPieces);
        } else {
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }
      setActivePiece(null);
    }
  }

  let board = [];
  for (let j = VerticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < HorizontalAxis.length; i++) {
      let color;
      if ((i % 2 === 0 && j % 2 !== 0) || (i % 2 !== 0 && j % 2 === 0)) {
        color = "white-tile";
      } else {
        color = "black-tile";
      }

      let image = undefined;
      pieces.forEach((p) => {
        // The x and y position is to determine where in the board the image of the pawn will be placed
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });

      board.push(<Tile key={`${i},${j}`} color={color} image={image}></Tile>);
    }
  }

  return (
    <div
      id="chessboard"
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      ref={chessboardRef}
    >
      {board}
    </div>
  );
}

//continue video part 1 on 12:38

export default Chessboard;
