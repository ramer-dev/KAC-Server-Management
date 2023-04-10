import React from "react";
import audiofile from "../audio/notify.wav"

class AlertBell extends React.Component {
    state = {
        play: false,
        path: audiofile
    };
    audio = new Audio(this.state.path);

    componentDidMount() {
        this.audio.addEventListener('ended', () => {
            this.audio.loop = true;
            this.setState({play : false})
        })
    };

    componentWillUnmount() {
        this.audio.removeEventListener('ended', () => {
            this.setState({play : false})
        })
    };

    togglePlay = () => {
        this.setState({play: !this.state.play}, () =>{
            this.state.play ? this.audio.play() : this.audio.pause()
        })
    };

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default AlertBell