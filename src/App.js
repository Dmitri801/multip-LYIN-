import React, { Component } from "react";
import Dashboard from "./components/Dashboard";
import LyinMeme from "./components/LyinMeme";
import { Transition } from "react-spring";
import Zoom from "react-reveal/Zoom";
import GameOverModal from "./components/GameOverModal";
import "./App.scss";

class App extends Component {
  state = {
    gameOver: false,
    lyinMeme: false,
    score: 0,
    highScore: 0
  };

  toggleLyinMeme = state => {
    this.setState({
      lyinMeme: state
    });
  };

  toggleGameOver = state => {
    this.setState({
      gameOver: state
    });
  };
  incrementScore = () => {
    this.setState(prevState => ({
      score: prevState.score + 1
    }));
  };
  resetScore = () => {
    this.setState({ score: 0 });
  };
  render() {
    return (
      <div className="App">
        {this.state.gameOver && (
          <div
            onClick={() => this.setState({ gameOver: false })}
            className="overlay"
          />
        )}
        {this.state.gameOver && (
          <div
            style={{
              zIndex: "50",
              width: "50%",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Zoom>
              <GameOverModal score={this.state.score} />
            </Zoom>
          </div>
        )}
        <Transition
          items={this.state.lyinMeme}
          from={{
            transform: "translateX(500px)",
            zIndex: "20",
            position: "absolute",
            right: "0",
            top: "0"
          }}
          enter={{ transform: "translateX(0)" }}
          leave={{ transform: "translateX(700px)" }}
        >
          {lyinMeme =>
            lyinMeme &&
            (props => (
              <div style={props}>
                <LyinMeme />
              </div>
            ))
          }
        </Transition>

        <Dashboard
          toggleGameOver={this.toggleGameOver}
          toggleLyinMeme={this.toggleLyinMeme}
          gameOver={this.state.gameOver}
          score={this.state.score}
          incrementScore={this.incrementScore}
          resetScore={this.resetScore}
        />
      </div>
    );
  }
}

export default App;
