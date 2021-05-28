import React, { useState } from 'react';
import './Home.css';
import DefaultView from './DefaultView';
import { Link, Route } from 'react-router-dom';
import SelectedView from './SelectedView';
import Loginbanner from '../Login/Loginbanner';


const Home = ({ match }) => {

    const [weather, setWeather] = useState('');
    const getWeather = () => {
        fetch("http://localhost:3001/weather", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(),
        })
            .then((res) => res.json())
            .then((json) => {
                setWeather(json);              
            });
    }
    

    
    console.log(weather);
    return (

        <div className="container">

            {/* TOP */}
                <Loginbanner/>
            {/* MID */}
            <div className="midbox">

                {/* MID-LEFT */}
                <div className="mid-left">

                    <div className="left-ul2">
                        <ul className="left-ul1">
                            
                                <Link to='/home'><li >홈</li></Link>
                                <Link to={`${match.path}/notice`}><li >공지사항</li></Link>
                                <Link to={`${match.path}/boarder`}><li >업무 게시판</li></Link>
                                <Link to={`${match.path}/schedule`}><li >일정표</li></Link>
                                <Link to={`${match.path}/users`}><li >직원 조회</li></Link>
                        </ul>
                    </div>

                </div>

                {/* MID-RIGHT */}
                <div className="mid-right">
                    <Route exact path={match.path} component={DefaultView} />
                    <Route path={`${match.path}/:id`} component={SelectedView} />
                </div>
            </div>

            {/* BOTTOM */}
           

        </div>
    );
};

export default Home;
