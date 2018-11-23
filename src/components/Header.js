import React from "react";

function Header(props) {
  return (
    <div className="header">
      <h2>Multip-LYIN'</h2>
      {props.gamePlaying || props.gameOver ? (
        <div className="scoreboard">
          <span>{props.score}</span>
        </div>
      ) : null}
    </div>
  );
}

export default Header;
