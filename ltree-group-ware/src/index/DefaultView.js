import React from 'react';

const DefaultView = () => {

    return (
        <div>
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
    )
}

export default DefaultView;