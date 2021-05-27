/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ltree_logo from '../Image/ltreetitle2.png';
import { withRouter,Link } from 'react-router-dom';


const Loginbanner = ({ history }) => {

  const [namebox, setNamebox] = useState('');

  useEffect(() => {
    if (window.localStorage.getItem("loginName") !== null) {
      const loginName = window.localStorage.getItem("loginName")
      const realName = loginName.replace(/\"/gi, "");
      setNamebox(realName);
    } else {
      history.push('/');
      alert("로그인후 이용이 가능합니다.")
    }
  }, [])

  //로그아웃 알림창//
  const alertbox = () => {
    confirmAlert({
      title: '로그아웃',
      message: '정말로 로그아웃 하시겠습니까?',
      buttons: [
        {
          label: '네',
          onClick: () => {
            window.localStorage.removeItem('key');
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
    <div className="top" >
      <img className="bannerimg" src={ltree_logo} alt='logo' />
      <div className="left-ul2">
        <ul className="left-ul1">
          <Link to='/home'><li >홈</li></Link>
          <Link to={`/home/notice`}><li >공지사항</li></Link>
          <Link to={`/home/boarder`}><li >업무 게시판</li></Link>
          <Link to={`/home/schedule`}><li >일정표</li></Link>
          <Link to={`/home/users`}><li >직원 조회</li></Link>
        </ul>
      </div>
      <div className="Login-User">
        <div className="Userim">{namebox} 님</div>
        <button className="logout" onClick={alertbox}>로그아웃</button>
      </div>
    </div>
  );



}



export default withRouter(Loginbanner);