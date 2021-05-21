import React, { useEffect, useState } from 'react';
import './Notice.css';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import Posts from './Posts'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const Notice = ({ history }) => {
    /*페이징처리 연습 */
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(8);
    const [idcheck, setIdcheck] = useState('modu');


    const loginID = window.localStorage.getItem("loginID")
    const userID = loginID.replace(/\"/gi, "");

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

    useEffect(() => {
        if (userID === "admin") {
            setIdcheck("admin")
        }
    });


    console.log("post=" + posts);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFristPost = indexOfLastPost - postPerPage;
    const currentPosts = posts.slice(indexOfFristPost, indexOfLastPost);

    //화면전환//
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const writebtn = "wirtebtn"

    console.log("loginName=" + window.localStorage.getItem("loginName"));

    return (


        <div className="noticebox">
            <h1 className="ntitle">공지사항</h1>
            <div>
                <Posts posts={currentPosts} loading={loading} />
                <Pagination postsPerPage={postPerPage} totalPosts={posts.length} paginate={paginate} />
                <Link to="/NoticeWrite"><button className={idcheck}>글작성</button></Link>

            </div>
        </div>


    );
}

export default Notice;
