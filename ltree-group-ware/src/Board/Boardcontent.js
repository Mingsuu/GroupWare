/* eslint-disable */
import React, { useEffect, useState } from 'react';
import '../Notice/Notice.css';
import { Link } from 'react-router-dom';
import queryString from 'query-string';


const Boardcontent = ({ history, location }) => {
    const [no1, setNo1] = useState();
    const [jbox,setJbox] = useState();
    const [boardbtn, setBoardbtn] = useState('boardbtn');
    const query = queryString.parse(location.search);
    const loginNAME = window.localStorage.getItem("loginName")
    const userNAME = loginNAME.replace(/\"/gi, "");
    
    /* 상세 페이지 정보 뿌리기*/
    useEffect(() => {
        console.log("No1=" + query.postNo);
        const post = { num: query.postNo };
        fetch("http://localhost:3001/Boardcontent", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(post),
        })
            .then((res) => res.json())
            .then((json) => {
                setNo1(json);
                setJbox(json[0].writer);
            });
    }, []);

    
     /*로그인한사람이 자기자신인지 판별 */
     useEffect(() => {
        if (jbox === userNAME) {
            setBoardbtn("itsMe")
        }
    });

    /* 클릭한 페이지 삭제 */
    const deleteBoard = () => {
        const post = { no1: query.postNo }
        fetch("http://localhost:3001/DeleteBoard", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(post),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log("boardUpdate=" + json);
            });
        history.goBack();
    };


    return (


        <div className="noticebox">
            { no1 ? (
                <>
                    <h1 className="ntitle">업무 게시판</h1>
                    <div>
                        <div className="boardbox">
                            <div className="boardtitlebox">
                                <span className="boardnum">{query.no}</span>
                                <span className="boardtitle">{no1[0].btitle}</span>
                                <span className="boardname">작성자 : {no1[0].writer}</span>
                                <span className="boarddate">작성날짜: {no1[0].bdate}</span>
                                <span className="boardupdate">수정날짜: {no1[0].update1}</span>
                                <span className="boardup">{no1[0].click}</span>
                            </div>
                            <hr className="boardbar" />
                            <div className="boardneyoung">
                                <div className="neyoung">
                                    <pre><span>{no1[0].bcontent}</span></pre>
                                </div>
                            </div>
                        </div>
                        <div className="btnbox">
                            <button onClick={() => history.goBack()}>목록으로</button>
                            <button onClick={deleteBoard} className={boardbtn} >삭제</button>
                            <Link to={`/home/boarderUpdate/?no=${no1[0].No1}`}><button className={boardbtn}>수정</button></Link>
                        </div>
                    </div>
                </>
            ) : ''
            }
        </div>
    )
};
export default Boardcontent;
