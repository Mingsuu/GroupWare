/*eslint-disable*/
import React from 'react';
import './App.css';
import Loginpage from './Login/Login';
import SignUp from './signUp/SignUp';
import Idfind from './Login/Idfind';
import Passfind from './Login/Passfind';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './index/Home';
import Calendar from './index/Calendar';
import Notice from './Notice/Notice'
import UserMenagement from './userMenagement/UserMenagement';
import NoticeWrite from './Notice/Notice write';


function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <Switch>
          <Route path="/NoticeWrite" component={NoticeWrite} exact />
          <Route path="/" component={Loginpage} exact />
          <Route path='/home' component={Home} />
          <Route path="/idfind" component={Idfind} exact />
          <Route path="/passwordfind" component={Passfind} exact />
          <Route path="/SignUp" component={SignUp} exact />
          <Route path="/notice" component={Notice} exact />
          <Route path='/userMenagement' component={UserMenagement} />
          <Route path='/calendar' render={() => (<Calendar today={new Date()}/>)} />
          <Route
            // path를 따로 정의하지 않으면 모든 상황에 렌더링됨
            render={({ location }) => (
              <div>
                <p>{location.pathname}</p>
                <h2>이 페이지는 존재하지 않습니다.</h2>

              </div>
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
