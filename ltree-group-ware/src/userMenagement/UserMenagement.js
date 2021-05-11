import React, { useState, useEffect } from 'react';
import useModal from 'use-react-modal';

const UserMenagement = () => {

    const [users, setUsers] = useState([{
        userID: '', userNAME: '', userRANK: '', userTELL: ''
        , userADDR: '', userSSN: '', userDATE: '', userEXIT: '', exit_DATE: ''
    }]);

    const [eoc, setEoc] = useState('입사일');

    const { isOpen, openModal, closeModal, Modal } = useModal();

    const loadUsers = (user) => {

        if (eoc === '입사일') {
            if (user.userEXIT == null) {
                return (
                    <tr key={user.userID}>
                        <td>{user.userNAME}</td><td>{user.userRANK}</td><td>{user.userTELL}</td>
                        <td>{user.userADDR}</td><td>{user.userSSN}</td><td>{user.userDATE}</td>
                    </tr>
                );
            }
        } else if (eoc === '퇴사일') {
            if (user.userEXIT === 'yes') {
                return (
                    <tr key={user.userID}>
                        <td>{user.userNAME}</td><td>{user.userRANK}</td><td>{user.userTELL}</td>
                        <td>{user.userADDR}</td><td>{user.userSSN}</td><td>{user.userDATE}</td>
                    </tr>
                );
            }
        }
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
    }, [])
    console.log(users);

    return (
        <div className='u-mgnt'>
            <h3>직원관리</h3>
            <button onClick={setLookUp_incumbent}>직원조회</button>
            <button onClick={setLookUp_retire}>퇴사자 조회</button>
            <table>
                <thead>
                    <tr>
                        <td onClick={openModal}>이름</td><td>직급</td><td>전화번호</td><td>주소</td><td>생년월일</td><td>{eoc}</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => loadUsers(user))}
                </tbody>
            </table>
            {isOpen && (
                <Modal>
                    <div style={{background: 'lightgreen'}}>
                    <button onClick={closeModal}>close</button>
                    {users.map(user => loadUsers(user))}
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default UserMenagement;