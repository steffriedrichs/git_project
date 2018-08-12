import React from 'react'
import Sound from 'react-sound';


class Playback extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      replay: true
    };
    this.handleSoundFinished = this.handleSoundFinished.bind(this);

  }

  // play a song if songtitle was clicked
  componentWillReceiveProps(newProps){
    this.props.songKeys !== newProps.songKeys ?
      this.setState({
        replay: true
      })
    :
      null
  }

  // stop playback after song finished
  handleSoundFinished() {
    if(this.state.index < (this.props.songKeys.length - 1)){
      this.setState(state => ({
        index: this.state.index + 1
      }))
    }else{
      this.setState(state => ({
        index: 0,
        replay: false
      }))
    {this.props.onFinished()}
    }
  }

  render() {
    return (
      <div>
      { this.state.replay ?
          <Sound 
            key={this.state.index}
            url={window.location.origin + `/grand-piano-mp3-sounds/${this.props.songKeys[this.state.index]}.mp3`}
            playStatus="PLAYING"
            playFromPosition={0}
            playbackRate={4} 
            onFinishedPlaying={this.handleSoundFinished}
          />
        : 
          null
      }
    </div>
    );
  }
}

export default Playback;