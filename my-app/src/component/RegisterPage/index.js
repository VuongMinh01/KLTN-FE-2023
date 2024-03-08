import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import "../../css/LoginRegisterPage.css";
import axios from "axios";

export default function RegisterPage() {
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onButtonClick = () => {

    }

    const [values, setValues] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div>Register</div>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    placeholder="Enter your email here"
                    className={'inputBox'}
                    name="email"
                    onChange={(e) => handleOnChange(e)}

                />
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    placeholder="Enter your password here"
                    className={'inputBox'}
                    name="password"
                    onChange={(e) => handleOnChange(e)}

                />
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    placeholder="Enter your password here"
                    className={'inputBox'}
                    name="confirmPassword"
                    onChange={(e) => handleOnChange(e)}

                />
            </div>
            <br />
            <div className={'inputContainer'}>
                <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Register'} />
                <h4>Already have an account<NavLink className='NavLinkCss' style={{ color: 'white' }} to="/login">Login</NavLink></h4>
            </div>
        </div>
    )

}