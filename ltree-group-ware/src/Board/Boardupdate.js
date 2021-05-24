/* eslint-disable */
import React,{useState, useRef, useEffect} from 'react';
import '../Notice/Notice.css';
import {Link} from 'react-router-dom';
import Loginbanner from '../Login/Loginbanner';


const BoardUpdate = ({history,match}) => {

const [update, setUpdate] = useState('');
const [btitle, setBtitle] = useState('');
const [bcontent,setBcontent] = useState('');
const btitlelef = useRef();
const bcontentlef = useRef();

const titlechange = (e)=> {
    setBtitle(e.target.value);
}

const contentchange = (e) => {
    setBcontent(e.target.value);
}


const updatecheck = (e) => {
    e.preventDefault();
    if(btitle === '') {
        alert("제목을 입력해 주세요.");
        btitlelef.current.focus();
    }else if(bcontent === ''){
        alert("내용을 입력해 주세요.");
        bcontentlef.current.focus();
    }else{
        insertBoard();
        
        setBtitle('');
        setBcontent('');
        history.goBack();
    }
   
}

/*수정버튼 클릭시 그해당하는 데이터값 select */
useEffect(() => {
    console.log("No1="+match.params.No1);
        const post = {num:match.params.No1};
        fetch("http://localhost:3001/BoardUpdate", {
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
                console.log("btitle="+ btitle);
                console.log("bcontent="+bcontent);
                console.log("updatejson="+json[0].btitle);
            });
}, []);

/*수정하는 값  update 하기*/
const insertBoard = () => {
    const post = {bt:btitle,bc:bcontent,no1:match.params.No1}
    console.log("updatepost=" + post.bt+ "+"+ post.bc+ "+"+ post.no1);
    fetch("http://localhost:3001/UpdateBoard", {
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
                    { update ? (
                            <>
                        <h1 className="ntitle">업무 게시판</h1>
                        <div>
                            <form className="formbox">
                                
                               <hr className="bar"/>
                               <div className="divbox">
                                   <div className="wtitle">제목</div>
                                   <input className="wtitlebox" placeholder="제목을 입력해 주세요." ref={btitlelef} value={btitle} onChange={titlechange}></input>
                               </div>
                               <hr className="bar"/>
                               <div className="divbox">
                                   <div className="wcontent">내용</div>
                                    <textarea className="wcontentbox" placeholder="내용을 입력해 주세요." ref={bcontentlef} value={bcontent} onChange={contentchange}></textarea>
                               </div>
                               <div className="divbox1"><button onClick={history.goBack()}>목록으로</button><button onClick={updatecheck}>수정완료</button></div>
                            </form>
                        </div>
                        </>
                ) : ''
            }
                    </div>
                </div>
            </div>

            {/* BOTTOM */}
            {/* <div className="bottom">
                <h1>copyright 2021 ltree</h1>
            </div> */}

        </div>
    );
};

export default BoardUpdate;

