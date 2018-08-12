import React, { Component } from 'react';
import '../App.css';
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

export default Key;