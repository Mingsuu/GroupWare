/* eslint-disable */
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
    const [currentPage, setCurrentPage] = useState(1); //현재페이지 기본값으로 1를 넣어준다 이유는 첫페이지는 1페이지가 기본이니까
    const [postPerPage] = useState(8); //페이지당 게시할수 있는 갯수를 정하는것 8개면 한페이지에 8개목록만 보이게 한다는뜻
    const [idcheck, setIdcheck] = useState('modu');


    const loginID = window.localStorage.getItem("loginID")
    const userID = loginID.replace(/\"/gi, "");

    useEffect(() => {
        const fetchPosts = () => {
            fetch("http://localhost:3001/Notice", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(),
            })
                .then((res) => res.json())
                .then((json) => {

                    setLoading(true);  //데이터를 아직 가져오기 전이니까 true를
                    setPosts(json);
                    setLoading(false); // 데이터를 가져와서 setPost에 넣었으니까 false를 즉 로딩이 완료 
                });
        };
        fetchPosts();
    }, []);

    //첫 랜더링을 할때 아이디가 관리자면 글작성버튼 활성화
    useEffect(() => {
        if (userID === "admin") {
            setIdcheck("admin")
        }
    });


    console.log("post=" + posts);

    const indexOfLastPost = currentPage * postPerPage;  // 현재페이지 * 페이지당 보여지는 목록갯수 2개 페이지면 16개 3개면 8개 3개니까 24개
    const indexOfFristPost = indexOfLastPost - postPerPage; // ex) 8-8= 0 , 16-8 = 8, 24-8= 16 ... 8개 목록씩 계산
    const currentPosts = posts.slice(indexOfFristPost, indexOfLastPost); // 현재페이지 ex) 0부터 8까지 페이지를 짤라라 // 8자리부터 8까지

    //화면전환//
    const paginate = pageNumber => setCurrentPage(pageNumber);
   

    return (


        <div className="noticebox">
            <h1 className="ntitle">공지사항</h1>
            <div>
                <Posts posts={currentPosts} loading={loading} /> {/*위에서 8개씩 짜른 페이지를 프롭스로 보낸다.즉 8개 목록으로 자른 배열을 보낸다*/}
                <Pagination postsPerPage={postPerPage} totalPosts={posts.length} paginate={paginate} />
                <Link to="/home/noticeWrite"><button className={idcheck}>글작성</button></Link>
            </div>
        </div>


    );
}

export default Notice;
