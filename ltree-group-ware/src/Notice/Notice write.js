/* eslint-disable */
import React,{useState, useRef} from 'react';
import './Notice.css';


const NoticeWrite = ({history}) => {

const [wtitle, setWtitle] = useState('');
const [wcontent,setWcontent] = useState('');
const wtitlelef = useRef();
const wcontentlef = useRef();

const loginName = window.localStorage.getItem("loginName")
const realName = loginName.replace(/\"/gi, "");

const titlechange = (e)=> {
    setWtitle(e.target.value);
}

const contentchange = (e) => {
    setWcontent(e.target.value);
}

const noticecheck = (e) => {
    e.preventDefault();
     if(wtitle === '') {
        alert("제목을 입력해 주세요.");
        wtitlelef.current.focus();
    }else if(wcontent === ''){
        alert("내용을 입력해 주세요.");
        wcontentlef.current.focus();
    }else{
        insertNotice();
        setWtitle('');
        setWcontent('');
        history.goBack();
    }
}

const insertNotice = () => {
    const post = {wt:wtitle,wc:wcontent,wn:realName}
    
    fetch("http://localhost:3001/AddNotice", {
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
                        <h1 className="ntitle">공지사항</h1>
                        <div>
                            <form className="formbox">
                               <hr className="bar"/>
                               <div className="divbox">
                                   <div className="wtitle">제목</div>
                                   <input className="wtitlebox" placeholder="제목을 입력해 주세요." ref={wtitlelef} value={wtitle} onChange={titlechange}></input>
                               </div>
                               <hr className="bar"/>
                               <div className="divbox">
                                   <div className="wcontent">내용</div>
                                <textarea className="wcontentbox" placeholder="내용을 입력해 주세요." ref={wcontentlef} value={wcontent} onChange={contentchange}></textarea>
                               </div>
                               <div className="divbox1"><button onClick={()=>{history.push('/home/notice')}}>목록으로</button><button onClick={noticecheck}>등록</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            
    );
};

export default NoticeWrite;

