import React, { useState,useEffect } from 'react';

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const [pagebtn,setPagebtn] = useState("modupage");

  const loginID = window.localStorage.getItem("loginID")
  const userID = loginID.replace(/\"/gi, "");

  useEffect(() => {
    if(userID === "admin"){
      setPagebtn("adminpage")
    }
});


  return (
    <div className={pagebtn}>
      <ul className="pagebtnbox">
        {pageNumbers.map(number => (
          <li key={number} className="pagebtn">
            <button onClick={()=> paginate(number)} href='!#' className='pagebtn1'>
              {number}
            </button>

          </li>
        ))}
      </ul>
    </div>
  )

} 


export default Pagination;