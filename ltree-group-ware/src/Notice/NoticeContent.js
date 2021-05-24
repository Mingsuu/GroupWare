/* eslint-disable */
import React, { useEffect, useState } from 'react';
import '../Notice/Notice.css';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

const NoticeContent = ({ history, location }) => {

    const [no1, setNo1] = useState();

    const query = queryString.parse(location.search);

    /* 상세 페이지 정보 뿌리기*/
    useEffect(() => {
        console.log("No11=" + query.postNo);
        const post = { num: query.postNo };
        fetch("http://localhost:3001/NoticeContent", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(post),
        })
            .then((res) => res.json())
            .then((json) => {
                setNo1(json);
                console.log("content=" + no1);
            });
    }, []);




    /* 체크한 목록 삭제 */
    const Noticedelete = () => {
        const post = { no1: query.postNo }
        fetch("http://localhost:3001/DeleteNotice", {
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

    const loginID = window.localStorage.getItem("loginID")
    const userID = loginID.replace(/\"/gi, "");

    const [admincheck, setAdmincheck] = useState('modubtn');

    useEffect(() => {
        if (userID === "admin") {
            setAdmincheck("adminbtn")
        }
    });



    return (

            <div className="noticebox">
                {no1 ? (
                    <>
                        <h1 className="ntitle">공지사항</h1>
                        <div>
                            <div className="boardbox">
                                <div className="boardtitlebox">
                                    <span className="boardnum">{query.no}</span>
                                    <span className="boardtitle">제목 : {no1[0].ntitle}</span>
                                    <span className="boardname">작성자 : 박민수</span>
                                    <span className="boarddate">작성날짜: {no1[0].ndate}</span>
                                    <span className="boardupdate">수정날짜: {no1[0].update1}</span>
                                    <span className="boardup">H:{no1[0].click}</span>
                                </div>
                                <hr className="boardbar" />
                                <div className="boardneyoung">
                                    <div className="neyoung">
                                        <pre><span>{no1[0].ncontent}</span></pre>
                                    </div>
                                </div>
                            </div>
                            <div className="btnbox">
                                <button onClick={()=>history.goBack()}>목록으로</button>
                                <Link to={`/NoticeUpdate/${no1[0].No1}`}><button className={admincheck}>수정</button></Link>
                            </div>
                        </div>
                    </>
                ) : ''
                }
            </div>
        

    )
};
export default NoticeContent;