import React from "react";
import LoginPage from "../../component/LoginPage"
import { Container, Row, Col } from "react-bootstrap";
export default function Login() {
    return (
        <Container fluid style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'cornflowerblue',
        }}>
            <div >
                <LoginPage />
            </div>
        </Container>
    )
}