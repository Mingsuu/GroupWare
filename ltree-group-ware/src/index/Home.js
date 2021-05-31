import React, { useEffect } from 'react';
import './Home.css';
import DefaultView from './DefaultView';
import { Route } from 'react-router-dom';
import SelectedView from './SelectedView';
import Loginbanner from '../Login/Loginbanner';
import Clock from 'react-live-clock';


const Home = ({ match }) => {
    

    useEffect(()=> {
        fetch("http://localhost:3001/weather", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json.item[4].fcstValue)
            });
    },[])
    
    
   
    return (

        <div className="container" >

            {/* TOP */}

            <Loginbanner />
            <div className="fixed"></div>
            <div className="bannerbox" style={{backgroundImage: "../Image/비옴.gif"}}>
                <div className="hi">Good Morning LTREE~</div>
                <div className="clockbox">
                    <Clock format={`MM 월 DD 일`} ticking={true} timezone={'ROK'} /><br />
                    <Clock format={`HH : mm : ss`} ticking={true} timezone={'ROK'} />
                </div>
            </div>

            {/* MID */}
            <div className="midbox">

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
