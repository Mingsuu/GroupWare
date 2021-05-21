import React, { useEffect, useState } from 'react';
import './Notice.css';
import ltree_logo from '../Image/ltree_logo.png';
import ltree_logo1 from '../Image/ltree.jpg';
import { Link, useHistory } from 'react-router-dom';
import Pagination from './Pagination';
import Posts from './Posts'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Loginbanner from '../Login/Loginbanner';

const Notice = ({history}) => {
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
        if(userID === "admin"){
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

    console.log("loginName="+window.localStorage.getItem("loginName"));

    // const loginName = window.localStorage.getItem("loginName")
    // const realName = loginName.replace(/\"/gi, "");

    // //로그아웃 알림창//
    // const alertbox  = ()=> {
    //     confirmAlert({
    //         title: '로그아웃',
    //         message: '정말로 로그아웃 하시겠습니까?',
    //         buttons: [
    //           {
    //             label: '네',
    //             onClick: () => {window.localStorage.removeItem('key');
    //                             window.localStorage.clear();
    //                             history.push("/");}
    //           },
    //           {
    //             label: '아니요',
                
    //           }
    //         ]
    //       });
       
    // };
    


    

    return (

        <div className="container">
            {/* { userID === "admin"  ?  (
                <> */}
            {/* TOP */}
        
            <Loginbanner/>
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
                            <Pagination postsPerPage={postPerPage} totalPosts={posts.length} paginate={paginate}/>
                            <Link to="/NoticeWrite"><button className={idcheck}>글작성</button></Link>
                            
                        </div>
                    </div>

                </div>
            </div>
            {/* </>
              ) : <div>관리자만 이용 가능합니다.</div>
              } */}
        </div>
    );
};
export default Notice;
