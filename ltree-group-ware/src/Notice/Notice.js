import React, { useEffect, useState } from 'react';
import './Notice.css';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import Posts from './Posts'

const Notice = () => {
    /*페이징처리 연습 */
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(8);

    useEffect(() => {
        const fetchPosts = async () => {
            fetch("http://localhost:3001/Notice", {
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
                        <h1 className="ntitle">공지사항</h1>
                        <div>
                            <Posts posts={currentPosts} loading={loading} />
                            <Pagination postsPerPage={postPerPage} totalPosts={posts.length} paginate={paginate} />
                            <Link to={'/home/write'}><button className="wirtebtn">글작성</button></Link>                           
                        </div>
                    </div>

    );
};
export default Notice;
