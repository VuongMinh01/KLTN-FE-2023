import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { verifyEmail, getUser } from "../../../utils/APIRoutes";
import axios from "axios";

export default function Verify() {
    // let veryfi1 = '';

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
        <Container fluid>

            <h1>Xác minh tài khoản</h1>

            {verifyAccount && <h1>Đã xác minh</h1>}
            {!verifyAccount && <><Input
                name="email_verify_token"
                onChange={(e) => handleOnChange(e)}
                placeholder="Nhập mã xác minh" /><Button onClick={onSend}>Send</Button></>

            }
            {/* {!verifyAccount && <h1>Chưa xác minh</h1>} */}
        </Container>
    )
}