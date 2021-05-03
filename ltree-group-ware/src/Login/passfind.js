import React,{ useState, useRef} from 'react';
import './loginui.css';
import ltree_logo from '../Image/ltree_logo.png';

const Passfind =() => {
    const passfindRef = useRef();
    const [passfind, setPassfind] = useState('');

    const passfindalert = () => {
        if(passfind === ''){
            alert("아이디를 입력해주세요.");
            passfindRef.current.focus();
            return false;
        }
        alert("비밀번호 찾기성공");
    }

    const passchange = (e) => {
        setPassfind(e.target.value);
    }

    return(
        <div className="loginbox">
            <div className="loginbox1">
                <div className="loginlogo">
                    <img src={ltree_logo} width='250' height='165'/>
                </div>
               
                <div className="findbox">
                    <input className="passfindbox" placeholder="가입하신 아이디를 입력해주세요." value={passfind} ref={passfindRef} onChange={passchange}></input><br/>
                    <button className="passbtn" onClick={passfindalert}>비밀번호 찾기</button><br/>
                    <span className="loginpage">로그인</span>
                </div>
            </div>
        </div>
    )
}

export default Passfind;