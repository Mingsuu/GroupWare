import React,{ useState, useRef} from 'react';
import './loginui.css';
import ltree_logo from '../Image/ltreetitle.png';
import {Link} from 'react-router-dom';


const Idfind =() => {
    const nameRef = useRef();
    const snnRef = useRef();
    const [namebox, setNamebox] = useState('');
    const [snnbox, setSnnbox] = useState('');
    const [namecheck,setNamecheck] = useState(false);
    const [snncheck,setSnncheck] = useState(false);

    const idfindalert = (json) => {
        // console.log("idfind="+json[0].userID);
        if(namebox === ''){
            nameRef.current.focus();
            setSnncheck(false);
            return setNamecheck(true);
        }else if(snnbox === ''){
            setNamecheck(false)
            snnRef.current.focus();
            return setSnncheck(true);
        }else if(json.length > 0){
            alert("가입하신 아이디는 "+ json[0].userID +" 입니다.");
            setNamebox('');
            setSnnbox('');
        }else{
            alert("가입하신 아이디가 존재하지 않습니다.");
            
        }
        
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
            findid();
        }
    }


    const findid = () => {
        const post = {nbox:namebox,sbox:snnbox}
        
        fetch("http://localhost:3001/Findid", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(post),
        })
          .then((res) => res.json())
          .then((json) => {
            console.log(json[0]);
            idfindalert(json);
          });
          
      };


    return(
        <div className="loginbox">
            <div className="loginbox1">
                <div className="loginlogo">
                    <img src={ltree_logo} alt='logo'width='250' height='110' />
                </div>
               
                <div className="findbox">
                    <input className="idfindbox" placeholder="가입하신 이름을 입력해주세요." value={namebox} ref={nameRef} onChange={namechange}></input><br/>
                    {namecheck && <span className="red2" style={{color : 'tomato'}}>이름을 입력해주세요.</span>}
                    <input className="idfindbox" placeholder="가입하신 주민번호를 ( - 포함 ) 입력해주세요." type="password" 
                        onKeyPress={keypress} onChange={snnchange} ref={snnRef}  value={snnbox}></input><br/>
                    {snncheck && <span className="red2" style={{color : 'tomato'}}>주민번호를 입력해주세요.</span>}
                    <button className="findbtn" onClick={findid}>아이디 찾기</button><br/>
                    <Link to="/Passwordfind"><span className="passfind">비밀번호 찾기</span></Link><br/>
                    <Link to="/"><span className="loginpage">로그인</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Idfind;