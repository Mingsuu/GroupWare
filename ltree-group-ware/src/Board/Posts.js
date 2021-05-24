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
        <div className="listbox">

            <div className="topmenu">
                <div className="notlist1">
                    <div className="no1">번호</div>
                    <div className="no2">제목</div>
                    <div className="no3">작성자</div>
                    <div className="no4">작성날짜</div>
                    <div className="no5">조회수</div>
                </div>
            </div>
            <div>
                {posts.map((post, idx) => (
                    <div key={post.No1} className="notlist" onClick={() => ClickAdd(post.No1)}>
                            <div className="no1" >{idx + 1}</div>
                            <Link to={`/home/boardercontent/${post.No1}/${idx + 1}`}>
                                <div className="no2" >{post.btitle}</div>
                            </Link>
                            <div className="no3">직원</div>
                            <div className="no4">{post.bdate}</div>
                            <div className="no5">{post.click}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;