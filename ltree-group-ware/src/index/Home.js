import React,{useEffect, useState} from 'react';
import './Home.css';
import DefaultView from './DefaultView';
import { Link, Route } from 'react-router-dom';
import SelectedView from './SelectedView';
import Loginbanner from '../Login/Loginbanner';
import Clock from 'react-live-clock';


const Home = ({ match }) => {
    const [ScrollY,setScrollY] = useState(10);
    const [divStatus, setDivStatus] = useState(false);
    
    const handleFollow = () => {
        setScrollY(window.pageYOffset); // window 스크롤값을 ScrollY에 저장
        if(ScrollY < 50){
            setDivStatus(true);
        }else {
            setDivStatus(false);
        }
    }
    useEffect(()=> {
        const watch = () =>{
            window.addEventListener('scroll', handleFollow);
        }
        watch();
        return () => {
            window.removeEventListener('scroll',handleFollow);
        }
    })

    useEffect(() => {
        console.log("ScrollY="+ScrollY);
    },[ScrollY])


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

        <div className="container" >

            {/* TOP */}
                
                <Loginbanner/>
                <div className="fixed"></div>
                <div className={divStatus ? "bannerbox active" : "bannerbox"}>
                    <div className="hi">Good Morning LTREE~</div>
                    <div className="clockbox">
                        <Clock format={`MM 월 DD 일`} ticking={true} timezone={'ROK'} /><br/>
                        <Clock format={`HH : mm : ss`} ticking={true} timezone={'ROK'} />
                    </div>
                </div>
                
            {/* MID */}
            <div className="midbox">

                {/* MID-LEFT */}

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
