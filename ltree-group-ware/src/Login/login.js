/* eslint-disable*/
import React, { useState,useRef,useEffect } from 'react';
import './loginui.css';
import ltree_logo from '../Image/ltreetitle.png';
import { Link } from 'react-router-dom';


const Loginpage = ({ history }) => {
    const idRef = useRef();
    const passRef = useRef();
    const [idbox, setIdbox] = useState('');
    const [passbox, setPassbox] = useState('');
    const [idcheck, setIdcheck] = useState(false);
    const [pcheck, setPcheck] = useState(false);
    const [idlist, setIdlist] = useState('');
    const [passlist, setPasslist] = useState(['']);

    //DB에 ID 리스트 가져오기//
    useEffect(() => {
        fetch("http://localhost:3001/IdList", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log("아이디리스트=" + json);
                console.log("아이디리스트1=" + JSON.stringify(json));
                setIdlist(json);
                ilist(json);
            });
    }, []);

    //DB에 PASS 리스트 가져오기//
    useEffect(() => {
        fetch("http://localhost:3001/PassList", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log("비번리스트=" + json);
                console.log("비번리스트1=" + JSON.stringify(json));
                setPasslist(json);
                plist(json);
            });
    }, []);

   

    /*로그인 벨리데이션 체크 부분 */
    const loginalert = (jsonbox) => {
        console.log("login=" + jsonbox[0].ming);
        if (idbox === '') {
            idRef.current.focus();
            setPcheck(false);
            return setIdcheck(true);
        } else if (passbox === '') {
            setIdcheck(false);
            passRef.current.focus();
            return setPcheck(true);
        } else if (idlist.find(id => id === idbox) === undefined) {
            alert("아이디가 틀렸거나 가입된 정보가 없습니다.");
            idRef.current.focus();
        } else if (passlist.find(pass => pass === passbox) === undefined) {
            alert("비밀번호가 틀렸습니다.");
            passRef.current.focus();
        } else if (jsonbox[0].ming === 1) {
            loginsave();
            history.push("/home");
        } else if (jsonbox[0].ming === 0) {
            alert("가입된 정보가 없습니다.");
        }
    };

    /* 아이디,비밀번호 입력시 맞으면 로그인! */
    const Login = () => {
        const post = { id: idbox, pass: passbox }
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
                console.log("userjson=" + json[0].userNAME);
                console.log("userID=" + json[0].userID);
                loginalert(json);
                loginsave(json[0].userNAME, json[0].userID);
            });
    };

    /* Login데이터 저장하기*/
    const loginsave = (loginName, loginid) => {
        const loginname = { name: loginName, id: loginid }
        console.log("이름=" + loginname.name);
        console.log("아이디=" + loginname.id);
        window.localStorage.setItem("loginName", JSON.stringify(loginname.name));
        window.localStorage.setItem("loginID", JSON.stringify(loginname.id));
    }

    const idtext = (e) => {
        setIdbox(e.target.value)
        if (idbox !== '') {
            return setIdcheck(false);
        }

    }
    const passtext = (e) => {
        setPassbox(e.target.value)
        if (passbox !== '') {
            return setPcheck(false);
        }

    }
    const keypress = (e) => {
        if (e.key === 'Enter') {
            Login();
        }
    }

    const ilist = (json) => {
        let lists = [];
        for (let i = 0; i < json.length; i++) {
            lists.push(json[i].userID);
            console.log("idlists=" + JSON.stringify(lists));
            setIdlist(lists);
        }
        return lists;
    }

    const plist = (json) => {
        let lists = [];
        for (let i = 0; i < json.length; i++) {
            lists.push(json[i].userPWD);
            console.log("passlists=" + lists);
            setPasslist(lists);
        }
        return lists;
    }



    return (

        <div className="loginbox">
            <div className="loginbox1">
                <div className="loginlogo">
                    <img src={ltree_logo} alt='logo' width='250' height='110' />
                </div>
                <input id="id" className="idbox" placeholder="사용자 계정" value={idbox} onChange={idtext} ref={idRef}></input>
                {idcheck && <span className="red" style={{ color: 'tomato' }}>아이디를 입력해주세요.</span>}
                <input id="pass" className="passbox" type="password" placeholder="비밀번호" value={passbox} onChange={passtext} ref={passRef} onKeyPress={keypress}></input>
                {pcheck && <span className="red1" style={{ color: 'tomato' }}>비밀번호를 입력해주세요.</span>}
                <button className="loginbtn" type="button" onClick={Login}>로 그 인</button>
                <div className="findbox">
                    <Link to="/Idfind"><span className="idfind">아이디 찾기</span></Link>
                    <Link to="/Passwordfind"><span className="passfind">비밀번호 찾기</span></Link><br />
                    <Link to="/SignUp"><span className="join">회원가입</span></Link>
                </div>
            </div>
        </div>
    );
}




export default Loginpage;