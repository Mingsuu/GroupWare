import React,{useEffect,useState} from 'react';
import './Notice.css';
import ltree_logo from '../Image/ltree_logo.png';
import ltree_logo1 from '../Image/ltree.jpg';
import {Link} from 'react-router-dom';
import Pagination from './Pagination';
import { paginate } from './Paginate';

const Notice = () => {
    const [mytable,setMytable] = useState([{No1:'',ntitle:'',ndate:'',ncontent:''}]);
    
  
    useEffect (()=>{
        fetch("http://localhost:3001/Notice", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(),
            })
            .then((res) => res.json())
            .then((json) => {
                console.log("test = " + json);
                setMytable(json);
              
            });
    },[])
    
    /* 페이징 처리 ex */
    const getMovies = () => {
        const movies = [
          { id: 0, title: "기생충", genre: "블랙 코미디", release: "2019-05-30" },
          { id: 1, title: "라이온 킹", genre: "애니메이션", release: "2019-07-17" },
          { id: 2, title: "날씨의 아이", genre: "애니메이션", release: "2019-10-31" },
          { id: 3, title: "알라딘", genre: "판타지", release: "2019-05-23" },
          { id: 4, title: "나랏말싸미", genre: "역사", release: "2019-07-24" },
          { id: 5, title: "주전장", genre: "역사", release: "2019-07-25" },
          { id: 6, title: "어벤져스: 엔드게임", genre: "판타지", release: "2019-04-24" },
          { id: 7, title: "봉오동 전투", genre: "역사", release: "2019-08-07" },
          { id: 8, title: "김복동", genre: "역사", release: "2019-08-08" },
          { id: 9, title: "코코", genre: "애니메이션", release: "2018-01-11" },
        ]
        return movies;
      }
    
      const [movies, setMovies] = useState({ // 영화 정보를 담는 state
        data: getMovies(), // 영화 정보
        pageSize: 3, // 한 페이지에 보여줄 아이템(영화목록) 개수
        currentPage: 1 // 현재 활성화된 페이지 위치
      });
    
      const handlePageChange = (page) => {
        setMovies({ ...movies, currentPage: page });
      };
    
      const { data, pageSize, currentPage } = movies;
      const pagedMovies = paginate(data, currentPage, pageSize); // 페이지 별로 아이템이 속한 배열을 얻어옴
    
      const { length: count } = movies.data;
      if (count === 0) 
        return <p>영화 정보가 없습니다.</p>;
      
    return (

        <div className="container">

            {/* TOP */}
            <div className="top">
                <div className="index-user">관리자</div>
                <img className="topimg" src={ltree_logo} alt='logo'/>
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
                    {/* <div className="noticebox">
                        <h1 className="ntitle">공지사항</h1>
                        <div>
                            <form>
                                <table className="notice-boardbox">
                                    <thead>
                                    <tr>
                                        <th className="notice-board-no">번호</th>
                                        <th className="notice-board-title">제목</th>
                                        <th className="notice-board-writer">작성자</th>
                                        <th className="notice-board-dateCreated">작성일</th>
                                        <th className="notice-board-views">조회수</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {mytable.map((ice)=>{
                                            return(
                                                <tr key={ice.No1}>
                                                    <td>{ice.No1}</td>
                                                    <td>{ice.ntitle}</td>
                                                    <td>대표</td>
                                                    <td>{ice.ndate}</td>
                                                    <td>124</td>
                                                </tr>
                                            )
                                        })} 
                                    </tbody>
                                    </table>
                                    <div className="boardbottom">
                                        <select className="optionbox">
                                            <option value="">--선택--</option>
                                            <option value="">제목</option>
                                            <option value="">내용</option>
                                            <option value="">작성자</option>
                                        </select>
                                        <input className="searchtext" type="text"></input>
                                        <button className="searchbox" >검색</button>
                                        <Link to="/Noticewrite"><button className="notice_writebtn">글쓰기</button></Link>
                                    </div>
                                
                            </form>
                        </div>
                    </div> */}
                   <table>
                       <tbody>
                       {pagedMovies.map((movie) => (
                            <tr key={movie.id}>
                            <td>{movie.id}</td>
                            <td>{movie.title}</td>
                            <td>{movie.genre}</td>
                            <td>{movie.release}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                   
                   
                    
          
                    <Pagination
                        pageSize={pageSize}
                        itemsCount={count}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                
            

            {/* BOTTOM */}
            {/* <div className="bottom">
                <h1>copyright 2021 ltree</h1>
            </div> */}

                </div>
            </div>
        </div>
    );
};
export default Notice;
