import React, { Component } from "react";
import "./GameScreen.css";
import "../HintScreen/HintScreen.css";
import dataArray from "../../data/dataArray";
import CorrectScreen from "../CorrectScreen/CorrectScreen";
import WrongScreen from "../WrongScreen/WrongScreen";
import HintScreen from "../HintScreen/HintScreen";
import BackButton from "../../components/BackButton/BackButton";
import shuffle from "../../utils/shuffle";

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: dataArray,
      hint: this.props.hint,
      //stars: this.props.stars,
      correctAnswer: false,
      wrongAnswer: false,
      BackToHint: false
    };

    this.handleImageClick = this.handleImageClick.bind(this);
  }

  getHintWord() {
    return <div>{this.state.dataArray[this.state.hint].wordDanish} </div>;
  }

  getRandomImages() {
    let image1 = this.state.dataArray[this.getRandomId()].id;
    let image2 = this.state.dataArray[this.getRandomId()].id;
    let hintId = this.state.dataArray[this.state.hint].id;
    if (hintId !== image1 && hintId !== image2 && image1 !== image2) {
      let tempArray = [];
      tempArray.push(
        this.state.dataArray[image1],
        this.state.dataArray[image2],
        this.state.dataArray[hintId]
      );
      return shuffle(tempArray);
    } else {
      return this.getRandomImages();
    }
  }

  getRandomId() {
    return Math.floor(Math.random() * this.state.dataArray.length);
  }

  addStar() {
    console.log("a star should be added");
  }

  handleImageClick(id) {
    let hintId = this.state.dataArray[this.state.hint].id;
    if (id === hintId) {
      console.log("correct!");
      this.addStar();
      this.setState({ correctAnswer: true });
    } else {
      this.setState({ wrongAnswer: true });
      console.log("wrong!");
    }
  }

  handleBackToHintClick = () => {
    this.setState({ BackToHint: true });
  };

  render() {
    let array = this.getRandomImages();
    if (this.state.BackToHint === true) {
      return <HintScreen />;
    }
    if (this.state.correctAnswer === true) {
      return <CorrectScreen />;
    }
    if (this.state.wrongAnswer === true) {
      return <WrongScreen hint={this.state.hint} />;
    }
    return (
      <div>
        <div className="background">
          <div className="mobile-container">
            <div className="screen-title">{this.getHintWord()}</div>
            <div className="gm">
              <div
                className="game-button"
                onClick={() => {
                  this.handleImageClick(array[0].id);
                }}
              >
                <img className="gm-img" src={array[0].svg}></img>
              </div>
              <div
                className="game-button"
                onClick={() => {
                  this.handleImageClick(array[1].id);
                }}
              >
                <img className="gm-img" src={array[1].svg}></img>
              </div>
              <div
                className="game-button"
                onClick={() => {
                  this.handleImageClick(array[2].id);
                }}
              >
                <img className="gm-img" src={array[2].svg}></img>
              </div>
              <div className="stickToBottom">
                <BackButton onClick={this.handleBackToHintClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameScreen;