import React from 'react';

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagebtnbigbox">
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