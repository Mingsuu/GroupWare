import React, { useState, useRef, useEffect } from 'react';
import '../Notice/Notice.css';
import { Link } from 'react-router-dom';


const NoticeUpdate = ({ history, match }) => {

    const [update, setUpdate] = useState('');
    const [ntitle, setNtitle] = useState('');
    const [ncontent, setNcontent] = useState('');
    const btitlelef = useRef();
    const bcontentlef = useRef();

    const titlechange = (e) => {
        setNtitle(e.target.value);
    }

    const contentchange = (e) => {
        setNcontent(e.target.value);
    }


    /* 상세 페이지 정보 뿌리기*/
    useEffect(() => {
        console.log("No11=" + match.params.No1);
        const post = { num: match.params.No1 };
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
            history.push("/Notice");
        }

    }

    /*수정하는 값  update 하기*/
    const UpdateNotice = () => {
        const post = { bt: ntitle, bc: ncontent, no1: match.params.No1 }
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
                            <div className="divbox1"><Link to="/Notice"><button>목록으로</button></Link><button onClick={updatecheck}>수정완료</button></div>
                        </form>
                    </div>
                </>
            ) : ''
            }
        </div>
    );
};

export default NoticeUpdate;
