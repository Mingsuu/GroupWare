import React,{useState, useRef, useEffect} from 'react';
import '../Notice/Notice.css';
import ltree_logo from '../Image/ltree_logo.png';
import ltree_logo1 from '../Image/ltree.jpg';
import {Link} from 'react-router-dom';


const BoardUpdate = ({history,match}) => {

const [update, setUpdate] = useState('');
const [btitle, setBtitle] = useState('');
const [bcontent,setBcontent] = useState('');
const [bdate, setBdate] = useState('');
const bdatelef = useRef();
const btitlelef = useRef();
const bcontentlef = useRef();

const titlechange = (e)=> {
    setBtitle(e.target.value);
}

const contentchange = (e) => {
    setBcontent(e.target.value);
}

const bdatechange = (e) => {
    setBdate(e.target.value);
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
        setBdate('');
        setBtitle('');
        setBcontent('');
        history.push("/Board");
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
                    { update ? (
                            <>
                        <h1 className="ntitle">업무 게시판</h1>
                        <div>
                            <form className="formbox">
                                {/* <div className="divbox">
                                   <div className="wdate">작성일</div>
                                   <input className="wdatebox" type="date" onChange={bdatechange} value={bdate} ref={bdatelef} placeholder={update[0].bdate}></input>
                               </div> */}
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
                               <div className="divbox1"><Link to="/Board"><button>목록으로</button></Link><button onClick={updatecheck}>수정완료</button></div>
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

