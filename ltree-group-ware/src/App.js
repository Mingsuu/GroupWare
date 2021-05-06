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

  handleChange =(e)=>{
    this.setState({
      [e.target.name] : e.target.value,
    });
  }

  submitId = ()=>{
    const post ={
      test : this.state.testbody,
    };
   
    fetch("http://localhost:3001/idplz", {
      method : "post", // 통신방법
      headers : {
        "content-type" : "application/json",
      },
      body : JSON.stringify(post),
    })
    .then((res)=>res.json())
    .then((json)=>{
      this.setState({
        testbody : json.text,
      });
    });
  };
  onCall =()=>{
    fetch("http://localhost:3001/callbody",{
      method:"post",
      headers : {
        "content-type" : "application/json",
      },
      body : JSON.stringify(),
    })
    .then((res)=>res.json())
    .then((json)=>{
      this.setState({
        data : json,
      });
      console.log("test= " +json.length);
    });
  };

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