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
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default App
