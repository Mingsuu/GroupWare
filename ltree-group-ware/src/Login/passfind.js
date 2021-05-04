import React,{ useState, useRef} from 'react';
import './Loginui.css';
import ltree_logo from '../Image/ltree_logo.png';
import {Link} from 'react-router-dom';

const Passfind =() => {
    const passfindRef = useRef();
    const [passfind, setPassfind] = useState('');
    const [ididcheck, setIdidcheck] = useState(false);

    const passfindalert = () => {
        if(passfind === ''){
            passfindRef.current.focus();
            return setIdidcheck(true);
        }
        alert("비밀번호 찾기성공");
    }

    const passchange = (e) => {
        setPassfind(e.target.value);
        if(passfind !== ''){
            return setIdidcheck(false);
        }
    }

    const keypress = (e) => {
        if(e.key === 'Enter'){
            passfindalert();
        }
    }

    return(
        <div className="loginbox">
            <div className="loginbox1">
                <div className="loginlogo">
                    <img src={ltree_logo} width='250' height='165'/>
                </div>
               
                <div className="findbox">
                    <input className="passfindbox" placeholder="가입하신 아이디를 입력해주세요." value={passfind} ref={passfindRef} onChange={passchange} onKeyPress={keypress}></input><br/>
                    {ididcheck && <span className="red2" style={{color : 'tomato'}}>아이디를 입력해주세요.</span>}
                    <button className="passbtn" onClick={passfindalert}>비밀번호 찾기</button><br/>
                    <Link to="/Idfind"><span className="idfind1">아이디 찾기</span></Link>
                    <Link to="/"><span className="loginpage">로그인</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Passfind;