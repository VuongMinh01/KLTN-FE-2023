import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from '../LandingPageComponent/Header'
import { Card } from "antd"

export default function TestsingPage() {
    const { Meta } = Card;

    return (
        <>
            <Header />
            <Container fluid>
                <Row className="RowH2" >
                    <h2>Full Test</h2>
                    <Col xs={6} sm={4} className="Card" >
                        <Card
                            hoverable
                            style={{ width: 250 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}

                        >
                            <Meta title="Test 1" name="Score" description="
                            Score:50"
                            />
                            <Meta name="Test" description="
                            0/100" />

                        </Card>
                    </Col>
                    <Col xs={6} sm={4} className="Card" >
                        <Card
                            hoverable
                            style={{ width: 250 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta title="Test 1" description="" />

                        </Card>
                    </Col>
                    <Col xs={6} sm={4} className="Card" >
                        <Card
                            hoverable
                            style={{ width: 250 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta title="Test 1" description="" />

                        </Card>
                    </Col>

                </Row>

            </Container>
        </>

    )
}