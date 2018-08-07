import React, { Component } from 'react';
import './App.css';
import Sound from 'react-sound';


// sub-component for a key:
class Key extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      renderSound: false,
      soundStatus: "STOPPED"      
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSongFinishedPlaying = this.handleSongFinishedPlaying.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      soundStatus: "PLAYING",
      renderSound: true
    }));
    {this.props.onRecording(this.props.name)}
  }

  handleSongFinishedPlaying() {
    this.setState(state => ({
      renderSound: false,
      soundStatus: "STOPPED" 
    }));
  }

  render() {
    return (
      this.props.isWhite 
      ? 
        <div className="whiteKey" onClick={this.handleClick} >
        {
          this.state.renderSound ?
          <Sound 
            url={window.location.origin + `/grand-piano-mp3-sounds/${this.props.name}.mp3`}
            playStatus={this.state.soundStatus}
            playFromPosition={0}
            onFinishedPlaying={this.handleSongFinishedPlaying}
            playbackRate={4} 
          />
         :
         <span></span>
        }         
        </div>
      :
        this.props.name.split('-')[0] === "filler" ? 
        <div className="fillerKey"></div> 
        :
        <div className="blackKey" onClick={this.handleClick}>
          {
          this.state.renderSound ?
          <Sound 
            url={window.location.origin + `/grand-piano-mp3-sounds/${this.props.name}.mp3`}
            playStatus={this.state.soundStatus}
            playFromPosition={0}
            onFinishedPlaying={this.handleSongFinishedPlaying}
            playbackRate={4} 
          />
          :
          <span></span>
         } 
        </div>
    );
  }
}

// create a keybard div for all 88 keys:
class Keyboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      keyPlayed: null
    }
  } 

  render() {   
    const whiteKeys = ["A0","B0","C1","D1","E1","F1","G1","A1","B1","C2","D2","E2","F2","G2","A2","B2",
                                 "C3","D3","E3","F3","G3","A3","B3","C4","D4","E4","F4","G4","A4","B4",
                                 "C5","D5","E5","F5","G5","A5","B5","C6","D6","E6","F6","G6","A6","B6",
                                 "C7","D7","E7","F7","G7","A7","B7","C8"]; 
    const blackKeys = ["Bb0","filler-1","Db1","Eb1","filler-2","Gb1","Ab1","Bb1","filler-3",
                                        "Db2","Eb2","filler-4","Gb2","Ab2","Bb2","filler-5",
                                        "Db3","Eb3","filler-6","Gb3","Ab3","Bb3","filler-7",
                                        "Db4","Eb4","filler-8","Gb4","Ab4","Bb4","filler-9",
                                        "Db5","Eb5","filler-10","Gb5","Ab5","Bb5","filler-11",
                                        "Db6","Eb6","filler-12","Gb6","Ab6","Bb6","filler-13",
                                        "Db7","Eb7","filler-14","Gb7","Ab7","Bb7","filler-15"];                                     
  return (
      <div className="keyboardContainer">
        <div className="whiteKeysContainer">
          {whiteKeys.map( (sound, index) => {
          return (
            <Key 
              key         = {index}
              name        = {sound} 
              isWhite     = {true}
              onRecording = {this.props.onRecording}
              soundStatus = {this.props.soundStatus}
            />
          )
          })}
        </div>
        <div className="blackKeysContainer">
          {blackKeys.map( (sound, index) => {
            return (
              <Key 
                key         = {index}
                name        = {sound}
                isWhite     = {false} 
                onRecording = {this.props.onRecording}
                soundStatus = {this.props.soundStatus}
              />
            )
            })}
        </div>
      </div>
    );
  }
}

export default Keyboard;