/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const Posts = ({ posts, loading, btn, check }) => {
    const [checknum, setChecknum] = useState([]);
    const [checkList, setCheckList] = useState([])
    const [delbtn, setDelbtn] = useState('');
    useEffect(() => {
        let checklist = []
        posts.map((post, i) => {
            checklist[i] = post.No1;
        })
        setChecknum(checklist)
    }, [posts]);

    if (loading) {
        return <h2>Loading....</h2>
    }

    console.log("delbtn="+delbtn);
    const ClickAdd = (No1) => {
        const post = { num: No1 }
        fetch("http://localhost:3001/ClickAdd", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(post),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log("NoticeClick=" + json);
                console.log("Number=" + No1);
            });
    };

    const checkAll = (e) => {
        setCheckList(e.target.checked ? checknum : [])
    }
    const onChangeEach = (e, no1) => {
        // 체크할 시 CheckList에 id값 넣기
        if (e.target.checked) {
            setCheckList([...checkList, no1]);
            console.log("체크리스트=" + checkList);
            // 체크 해제할 시 CheckList에서 해당 id값이 `아닌` 값만 배열에 넣기
        } else {
            setCheckList(checkList.filter((checkedId) => checkedId !== no1));
        }
    }

    /* 클릭한 페이지 삭제 */
        const Noticedelete = () => {
            const post = { check: checkList }
            fetch("http://localhost:3001/DeleteNotice", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(post),
            })
                .then((res) => res.json())
                .then((json) => {
                    console.log("boardUpdate=" + json);
                });
            window.location.reload();
        };

    return (
        <>
            <table className="listbox">
                {/* { posts !== '' ? (
        <> */}
                <thead className="topmenu">
                    <tr >
                        <th>
                            <input type="checkbox" className="Noticechbox" onChange={checkAll} checked={checkList.length === checknum.length} />
                        </th>
                        <th className="no1">번호</th>
                        <th className="no2">제목</th>
                        <th className="no3">작성자</th>
                        <th className="no4">작성날짜</th>
                        <th className="no5">조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, idx) => (
                        <tr key={post.No1} className="notlist" onClick={() => ClickAdd(post.No1)}>
                            <td className="no">
                                <input type="checkbox" className={check} onChange={(e) => onChangeEach(e, post.No1)} checked={checkList.includes(post.No1)} />
                            </td>
                            <td className="no1">{idx + 1}</td>
                            <td className="no2"><Link to={`/home/noticeContent/?postNo=${post.No1}&no=${idx + 1}`}>{post.ntitle}</Link></td>
                            <td className="no3">대표</td>
                            <td className="no4">{post.ndate}</td>
                            <td className="no5">{post.click}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className={btn} onClick={Noticedelete}>삭제</button>
        </>
    );
};
export default Posts;