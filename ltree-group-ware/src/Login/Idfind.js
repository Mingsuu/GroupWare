import React,{ useState, useRef} from 'react';
import './Loginui.css';
import ltree_logo from '../Image/ltree_logo.png';
import Loginpage from './Login';
import {Link} from 'react-router-dom';

const Idfind =() => {
    const nameRef = useRef();
    const snnRef = useRef();
    const [namebox, setNamebox] = useState('');
    const [snnbox, setSnnbox] = useState('');
    const [namecheck,setNamecheck] = useState(false);
    const [snncheck,setSnncheck] = useState(false);

    const idfindalert = () => {
        if(namebox === ''){
            nameRef.current.focus();
            setSnncheck(false);
            return setNamecheck(true);
        }else if(snnbox === ''){
            setNamecheck(false)
            snnRef.current.focus();
            return setSnncheck(true);
        }
        alert("아이디 찾기성공");
    }

    const namechange = (e) => {
        setNamebox(e.target.value);
        if(namebox !== ''){
            return setNamecheck(false);
        }
    }
    const snnchange = (e) => {
        setSnnbox(e.target.value);
        if(snnbox !== ''){
            return setSnncheck(false);
        }
    }

    const keypress = (e) => {
        if(e.key === 'Enter'){
            idfindalert();
        }
    }

    return(
        <div className="loginbox">
            <div className="loginbox1">
                <div className="loginlogo">
                    <img src={ltree_logo} alt='logo' width='250' height='165'/>
                </div>
               
                <div className="findbox">
                    <input className="idfindbox" placeholder="가입하신 이름을 입력해주세요." value={namebox} ref={nameRef} onChange={namechange} onKeyPress={keypress}></input><br/>
                    {namecheck && <span className="red2" style={{color : 'tomato'}}>이름을 입력해주세요.</span>}
                    <input className="idfindbox" placeholder="가입하신 주민번호를 ( - 포함 ) 입력해주세요." type="password" 
                        onKeyPress={keypress} onChange={snnchange} ref={snnRef}  value={snnbox}></input><br/>
                    {snncheck && <span className="red2" style={{color : 'tomato'}}>주민번호를 입력해주세요.</span>}
                    <button className="findbtn" onClick={idfindalert}>아이디 찾기</button><br/>
                    <Link to="/Passwordfind"><sapn className="passfind">비밀번호 찾기</sapn></Link><br/>
                    <Link to="/"><span className="loginpage">로그인</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Idfind;