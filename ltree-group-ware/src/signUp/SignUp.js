/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import ltree_logo from '../Image/ltree_logo.png';
import './SignUp.css';

function SignUp() {

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

    const changeValue = (e) => {

        const { value, className } = e.target;
        setUserInfo({
            ...userInfo,
            [className]: value
        });
    }

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
            <div className="loginlogo1"><br/>
                <img src={ltree_logo} alt='logo' width='250' height='165' />
            </div>

            <div className="inputSign">
                <div className='is'><span className="joinbox">이름 : &ensp;</span><input className='uName' onChange={changeValue} value={userInfo.uName} /></div>
                <div className='is'><span className="joinbox">아이디 : &ensp;</span><input className='id' onChange={changeValue} value={userInfo.id} /><button className="jung">중복체크</button></div> 
                <div className='is'><span className="joinbox">비밀번호 : &ensp;</span><input className='pass' onChange={changeValue} value={userInfo.pass} /></div>
                <div className='is'><span className="joinbox">재확인 : &ensp;</span><input className={pnp} value={passCheck} onChange={(e) => { setPassCheck(e.target.value) }} /> <span className={passMessage}>&ensp;{passMessage}</span></div>
                <div className='is'><span className="joinbox">이메일 : &ensp;</span><input className='email' onChange={changeValue} value={userInfo.email} /></div>
                <div className='is'><span className="joinbox">전화번호 : &ensp;</span><input className='tell' onChange={changeValue} value={userInfo.tell} /></div>
                <div className='is'><span className="joinbox">주민번호 : &ensp;</span><input className='ssn' onChange={changeValue} value={userInfo.ssn} /></div>
                <div className='is'><span className="joinbox">주소 : &ensp;</span><input className='addr' onChange={changeValue} value={userInfo.addr} /></div>
                <div className='is'><span className="joinbox">입사일 : &ensp;</span><input className='comeIn' onChange={changeValue} value={userInfo.comIn} /></div>
            </div>

        </div>
    );

}

export default SignUp;