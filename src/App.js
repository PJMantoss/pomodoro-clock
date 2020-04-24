import React, { Component } from 'react'
import './App.css'

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      brkLength: 5,
      sessionLen: 25,
      timerState: "stopped",
      timerType: "Session",
      timer: 1500,
      intervalID: '',
      alarmColor: { color: 'white' }
    }
  }

  lengthControl = (stateToChange, sign, currentLength, timerType) => {
    if (this.state.timerState == "running") return;
    if (this.state.timerType == timerType){
      if (sign == '-' && currentLength != 1){
        this.setState({[stateToChange]: currentLength - 1})
      } else if (sign == "+" && currentLength != 60){
        this.setState({[stateToChange]: currentLength + 1})
      }
    } else {
      if (sign == '-' && currentLength != 1){
        this.setState({
          [stateToChange]: currentLength + 1,
          timer: currentLength * 60 + 60
        });
      }
    }
  }

  setBrkLength = e => {
    this.lengthControl('brkLength', e.currentTarget.value, this.state.brkLength, 'Session');
  }

  setSessionLen = e => {
    this.lengthControl('sessionLen', e.currentTarget.value, this.state.sessionLen, 'Break');
  }

  beginCountDown = () => {
    this.setState({
      intervalID: accurateInterval(() => {
        this.decrementTimer();
        this.phaseControl();
      }, 1000)
    })
  }

  decrementTimer = () => {
    this.setState({timer: this.state.timer - 1})
  }

  timerControl = () => {
    let control = this.state.timerState == 'stopped' ? (
      this.beginCountDown(),
      this.setState({timerState: 'running'})
    ) : (
      this.setState({timerState: 'stopped'}),
      this.state.intervalID && this.state.intervalID.cancel()
    )
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default App
