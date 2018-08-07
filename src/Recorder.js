import React from 'react'
import Sound from 'react-sound';


class Playback extends React.Component {

  render() {
    return (
      <div>
      {
        this.props.songKeys.map( (sound, index) => {
          return (
              <Sound 
                key={index}
                url={window.location.origin + `/grand-piano-mp3-sounds/${sound}.mp3`}
                playStatus="PLAYING"
                playFromPosition={0}
                playbackRate={2} 
                onFinishedPlaying={this.props.onFinished}
              />
          )
        })
      }
    </div>
    );
  }
} 

class Recorder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      playback: false,
      soundStatus: "STOPPED"
    };
    this.handleInputChange  = this.handleInputChange.bind(this);
    this.handleSubmit       = this.handleSubmit.bind(this);
    this.handleSongPlayback = this.handleSongPlayback.bind(this);
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
  handleSongPlayback(){
    this.setState(state => ({
      soundStatus: "PLAYING",
      playback: true
    })); 
  }

  handleSongFinishedPlaying(){
    this.setState(state => ({
      soundStatus: "STOPPED",
      playback: false
    })); 
  }

  render() {
    return (
      <div className="recorderContainer">
        <div className="recorderLeft">
          <h2> Record your song: </h2>
          <div className="buttonsContainer">
            <div className="aroundIcon" onClick={this.props.onStartClick}>
              <div className="recordingStart"></div>
            </div>
            <div className="aroundIcon" onClick={this.props.onStopClick}>
              <div className="recordingStop"></div>
            </div>
          </div> 
        </div> 
        <div className="recorderRight">
        <h3>Recorded Songs:</h3>

        {/* display list of recorded songs */}
        {
          this.props.recordedSongs.map( (song, index) => {
            return (
              <div key={index} >
                <a className="clickSavedSong" onClick={this.handleSongPlayback}>
                  {song.name}
                </a>
                {
                this.state.playback ?
                  <Playback 
                    songKeys   = {song.keys}
                    onFinished = {(key) => this.handleSongFinishedPlaying(key)}
                  />
                :
                  null
                }
              </div>
            )
          })
        }

        {/* if new song was recorded ask for a name */}
        {
          this.props.displayForm 
          ?
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:<input type="text" value={this.state.value} onChange={this.handleInputChange}/>
            </label>
            <input type="submit" value="Submit" />
          </form>
          : 
          <span></span>
        }
        </div>

      </div>
    );
  }
}

export default Recorder;