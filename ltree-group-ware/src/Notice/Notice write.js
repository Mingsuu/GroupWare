import React from 'react';
import './Notice.css';
import ltree_logo from '../Image/ltree_logo.png';
import ltree_logo1 from '../Image/ltree.jpg';
const Home = () => {
    return (

        <div className="container">

            {/* TOP */}
            <div className="top">
                <div className="index-user">관리자</div>
                <img className="topimg" src={ltree_logo} />
                <div className="index-login"></div>
            </div>

            {/* MID */}
            <div className="midbox">

                {/* MID-LEFT */}
                <div className="mid-leftbox">
                    <div className="mid-leftbox1">
                        <ul>
                            <li className="Menu">공지사항</li>
                            <li className="Menu">업무 게시판</li>
                            <li className="Menu">직원 조회</li>
                        </ul>
                    </div>
                </div>

                {/* MID-RIGHT */}
                <div className="mid-right">
                    <div className="noticebox">
                        <h1 className="ntitle">공지사항</h1>
                        <div>
                            <form>
                               <div>
                                   <div className="wtitle">제목</div>
                                   <input className="wtitlebox" placeholder="제목을 입력해 주세요."></input>
                               </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM */}
            {/* <div className="bottom">
                <h1>copyright 2021 ltree</h1>
            </div> */}

        </div>
    );
};

export default Home;

