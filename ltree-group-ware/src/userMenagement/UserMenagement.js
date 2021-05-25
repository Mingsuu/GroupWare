import React, { useState, useEffect } from 'react';
import Modali, { useModali } from 'modali';
import './UserMenagement.css';

const UserMenagement = () => {

    const [users, setUsers] = useState([{
        userID: '', userNAME: '', userRANK: '', userTELL: ''
        , userADDR: '', userSSN: '', userDATE: '', userEXIT: '', exit_DATE: ''
    }]);


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

    const [findUser, setFindUser] = useState({
        userID: '', userNAME: '', userRANK: '', userTELL: ''
        , userADDR: '', userSSN: '', userDATE: '', userEXIT: '', exit_DATE: ''
    });

    const [eoc, setEoc] = useState('입사일');

    const changeUserInfo = (e) => {

        const { value, className } = e.target;
        setFindUser({
            ...findUser,
            [className]: value
        });
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
        toggleModal();
    }

    const [Modal, toggleModal] = useModali({
        animated: true,
        title: '인적사항 수정',
        message:
            <table>
                <thead>
                    <tr>
                        <td colSpan='3'>상세 정보</td>
                    </tr>
                </thead>
                <tbody className='detail-tbody'>
                    <tr>
                        <td rowSpan='2'>사진</td>
                        <td>이름 : <input value={findUser.userNAME} onChange={changeUserInfo} className='userNAME' /></td>
                        <td>전화번호 : <input value={findUser.userTELL} onChange={changeUserInfo} className='userTELL'/></td>
                    </tr>
                    <tr>
                        <td>이메일 : <input value={findUser.userEMAIL} onChange={changeUserInfo} className='userEMAIL'/></td>
                        <td>주민번호 : <input value={findUser.userSSN} onChange={changeUserInfo} className='userSSN' /></td>
                    </tr>
                    <tr>
                        <td>직급 : <input value={findUser.userRANK || ''} onChange={changeUserInfo} className='userRANK' /> </td>
                        <td>주소 : <input value={findUser.userADDR} onChange={changeUserInfo} className='userADDR'/></td>
                        <td>입사일 : <input value={findUser.userDATE} onChange={changeUserInfo} className='userDATE'/> </td>
                    </tr>
                </tbody>
            </table>,
        centered: true,
        large: true,
        buttons: [
            <Modali.Button
                label="수정"
                isStyleDestructive
                onClick={() => updateUser()}
            />,
            <Modali.Button
                label="취소"
                isStyleCancel
                onClick={() => toggleModal()}
            />,
        ],
    });

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
                        <td onClick={selectUser} className='user-detail-link'>{user.userNAME}</td><td>{user.userRANK}</td><td>{user.userTELL}</td>
                        <td>{user.userADDR}</td><td className="mgnt-exit">{user.userSSN.split('-')[0]}</td><td>{user.userDATE}</td>
                    </tr>
                );
            }
        }
    }

    const loginID = window.localStorage.getItem("loginID").replace(/\"/gi, "");

    const selectUser = (e) => {
       if(loginID === 'ddd') {
        const selected = users.find(user => e.target.childNodes[0].nodeValue === user.userNAME);
        setFindUser(selected);
        toggleModal();
       }
    }


    const setLookUp_incumbent = () => {
        setEoc('입사일');
    }
    const setLookUp_retire = () => {
        setEoc('퇴사일');
    }

    return (
        <div className='u-mgnt'>
            <div className="mgnt-title">
                <h3>직원관리</h3>
            </div>
            <div className="mgnt-btnbox">
                <button onClick={setLookUp_retire}>퇴사자 조회</button>
                <button onClick={setLookUp_incumbent}>직원조회</button>
            </div>
            <table className="mgnt-table">
                <thead>
                    <tr>
                        <td className="mgnt-name">이름</td>
                        <td className="mgnt-rank">직급</td>
                        <td className="mgnt-call">전화번호</td>
                        <td className="mgnt-addr">주소</td>
                        <td className="mgnt-yyyy">생년월일</td>
                        <td className="mgnt-date">{eoc}</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => loadUsers(user))}

                </tbody>
            </table>
            <Modali.Modal {...Modal} />

        </div>
    );
}

export default UserMenagement;