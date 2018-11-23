import React, { Component } from "react";

class Equation extends Component {
  render() {
    const props = this.props;
    return (
      <div className="equation">
        <div className="equation_text">
          <span>{props.firstNumber}</span>x<span>{props.secondNumber}</span>
        </div>
      </div>
    );
  }
}

export default Equation;
