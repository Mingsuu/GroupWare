import React, { useState,useRef } from 'react';
import './loginui.css';
import ltree_logo from '../Image/ltree_logo.png';
import { Route,Link,Switch} from 'react-router-dom';
import Idfind from './Idfind';
import Passfind from './passfind';

const Loginpage = () => {
    const idRef = useRef();
    const passRef = useRef();
    const [idbox, setIdbox] = useState('');
    const [passbox, setPassbox] = useState('');
    const [idcheck, setIdcheck] = useState(false);
    const [pcheck, setPcheck] = useState(false);

    const loginalert = () => {
        if(idbox === ''){
            idRef.current.focus();
            setPcheck(false);
            return setIdcheck(true);
        }else if(passbox === ''){
            setIdcheck(false);
            passRef.current.focus();
            return setPcheck(true);
        }
        alert("로그인 성공");
    }
    
    const idtext = (e) => {
        setIdbox(e.target.value)
        if(idbox === ''){
            // setIdcheck(true);
        }
        return setIdcheck(false);
        
    }
    const passtext = (e) => {
        setPassbox(e.target.value)
        if(passbox === ''){
        // setPcheck(true);
        }
        return setPcheck(false)
    }
    const keypress = (e) => {
        if(e.key === 'Enter'){
            loginalert();
        }
    }



    return (
        
        <div className="loginbox">
            <Switch>
                <Route path="/idfind" component={Idfind} exact/>
                <Route path="/passwordfind" component={Passfind} exact/>
                {/* <Route
                    // path를 따로 정의하지 않으면 모든 상황에 렌더링됨
                    render={({ location }) => (
                    <div>
                        <h2>이 페이지는 존재하지 않습니다:</h2>
                        <p>{location.pathname}</p>
                    </div>
                    )}
                /> */}
            </Switch>
            <div className="loginbox1">
                <div className="loginlogo">
                    <img src={ltree_logo} width='250' height='165'/>
                </div>
                <input id="id" className="idbox" placeholder="사용자 계정" value={idbox} onChange={idtext} ref={idRef} onKeyPress={keypress}></input>
                {idcheck && <span className="red" style={{color : 'tomato'}}>아이디를 입력해주세요.</span>}
                <input id="pass" className="passbox" type="password" placeholder="비밀번호" value={passbox} onChange={passtext} ref={passRef} onKeyPress={keypress}></input>
                {pcheck && <span className="red1" style={{color : 'tomato'}}>비밀번호를 입력해주세요.</span>}
                <button className="loginbtn" type="button" onClick={loginalert}>로 그 인</button>
                <div className="findbox">
                    <Link to="/idfind"><span className="idfind">아이디 찾기</span></Link>
                    <Link to="/passwordfind"><sapn className="passfind">비밀번호 찾기</sapn></Link><br/>
                    <span className="join">회원가입</span>
                </div>
            </div>
        </div>
    );
}

  
  

export default Loginpage;