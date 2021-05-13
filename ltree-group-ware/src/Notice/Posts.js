import React from 'react'
import {Link} from 'react-router-dom';

const Posts = ({ posts, loading}) => {
if(loading){
    return <h2>Loading....</h2>
}
console.log("databox="+posts);
    return (
        
    <table className="listbox">
        {/* { posts !== '' ? (
        <> */}
        <table className ="topmenu">
            <tr >
                <th className="no1">번호</th>
                <th className="no2">제목</th>
                <th className="no3">작성자</th>
                <th className="no4">작성날짜</th>
                <th className="no5">조회수</th>
            </tr>
        </table>

        {posts.map(post => (
            
            <tr key={post.No1} className="notlist">
                <Link to ={`/NoticeContent/${post.No1}`}>
                    <td className="no1">{post.rownu}</td>
                    <td className="no2">{post.ntitle}</td>
                    <td className="no3">대표</td>
                    <td className="no4">{post.ndate}</td>
                    <td className="no5">1234</td>
                </Link>
            </tr>
        ))}
        {/* </>
    ) : '공지사항 게시물이 존재하지 않습니다.'
}*/}
    </table> 
    

);
};
export default Posts;