import React, {useState, useRef} from 'react';
import './Home.css';
import ltree_logo from '../Image/ltree_logo.png';
import { Link } from 'react-router-dom';

const Home = () => {

    return (

        <div className="container">

            {/* TOP */}
            <div className="top">
                <div className="index-user">관리자</div>
                <img className="topimg" src={ltree_logo} alt='logo' />
                <div className="index-login"></div>
            </div>

            {/* MID */}
            <div className="mid">

                {/* MID-LEFT */}
                <div className="mid-left">
                    <ul>
                        <Link ><li>공지사항</li></Link>
                        <Link><li>업무 게시판</li></Link>
                        <Link><li>일정표</li></Link>
                        <Link to='/UserMenagement'><li>직원 조회</li></Link>
                    </ul>
                </div>

                {/* MID-RIGHT */}
                <div className="mid-right">
                    <div className="notice">
                        <h1>공지사항</h1>
                        <div>
                            <form>
                                <table className="notice-board">
                                    <tr>
                                        <th className="notice-board-no">번호</th>
                                        <th className="notice-board-title">제목</th>
                                        <th className="notice-board-writer">작성자</th>
                                        <th className="notice-board-dateCreated">작성일</th>
                                        <th className="notice-board-views">조회수</th>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                    </tr>
                                    <div>
                                        <select>
                                            <option value="">--선택--</option>
                                            <option value="">제목</option>
                                            <option value="">내용</option>
                                            <option value="">작성자</option>
                                        </select>
                                        <input type="text"></input>
                                        <button>검색</button></div>
                                </table>
                            </form>
                        </div>
                    </div>
                    <div className="board">
                        <h1>게시판</h1>
                    </div>
                    <div className="check">
                        <h1>근태관리</h1>
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

export default Home;

