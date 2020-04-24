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
    }
  }

  setBrkLength = e => {}

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default App
