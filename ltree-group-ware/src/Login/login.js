import React, { useState,useRef } from 'react';
import './loginui.css';
import ltree_logo from '../Image/ltree_logo.png';

const Loginpage = () => {
    const idRef = useRef();
    const passRef = useRef();
    const [idbox, setIdbox] = useState('');
    const [passbox, setPassbox] = useState('');

    const loginalert = () => {
        if(idbox === ''){
            alert("아이디를 입력해주세요.");
            idRef.current.focus();
            return false;
        }else if(passbox === ''){
            alert("비밀번호를 입력해주세요.");
            passRef.current.focus();
            return false;
        }
        alert("로그인 성공");
    }
    
    const idtext = (e) => {
        setIdbox(e.target.value)
    }
    const passtext = (e) => {
        setPassbox(e.target.value)
    }
    

    return (

        <div className="loginbox">
            <div className="loginbox1">
                <div className="loginlogo">
                    <img src={ltree_logo} alt='logo' width='250' height='165'/>
                </div>
                <input id="id" className="idbox" placeholder="사용자 계정" value={idbox} onChange={idtext} ref={idRef}></input>
                <input id="pass" className="passbox" type="password" placeholder="비밀번호" value={passbox} onChange={passtext} ref={passRef}></input>
                <button className="loginbtn" type="button" onClick={loginalert}>로 그 인</button>
                <div className="findbox">
                    <span className="idfind">아이디 찾기</span>
                    <sapn className="passfind">비밀번호 찾기</sapn><br/>
                    <span className="join">회원가입</span>
                </div>
            </div>
        </div>
        
    );
}

  
  

export default Loginpage;