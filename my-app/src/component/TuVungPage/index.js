import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "antd"
import '../../css/LandingPageContent.css'
import { Link } from "react-router-dom";
import contract from '../../assets/contracts.jpg'
import marketing from '../../assets/marketing.jpg'
import warranties from '../../assets/warranties.jpg'

import business from '../../assets/business_planning.jpg'
import conferences from '../../assets/conferences.jpg'
import computer from '../../assets/computers_and_the_internet.jpg'

import TLD from '../../assets/TLDImage.jpeg'
import HTHTTD from '../../assets/HTHTTDImage.jpeg'
import QKHTTD from '../../assets/QKHTTDImage.jpeg'
const { Meta } = Card;

export default function TuVungPage() {
    return (
        <Container >
            <Row className="RowH2">
                <Col>
                    <Col xs={6} sm={4} className="Card" >
                        <Link to="/tuvung/contracts">
                            <Card
                                hoverable
                                style={{ width: 250 }}
                                cover={<img alt="example" src={contract} />} // Remove onClick handler
                            >
                                <Meta title="Contracts" description="" />
                            </Card>
                        </Link>
                    </Col>
                </Col>
                <Col>
                    <Col xs={6} sm={4} className="Card" >
                        <Link to="/tuvung/marketing">
                            <Card
                                hoverable
                                style={{ width: 250 }}
                                cover={<img alt="example" src={marketing} />} // Remove onClick handler
                            >
                                <Meta title="Marketing" description="" />
                            </Card>
                        </Link>
                    </Col>
                </Col>
                <Col>
                    <Col xs={6} sm={4} className="Card" >
                        <Link to="/tuvung/warranties">
                            <Card
                                hoverable
                                style={{ width: 250 }}
                                cover={<img alt="example" src={warranties} />} // Remove onClick handler
                            >
                                <Meta title="Warranties" description="" />
                            </Card>
                        </Link>
                    </Col>
                </Col>
            </Row>
            <Row className="RowH2">
                <Col>
                    <Col xs={6} sm={4} className="Card" >
                        <Link to="/tuvung/business-planing">
                            <Card
                                hoverable
                                style={{ width: 250 }}
                                cover={<img alt="example" src={business} />} // Remove onClick handler
                            >
                                <Meta title="Business-Planing" description="" />
                            </Card>
                        </Link>
                    </Col>
                </Col>
                <Col>
                    <Col xs={6} sm={4} className="Card" >
                        <Link to="/tuvung/conferences">
                            <Card
                                hoverable
                                style={{ width: 250 }}
                                cover={<img alt="example" src={conferences} />} // Remove onClick handler
                            >
                                <Meta title="Conferences" description="" />
                            </Card>
                        </Link>
                    </Col>
                </Col>
                <Col>
                    <Col xs={6} sm={4} className="Card" >
                        <Link to="/tuvung/computer-internet">
                            <Card
                                hoverable
                                style={{ width: 250 }}
                                cover={<img alt="example" src={computer} />} // Remove onClick handler
                            >
                                <Meta title="Computer-Internet" description="" />
                            </Card>
                        </Link>
                    </Col>
                </Col>
            </Row>
            <Row className="RowH2">
                <Col>
                    <Col xs={6} sm={4} className="Card" >
                        <Link to="/tuvung/office-technology">
                            <Card
                                hoverable
                                style={{ width: 250 }}
                                cover={<img alt="example" src={TLD} />} // Remove onClick handler
                            >
                                <Meta title="Office Technology" description="" />
                            </Card>
                        </Link>
                    </Col>
                </Col>
                <Col>
                    <Col xs={6} sm={4} className="Card" >
                        <Link to="/tuvung/office-procedures">
                            <Card
                                hoverable
                                style={{ width: 250 }}
                                cover={<img alt="example" src={HTHTTD} />} // Remove onClick handler
                            >
                                <Meta title="Office Procedures" description="" />
                            </Card>
                        </Link>
                    </Col>
                </Col>
                <Col>
                    <Col xs={6} sm={4} className="Card" >
                        <Link to="/tuvvung/electronics">
                            <Card
                                hoverable
                                style={{ width: 250 }}
                                cover={<img alt="example" src={QKHTTD} />} // Remove onClick handler
                            >
                                <Meta title="Electronics" description="" />
                            </Card>
                        </Link>
                    </Col>
                </Col>


            </Row>
        </Container>
    )
}
