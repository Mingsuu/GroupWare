import { Link } from 'react-router-dom';

const Posts = ({ posts, loading }) => {

    const ClickAdd = (No1) => {
        const post = { num: No1 }
        fetch("http://localhost:3001/ClickAdd1", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(post),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log("NoticeClick=" + json);
                console.log("Number=" + No1);
            });
    };



    if (loading) {
        return <h2>Loading....</h2>
    }

    return (
        <table className="listbox">

            <thead className="topmenu">
                <tr >
                    <th className="no1">번호</th>
                    <th className="no2">제목</th>
                    <th className="no3">작성자</th>
                    <th className="no4">작성날짜</th>
                    <th className="no5">조회수</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post, idx) => (
                    <tr key={post.No1} className="notlist" onClick={() => ClickAdd(post.No1)}>
                            <td className="no1" >{idx + 1}</td>
                            <td className="no2" ><Link to={`/home/boardercontent/?postNo=${post.No1}&no=${idx + 1}`}>{post.btitle}</Link></td>
                            <td className="no3">직원</td>
                            <td className="no4">{post.bdate}</td>
                            <td className="no5">{post.click}</td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Posts;