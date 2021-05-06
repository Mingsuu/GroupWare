import React, { Component } from 'react'
import './App.css';
import Loginpage from './Login/Login';
import SignUp from './signUp/SignUp';
import Idfind from './Login/Idfind';
import Passfind from './Login/Passfind';
import { BrowserRouter,Route,Link,Switch } from 'react-router-dom';
import Home from './index/Home';
import Schedule from './index/Schedule';
import Notice from './Notice/Notice'
import Noticewrite from './Notice/Notice write'
import Board from './board/Board';
import WritePage from './board/WritePage';

export default class App extends Component {
  state = {
    testbody : "",
    data : "",
  }

  prin = (d) => {
    let ming = '';
    console.log("d type" +typeof(d));
    for(let i in d){
      ming += (d[i].name+",");
    }
    return ( 
      <div>{ming}</div>
    )
  };

  
  render() {
    return (
      <div>
        <input onChange={this.handleChange} name ="testbody"/>
        <button onClick = {this.submitId}>Submit</button>
        <h1>{this.state.testbody}</h1>
        <br/><br/><br/><br/><br/>
        <h2>데이터가져오기</h2>
        <h3>{this.prin(this.state.data)}</h3> 
        <button onClick={this.onCall}>가져오기</button>
      </div>
    )
  }
}