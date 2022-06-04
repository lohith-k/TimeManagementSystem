/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import StopwatchDisplay from './StopwatchDisplay';
import StopwatchHistory from './StopwatchHistory';
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,TextField
  } from '@mui/material';
class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      running: false,
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0,
    };
  }

  formatTime = (val, ...rest) => {
    let value = val.toString();
    if (value.length < 2) {
      value = '0' + value;
    }
    if (rest[0] === 'ms' && value.length < 3) {
      value = '0' + value;
    }
    return value;
  };

  start = () => {
    if (!this.state.running) {
      this.setState({ running: true });
      this.watch = setInterval(() => this.pace(), 10);
    }
  };

  stop = () => {
    this.setState({ running: false });
    clearInterval(this.watch);
  };

  pace = () => {
    this.setState({ currentTimeMs: this.state.currentTimeMs + 10 });
    if (this.state.currentTimeMs >= 1000) {
      this.setState({ currentTimeSec: this.state.currentTimeSec + 1 });
      this.setState({ currentTimeMs: 0 });
    }
    if (this.state.currentTimeSec >= 60) {
      this.setState({ currentTimeMin: this.state.currentTimeMin + 1 });
      this.setState({ currentTimeSec: 0 });
    }
  };

  reset = () => {
    this.setState({
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0,
    });
  };

  render() {
    return (
      <div className={'stopwatch'}>
          <Card>
              <br/>
        <center><h1 ref="header">Timer</h1>
        <br/>
        {this.state.running === false && (
          <Button variant style={{backgroundColor:"MediumSeaGreen",color:"white"}} onClick={this.start}>START</Button>
        )}
      
        {this.state.running === true && (
         <Button variant style={{backgroundColor:"red",color:"white"}} onClick={this.stop}>STOP</Button>
        )}
        <br/><br/>
        <div sytle={{width:"50px"}}>
        <StopwatchDisplay
          ref="display"
          {...this.state}
          formatTime={this.formatTime}
          
        /></div>
        <br/>
<Button variant style={{backgroundColor:"darkred",color:"white"}} onClick={this.reset}>RESET</Button>
<br/>
<br/>
        <StopwatchHistory {...this.state} formatTime={this.formatTime} />
        </center>
        </Card>
      </div>
    );
  }
}

export default Timer;
