import "./Tile.css";
import React from "react";

function Tile({ color, image, highlight }) {
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
      {highlight && <div className="tile-highlight"></div>}
    </div>
  );
}

export default Tile;
