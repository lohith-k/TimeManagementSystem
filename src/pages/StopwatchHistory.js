/* eslint-disable */

import React from 'react';
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
class StopwatchHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
    };
  }

  componentDidMount() {
    this.setHistoryState();
  }

  setHistoryState = () => {
    if (localStorage.times) {
      this.setState({ history: localStorage.times.split('|') });
    } else {
      this.setState({ history: [] });
    }
  };

  saveToLocalStorage = () => {
    if (localStorage.times) {
      localStorage.times =
        `${Date().toString()} :: ${this.props.formatTime(
          this.props.currentTimeMin
        )}:${this.props.formatTime(
          this.props.currentTimeSec
        )}:${this.props.formatTime(this.props.currentTimeMs, 'ms')}|` +
        localStorage.times;
    } else {
      localStorage.times = `${Date().toString()} :: ${this.props.formatTime(
        this.props.currentTimeMin
      )}:${this.props.formatTime(
        this.props.currentTimeSec
      )}:${this.props.formatTime(this.props.currentTimeMs, 'ms')}|`;
    }
  };

  saveTime = () => {
    if (typeof Storage !== 'undefined') {
      this.saveToLocalStorage();
    } else {
      console.error('local storage not supported');
    }
    this.setHistoryState();
  };

  resetHistory = () => {
    if (localStorage.times) {
      localStorage.removeItem('times');
    }
    this.setHistoryState();
  };

  render() {
    return (
      <div className={'stopwatch__history'}>
       <Button variant style={{backgroundColor:"darkgreen",color:"white"}} onClick={this.saveTime}>SAVE TIME</Button>
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       <Button variant style={{backgroundColor:"OrangeRed",color:"white"}} onClick={this.resetHistory}>RESET HISTORY</Button>
       <br/>
       <br/>
        <h2>History</h2>
        <br/>
        <ul>
          <h3>{this.state.history.map((item, index) => <li key={index}>{item}&nbsp;&nbsp;(Time Lapse)</li>)} </h3>
        </ul>
      </div>
    );
  }
}

export default StopwatchHistory;
