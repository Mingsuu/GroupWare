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
        
    <table className="listbox">
        {/* { posts !== '' ? (
        <> */}
        <thead className ="topmenu">
            <tr >
                <th className="no1">번호</th>
                <th className="no2">제목</th>
                <th className="no3">작성자</th>
                <th className="no4">작성날짜</th>
                <th className="no5">조회수</th>
            </tr>
        </thead>
        <tbody>
        {posts.map((post,idx) => (
            
            <tr key={post.No1} className="notlist" onClick={() => ClickAdd(post.No1)}>
                
                    <td className="no1">{idx +1}</td>
                    <td className="no2"><Link to ={`/home/noticeContent/?postNo=${post.No1}&no=${idx +1}`}>{post.ntitle}</Link></td>
                    <td className="no3">대표</td>
                    <td className="no4">{post.ndate}</td>
                    <td className="no5">{post.click}</td>
                
            </tr>

        ))}
        </tbody>
        
    </table> 
    

);
};
export default Posts;