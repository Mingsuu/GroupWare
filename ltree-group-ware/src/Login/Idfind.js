import React,{ useState, useRef} from 'react';
import './loginui.css';
import ltree_logo from '../Image/ltree_logo.png';

const Idfind =() => {
    const nameRef = useRef();
    const snnRef = useRef();
    const [namebox, setNamebox] = useState('');
    const [snnbox, setSnnbox] = useState('');

    const idfindalert = () => {
        if(namebox === ''){
            alert("이름을 입력해주세요.");
            nameRef.current.focus();
            return false;
        }else if(snnbox === ''){
            alert("주민번호를 입력해주세요.");
            snnRef.current.focus();
            return false;
        }
        alert("아이디 찾기성공");
    }

    const namechange = (e) => {
        setNamebox(e.target.value);
    }
    const snnchange = (e) => {
        setSnnbox(e.target.value);
    }

    return(
        <div className="loginbox">
            <div className="loginbox1">
                <div className="loginlogo">
                    <img src={ltree_logo} width='250' height='165'/>
                </div>
               
                <div className="findbox">
                    <input className="idfindbox" placeholder="가입하신 이름을 입력해주세요." value={namebox} ref={nameRef} onChange={namechange}></input><br/>
                    <input className="idfindbox" placeholder="가입하신 주민번호를 ( - 포함 ) 입력해주세요." type="password" 
                             onChange={snnchange} ref={snnRef}  value={snnbox}></input><br/>
                    <button className="findbtn" onClick={idfindalert}>아이디 찾기</button><br/>
                    <span className="loginpage">로그인</span>
                </div>
            </div>
        </div>
    )
}

export default Idfind;