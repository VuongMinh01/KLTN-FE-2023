import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import RegisterPage from "../../component/RegisterPage"

export default function Register() {
    return (
        <Container fluid style={{

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'cornflowerblue',
        }}>
            <Row>
                <Col xs={4} sm={12}>
                    <RegisterPage />
                </Col>
            </Row>
        </Container>
    )
}