import React,{useEffect, useState} from 'react';
import './Home.css';
import DefaultView from './DefaultView';
import { Link, Route } from 'react-router-dom';
import SelectedView from './SelectedView';
import Loginbanner from '../Login/Loginbanner';

const Home = ({ match }) => {
    const [ScrollY,setScrollY] = useState(0);
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


    return (

        <div className="container" >

            {/* TOP */}
                
                <Loginbanner/>
                <div className="fixed"></div>
                <div className={divStatus ? "bannerbox active" : "bannerbox"}>
                    <div className="hi">Good Morning LTREE~</div>
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
