/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import '../Notice/Notice.css';
import queryString from 'query-string';


const BoardUpdate = ({ history, location }) => {

    const [update, setUpdate] = useState('');
    const [btitle, setBtitle] = useState('');
    const [bcontent, setBcontent] = useState('');
    const btitlelef = useRef();
    const bcontentlef = useRef();
    const query = queryString.parse(location.search);

    /*수정버튼 클릭시 그해당하는 데이터값 select */
    useEffect(() => {
        console.log("test", history, location)
        const post = { num: query.no };
        fetch("http://localhost:3001/Boardcontent", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(post),
        })
            .then((res) => res.json())
            .then((json) => {
                setUpdate(json);
                setBtitle(json[0].btitle);
                setBcontent(json[0].bcontent);
                console.log("btitle=" + btitle);
                console.log("bcontent=" + bcontent);
                console.log("updatejson=" + json[0].btitle);
            });
    }, []);

    /*수정하는 값  update 하기*/
    const insertBoard = () => {
        const post = { bt: btitle, bc: bcontent, no1: query.no }

        fetch("http://localhost:3001/UpdateBoard", {
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
        setBtitle(e.target.value);
    }

    const contentchange = (e) => {
        setBcontent(e.target.value);
    }

    const updatecheck = (e) => {
        e.preventDefault();
        if (btitle === '') {
            alert("제목을 입력해 주세요.");
            btitlelef.current.focus();
        } else if (bcontent === '') {
            alert("내용을 입력해 주세요.");
            bcontentlef.current.focus();
        } else {
            insertBoard();
            setBtitle('');
            setBcontent('');
            history.push('/home/boarder');
        }
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
                                <input className="wtitlebox" placeholder="제목을 입력해 주세요." ref={btitlelef} value={btitle} onChange={titlechange}></input>
                            </div>
                            <hr className="bar" />
                            <div className="divbox">
                                <div className="wcontent">내용</div>
                                <textarea className="wcontentbox" placeholder="내용을 입력해 주세요." ref={bcontentlef} value={bcontent} onChange={contentchange}></textarea>
                            </div>
                            <div className="divbox1"><button onClick={() => history.push('/home/boarder')}>목록으로</button><button onClick={updatecheck}>수정완료</button></div>
                        </form>
                    </div>
                </>
            ) : <div>404 NOT FOUND</div>
            }
        </div>

    );
};

export default BoardUpdate;

