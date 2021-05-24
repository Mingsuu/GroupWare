import React from 'react'
import {Link, useHistory} from 'react-router-dom';
import NoticeContent from './NoticeContent';

const Posts = ({ posts, loading}) => {
if(loading){
    return <h2>Loading....</h2>
}



const ClickAdd = (No1) => {
    const post = {num:No1}
    fetch("http://localhost:3001/ClickAdd", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("NoticeClick="+json);
        console.log("Number="+No1);
      });
  };


console.log("databox="+posts);

    return (
        
    <div className="listbox">
        {/* { posts !== '' ? (
        <> */}
        <div className ="topmenu">
            <div className="notlist1">
                <div className="no1">번호</div>
                <div className="no2t">제목</div>
                <div className="no3">작성자</div>
                <div className="no4">작성날짜</div>
                <div className="no5">조회수</div>
            </div>
        </div>

        {posts.map((post,idx) => (
            
            <div key={post.No1} className="notlist" onClick={() => ClickAdd(post.No1)}>
                
                    <div className="no1">{idx +1}</div>
                    <Link to ={`/NoticeContent/${post.No1}/${idx +1}`} className="Linkdiv">
                        <div className="no2">{post.ntitle}</div>
                    </Link>
                    <div className="no3">대표</div>
                    <div className="no4">{post.ndate}</div>
                    <div className="no5">{post.click}</div>
                
            </div>

        ))}
        {/* </>
    ) : '공지사항 게시물이 존재하지 않습니다.'
}*/}
    </div> 
    

);
};
export default Posts;