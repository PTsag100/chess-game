import "./Tile.css";
import React from "react";

function Tile({ color, image }) {
  return (
    <div className={color + " tile"}>
      {
        //Only if there is a pawn in the tile we want to render a background image
        image && (
          <div
            className="chess-piece"
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
        )
      }
    </div>
  );
}

export default Tile;
