import React from "react";

function GameOverModal(props) {
  return (
    <div className="gameover_modal">
      <h1>Game Over!</h1>
      <h2>
        Your score is <span>{props.score}</span>
      </h2>
    </div>
  );
}

export default GameOverModal;
