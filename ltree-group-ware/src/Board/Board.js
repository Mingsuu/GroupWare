import React, { useEffect, useState } from 'react';
import '../Notice/Notice.css';
import ltree_logo from '../Image/ltree_logo.png';
import ltree_logo1 from '../Image/ltree.jpg';
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

    //게시판 클릭시 해당 글 보여주기//
    // const insertNotice = () => {
    //     const post = {bt:btitle,bc:bcontent,bd:bdate}
        
    //     fetch("http://localhost:3001/AddBoard", {
    //       method: "post",
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //       body: JSON.stringify(post),
    //     })
    //       .then((res) => res.json())
    //       .then((json) => {
    //         console.log(json);
            
    //       });
    
    //   };
   


    return (

        <div className="container">

            {/* TOP */}
            <div className="top">
                <div className="index-user">관리자</div>
                <img className="topimg" src={ltree_logo} alt='logo' />
                <div className="index-login"></div>
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
                        <h1 className="ntitle">업무 게시판</h1>
                        <div>
                            <Posts posts={currentPosts} loading={loading} />
                            <Pagination postsPerPage={postPerPage} totalPosts={posts.length} paginate={paginate} />
                            <Link to="/BoardWrite"><button className="wirtebtn">글작성</button></Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default Board;
