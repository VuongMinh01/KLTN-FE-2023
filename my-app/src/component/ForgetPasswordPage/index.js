import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import "../../css/LoginRegisterPage.css";
import { ToastContainer, toast } from 'react-toastify';

import { resetPassword, verifyForgotPassword, forgotPassword } from "../../utils/APIRoutes";

export default function ForgetPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call forgotPassword API endpoint
            await axios.post(forgotPassword, { email });
            // Navigate to SubmitTokenPage upon successful submission
            navigate('/submit-token');
        } catch (error) {
            console.error('Error submitting email:', error);
            toast.error('Gmail không được để trống');
            // Handle error, show error message to user
        }
    };

    return (
        <div className={'mainContainer'}>
            <div className='Register'>

                <div className={'titleContainer'}>
                    <div>Gửi Mail</div>
                </div>
                <form onSubmit={handleSubmit} className="inputContainer" >
                    <input
                        type="email"
                        placeholder="Nhập mail đã đăng ký của bạn tại đây"
                        value={email}
                        className={'inputBox'}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <button type="submit">Gửi</button>
                </form>
                <div className={'inputContainer'}>
                    <h4>Đã có tài khoản?<NavLink className='NavLinkCss' style={{ color: 'cornflowerblue' }} to="/login">Đăng nhập</NavLink></h4>
                </div>
                <ToastContainer />

            </div>
        </div>
    );
}
export function SubmitTokenPage() {
    const navigate = useNavigate();
    const [forgot_password_token, setForgot_password_token] = useState('');
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Remove double quotes from the token
            const cleanedToken = forgot_password_token.replace(/"/g, '');

            // Call verifyForgotPassword API endpoint with the cleaned token
            await axios.post(verifyForgotPassword, { forgot_password_token: cleanedToken });

            // Navigate to ResetPasswordPage upon successful submission
            navigate('/reset-password');
        } catch (error) {
            console.error('Error submitting token:', error);
            toast.error('Vui lòng nhập đúng token');

            // Handle error, show error message to user
        }
    };

    return (
        <div className={'mainContainer'}>
            <div className='Register'>

                <div className={'titleContainer'}>
                    <div>Mã xác minh</div>
                </div>
                <div className={'inputContainer'}>
                    <form onSubmit={handleSubmit}>
                        <input
                            className={'inputBox'}

                            type="text"
                            placeholder="Nhập mã xác minh tại đây"
                            value={forgot_password_token}
                            onChange={(e) => setForgot_password_token(e.target.value)}
                        />
                        <button type="submit">Gửi</button>
                    </form>
                    <div className={'inputContainer'}>
                        <h4>Đã có tài khoản?<NavLink className='NavLinkCss' style={{ color: 'cornflowerblue' }} to="/login">Đăng nhập</NavLink></h4>
                    </div>
                    <ToastContainer />

                </div>
            </div>
        </div>
    );
}

export function ResetPasswordPage() {
    const navigate = useNavigate();
    const [forgot_password_token, setForgot_password_token] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }

            // Remove double quotes from the token
            const cleanedToken = forgot_password_token.replace(/"/g, '');

            // Call resetPassword API endpoint with token and password
            const { data } = await axios.post(resetPassword, {
                forgot_password_token: cleanedToken,
                password,
                confirm_password: confirmPassword
            });

            // Assuming the resetPassword API returns a success message upon password reset
            console.log("Password reset successfully:", data.message);
            toast.error('Mật khẩu thay đổi thành công');

            // Navigate to login page upon successful password reset
            navigate('/login');
        } catch (error) {
            console.error('Error resetting password:', error);
            // Handle error, show error message to user
            toast.error('Mật khẩu thay đổi không thành công');
        }
    };


    return (
        <div className={'mainContainer'}>
            <div className='Register'>
                <div className={'titleContainer'}>
                    <div>Thay đổi mật khẩu</div>
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <form onSubmit={handleSubmit} className="inputContainer" >
                    <input
                        type="text"
                        placeholder="Enter token"
                        className={'inputBox'}

                        value={forgot_password_token}
                        onChange={(e) => setForgot_password_token(e.target.value)}
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        className={'inputBox'}

                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <input
                        type="password"
                        className={'inputBox'}

                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <br />
                    <button type="submit">Thay đổi mật khẩu</button>
                </form>
                <div className={'inputContainer'}>
                    <h4>Đã có tài khoản<NavLink className='NavLinkCss' style={{ color: 'cornflowerblue' }} to="/login">Đăng nhập</NavLink></h4>
                </div>
                <ToastContainer />

            </div>
        </div>
    );
}