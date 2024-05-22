import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { verifyEmail } from "../../utils/APIRoutes";
import axios from "axios";
import '../../css/Verify.css'
import VerifyImage from '../../assets/verify.jpeg'
export default function Verify() {

    const handleOnChange = (e) => {
        setVerify({ ...verify, [e.target.name]: e.target.value });

    }
    const [loading, setLoading] = useState(false)

    const [verify, setVerify] = useState('');
    const onSend = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(verifyEmail, verify);
            if (response.data.status === 'success') {
                setVerifyAccount(true); // Account verified
            } else {
                console.error('Verification failed:', response.data.error);
                // Handle verification failure (e.g., display error message)
            }
        } catch (error) {
            console.error('Error verifying email:', error);
            // Handle error (e.g., display error message)
            showToast('Mã xác minh không dúng');

        }
    };
    function showToast(message) {
        // Replace this with your toast alert implementation
        // For example, if you're using react-toastify:
        // toast.error(message);
        alert(message);
    }
    const verify1 = localStorage.getItem("verify");
    const [verifyAccount, setVerifyAccount] = useState(false);
    useEffect(() => {
        setLoading(true);
        checkVerify();
    }, [loading, verifyAccount]);
    const checkVerify = async (e) => {
        try {

            if (parseInt(verify1) === 0) {

                return setVerifyAccount(false)
            }
            return setVerifyAccount(true)

        } catch (e) {
            console.log("lỗi");
        }

    }
    return (
        <div className="verification-page">
            <div className="verification-content">

                <h1>Xác minh tài khoản</h1>

                {verifyAccount && <div>
                    <h1>Tài khoản đã xác minh</h1>
                    <p>Tài khoản của bạn đã được xác minh</p>
                    {/* Display any additional information or components for verified accounts */}
                </div>}
                {!verifyAccount && <div>
                    <><Input
                        name="email_verify_token"
                        onChange={(e) => handleOnChange(e)}
                        placeholder="Nhập mã xác minh" />
                        <Button style={{ marginTop: '10px' }} onClick={onSend}>Gửi</Button></>

                </div>}
            </div>
            <img src={VerifyImage} alt="Verification" className="verification-image" />

        </div>
    )
}