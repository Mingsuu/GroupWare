import React, { useEffect, useState } from 'react'
import './App.css';
import Loginpage from './Login/Login';
import SignUp from './signUp/SignUp';
import Idfind from './Login/Idfind';
import Passfind from './Login/Passfind';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Home from './index/Home';
import Schedule from './index/Schedule';
import Notice from './Notice/Notice'
import Noticewrite from './Notice/Notice write'


const App = () => {

  const [data, setData] = useState([{ name: "" }]);
  const [nameTest, setNameTest] = useState();

  const handleChange = (e) => {
    setNameTest(e.target.value);
  }

  const submitId = () => {
    const post = {
      test: nameTest
    };

    fetch("http://localhost:3001/idplz", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          testbody: json.text,
        });
      });
  };


  const onCall = () => {
    fetch("http://localhost:3001/callbody", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        console.log("test= " + json.length);
      });

  };

  return (
    <div>
      <input onChange={handleChange} />
      <button onClick={submitId}>Submit</button>

      <h2>데이터가져오기</h2>
      <p>{data.map(n => {
        return (
          <p>{n.name}</p>
        );
      })}</p>
      <button onClick={onCall}>가져오기</button>
    </div>
  )
}

export default App;

