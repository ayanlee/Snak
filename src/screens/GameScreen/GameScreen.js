import React, { Component } from "react";

import dataArray from "../../data/dataArray";
import CorrectScreen from "../CorrectScreen/CorrectScreen";
import WrongScreen from "../WrongScreen/WrongScreen";
import HintScreen from "../HintScreen/HintScreen";
import BackButton from "../../components/BackButton/BackButton";
import Star from "../../components/Star/Star";
import Sound from "../../components/Sound/Sound";
import shuffle from "../../utils/shuffle";
import "./GameScreen.css";
import "../../styling/generic.css";
import StartScreen from "../StartScreen";

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: dataArray,
      hint: this.props.hint,
      correctAnswer: false,
      wrongAnswer: false,
      BackToHint: false,
      BackToStart: false
    };

    this.handleImageClick = this.handleImageClick.bind(this);
  }

  getHintWord() {
    return <div>{this.state.dataArray[this.state.hint].wordDanish} </div>;
  }

  getEnglishWord() {
    return <div>{this.state.dataArray[this.state.hint].wordEnglish} </div>;
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

  setIsUsed() {
    this.state.dataArray[this.state.hint].isUsed = true;
  }

  handleImageClick(id) {
    let hintId = this.state.dataArray[this.state.hint].id;
    if (id === hintId) {
      this.setIsUsed();
      this.setState({ correctAnswer: true });
    } else {
      this.setState({ wrongAnswer: true });
    }
  }

  handleBackToHintClick = () => {
    this.setState({ BackToHint: true });
  };

  handleBackToStartClick = () => {
    this.setState({ BackToStart: true });
  };

  render() {
    let array = this.getRandomImages();

    if (this.state.BackToHint === true) {
      return <HintScreen hint={this.props.hint} />;
    }
    if (this.state.BackToStart === true) {
      return <StartScreen />;
    }

    if (this.state.correctAnswer === true) {
      return <CorrectScreen hint={this.state.hint} trial={this.props.trial} />;
    }
    if (this.state.wrongAnswer === true && !this.props.trial) {
      return <WrongScreen hint={this.state.hint} />;
    }
    return (
      <div>
        <div className="background">
          <div className="mobile-container">
            <Star />

            
            <div>
              <h1 className="screen-title">{this.getHintWord()}</h1>
              <Sound hint={this.props.hint} />
              <p className="normal-text">{this.getEnglishWord()}</p>
            </div>

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
                {this.props.trial ? (
                  <BackButton onClick={this.handleBackToStartClick} />
                ) : (
                  <BackButton onClick={this.handleBackToHintClick} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameScreen;
