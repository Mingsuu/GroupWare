/*eslint-disable*/
import React from 'react';
import './App.css';
import Loginpage from './Login/Login';
import SignUp from './signUp/SignUp';
import Idfind from './Login/Idfind';
import Passfind from './Login/Passfind';
import { BrowserRouter,Route,Link,Switch } from 'react-router-dom';
import Home from './index/Home';
import Schedule from './index/Schedule';
import Notice from './Notice/Notice'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Link to="/Idfind"><span className="Idfind">아이디 찾기</span></Link>
        <Link to="/Passwordfind"><sapn className="Passfind">비밀번호 찾기</sapn></Link><br/> */}
      
      <Switch>
          <Route path="/" component={Loginpage} exact/>
          <Route path="/idfind" component={Idfind} exact/>
          <Route path="/passwordfind" component={Passfind} exact/>
          <Route path="/SignUp" component={SignUp} exact/>
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