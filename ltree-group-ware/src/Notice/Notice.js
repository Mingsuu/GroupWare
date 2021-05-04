import React from 'react';
import './Notice.css';
import ltree_logo from '../Image/ltree_logo.png';
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
            <div className="mid">

                {/* MID-LEFT */}
                <div className="mid-leftbox">
                    <div className="mid-leftbox1">
                        <ul>
                            <li className="Menu">공지사항</li>
                            <li className="Menu">업무 게시판</li>
                            <li className="Menu">일정표</li>
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
                                <table className="notice-boardbox">
                                    <tr>
                                        <th className="notice-board-no">번호</th>
                                        <th className="notice-board-title">제목</th>
                                        <th className="notice-board-writer">작성자</th>
                                        <th className="notice-board-dateCreated">작성일</th>
                                        <th className="notice-board-views">조회수</th>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>앨트리 업무관련 공지사항 입니다.</td>
                                        <td>대표</td>
                                        <td>2021.05.04</td>
                                        <td>124</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>앨트리 업무관련 공지사항 입니다.</td>
                                        <td>대표</td>
                                        <td>2021.05.04</td>
                                        <td>124</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>앨트리 업무관련 공지사항 입니다.</td>
                                        <td>대표</td>
                                        <td>2021.05.04</td>
                                        <td>124</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>앨트리 업무관련 공지사항 입니다.</td>
                                        <td>대표</td>
                                        <td>2021.05.04</td>
                                        <td>124</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>앨트리 업무관련 공지사항 입니다.</td>
                                        <td>대표</td>
                                        <td>2021.05.04</td>
                                        <td>124</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>앨트리 업무관련 공지사항 입니다.</td>
                                        <td>대표</td>
                                        <td>2021.05.04</td>
                                        <td>124</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>앨트리 업무관련 공지사항 입니다.</td>
                                        <td>대표</td>
                                        <td>2021.05.04</td>
                                        <td>124</td>
                                    </tr>
                                    <div className="boardbottom">
                                        <select>
                                            <option value="">--선택--</option>
                                            <option value="">제목</option>
                                            <option value="">내용</option>
                                            <option value="">작성자</option>
                                        </select>
                                        <input type="text"></input>
                                        <button>검색</button>
                                    </div>
                                </table>
                            </form>
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

export default Home;

