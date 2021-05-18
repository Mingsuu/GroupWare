import React, { useEffect, useState } from 'react';
import '../Notice/Notice.css';
import ltree_logo from '../Image/ltree_logo.png';
import ltree_logo1 from '../Image/ltree.jpg';
import { Link } from 'react-router-dom';

const Boardcontent = ({ history, location, match }) => {

    const [no1, setNo1] = useState();
    
    /* 상세 페이지 정보 뿌리기*/
    useEffect(() => {
        console.log("No1="+match.params.No1);
            const post = {num:match.params.No1};
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
                  console.log("content="+no1);
                });
    }, []);
    
    /* 클릭한 페이지 삭제 */
    const deleteBoard = () => {
        const post = {no1:match.params.No1}
        fetch("http://localhost:3001/DeleteBoard", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(post),
        })
          .then((res) => res.json())
          .then((json) => {
            console.log("boardUpdate="+json);
           
          });
          history.push("/Board");
      };


    console.log("boardcontentbox="+no1);

    return (

        <div className="container">

            {/* TOP */}
            <div className="top">
                <div className="index-user">관리자</div>
                <img className="topimg" src={ltree_logo} alt='logo' />
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
                        { no1 ? (
                            <>
                        <h1 className="ntitle">업무 게시판</h1>
                        <div>
                            <div className="boardbox">
                                <div className="boardtitlebox">
                                    <span className="boardnum">{no1[0].No1}</span>
                                    <span className="boardtitle">{no1[0].btitle}</span>
                                    <span className="boardname">작성자 : 박민수</span>
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
                                <Link to="/Board"><button>목록으로</button></Link>
                                    <button onClick={deleteBoard}>삭제</button>
                                <Link to={`/BoardUpdate/${no1[0].No1}`}><button>수정</button></Link>
                            </div>
                        </div>
                        </>
      ) : ''
     }
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Boardcontent;
