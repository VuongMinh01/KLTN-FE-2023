import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import "../../css/LoginRegisterPage.css"
import { NavLink } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { loginRoute } from "../../utils/APIRoutes";
import { loginWithGmailRoute } from "../../utils/APIRoutes"

export default function LoginPage() {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate()

    const onButtonClick = async (e) => {

        e.preventDefault();
        const { password, email } = values;
        const { data } = await axios.post(loginRoute, {
            email,
            password,
        });

        if (data.status === false) {
            toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
            navigate("/admin1")
        }
    }
    const onButtonClickGmail = async (e) => {
        e.preventDefault();

    }
    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    };
    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div>Login</div>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    name="email"
                    placeholder="Enter your email here"
                    onChange={(e) => handleOnChange(e)}
                    className={'inputBox'}
                />
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    name="password"
                    placeholder="Enter your password here"
                    onChange={(e) => handleOnChange(e)}
                    className={'inputBox'}
                    type='password'
                />
            </div>
            <br />
            <div className={'inputContainer'}>
                <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
                <input className={'inputButton'} type="button" onClick={onButtonClickGmail} value={'Gmail'} />


            </div>
            <div style={{ display: 'flex' }}>
                <h4>Don't have an account?</h4>
                <h4><NavLink className='NavLinkCss' style={{ color: 'white' }} to="/register">Register</NavLink></h4>

            </div>
            <ToastContainer />

        </div>

    )
}