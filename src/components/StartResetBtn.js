import React from "react";

function StartResetBtn(props) {
  return (
    <div
      style={{
        color: "white",
        display: "flex",
        backgroundColor: "#1a0161",
        justifyContent: "center",
        textTransform: "uppercase",
        borderRadius: "5px",
        cursor: "pointer",
        padding: "15px",
        height: "20px",
        width: "18%",
        transition: "all 0.2s ease-out"
      }}
      className="reset_btn"
      onClick={props.click}
    >
      {props.gamePlaying ? "Reset" : "Start"}
    </div>
  );
}

export default StartResetBtn;
