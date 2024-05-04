import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "antd"
import Image1 from '../../assets/listen1.jpg'
import '../../css/LandingPageContent.css'
import { Link } from "react-router-dom";
const { Meta } = Card;

export default function NguPhapPage() {

    return (
        <Container >
            <Row className="RowH2">
                <Col>
                    <Col xs={6} sm={4} className="Card" >
                        <Link to="/nguphap/hien-tai-don">
                            <Card
                                hoverable
                                style={{ width: 250 }}
                                cover={<img alt="example" src={Image1} />} // Remove onClick handler
                            >
                                <Meta title="Hiện tại đơn" description="" />
                            </Card>
                        </Link>
                    </Col>
                </Col>
                <Col>
                    <Col xs={6} sm={4} className="Card" >
                        <Link to="/nguphap/hien-tai-tiep-dien">
                            <Card
                                hoverable
                                style={{ width: 250 }}
                                cover={<img alt="example" src={Image1} />} // Remove onClick handler
                            >
                                <Meta title="Hiện tại tiếp diễn" description="" />
                            </Card>
                        </Link>
                    </Col>
                </Col>
                <Col>
                    <Col xs={6} sm={4} className="Card" >
                        <Link to="/nguphap/hien-tai-hoan-thanh">
                            <Card
                                hoverable
                                style={{ width: 250 }}
                                cover={<img alt="example" src={Image1} />} // Remove onClick handler
                            >
                                <Meta title="Hiện tại hoàn thành" description="" />
                            </Card>
                        </Link>
                    </Col>
                </Col>
            </Row>
            <Row className="RowH2">
                <Col>
                    <Col xs={6} sm={4} className="Card" >
                        <Link to="/nguphap/qua-khu-don">
                            <Card
                                hoverable
                                style={{ width: 250 }}
                                cover={<img alt="example" src={Image1} />} // Remove onClick handler
                            >
                                <Meta title="Quá khứ đơn" description="" />
                            </Card>
                        </Link>
                    </Col>
                </Col>
                <Col>
                    <Col xs={6} sm={4} className="Card" >
                        <Link to="/nguphap/qua-khu-tiep-dien">
                            <Card
                                hoverable
                                style={{ width: 250 }}
                                cover={<img alt="example" src={Image1} />} // Remove onClick handler
                            >
                                <Meta title="Quá khứ tiếp diễn" description="" />
                            </Card>
                        </Link>
                    </Col>
                </Col>
                <Col>
                    <Col xs={6} sm={4} className="Card" >
                        <Link to="/nguphap/qua-khu-hoan-thanh">
                            <Card
                                hoverable
                                style={{ width: 250 }}
                                cover={<img alt="example" src={Image1} />} // Remove onClick handler
                            >
                                <Meta title="Quá khứ hoàn thành" description="" />
                            </Card>
                        </Link>
                    </Col>
                </Col>
            </Row>
            <Row className="RowH2">
                <Col>
                    <Col xs={6} sm={4} className="Card" >
                        <Link to="/nguphap/tuong-lai">
                            <Card
                                hoverable
                                style={{ width: 250 }}
                                cover={<img alt="example" src={Image1} />} // Remove onClick handler
                            >
                                <Meta title="Tương lai" description="" />
                            </Card>
                        </Link>
                    </Col>
                </Col>
                <Col>
                    <Col xs={6} sm={4} className="Card" >
                        <Link to="/nguphap/hien-tai-hoan-thanh-tiep-dien">
                            <Card
                                hoverable
                                style={{ width: 250 }}
                                cover={<img alt="example" src={Image1} />} // Remove onClick handler
                            >
                                <Meta title="Hiện tại HT tiếp diễn" description="" />
                            </Card>
                        </Link>
                    </Col>
                </Col>
                <Col>
                    <Col xs={6} sm={4} className="Card" >
                        <Link to="/nguphap/qua-khu-hoan-thanh-tiep-dien">
                            <Card
                                hoverable
                                style={{ width: 250 }}
                                cover={<img alt="example" src={Image1} />} // Remove onClick handler
                            >
                                <Meta title="Quá khứ HT tiếp diễn" description="" />
                            </Card>
                        </Link>
                    </Col>
                </Col>


            </Row>
        </Container>
    )
}
