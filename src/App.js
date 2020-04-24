import React, { Component } from 'react';
import TimerControl from './TimerControl';
import './App.css';

let accurateInterval = require('accurate-interval');

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
    if (this.state.timerState === "running") return;
    if (this.state.timerType === timerType){
      if (sign === "-" && currentLength !== 1){
        this.setState({[stateToChange]: currentLength - 1})
      } else if (sign === "+" && currentLength !== 60){
        this.setState({[stateToChange]: currentLength + 1})
      }
    } else {
      if (sign === "-" && currentLength !== 1){
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
    });
  }

  decrementTimer = () => {
    this.setState({timer: this.state.timer - 1});
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
    if(timer < 0){
        if(this.setState({timerType: 'Session'})) {
        this.state.intervalID && this.state.intervalID.cancel();
        this.beginCountDown();
        this.switchTimer(this.state.brkLength * 60, 'Break');
      } else {
        this.state.intervalID && this.state.intervalID.cancel();
        this.beginCountDown();
        this.switchTimer(this.state.sessionLen * 60, 'Session');
      };
    }
  }

  warning = (_timer) => {
    _timer < 61 ?
    this.setState({alarmColor: {color:'#a50d0d'}}) :
    this.setState({alarmColor: {color:'white'}});
  }

  buzzer = (_timer) => {
    if (_timer === 0){
      this.audioBeep.play();
    }
  }

  timerControl = () => {
    if (this.setState({timerState: 'stopped'})){
      this.beginCountDown();
      this.setState({timerState: 'running'});
       } else {
      this.setState({timerState: 'stopped'});
      this.state.intervalID && this.state.intervalID.cancel();
       }
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
        <div className="main-title">
          Pomodoro Clock
        </div>

        <TimerControl 
            titleID="break-label" minID="break-decrement" 
            addID="break-increment" lengthID="break-length" 
            title="Break Length" onClick={this.setBrkLength} 
            length={this.state.brkLength}
        />

        <TimerControl
            titleID="session-label" minID="session-decrement" 
            addID="session-increment" lengthID="session-length" 
            title="Session Length" onClick={this.setSessionLen} 
            length={this.state.sessionLen}
        />

        <div className="timer" style={this.state.alarmColor}>

          <div className="timer-wrapper">

            <div className="timer-label">
              {this.state.timerType}
            </div>

            <div id="time-left">
              {this.clockify()}
            </div>

          </div>

        </div>

        <div className="timer-control">
          <button id="start_stop" onClick={this.timerControl}>
            <i className="fa fa-play fa-2x" />
            <i className="fa fa-pause fa-2x" />
          </button>

          <button id="reset" onClick={this.reset}>
            <i className="fa fa-refresh fa-2x"/>
          </button>
        </div>

        <audio 
            id="beep" 
            preload="auto" 
            src="https://goo.gl/65cBl1" 
            ref={(audio) => {this.audioBeep = audio;}} 
        />
      </div>
    )
  }
}

export default App
