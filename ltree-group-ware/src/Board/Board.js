import React, { useEffect, useState } from 'react';
import '../Notice/Notice.css';
import { Link } from 'react-router-dom';
import Posts from './Posts';
import Pagination from './Pagination';
import '../Notice/Notice.css';

const Board = () => {
    /*페이징처리 연습 */
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(8);

    useEffect(() => {
        const fetchPosts = async () => {
            fetch("http://localhost:3001/Board", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(),
            })
                .then((res) => res.json())
                .then((json) => {

                    setLoading(true);
                    const res = json;
                    setPosts(res);
                    setLoading(false);
                });


        };
        fetchPosts();
    }, []);

    console.log("post=" + posts);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFristPost = indexOfLastPost - postPerPage;
    const currentPosts = posts.slice(indexOfFristPost, indexOfLastPost);

    //화면전환//
    const paginate = pageNumber => setCurrentPage(pageNumber);




    return (
        <div className="noticebox">
            <h1 className="ntitle">업무 게시판</h1>
            <div>
                <Posts posts={currentPosts} loading={loading} currentPage={currentPage} />
                <Pagination postsPerPage={postPerPage} totalPosts={posts.length} paginate={paginate} />
                <Link to="/home/boardwrite"><button className="admin1">글작성</button></Link>
            </div>
        </div>
    );
};
export default Board;
