/*eslint-disable*/
import React from 'react';
import './App.css';
import Loginpage from './Login/login';
import SignUp from './signUp/SignUp';
import Idfind from './Login/Idfind';
import Passfind from './Login/passfind';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './index/Home';
import Calendar from './index/Calendar';
import Notice from './Notice/Notice'
import UserMenagement from './userMenagement/UserMenagement';
import NoticeWrite from './Notice/Notice write';
import Board from './Board/Board';
import BoardWrite from './Board/Boardwirte';
import Boardcontent from './Board/Boardcontent';
import BoardUpdate from './Board/Boardupdate';
import NoticeContent from './Notice/NoticeContent';
import NoticeUpdate from './Notice/NoticeUpdate';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      
      <Switch> 
          <Route path="/Boardcontent/:No1/:idx" component={Boardcontent} exact/>
          <Route path="/Boardupdate/:No1" component={BoardUpdate} exact/>
          <Route path="/BoardWrite" component={BoardWrite} exact />
          <Route path="/Board" component={Board} exact />
          <Route path="/NoticeUpdate/:No1" component={NoticeUpdate} exact />
          <Route path="/NoticeContent/:No1/:idx" component={NoticeContent} exact/>
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
