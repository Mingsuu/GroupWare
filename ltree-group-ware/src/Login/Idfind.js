import React from 'react';
import './loginui.css';
import ltree_logo from '../Image/ltree_logo.png';

const Idfind =() => {


    return(
        <div className="loginbox">
            <div className="loginbox1">
                <div className="loginlogo">
                    <img src={ltree_logo} width='250' height='165'/>
                </div>
               
                <div className="findbox">
                    <span className="idfind">아이디 찾기</span>
                    <sapn className="passfind">비밀번호 찾기</sapn><br/>
                    <span className="join">회원가입</span>
                </div>
            </div>
        </div>
    )
}

export default Idfind;