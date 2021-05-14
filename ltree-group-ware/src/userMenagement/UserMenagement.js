import React, { useState, useEffect, useRef } from 'react';
import useModal from 'use-react-modal';
import './UserMenagement.css';



const UserMenagement = () => {

    const [users, setUsers] = useState([{
        userID: '', userNAME: '', userRANK: '', userTELL: ''
        , userADDR: '', userSSN: '', userDATE: '', userEXIT: '', exit_DATE: ''
    }]);

    const [findUser, setFindUser] = useState();
    const [changedUserValue, setChangedUserValue] = useState();

    const [eoc, setEoc] = useState('입사일');

    const { isOpen, openModal, closeModal, Modal } = useModal();

    const loadUsers = (user) => {
        if (eoc === '입사일') {
            if (user.userEXIT == null) {
                return (
                    <tr key={user.userID}>
                        <td onClick={selectUser} className='user-detail-link'>{user.userNAME}</td><td>{user.userRANK}</td><td>{user.userTELL}</td>
                        <td>{user.userADDR}</td><td>{user.userSSN.split('-')[0]}</td><td>{user.userDATE}</td>
                    </tr>

                );
            }
        } else if (eoc === '퇴사일') {
            if (user.userEXIT === 'yes') {
                return (
                    <tr key={user.userID}>
                        <td onClick={openModal} className='user-detail-link'>{user.userNAME}</td><td>{user.userRANK}</td><td>{user.userTELL}</td>
                        <td>{user.userADDR}</td><td>{user.userSSN}</td><td>{user.userDATE}</td>
                    </tr>
                );
            }
        }
    }

    const selectUser = (e) => {
        const selected = users.find(user => e.target.childNodes[0].nodeValue === user.userNAME);
        setFindUser(selected);
        openModal(e);
    }
    const showDetail = () => {
        
        return (
            <tbody className='detail-tbody'>
                <tr>
                    <td rowSpan='2'>사진</td>
                    <td>이름 : <input value={findUser.userNAME} onChange={changeUserInfo} className='userNAME' ref={nameRef}/></td>
                    <td>전화번호 : <input value={findUser.userTELL} onChange={changeUserInfo} className='userTELL' ref={tellRef} /></td>
                </tr>
                <tr>
                    <td>이메일 : <input value={findUser.userEMAIL} onChange={changeUserInfo} className='userEMAIL'  ref={emailRef} /></td>
                    <td>주민번호 : <input value={findUser.userSSN} onChange={changeUserInfo} className='userSSN'  ref={ssnRef}/></td>
                </tr>
                <tr>
                    <td>직급 : <input value={findUser.userRANK || ''} onChange={changeUserInfo} className='userRANK'  ref={rankRef}/> </td>
                    <td>주소 : <input value={findUser.userADDR} onChange={changeUserInfo} className='userADDR'  ref={addrRef}/></td>
                    <td>입사일 : <input value={findUser.userDATE} onChange={changeUserInfo} className='userDATE'  ref={dateRef}/> </td>
                </tr>
            </tbody>
            
        )

    }

    const setLookUp_incumbent = () => {
        setEoc('입사일');
    }
    const setLookUp_retire = () => {
        setEoc('퇴사일');
    }

    const getAllUsers = () => {
        fetch("http://localhost:3001/u-mgnt", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(),
        })
            .then((res) => res.json())
            .then((json) => {
                setUsers(json);
            });
    }

    useEffect(() => {
       getAllUsers();
    }, []);

    const nameRef = useRef();
    const tellRef = useRef();
    const emailRef = useRef(); 
    const ssnRef = useRef();
    const addrRef = useRef();
    const dateRef = useRef();
    const rankRef = useRef();

    useEffect(()=>{

        switch (changedUserValue) {
            case 'userNAME':
                nameRef.current.focus();
                break;
            case 'userTELL':
                tellRef.current.focus();
                break;
            case 'userEMAIL':
                emailRef.current.focus();
                break;
            case 'userSSN':
                ssnRef.current.focus();
                break;
            case 'userADDR':
                addrRef.current.focus();
                break;
            case 'userRANK':
                rankRef.current.focus();
                break;
            case 'userDATE':
                dateRef.current.focus();
                break;
        
            default:
                break;
        }
        console.log(findUser)
    },[findUser, changedUserValue])
    
    const changeUserInfo = (e) => {
       
        const { value, className } = e.target;
        setFindUser({
            ...findUser,
            [className]: value
        });
        setChangedUserValue(''+className);
    }

    const updateUser = () => {

        fetch("http://localhost:3001/update-user", {
            method: "put",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(findUser),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
            });
        
            getAllUsers();
    }

    return (
        <div className='u-mgnt'>
            <h3>직원관리</h3>
            <button onClick={setLookUp_incumbent}>직원조회</button>
            <button onClick={setLookUp_retire}>퇴사자 조회</button>
            <table>
                <thead>
                    <tr>
                        <td>이름</td><td>직급</td><td>전화번호</td><td>주소</td><td>생년월일</td><td>{eoc}</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => loadUsers(user))}
                    
                </tbody>
            </table>
            {isOpen && (
                <Modal>
                    <div style={{ background: '#d7d9d8'}}>
                        <div style={{display: 'inline-block', width: '429px'}}>
                            <button onClick={closeModal} style={{ float: 'right' }}>X</button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <td colSpan='3'>인적사항</td>
                                </tr>
                            </thead>
                            {showDetail()}
                        </table>
                        <button onClick={updateUser}>수정하기</button>
                       
                    </div>
                   
                </Modal>
            )}
        </div>
    );
}

export default UserMenagement;