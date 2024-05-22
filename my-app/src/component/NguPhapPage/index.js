import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "antd"
import '../../css/LandingPageContent.css'
import { Link } from "react-router-dom";
import HTD from '../../assets/HTDImage.jpeg'
import HTTD from '../../assets/HTTDImage.jpeg'
import HTHT from '../../assets/HTHTImage.jpeg'

import QKD from '../../assets/QKDImage.jpeg'
import QKTD from '../../assets/QKTDImage.png'
import QKHT from '../../assets/QKHTImage.jpeg'

import TLD from '../../assets/TLDImage.jpeg'
import HTHTTD from '../../assets/HTHTTDImage.jpeg'
import QKHTTD from '../../assets/QKHTTDImage.jpeg'
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
                                cover={<img alt="example" src={HTD} />} // Remove onClick handler
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
                                cover={<img alt="example" src={HTTD} />} // Remove onClick handler
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
                                cover={<img alt="example" src={HTHT} />} // Remove onClick handler
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
                                cover={<img alt="example" src={QKD} />} // Remove onClick handler
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
                                cover={<img alt="example" src={QKTD} />} // Remove onClick handler
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
                                cover={<img alt="example" src={QKHT} />} // Remove onClick handler
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
                                cover={<img alt="example" src={TLD} />} // Remove onClick handler
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
                                cover={<img alt="example" src={HTHTTD} />} // Remove onClick handler
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
                                cover={<img alt="example" src={QKHTTD} />} // Remove onClick handler
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
