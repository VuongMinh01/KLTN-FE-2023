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
    const onSend = (e) => {
        e.preventDefault();
        axios.post(verifyEmail, verify);
        console.log(verify);
    }

    const verify1 = localStorage.getItem("verify");
    const [verifyAccount, setVerifyAccount] = useState(false);
    useEffect(() => {
        setLoading(true);
        checkVerify();
    }, [loading]);
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
                    <h1>Account Verified</h1>
                    <p>Your account has been successfully verified.</p>
                    {/* Display any additional information or components for verified accounts */}
                </div>}
                {!verifyAccount && <div>
                    <><Input
                        name="email_verify_token"
                        onChange={(e) => handleOnChange(e)}
                        placeholder="Nhập mã xác minh" />
                        <Button style={{ marginTop: '10px' }} onClick={onSend}>Send</Button></>

                </div>}
            </div>
            <img src={VerifyImage} alt="Verification" className="verification-image" />

        </div>
    )
}