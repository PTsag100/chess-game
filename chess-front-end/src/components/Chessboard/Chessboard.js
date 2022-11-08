import Tile from "../Tile/Tile";
import React, { useRef, useState } from "react";
import "./Chessboard.css";
import Referee from "../../referee/Referee";
import {
  HORIZONTAL_AXIS,
  VERTICAL_AXIS,
  initialBoardState,
  GRID_SIZE,
} from "../../Constants";

import w_knight from "../../assets/knight_w.png";
import w_bishop from "../../assets/bishop_w.png";
import w_rook from "../../assets/rook_w.png";
import w_queen from "../../assets/queen_w.png";

import b_knight from "../../assets/knight_b.png";
import b_bishop from "../../assets/bishop_b.png";
import b_rook from "../../assets/rook_b.png";
import b_queen from "../../assets/queen_b.png";

function Chessboard() {
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [promotionPawn, setPromotionPawn] = useState(null);
  const [showPromotionPanel, setShowPromotionPanel] = useState(false);
  const [activePiece, setActivePiece] = useState(null);

  const chessboardRef = useRef(null);
  const referee = new Referee();

  const [pieces, setPieces] = useState(initialBoardState);

  function updateValidMoves() {
    setPieces((currentPieces) => {
      return currentPieces.map((p) => {
        p.possibleMoves = referee.getValidMoves(p, currentPieces);
        return p;
      });
    });
  }

  //For piece grabbing and moving

  function grabPiece(e) {
    updateValidMoves();
    const element = e.target;
    const chessboard = chessboardRef.current;
    if (element.classList.contains("chess-piece") && chessboard) {
      const gridX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const gridY = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
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
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );

      const currentPiece = pieces.find((p) => p.x === gridX && p.y === gridY);
      // const attackedPiece = pieces.find((p) => p.x === x && p.y === y);
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
              let promotionRow = piece.team === "OUR" ? 7 : 0;
              if (y === promotionRow && piece.type === "PAWN") {
                setPromotionPawn(piece);
                setShowPromotionPanel(true);
              }
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

  function promotePawn(pieceType) {
    console.log("promote pawn");
    setShowPromotionPanel(false);
    if (promotionPawn === undefined) {
      return;
    }
    let updatedPieces = pieces.reduce((results, piece) => {
      if (piece.x === promotionPawn.x && piece.y === promotionPawn.y) {
        piece.type = pieceType;
        if (piece.team === "OUR") {
          switch (pieceType) {
            case "KNIGHT":
              piece.image = w_knight;
              break;
            case "BISHOP":
              piece.image = w_bishop;
              break;
            case "ROOK":
              piece.image = w_rook;
              break;
            case "QUEEN":
              piece.image = w_queen;
              break;
            default:
              piece.image = "";
          }
        } else {
          switch (pieceType) {
            case "KNIGHT":
              piece.image = b_knight;
              break;
            case "BISHOP":
              piece.image = b_bishop;
              break;
            case "ROOK":
              piece.image = b_rook;
              break;
            case "QUEEN":
              piece.image = b_queen;
              break;
            default:
              piece.image = "";
          }
        }
      }
      results.push(piece);
      return results;
    }, []);
    setPieces(updatedPieces);
    return promotionPawn;
  }

  let board = [];
  for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
    let color;
    for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
      if ((i % 2 === 0 && j % 2 !== 0) || (i % 2 !== 0 && j % 2 === 0)) {
        color = "white-tile";
      } else {
        color = "black-tile";
      }

      // The x and y position is to determine where in the board the image of the pawn will be placed
      const piece = pieces.find((p) => p.x === i && p.y === j);
      let image = piece ? piece.image : undefined;
      let currentPiece =
        activePiece != null
          ? pieces.find((p) => p.x === gridX && p.y === gridY)
          : undefined;
      let highlight = currentPiece?.possibleMoves
        ? currentPiece.possibleMoves.some((p) => p.x === i && p.y === j)
        : false;

      board.push(
        <Tile
          key={`${i},${j}`}
          color={color}
          image={image}
          highlight={highlight}
        ></Tile>
      );
    }
  }

  return (
    <>
      <div
        id="chessboard"
        onMouseMove={(e) => movePiece(e)}
        onMouseDown={(e) => grabPiece(e)}
        onMouseUp={(e) => dropPiece(e)}
        ref={chessboardRef}
      >
        {showPromotionPanel && (
          <div id="pawn-promotion-model">
            <div id="pawn-promotion-body">
              <img
                onClick={() => promotePawn("ROOK")}
                src={promotionPawn.team === "OUR" ? w_rook : b_rook}
                alt=""
              />
              <img
                onClick={() => promotePawn("BISHOP")}
                src={promotionPawn.team === "OUR" ? w_bishop : b_bishop}
                alt=""
              />
              <img
                onClick={() => promotePawn("KNIGHT")}
                src={promotionPawn.team === "OUR" ? w_knight : b_knight}
                alt=""
              />
              <img
                onClick={() => promotePawn("QUEEN")}
                src={promotionPawn.team === "OUR" ? w_queen : b_queen}
                alt=""
              />
            </div>
          </div>
        )}
        {board}
      </div>
    </>
  );
}

//continue video part 1 on 12:38

export default Chessboard;
