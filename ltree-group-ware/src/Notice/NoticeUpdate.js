/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import '../Notice/Notice.css';
import queryString from 'query-string';


const NoticeUpdate = ({ history, location }) => {

    const [update, setUpdate] = useState('');
    const [ntitle, setNtitle] = useState('');
    const [ncontent, setNcontent] = useState('');
    const btitlelef = useRef();
    const bcontentlef = useRef();
    const query = queryString.parse(location.search);

    /* 상세 페이지 정보 뿌리기*/
    useEffect(() => {
        const post = { num: query.no };
        fetch("http://localhost:3001/NoticeContent", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(post),
        })
            .then((res) => res.json())
            .then((json) => {
                setUpdate(json);
                setNtitle(json[0].ntitle);
                setNcontent(json[0].ncontent);
            });
    }, []);

    /*수정시 벨리데이션 체크 */
    const updatecheck = (e) => {
        e.preventDefault();
        if (ntitle === '') {
            alert("제목을 입력해 주세요.");
            btitlelef.current.focus();
        } else if (ncontent === '') {
            alert("내용을 입력해 주세요.");
            bcontentlef.current.focus();
        } else {
            UpdateNotice();
            setNtitle('');
            setNcontent('');
            history.push('/home/notice');
        }

    }

    /*수정하는 값  update 하기*/
    const UpdateNotice = () => {
        const post = { bt: ntitle, bc: ncontent, no1: query.no }
        console.log("updatepost=" + post.bt + "+" + post.bc + "+" + post.no1);
        fetch("http://localhost:3001/UpdateNotice", {
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
    };

    const titlechange = (e) => {
        setNtitle(e.target.value);
    }

    const contentchange = (e) => {
        setNcontent(e.target.value);
    }


    return (


        <div className="noticebox">
            { update ? (
                <>
                    <h1 className="ntitle">업무 게시판</h1>
                    <div>
                        <form className="formbox">
                            <hr className="bar" />
                            <div className="divbox">
                                <div className="wtitle">제목</div>
                                <input className="wtitlebox" placeholder="제목을 입력해 주세요." ref={btitlelef} value={ntitle} onChange={titlechange}></input>
                            </div>
                            <hr className="bar" />
                            <div className="divbox">
                                <div className="wcontent">내용</div>
                                <textarea className="wcontentbox" placeholder="내용을 입력해 주세요." ref={bcontentlef} value={ncontent} onChange={contentchange}></textarea>
                            </div>
                            <div className="divbox1"><button onClick={()=>history.goBack()}>목록으로</button><button onClick={updatecheck}>수정완료</button></div>
                        </form>
                    </div>
                </>
            ) : ''
            }
        </div>
    );
};

export default NoticeUpdate;
