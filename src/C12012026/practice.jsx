// create a react class based component that implement 
// a calculator, implement a grid of buttons to display basic calculator. 
// display a textbox that will be disabled and 
// it will be used to display user input perform basic operations and display the results +, -, *, /,%,**
// operand1, operand2, result, operator
import React, { Component } from "react";
import "./Calculator.css"; // We'll create this file next

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      prevValue: null,
      operator: null,
      waitingForOperand: false,
      history: "",
    };
  }

  handleNumber = (num) => {
    const { display, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        display: String(num),
        waitingForOperand: false,
      });
    } else {
      this.setState({
        display: display === "0" ? String(num) : display + num,
      });
    }
  };

  handleDecimal = () => {
    const { display, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        display: "0.",
        waitingForOperand: false,
      });
    } else if (!display.includes(".")) {
      this.setState({
        display: display + ".",
      });
    }
  };

  handleOperator = (nextOperator) => {
    const { display, prevValue, operator } = this.state;
    const currentValue = parseFloat(display);

    if (prevValue == null) {
      // First number
      this.setState({
        prevValue: currentValue,
      });
    } else if (operator) {
      // Chain operations
      const newResult = this.calculate(prevValue, currentValue, operator);
      this.setState({
        prevValue: newResult,
        display: String(newResult),
      });
    }

    this.setState({
      operator: nextOperator,
      waitingForOperand: true,
      history: `${prevValue || currentValue} ${nextOperator}`,
    });
  };

  calculate = (a, b, op) => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b !== 0 ? a / b : "Error";
      case "%":
        return a % b;
      case "**":
        return Math.pow(a, b);
      default:
        return b;
    }
  };

  handleEqual = () => {
    const { display, prevValue, operator } = this.state;

    if (!operator || prevValue == null) return;

    const currentValue = parseFloat(display);
    const result = this.calculate(prevValue, currentValue, operator);

    this.setState({
      display: String(result),
      prevValue: null,
      operator: null,
      waitingForOperand: true,
      history: `${prevValue} ${operator} ${currentValue} =`,
    });
  };

  handleClear = () => {
    this.setState({
      display: "0",
      prevValue: null,
      operator: null,
      waitingForOperand: false,
      history: "",
    });
  };

  handleAllClear = () => {
    this.handleClear();
  };

  render() {
    const { display, history } = this.state;

    return (
      <div className="calculator-container">
        <div className="calculator">
          <div className="display-area">
            <div className="history">{history}</div>
            <div className="main-display">{display}</div>
          </div>

          <div className="button-grid">
            <button className="btn btn-clear" onClick={this.handleAllClear}>
              AC
            </button>
            <button className="btn btn-operator" onClick={() => this.handleOperator("%")}>
              %
            </button>
            <button className="btn btn-operator" onClick={() => this.handleOperator("**")}>
              xⁿ
            </button>
            <button className="btn btn-operator" onClick={() => this.handleOperator("/")}>
              ÷
            </button>

            <button className="btn" onClick={() => this.handleNumber(7)}>7</button>
            <button className="btn" onClick={() => this.handleNumber(8)}>8</button>
            <button className="btn" onClick={() => this.handleNumber(9)}>9</button>
            <button className="btn btn-operator" onClick={() => this.handleOperator("*")}>
              ×
            </button>

            <button className="btn" onClick={() => this.handleNumber(4)}>4</button>
            <button className="btn" onClick={() => this.handleNumber(5)}>5</button>
            <button className="btn" onClick={() => this.handleNumber(6)}>6</button>
            <button className="btn btn-operator" onClick={() => this.handleOperator("-")}>
              −
            </button>

            <button className="btn" onClick={() => this.handleNumber(1)}>1</button>
            <button className="btn" onClick={() => this.handleNumber(2)}>2</button>
            <button className="btn" onClick={() => this.handleNumber(3)}>3</button>
            <button className="btn btn-operator" onClick={() => this.handleOperator("+")}>
              +
            </button>

            <button className="btn btn-zero" onClick={() => this.handleNumber(0)}>
              0
            </button>
            <button className="btn" onClick={this.handleDecimal}>
              .
            </button>
            <button className="btn btn-equal" onClick={this.handleEqual}>
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;