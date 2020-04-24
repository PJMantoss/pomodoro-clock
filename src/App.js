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

  switchTimer = (num, str) => {
    this.setState({
      timer: num,
      timerType: str,
      alarmColor: {color: 'white'}
    })
  }

  phaseControl = () => {
    let timer = this.state.timer;
    this.warning(timer);
    this.buzzer(timer);
    if (timer < 0){
      this.state.timerType == 'Session' ? (
        this.state.intervalID && this.state.intervalID.cancel(),
        this.beginCountDown(),
        this.switchTimer(this.state.brkLength * 60, 'Break')
      ) : (
        this.state.intervalID && this.state.intervalID.cancel(),
        this.beginCountDown(),
        this.switchTimer(this.state.brkLength * 60, 'Session')
      );
    }
  }

  warning = _timer => {
    let warn = _timer < 61 ?
    this.setState({alarmColor: {color:'#a50d0d'}}) :
    this.setState({alarmColor: {color:'white'}});
  }

  buzzer = _timer => {
    if (_timer === 0){
      this.audioBeep.play();
    }
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

  clockify = () => {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }

  reset = () => {
    this.setState({
      brkLength: 5,
      sessionLen: 25,
      timerState: "stopped",
      timerType: "Session",
      timer: 1500,
      intervalID: '',
      alarmColor: { color: 'white' }
    })
    this.state.intervalID && this.state.intervalID.cancel();
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default App
