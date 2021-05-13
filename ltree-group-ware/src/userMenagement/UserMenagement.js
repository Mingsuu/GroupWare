import React, { useState, useEffect } from 'react';
import useModal from 'use-react-modal';


const UserMenagement = () => {

    const [users, setUsers] = useState([{
        userID: '', userNAME: '', userRANK: '', userTELL: ''
        , userADDR: '', userSSN: '', userDATE: '', userEXIT: '', exit_DATE: ''
    }]);

    const [findUser, setFindUser] = useState();

    const [eoc, setEoc] = useState('입사일');

    const [updatebtn, setUpdatebtn] = useState({ btn: '수정하기', ro: true});

    const { isOpen, openModal, closeModal, Modal } = useModal();

    const loadUsers = (user) => {
        if (eoc === '입사일') {
            if (user.userEXIT == null) {
                return (
                    <tr key={user.userID}>
                        <td onClick={selectUser}>{user.userNAME}</td><td>{user.userRANK}</td><td>{user.userTELL}</td>
                        <td>{user.userADDR}</td><td>{user.userSSN}</td><td>{user.userDATE}</td>
                    </tr>

                );
            }
        } else if (eoc === '퇴사일') {
            if (user.userEXIT === 'yes') {
                return (
                    <tr key={user.userID}>
                        <td onClick={openModal}>{user.userNAME}</td><td>{user.userRANK}</td><td>{user.userTELL}</td>
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
            <tbody>
                <tr>
                    <td rowSpan='2'>사진</td>
                    <td>이름 : <input type='text' defaultValue={findUser.userNAME} onchange={changeUserInfo} readOnly={true}/></td>
                    <td>전화번호 : {findUser.userTELL}</td>
                </tr>
                <tr>
                    <td>이메일 : {findUser.userEMAIL}</td>
                    <td>주민번호 : {findUser.userSSN}</td>
                </tr>
                <tr>
                    <td>직급 : {findUser.userRANK}</td>
                    <td>주소 : {findUser.userADDR}</td>
                    <td>입사일 : {findUser.userDATE}</td>
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

    useEffect(() => {
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
    }, []);

    const changeUserInfo = (e) => {
        setFindUser({
            ...findUser,
            [e.target.className] : e.target.value
        });
    }

    const updateUser = () => {

        fetch("http://localhost:3001/update-user", {
            method: "update",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(findUser),
        })
            .then((res) => res.json())
            .then((json) => {
                setUsers(json);
            });
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