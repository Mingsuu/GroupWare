import React,{ useState, useRef} from 'react';
import './loginui.css';
import ltree_logo from '../Image/ltree_logo.png';
import {Link} from 'react-router-dom';

const Passfind =() => {
    const passfindRef = useRef();
    const tellfindRef = useRef();
    const [passfind, setPassfind] = useState('');
    const [tellfind, setTellfind] = useState('');
    const [ididcheck, setIdidcheck] = useState(false);
    const [tfcheck, setTfcheck] = useState(false);

    const passfindalert = (json) => {
        if(passfind === ''){
            passfindRef.current.focus();
            return setIdidcheck(true);
        }else if(tellfind === ''){
            tellfindRef.current.focus();
            return setTfcheck(true);
        }else if(json.length > 0){
            alert("가입하신 비밀번호는 "+ json[0].userPWD + " 입니다.");
            setPassfind('');
            setTellfind('');
        }else {
            alert("해당 아이디에 대한 비밀번호가 존재하지 않습니다.");
        }
        
    }

    const passchange = (e) => {
        setPassfind(e.target.value);
        if(passfind !== ''){
            return setIdidcheck(false);
        }
    }
    const tellchange = (e) => {
        setTellfind(e.target.value);
        if(tellfind !== ''){
            return setTfcheck(false);
        }
    }

    const keypress = (e) => {
        if(e.key === 'Enter'){
            findpass();
        }
    }

    const findpass = () => {
        const post = {pfbox:passfind,tfbox:tellfind}
        
        fetch("http://localhost:3001/Findpass", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(post),
        })
          .then((res) => res.json())
          .then((json) => {
            console.log(json[0]);
            passfindalert(json);
          });
      };


    return(
        <div className="loginbox">
            <div className="loginbox1">
                <div className="loginlogo">
                    <img src={ltree_logo} width='250' height='165' alt='logo'/>
                </div>
               
                <div className="findbox">
                    <input className="passfindbox" placeholder="가입하신 아이디를 입력해주세요." value={passfind} ref={passfindRef} onChange={passchange} onKeyPress={keypress}></input><br/>
                    {ididcheck && <span className="red2" style={{color : 'tomato'}}>아이디를 입력해주세요.</span>}
                    <input className="passfindbox" placeholder="가입하신 전화번호를 입력해주세요." value={tellfind} ref={tellfindRef} onChange={tellchange} onKeyPress={keypress}></input><br/>
                    {tfcheck && <span className="red2" style={{color : 'tomato'}}>전화번호를 입력해주세요.</span>}
                    <button className="passbtn" onClick={findpass}>비밀번호 찾기</button><br/>
                    <Link to="/Idfind"><span className="idfind1">아이디 찾기</span></Link>
                    <Link to="/"><span className="loginpage">로그인</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Passfind;