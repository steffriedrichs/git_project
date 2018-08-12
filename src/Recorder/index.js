import React, { Component }  from 'react'
import Sound from 'react-sound';
import '../App.css';
import Playback from './Playback';
 

class Recorder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      songkeys: []
    };
    this.handleInputChange         = this.handleInputChange.bind(this);
    this.handleSubmit              = this.handleSubmit.bind(this);
    this.handleSongTitleClicked    = this.handleSongTitleClicked.bind(this);
    this.handleSongFinishedPlaying = this.handleSongFinishedPlaying.bind(this);
  }

  // get user input: new song name
  handleInputChange(event){
    this.setState({
      value: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    {this.props.handleSongNameSubmit(this.state.value)}
  }
      
  // play a saved song
  handleSongTitleClicked(keys){
    this.setState({
      songkeys: keys
    }); 
  }

  // remove song after playback
  //  -> playback props will be changed on songtitle click
  handleSongFinishedPlaying(){
    this.setState({
      songkeys: []
    });
  }

  render() {
    return (
      <div className="recorderContainer">
        <div className="recorderLeft">
          <h2> Record your song: </h2>
          <div className="buttonsContainer">
              <div className={`aroundIcon ${this.props.recordingState ? "recordingActive" : ""}`} onClick={this.props.onStartClick}>
              <div className="recordingStart"></div>
            </div>
            <div className="aroundIcon" onClick={this.props.onStopClick}>
              <div className="recordingStop"></div>
            </div>
          </div> 
        </div> 
        <div className="recorderRight">
        <h3>Recorded Songs: <br/> 
          <span className="clickSongTitleExplanation">(Click on a song to replay it!)</span> 
        </h3>

        { this.props.recordedSongs.map( (song, index) => {
            return (
              <div key={index} >
                <a className="songTitle" onClick={this.handleSongTitleClicked.bind(this, song.keys)}>
                  {song.name}
                </a>
              </div> 
            )
          })   
        }  

        { this.props.displayForm ?
            <form onSubmit={this.handleSubmit}>
              <label>
                Name:<input type="text" value={this.state.value} onChange={this.handleInputChange}/>
              </label>
              <input type="submit" value="Submit" />
            </form>
          : 
            <span></span>
        }

        <Playback 
          songKeys   = {this.state.songkeys}
          onFinished = {this.handleSongFinishedPlaying}
        /> 

        </div>
      </div>
    );
  }
}

export default Recorder;