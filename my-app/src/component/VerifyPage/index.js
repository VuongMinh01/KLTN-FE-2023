import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { verifyEmail, resendVerify } from "../../utils/APIRoutes";
import axios from "axios";
import '../../css/Verify.css'
import VerifyImage from '../../assets/verify.jpeg'
import { ToastContainer, toast } from 'react-toastify';

export default function Verify() {
    const [verify, setVerify] = useState({});
    const [verifyAccount, setVerifyAccount] = useState(false);

    useEffect(() => {
        checkVerify();
    }, []);

    const handleOnChange = (e) => {
        setVerify({ ...verify, [e.target.name]: e.target.value });
    };

    const checkVerify = async () => {
        try {
            const verifyValue = localStorage.getItem("verify");
            if (parseInt(verifyValue) === 0) {
                setVerifyAccount(false);
            } else {
                setVerifyAccount(true);
            }
        } catch (error) {
            console.error("Error checking verification:", error);
        }
    };
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    };
    const onSend = async (e) => {
        e.preventDefault();
        if (!verify.email_verify_token) {
            toast.error("Mã xác minh không được để trống", toastOptions);
            return;
        }
        try {
            const response = await axios.post(verifyEmail, {
                email_verify_token: verify.email_verify_token
            });
            console.log('Response data:', response.data);
            if (response.data.message === 'Email verify success') {
                setVerifyAccount(true); // Account verified
                showToast("Xác minh thành công");
            } else {
                console.error('Verification failed:', response.data.error);
                // Handle verification failure (e.g., display error message)
            }
        } catch (error) {
            console.error('Error verifying email:', error);
            showToast('Mã xác minh không đúng');
        }
    };

    const showToast = (message) => {
        alert(message);
    };

    return (
        <div className="verification-page">
            <div className="verification-content">
                <h1>Xác minh tài khoản</h1>
                {verifyAccount ? (
                    <div>
                        <h1>Tài khoản đã xác minh</h1>
                        <p>Tài khoản của bạn đã được xác minh</p>
                        {/* Display any additional information or components for verified accounts */}
                    </div>
                ) : (
                    <div>
                        <Input
                            name="email_verify_token"
                            onChange={(e) => handleOnChange(e)}
                            placeholder="Nhập mã xác minh"
                        />
                        <Button style={{ marginTop: '10px' }} onClick={onSend}>Gửi</Button>
                    </div>
                )}
            </div>
            <img src={VerifyImage} alt="Verification" className="verification-image" />
            <ToastContainer />
        </div>
    );
}
