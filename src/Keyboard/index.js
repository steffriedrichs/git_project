import React, { Component } from 'react';
import Sound from 'react-sound';
import '../App.css';
import keyArrays from './constData';
import Key from './Key';


// create a keybard div for all 88 keys:
class Keyboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      keyPlayed: null
    }
  } 

  render() {                                      
    return (
      <div className="keyboardContainer">
        <div className="whiteKeysContainer">
          {keyArrays.whiteKeys.map( (sound, index) => {
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
          {keyArrays.blackKeys.map( (sound, index) => {
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