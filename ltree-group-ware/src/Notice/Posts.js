import React from 'react'

const Posts = ({ posts, loading}) => {
if(loading){
    return <h2>Loading....</h2>
}

    return (
    <table className="listbox">
        {posts.map(post => (
            <tr key={post.No1} className="notlist">
                    <td className="no1">{post.No1}</td>
                    <td className="no2">{post.ntitle}</td>
                    <td className="no3">대표</td>
                    <td className="no4">{post.ndate}</td>
                    <td className="no5">1234</td>
            </tr>
        ))}
    </table>
);
}

export default Posts;