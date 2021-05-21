import React from 'react';
import './Home.css';
import ltree_logo from '../Image/ltree_logo.png';
import DefaultView from './DefaultView';
import { Link, Route } from 'react-router-dom';
import SelectedView from './SelectedView';
import Loginbanner from '../Login/Loginbanner';

const Home = ({ match }) => {

    return (

        <div className="container">

            {/* TOP */}
            <Loginbanner />

            {/* MID */}
            <div className="midbox">

                {/* MID-LEFT */}
                <div className="mid-left">
                    <ul>
                        <Link to='/home'><li >홈</li></Link>
                        <Link to={`${match.path}/notice`}><li >공지사항</li></Link>
                        <Link to={`${match.path}/boarder`}><li >업무 게시판</li></Link>
                        <Link to={`${match.path}/schedule`}><li >일정표</li></Link>
                        <Link to={`${match.path}/users`}><li >직원 조회</li></Link>
                    </ul>
                </div>

                {/* MID-RIGHT */}
                <div className="mid-right">
                    <Route exact path={match.path} component={DefaultView} />
                    <Route path={`${match.path}/:id`} component={SelectedView} />
                </div>
            </div>

            {/* BOTTOM */}
            <div className="bottom">
                <h1>copyright 2021 ltree</h1>
            </div>

        </div>
    );
};

export default Home;

