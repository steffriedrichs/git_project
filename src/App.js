import React, { Component } from 'react';
import Keyboard from './Keyboard/index';
import Recorder from './Recorder/index';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      currentSong: [],
      recordedSongs: [],
      displayForm: false,
      renderSound: true
    };
    this.handleStartClick     = this.handleStartClick.bind(this);
    this.handleStopClick      = this.handleStopClick.bind(this);
    this.handleSongRecording  = this.handleSongRecording.bind(this);
    this.handleSongNameSubmit = this.handleSongNameSubmit.bind(this);
  }

  // set recording to active
  handleStartClick() {
    this.setState(state => ({
      recording: true
    }));
  }

  // push played key to current array, if recording is active
  handleSongRecording(keyPlayed) {
    this.state.recording ? 
      this.setState(state => {
        currentSong: this.state.currentSong.push(keyPlayed);
      })   
    : 
    null
  }  

  // set recording to inactive and ask user for songtitle
  handleStopClick() {
    this.setState(state => ({
      recording: false,
      displayForm: true
    }));
  }

  // get user input: song's name
  handleSongNameSubmit(submittedName) {
    this.setState( state => {
      recordedSongs: this.state.recordedSongs.push({
        keys: this.state.currentSong, 
        name: submittedName
      }); 
    })  
    this.setState(state => ({
      displayForm: false,
      currentSong: []
    }));
  }

  render() {
    return (
      <div className="appContainer">
        <div className="title">
          <h1> Steffi's React Piano</h1>
          <h2> Play a song! </h2>
        </div> 
        <div className="keyboardWrapper">
          <Keyboard
            onRecording   = {(key) => this.handleSongRecording(key)}
            renderSound   = {this.state.renderSound}
          />
        </div>
        <Recorder 
          onStartClick   = {(start) => this.handleStartClick(start)}
          onStopClick    = {(stop)  => this.handleStopClick(stop)}
          recordingState = {this.state.recording}
          recordedSongs  = {this.state.recordedSongs}
          displayForm    = {this.state.displayForm}
          handleSongNameSubmit = {this.handleSongNameSubmit}
        />
      </div>
    );
  }
}

export default App;