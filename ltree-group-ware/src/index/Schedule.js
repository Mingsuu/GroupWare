import React, { useState } from 'react';
import './Home.css';
import ltree_logo from '../Image/ltree_logo.png';

const Schedule = () => {
    const [value, onchange] = useState(new Date());
    return (

        <div className="container">

            {/* TOP */}
            <div className="top">
                <div className="index-user">관리자</div>
                <img className="topimg" src={ltree_logo} />
                <div className="index-login"></div>
            </div>

            {/* MID */}
            <div className="mid">

                {/* MID-LEFT */}
                <div className="mid-left">
                    <ul>
                        <li className="Menu">공지사항</li>
                        <li className="Menu">업무 게시판</li>
                        <li className="Menu">일정표</li>
                        <li className="Menu">직원 조회</li>
                    </ul>
                </div>

                {/* MID-RIGHT */}
                <div className="mid-right">
                    <div className="notice">
                        <h1>일정표</h1>
                        <div>
                            
                            
                        </div>
                    </div>

                </div>
            </div>

            {/* BOTTOM */}
            <div className="bottom">
                <h1>copyright 2021 ltree</h1>
            </div>

        </div>
    );
};

export default Schedule;

