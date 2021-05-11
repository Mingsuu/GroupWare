import React, { useEffect, useState } from 'react';
import '../Notice/Notice.css';
import ltree_logo from '../Image/ltree_logo.png';
import ltree_logo1 from '../Image/ltree.jpg';
import { Link } from 'react-router-dom';

const Boardcontent = ({ history, location, match }) => {

    const [no1, setNo1] = useState();
    
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
                                    <span className="boarddate">{no1[0].bdate}</span>
                                    <span className="boardup">11</span>
                                </div>
                                <hr className="boardbar" />
                                <div className="boardneyoung">
                                    <span className="neyoung">
                                        {no1[0].bcontent}
                                    </span>
                                </div>
                            </div>
                            <div className="btnbox">
                                <Link to="/Board"><button>목록으로</button></Link>
                                <button>삭제</button>
                                <Link to="/BoardUpdate"><button>수정</button></Link>
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
