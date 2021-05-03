/*eslint-disable*/
import React, {useState} from 'react';

function SignUp() {

    const[userInfo, setUserInfo] = useState({
        reg_id: '',
        update_id: '',
        reg_date: '',
        update_date: '',
        eamil: '',
        id: '',
        pass: '',
        uName: '',
        tell: '',
        addr: '',
        ssn: '',
        rank: '',
        comIn: '',
        exit: '',
        exit_date: '',
        pd: ''   
    });

    const inputValue = (e, className)=> {
        setUserInfo({
            ...userInfo,
            [className]: e.target.value
        });
    }

    return(
        <div>
            <p><input className = 'name' value = {inputValue} /></p>
        </div>
    );

}

export default SignUp;