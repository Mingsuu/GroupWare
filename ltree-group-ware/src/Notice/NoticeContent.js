import React, { useEffect, useState } from 'react';
import '../Notice/Notice.css';
import ltree_logo from '../Image/ltree_logo.png';
import ltree_logo1 from '../Image/ltree.jpg';
import { Link } from 'react-router-dom';
import Posts from './Posts';
import Loginbanner from '../Login/Loginbanner';

const NoticeContent = ({ history, location, match }) => {

    const [no1, setNo1] = useState();

    console.log("boardcontentNo1="+match.params.No1);
 
    let idx = String(match.params.odx);
    console.log("boardcontentIDX="+idx);

    /* 상세 페이지 정보 뿌리기*/
    useEffect(() => {
        console.log("No11="+match.params.No1);
            const post = {num:match.params.No1};
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
                  console.log("content="+no1);
                });
    }, []);
    



    /* 클릭한 페이지 삭제 */
    const Noticedelete = () => {
        const post = {no1:match.params.No1}
        fetch("http://localhost:3001/DeleteNotice", {
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
          history.push("/Notice");
      };

     

    

    return (

        <div className="container">

            {/* TOP */}
            <Loginbanner/>

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
                        <h1 className="ntitle">공지사항</h1>
                        <div>
                            <div className="boardbox">
                                <div className="boardtitlebox">
                                    <span className="boardnum">{match.params.idx +1}</span>
                                    <span className="boardtitle">{no1[0].ntitle}</span>
                                    <span className="boardname">작성자 : 박민수</span>
                                    <span className="boarddate">작성날짜: {no1[0].ndate}</span>
                                    <span className="boardupdate">수정날짜: {no1[0].update1}</span>
                                    <span className="boardup">{no1[0].click}</span>
                                </div>
                                <hr className="boardbar"/>
                                <div className="boardneyoung">
                                    <div className="neyoung">
                                        <pre><span>{no1[0].ncontent}</span></pre>
                                    </div>
                                </div>
                            </div>
                            <div className="btnbox">
                                <Link to="/Notice"><button>목록으로</button></Link>
                                    <button onClick={Noticedelete}>삭제</button>
                                <Link to={`/NoticeUpdate/${no1[0].No1}`}><button>수정</button></Link>
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
export default NoticeContent;