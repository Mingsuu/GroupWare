import {Link} from 'react-router-dom';

const Posts = ({ posts, loading}) => {
    
if(loading){
    return <h2>Loading....</h2>
}

    return (
    <table className="listbox">
        {posts.map(post => (
            <tr key={post.No1} className="notlist">
                    <Link to={`/Boardcontent/${post.No1}`}>
                        <td className="no1" value={post.No1}>{post.No1}</td>
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