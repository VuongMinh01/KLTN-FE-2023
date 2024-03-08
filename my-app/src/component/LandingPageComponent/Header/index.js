import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from '../NavBar'
import { Divider } from 'antd';

export default function Header() {
    return (
        <>
            {/* Header bao gồm Logo và Menu */}
            <Container fluid>
                <Row>
                    <Col sm={12} xs={12} >
                        <div >
                            <NavBar />
                            <Divider />

                        </div>
                    </Col>

                    <Divider />

                </Row>
            </Container>
        </>
    )
}