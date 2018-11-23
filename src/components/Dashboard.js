import React, { Component } from "react";
import Instructions from "./Instructions";
import Answers from "./Answers";
import Equation from "./Equation";
import Header from "./Header";
import StartResetBtn from "./StartResetBtn";
let gameTimerInterval;

function CountDownTimer(props) {
  return (
    <div style={props.gameOver ? { color: "red" } : null} className="countdown">
      {props.time}
    </div>
  );
}

class Dashboard extends Component {
  state = {
    gamePlaying: false,
    gameTimer: "01:00",
    firstNumber: "-",
    secondNumber: "-",
    answer: "",
    choicesArr: ["-", "-", "-", "-"]
  };

  componentDidUpdate() {
    if (this.state.gameTimer === "00:00" && this.state.gamePlaying) {
      this.gameOver();
    }
  }

  startGame = () => {
    this.setState({
      gamePlaying: true,
      gameTimer: "01:00",
      gameOver: false
    });
    this.generateNumsAnswerChoices();
    this.props.toggleGameOver(false);
    this.props.resetScore();
    this.togglePlayingClass(true);
    this.startTimer(59);
  };
  gameOver = () => {
    clearInterval(gameTimerInterval);
    this.setState({
      gamePlaying: false,
      firstNumber: "-",
      secondNumber: "-"
    });
    this.props.toggleGameOver(true);
    this.togglePlayingClass(false);
  };
  generateNumsAnswerChoices = () => {
    const firstNumber = Math.floor(Math.random() * 10);
    const secondNumber = Math.floor(Math.random() * 10);
    const answer = firstNumber * secondNumber;
    this.setState(
      {
        firstNumber,
        secondNumber,
        answer
      },
      () =>
        this.setState({ choicesArr: this.generateChoices(this.state.answer) })
    );
  };

  generateChoices = answer => {
    const choicesArray = [];
    choicesArray.push(Math.floor(Math.random() * 100));
    choicesArray.push(answer + Math.floor(Math.random() * 10));
    choicesArray.push(answer + Math.floor(Math.random() * 100));
    choicesArray.push(answer);
    this.shuffleArray(choicesArray);
    return choicesArray;
  };

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  startTimer = duration => {
    let timer = duration,
      minutes,
      seconds;
    gameTimerInterval = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      this.setState(
        { gameTimer: minutes + ":" + seconds },
        () =>
          (document.querySelector(
            ".countdown"
          ).innerHTML = this.state.gameTimer)
      );

      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  };

  onStartOrResetBtnClick = () => {
    const { gamePlaying, gameOver } = this.state;
    if (gamePlaying && !gameOver) {
      clearInterval(gameTimerInterval);
      this.setState({
        gamePlaying: false,
        gameTimer: "01:00",
        firstNumber: "-",
        secondNumber: "-",
        answer: "",
        choicesArr: ["0", "0", "0", "0"]
      });
      this.props.resetScore();
      this.togglePlayingClass(false);
    } else if (!gamePlaying) {
      this.startGame();
    }
  };

  onChoiceSelected = element => {
    const { answer } = this.state;

    if (parseInt(element.childNodes[0].textContent) === answer) {
      this.onCorrectAnswer();
    } else {
      this.onIncorrectAnswer();
    }
  };

  onCorrectAnswer = () => {
    document.querySelector(".dashboard").classList.add("correct");
    this.generateNumsAnswerChoices();
    this.props.incrementScore();
    setTimeout(() => {
      document.querySelector(".dashboard").classList.remove("correct");
    }, 1000);
  };

  onIncorrectAnswer = () => {
    this.props.toggleLyinMeme(true);
    document.querySelector(".dashboard").classList.add("incorrect");
    setTimeout(() => {
      this.props.toggleLyinMeme(false);
      document.querySelector(".dashboard").classList.remove("incorrect");
    }, 1000);
  };

  togglePlayingClass = on => {
    const answerDivs = document.querySelectorAll(".answer");
    if (on) {
      answerDivs.forEach(div => {
        div.classList.add("playing");
      });
    } else if (!on) {
      answerDivs.forEach(div => {
        div.classList.remove("playing");
      });
    }
  };

  render() {
    return (
      <div className="dashboard">
        <Header
          gameOver={this.props.gameOver}
          score={this.props.score}
          gamePlaying={this.state.gamePlaying}
        />
        <div className="game">
          <Equation
            firstNumber={this.state.firstNumber}
            secondNumber={this.state.secondNumber}
          />
          <Instructions />
          <Answers
            choices={this.state.choicesArr}
            gamePlaying={this.state.gamePlaying}
            onChoiceSelected={this.onChoiceSelected}
          />
          <div className="bottom_display">
            <StartResetBtn
              click={this.onStartOrResetBtnClick}
              gamePlaying={this.state.gamePlaying}
            />
            {this.state.gamePlaying || this.props.gameOver ? (
              <CountDownTimer
                gameOver={this.props.gameOver}
                time={this.state.gameTimer}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
