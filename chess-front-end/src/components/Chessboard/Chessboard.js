import Tile from "../Tile/Tile";
import React, { useRef, useState } from "react";
import "./Chessboard.css";
import Referee from "../../referee/Referee";
import {
  HORIZONTAL_AXIS,
  VERTICAL_AXIS,
  initialBoardState,
  GRID_SIZE,
  GRID_CENTER,
} from "../../Constants";

function Chessboard() {
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [activePiece, setActivePiece] = useState(null);

  const chessboardRef = useRef(null);
  const referee = new Referee();

  const [pieces, setPieces] = useState(initialBoardState);

  //For piece grabbing and moving

  function grabPiece(e) {
    const element = e.target;
    const chessboard = chessboardRef.current;
    if (element.classList.contains("chess-piece") && chessboard) {
      const gridX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const gridY = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );
      setGridX(gridX);
      setGridY(gridY);
      const x = e.clientX - GRID_CENTER; // -50 is the offset of the image
      const y = e.clientY - GRID_CENTER;
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
