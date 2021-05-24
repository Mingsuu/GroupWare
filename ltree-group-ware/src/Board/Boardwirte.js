import React,{useState, useRef} from 'react';
import '../Notice/Notice.css';

const BoardWrite = ({history}) => {

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

const noticecheck = (e) => {
    e.preventDefault();
    if(btitle === '') {
        alert("제목을 입력해 주세요.");
        btitlelef.current.focus();
    }else if(bcontent === ''){
        alert("내용을 입력해 주세요.");
        bcontentlef.current.focus();
    }else{
        insertNotice();
        setBtitle('');
        setBcontent('');
        history.goBack();
    }
   
}


const insertNotice = () => {
    const post = {bt:btitle,bc:bcontent}
    
    fetch("http://localhost:3001/AddBoard", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        
      });

  };





    return (

        <div className="container">

           
                    <div className="noticebox">
                        <h1 className="ntitle">업무 게시판</h1>
                        <div>
                            <form className="formbox">
                                {/* <div className="divbox">
                                   <div className="wdate">작성일</div>
                                   <input className="wdatebox" type="date" onChange={bdatechange} value={bdate} ref={bdatelef}></input>
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
                               <div className="divbox1"><button onClick={() => {history.push('/home/boarder')}}>목록으로</button><button onClick={noticecheck}>등록</button></div>
                            </form>
                        </div>
                    </div>
                </div>
           
    );
};

export default BoardWrite;

