import {Link} from 'react-router-dom';

const Posts = ({ posts, loading}) => {
    
if(loading){
    return <h2>Loading....</h2>
}

    return (
    <table className="listbox">
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
                    <Link to={`/Boardcontent/${post.No1}`}>
                        <td className="no1" >{post.rownu}</td>
                        <td className="no2" >{post.btitle}</td>
                        <td className="no3">직원</td>
                        <td className="no4">{post.bdate}</td>
                        <td className="no5">243</td>
                    </Link>
            </tr>
        ))}
    </table>
);
}

export default Posts;