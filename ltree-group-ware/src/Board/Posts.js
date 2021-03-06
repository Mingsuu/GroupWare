import { Link } from 'react-router-dom';

const Posts = ({ posts, loading, currentPage }) => {

    const loginName = window.localStorage.getItem("loginName")
    const realName = loginName.replace(/\"/gi, "");

    const ClickAdd = (No1,writer) => {
        if(writer !== realName){
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
        }
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
                {posts.map((post, idx) => {
                    let num = (currentPage*8-8)+idx + 1;
                    return(
                    <tr key={post.No1} className="notlist" onClick={() => ClickAdd(post.No1,post.writer)}>
                        <td className="no1" >{num}</td>
                        <td className="no2" ><Link to={`/home/boardercontent/?postNo=${post.No1}&no=${num}`}>{post.btitle}</Link></td>
                        <td className="no3">{post.writer}</td>
                        <td className="no4">{post.bdate}</td>
                        <td className="no5">{post.click}</td>
                    </tr>
                )})}
            </tbody>
        </table>
    );
}

export default Posts;