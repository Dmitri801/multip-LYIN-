import React from "react";

function Answers(props) {
  return (
    <div className="answers">
      <div
        onClick={
          props.gamePlaying
            ? event => props.onChoiceSelected(event.target)
            : null
        }
        className="answer one"
      >
        <span style={!props.gamePlaying ? { opacity: 0 } : null}>
          {props.choices[0]}
        </span>
      </div>
      <div
        onClick={
          props.gamePlaying
            ? event => props.onChoiceSelected(event.target)
            : null
        }
        className="answer two"
      >
        <span style={!props.gamePlaying ? { opacity: 0 } : null}>
          {props.choices[1]}
        </span>
      </div>
      <div
        onClick={
          props.gamePlaying
            ? event => props.onChoiceSelected(event.target)
            : null
        }
        className="answer three"
      >
        <span style={!props.gamePlaying ? { opacity: 0 } : null}>
          {props.choices[2]}
        </span>
      </div>
      <div
        onClick={
          props.gamePlaying
            ? event => props.onChoiceSelected(event.target)
            : null
        }
        className="answer four"
      >
        <span style={!props.gamePlaying ? { opacity: 0 } : null}>
          {props.choices[3]}
        </span>
      </div>
    </div>
  );
}

export default Answers;
