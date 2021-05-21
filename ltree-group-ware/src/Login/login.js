import React, { useState,useRef,useEffect } from 'react';
import './Loginui.css';
import ltree_logo from '../Image/ltree_logo.png';
import { Route,Link,Switch, Router} from 'react-router-dom';
import Idfind from './Idfind';
import Passfind from './Passfind';
import Notice from '../Notice/Notice';


const Loginpage = ({history}) => {
    const idRef = useRef();
    const passRef = useRef();
    const [idbox, setIdbox] = useState('');
    const [passbox, setPassbox] = useState('');
    const [idcheck, setIdcheck] = useState(false);
    const [pcheck, setPcheck] = useState(false);
    const [idlist, setIdlist] = useState(['']);
    const [passlist, setPasslist] = useState(['']);

    //DB에 ID 리스트 가져오기//
    // useEffect(() => {

    //     fetch("http://localhost:3001/IdList", {
    //       method: "post",
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //       body: JSON.stringify(),
    //     })
    //       .then((res) => res.json())
    //       .then((json) => {
    //         console.log("userID="+json);
    //         console.log("userID1="+JSON.stringify(json));
    //         setIdlist(json);
    //         ilist(json);
            
    //       });
    // }, []);

    //DB에 PASS 리스트 가져오기//
    // useEffect(() => {

    //     fetch("http://localhost:3001/PassList", {
    //       method: "post",
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //       body: JSON.stringify(),
    //     })
    //       .then((res) => res.json())
    //       .then((json) => {
    //         console.log("userPWD="+json);
    //         console.log("userPWD1="+JSON.stringify(json[0].userPWD));
    //         setPasslist(json);
    //         plist(json);
            
    //       });
    // }, []);

    const ilist = (json) => {
        let lists = '';
        for(let i = 0; i<json.length; i++){
            lists = json[i]
            // lists += JSON.stringify(list[i])
            // lists = lists.replace(/{/gi, '');
            console.log("idlists="+ JSON.stringify(lists));
            // console.log("idtypeof="+lists);
            setIdlist(lists);
        }
        return lists;
    }

    const plist = (json) => {
        let lists = '';
        for(let i = 0; i<json.length; i++){
            lists += json[i]
            // lists += JSON.stringify(list[i])
            // lists = lists.replace(/{/gi, '');
            console.log("passlists="+ lists);
            // console.log("passtypeof="+lists);
            setPasslist(lists);
        }
        return lists;
    }


    // console.log("아디리스트확인="+idlist[0]);
    // console.log("비번리스트확인="+passlist[0]);

    const loginalert = (jsonbox) => {
        console.log("login="+jsonbox[0].ming);
        if(idbox === ''){
            idRef.current.focus();
            setPcheck(false);
            return setIdcheck(true);
        }else if(passbox === ''){
            setIdcheck(false);
            passRef.current.focus();
            return setPcheck(true);
        }else if(jsonbox[0].ming === 1){
            loginsave();
            history.push("/Notice");
            
        }else if(jsonbox[0].ming === 0){
            alert("가입된 정보가 없습니다.");
    }
};
    

// const loginalert = (jsonbox) => {
//     console.log("login="+jsonbox[0].ming);
//     if(idbox === ''){
//         idRef.current.focus();
//         setPcheck(false);
//         return setIdcheck(true);
//     }else if(passbox === ''){
//         setIdcheck(false);
//         passRef.current.focus();
//         return setPcheck(true);
//     }else if(idbox === ilist(idlist).userID){
//             console.log("아이디확인="+idlist.userID);
//             console.log("아이디확인1="+idbox);
//     }else if (passbox !== ''){
//         if (passbox !== plist(passlist).userPWD) {
//             alert("비밀번호가 틀렸습니다.");
//             console.log("비밀번호확인="+plist(passlist).userPWD);
//             passRef.current.focus();
//         }
//     }else if(jsonbox[0].ming === 1){
//         loginsave();
//         history.push("/Notice");
        
//     }else if(jsonbox[0].ming === 0){
//         alert("가입된 정보가 없습니다.");
// }
// };



    const idtext = (e) => {
        setIdbox(e.target.value)
        if(idbox !== ''){
            return setIdcheck(false);
        }
        
        
    }
    const passtext = (e) => {
        setPassbox(e.target.value)
        if(passbox !== ''){
            return setPcheck(false);
        }
        
    }
    const keypress = (e) => {
        if(e.key === 'Enter'){
            Login();
        }
    }

    const Login = () => {
        const post = {id:idbox,pass:passbox}
        
        fetch("http://localhost:3001/Login", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(post),
        })
          .then((res) => res.json())
          .then((json) => {
            console.log(json[0].ming);
            console.log("userjson="+json[0].userNAME);
            console.log("userID="+json[0].userID);
            loginalert(json);
            loginsave(json[0].userNAME ,json[0].userID);
            
          });
      };




      /* Login데이터 저장하기*/
      const loginsave = (loginName, loginid) => {
          const loginname = { name: loginName, id: loginid}
          console.log("이름="+loginname.name);
          console.log("아이디="+loginname.id);
          window.localStorage.setItem("loginName", JSON.stringify(loginname.name));
          window.localStorage.setItem("loginID", JSON.stringify(loginname.id));
      }

    return (
        
        <div className="loginbox">
            {/* <Switch>
                <Route path="/idfind" component={Idfind} exact/>
                <Route path="/passwordfind" component={Passfind} exact/> */}
                {/* <Route
                    // path를 따로 정의하지 않으면 모든 상황에 렌더링됨
                    render={({ location }) => (
                    <div>
                        <h2>이 페이지는 존재하지 않습니다:</h2>
                        <p>{location.pathname}</p>
                    </div>
                    )}
                /> */}
            {/* </Switch> */}
            <div className="loginbox1">
                <div className="loginlogo">
                    <img src={ltree_logo} alt='logo' width='250' height='165'/>
                </div>
                <input id="id" className="idbox" placeholder="사용자 계정" value={idbox} onChange={idtext} ref={idRef}></input>
                {idcheck && <span className="red" style={{color : 'tomato'}}>아이디를 입력해주세요.</span>}
                <input id="pass" className="passbox" type="password" placeholder="비밀번호" value={passbox} onChange={passtext} ref={passRef} onKeyPress={keypress}></input>
                {pcheck && <span className="red1" style={{color : 'tomato'}}>비밀번호를 입력해주세요.</span>}
                <button className="loginbtn" type="button" onClick={Login}>로 그 인</button>
                <div className="findbox">
                    <Link to="/Idfind"><span className="idfind">아이디 찾기</span></Link>
                    <Link to="/Passwordfind"><span className="passfind">비밀번호 찾기</span></Link><br/>
                    <Link to="/SignUp"><span className="join">회원가입</span></Link>
                    <div>{window.localStorage.getItem("loginName")}</div>
                </div>
            </div>
        </div>
    );
}

  
  

export default Loginpage;