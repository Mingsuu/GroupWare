/* eslint-disable */
import React, {useState, useEffect} from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ltree_logo from '../Image/ltreetitle.png';
import { withRouter } from 'react-router-dom';


const Loginbanner =({history})=> {

  const [namebox,setNamebox] = useState('');

  useEffect( () => {
      const loginName = window.localStorage.getItem("loginName")
      const realName = loginName.replace(/\"/gi, "");
      setNamebox(realName);
      console.log("로그인배너 ="+realName);
  })

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
                <div className="Userim">{namebox} 님</div>
                <button className="logout" onClick={alertbox}>로그아웃</button>
            </div>
            <img className="sujungimg" src={ltree_logo} alt='logo' />
        </div>
    );



}



export default withRouter (Loginbanner);