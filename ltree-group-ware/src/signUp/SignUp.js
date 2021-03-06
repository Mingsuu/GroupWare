/*eslint-disable*/
import React, { useState, useEffect, useRef } from 'react';
import ltree_logo from '../Image/ltreetitle.png';
import './SignUp.css';

function SignUp({ history }) {

    const [userInfo, setUserInfo] = useState({
        reg_id: '',
        update_id: '',
        reg_date: '',
        update_date: '',
        email: '',
        id: '',
        pass: '',
        uName: '',
        tell: '',
        addr: '',
        ssn: '',
        rank: '',
        comeIn: '',
        exit: '',
        exit_date: '',
        pd: ''
    });

    const [passCheck, setPassCheck] = useState('');
    const [passMessage, setPassMessage] = useState('');
    const [pnp, setPnp] = useState('');
    const [idCheck, setIdCheck] = useState('');

    const name = useRef();
    const id = useRef();
    const pass = useRef();
    const pc = useRef();
    const email = useRef();
    const addr = useRef();
    const tell = useRef();
    const comeIn = useRef();
    const ssn = useRef();

    const changeValue = (e) => {

        const { value, className } = e.target;
        setUserInfo({
            ...userInfo,
            [className]: value
        });
    }

    const audit = () => {
        let condition = 0;

        userInfo.uName == '' ? (condition++, name.current.focus()) : condition--;
        userInfo.id == '' ? (condition++, id.current.focus()) : condition--;
        userInfo.pass == '' ? (condition++, pass.current.focus()) : condition--;
        passCheck == '' ? (condition++, pc.current.focus()) : condition--;
        userInfo.email == '' ? (condition++, email.current.focus()) : condition--;
        userInfo.tell == '' ? (condition++, tell.current.focus()) : condition--;
        userInfo.ssn == '' ? (condition++, ssn.current.focus()) : condition--;
        userInfo.addr == '' ? (condition++, addr.current.focus()) : condition--;
        userInfo.comeIn == '' ? (condition++, comeIn.current.focus()) : condition--;


        if (condition == -9 && idCheck) {
            if (confirm('회원가입을 하시겠습니까?')) {
                fetch("http://localhost:3001/signUp", {
                    method: "post",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(userInfo),
                })
                    .then((res) => res.json())
                    .then((json) => {
                        console.log(json)
                    });
                alert('회원가입에 성공하였습니다.');
                history.goBack();
            } else {
                history.push('/')
            }
        } else {
            alert('빈칸을 다 채워주십시오.');
        }
    }

    const showPass = () => {
        pass.current.type == 'password' ? pass.current.type = 'text' : pass.current.type = 'password';
    }
    const showPassCheck = () => {
        pc.current.type == 'password' ? pc.current.type = 'text' : pc.current.type = 'password';
    }

    const idDuplicateCheck = () => {
        if (!userInfo.id == '') {
            fetch("http://localhost:3001/idCheck", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(userInfo),
            })
                .then((res) => res.json())
                .then((json) => {
                    if(json.length > 0) {
                        setIdCheck('rename');
                        id.current.focus();
                    }else {
                        setIdCheck('ok');
                    } 
                });
        }
    }

    useEffect(() => {
        if(idCheck == 'ok') {
            alert('사용가능한 아이디입니다.');
        }else if(idCheck == 'rename') {
            alert('이미 존재하는 아이디입니다.');
        }
    },[idCheck]);

    useEffect(() => {
        if (passCheck == '') {
            setPassMessage('');
            setPnp('');
        } else {
            setPnp('changed');
            if (passCheck != userInfo.pass) {
                setPassMessage('X');
            } else {
                setPassMessage('✓');
            }
        }
    }, [passCheck]);

    return (
        <div className="signup">
            <div className="loginlogo1"><br />
                <img src={ltree_logo} alt='logo' width='250' height='110' />
            </div>

            <div className="inputSign">
                <div className='is'><span className="joinbox">이름 : &ensp;</span>
                    <input className='uName' onChange={changeValue} value={userInfo.uName} ref={name} /></div>
                <div className='is'><span className="joinbox">아이디 : &ensp;</span>
                    <input className='id' onChange={changeValue} value={userInfo.id} ref={id} onBlur={idDuplicateCheck} /></div>
                <div className='is'><span className="joinbox">비밀번호 : &ensp;</span>
                    <input className='pass' onChange={changeValue} value={userInfo.pass} ref={pass} type="password" />
                    <div className='pass-show' onClick={showPass}>👁‍🗨</div></div>
                <div className='is'><span className="joinbox">재확인 : &ensp;</span>
                    <input className={pnp} value={passCheck} onChange={(e) => { setPassCheck(e.target.value) }} type="password" ref={pc} />
                    <div className='pass-show' onClick={showPassCheck}>👁‍🗨</div>
                    <span className={passMessage}>&ensp;{passMessage}</span></div>
                <div className='is'><span className="joinbox">이메일 : &ensp;</span>
                    <input className='email' onChange={changeValue} value={userInfo.email} ref={email} type='email' /></div>
                <div className='is'><span className="joinbox">전화번호 : &ensp;</span>
                    <input className='tell' onChange={changeValue} value={userInfo.tell} ref={tell} /></div>
                <div className='is'><span className="joinbox">주민번호 : &ensp;</span>
                    <input className='ssn' onChange={changeValue} value={userInfo.ssn} ref={ssn} /></div>
                <div className='is'><span className="joinbox">주소 : &ensp;</span>
                    <input className='addr' onChange={changeValue} value={userInfo.addr} ref={addr} /></div>
                <div className='is'><span className="joinbox">입사일 : &ensp;</span>
                    <input className='comeIn' onChange={changeValue} value={userInfo.comIn} ref={comeIn} type="date" /></div>
            </div>

            <div>
                <button className='sign-up-button' onClick={audit}>회원가입</button>
            </div>

        </div>
    );

}

export default SignUp;