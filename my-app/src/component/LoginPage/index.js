import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import "../../css/LoginRegisterPage.css"
import { NavLink } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { loginRoute } from "../../utils/APIRoutes";
import { loginWithGmailRoute } from "../../utils/APIRoutes"
import Logo from "../../assets/dai-hoc-iuh.jpg"
import { Image } from 'antd';
export default function LoginPage() {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/admin')
        }
    }, [])

    const navigate = useNavigate();

    const onButtonClick = async (e) => {
        e.preventDefault();
        try {
            if (handleValidation()) {
                const { password, email } = values;
                const { data } = await axios.post(loginRoute, {
                    email,
                    password,
                });

                if (data.message === "Login success") {
                    localStorage.setItem("user", JSON.stringify(data.result.access_token));
                    navigate("/user"); // Redirect to the user path
                }

                if (data.message === "Request failed with status code 422") {
                    toast.error(data.msg, toastOptions);
                }
            }
        } catch (error) {
            // Handle errors here
            console.error("An error occurred:", error);
            // You can also display an error message to the user
            toast.error("Tài khoản hoặc mật khẩu không chính xác", toastOptions);

        }
    }



    function showToast(message) {
        // Replace this with your toast alert implementation
        // For example, if you're using react-toastify:
        // toast.error(message);
        alert(message);
    }

    const handleValidation = () => {
        const { password, email } = values;
        if (email === "") {
            toast.error("Email đăng nhập không được để trống.", toastOptions);
            return false;
        }
        else if (!/@/.test(email)) {
            toast.error('Email cần nhập đúng định dạng.', toastOptions);
            return;
        }
        else if (password === "") {
            toast.error("Mật khẩu không được để trống.", toastOptions);
            return false;
        }
        return true;
    };
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

        <div className={'mainContainer'} >
            <div className='Login'>


                <div className={'titleContainer'}>
                    <div>Đăng nhập</div>
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        name="email"
                        placeholder="Nhập tài khoản vào đây"
                        onChange={(e) => handleOnChange(e)}
                        className={'inputBox'}
                    />
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        name="password"
                        placeholder="Nhập mật khẩu vảo đây"
                        onChange={(e) => handleOnChange(e)}
                        className={'inputBox'}
                        type='password'
                    />
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Đăng nhập'} />


                </div>
                <div style={{ display: 'grid' }}>
                    <div style={{ display: 'flex' }}>
                        <h4>Bạn chưa có tài khoản?</h4>
                        <h4><NavLink className='NavLinkCss' style={{ color: 'cornflowerblue' }} to="/register">Đăng ký</NavLink></h4>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <h4>Bạn quên mật khẩu?</h4>
                        <h4><NavLink className='NavLinkCss' style={{ color: 'cornflowerblue' }} to="/forgetPassword">Quên mật khẩu</NavLink></h4>
                    </div>

                </div>
                <ToastContainer />
            </div>
        </div>
    )
}