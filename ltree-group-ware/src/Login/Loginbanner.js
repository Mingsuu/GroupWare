import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ltree_logo from '../Image/ltreetitle.png';
import { withRouter } from 'react-router-dom';


const Loginbanner =({history})=> {
    const loginName = window.localStorage.getItem("loginName")
    const realName = loginName.replace(/\"/gi, "");

    //로그아웃 알림창//
        const alertbox  = ()=> {
            confirmAlert({
                title: '로그아웃',
                message: '정말로 로그아웃 하시겠습니까?',
                buttons: [
                  {
                    label: '네',
                    onClick: () => {window.localStorage.removeItem('key');
                                    window.localStorage.clear();
                                    history.push("/");
                                    }

                  },
                  {
                    label: '아니요',
                    
                  }
                ]
              });
           
        };

    return (
        <div className="top">
            <div className="Login-User">
                <div className="Userim">{realName} 님</div>
                <button className="logout" onClick={alertbox}>로그아웃</button>
                <button className="userdata">내정보</button>
            </div>
        
            <img className="sujungimg" src={ltree_logo} alt='logo' />
        </div>
    );





}



export default withRouter (Loginbanner);