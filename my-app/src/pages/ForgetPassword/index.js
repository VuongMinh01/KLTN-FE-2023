import React from "react";
import { Container } from "react-bootstrap";
import ForgetPasswordPage from "../../component/ForgetPasswordPage";
export default function ForgetPassword() {
    return (
        <Container fluid style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'cornflowerblue',
        }}>
            <div>
                <ForgetPasswordPage />
            </div>
        </Container>
    )
}