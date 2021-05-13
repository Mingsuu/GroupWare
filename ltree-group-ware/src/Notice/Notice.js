import React, { useEffect, useState } from 'react';
import './Notice.css';
import ltree_logo from '../Image/ltree_logo.png';
import ltree_logo1 from '../Image/ltree.jpg';
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


    console.log("loginName="+window.localStorage.getItem("loginName"));

    const loginName = window.localStorage.getItem("loginName")
    const realName = loginName.replace(/\"/gi, "");

    //로그아웃//
    const logout = ()=>  {
        window.localStorage.removeItem('key');
        window.localStorage.clear();
    };

    return (

        <div className="container">

            {/* TOP */}
            <div className="top">
                    <div className="Login-User">
                        <div className="Userim">{realName} 님</div>
                        <button className="logout" onClick={logout}>로그아웃</button>
                        <button className="userdata">내정보</button>
                    </div>
                    
                <img className="sujungimg" src={ltree_logo} alt='logo' />
            </div>

            {/* MID */}
            <div className="midbox">

                {/* MID-LEFT */}
                <div className="mid-leftbox">
                    <div className="mid-leftbox1">
                        <ul>
                            <li className="Menu">공지사항</li>
                            <li className="Menu">업무 게시판</li>
                            <li className="Menu">직원 조회</li>
                        </ul>
                    </div>
                </div>

                {/* MID-RIGHT */}
                <div className="mid-right">
                    <div className="noticebox">
                        <h1 className="ntitle">공지사항</h1>
                        <div>
                            <Posts posts={currentPosts} loading={loading} />
                            <Pagination postsPerPage={postPerPage} totalPosts={posts.length} paginate={paginate} />
                            <Link to="/NoticeWrite"><button className="wirtebtn">글작성</button></Link>
                            
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default Notice;
