import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "antd";
import { getAllTestReading, getAllTestListening, getAllFullTest, getListTest } from "../../utils/APIRoutes";
import axios from "axios";
import { Link } from 'react-router-dom';
import '../../css/TestingPage.css';
import Image from '../../assets/test.avif';

export default function TestingPage() {
    const { Meta } = Card;
    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    const [dataSource1, setDataSource1] = useState([]);
    const [dataSource2, setDataSource2] = useState([]);
    const [dataSource3, setDataSource3] = useState([]);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const [readingResponse, listeningResponse, fullResponse, newTestRespone] = await Promise.all([
                    axios.get(getAllTestReading, { params: { limit: 10, page: 1 } }),
                    axios.get(getAllTestListening, { params: { limit: 10, page: 1 } }),
                    axios.get(getAllFullTest, { params: { limit: 10, page: 1 } }),
                    axios.get(getListTest, { params: { limit: 10, page: 1 } })

                ]);

                setDataSource(readingResponse.data.result.tests);
                setDataSource1(listeningResponse.data.result.tests);
                setDataSource2(fullResponse.data.result.tests);
                setDataSource3(newTestRespone.data.result.tests);
                console.log(dataSource3);
            } catch (error) {
                console.error("Error fetching test data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTests();
    }, []);

    return (
        <Container>
            <h1 style={{ textAlign: 'center', color: 'cornflowerblue' }}>Luyện thi thử ToeicTesting247</h1>
            <h1 className="h1Text">Reading Tests</h1>
            <Row gutter={16}>
                {loading ? (
                    <p>Loading...</p>
                ) : Array.isArray(dataSource) && dataSource.length > 0 ? (
                    dataSource.map(item => (
                        <Col sm={3} key={item._id}>
                            <Link to={`/study/reading-test/${item._id}`}>
                                <Card
                                    hoverable
                                    style={{ marginBottom: '16px' }}
                                    cover={<img alt={item.name} src={Image} />}
                                >
                                    <Meta title={item.title} description={item.description} />
                                </Card>
                            </Link>
                        </Col>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </Row>

            <h1 className="h1Text">Listening Tests</h1>
            <Row gutter={16}>
                {loading ? (
                    <p>Loading...</p>
                ) : Array.isArray(dataSource1) && dataSource1.length > 0 ? (
                    dataSource1.map(item => (
                        <Col sm={3} key={item._id}>
                            <Link to={`/study/listening-test/${item._id}`}>
                                <Card
                                    hoverable
                                    style={{ marginBottom: '16px' }}
                                    cover={<img alt={item.name} src={Image} />}
                                >
                                    <Meta title={item.title} description={item.description} />
                                </Card>
                            </Link>
                        </Col>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </Row>

            <h1 className="h1Text">Full Tests</h1>
            <Row gutter={16}>
                {loading ? (
                    <p>Loading...</p>
                ) : Array.isArray(dataSource2) && dataSource2.length > 0 ? (
                    dataSource2.map(item => (
                        <Col sm={3} key={item._id}>
                            <Link to={`/study/full-test/${item._id}`}>
                                <Card
                                    hoverable
                                    style={{ marginBottom: '16px' }}
                                    cover={<img alt={item.name} src={Image} />}
                                >
                                    <Meta title={item.title} description={item.description} />
                                </Card>
                            </Link>
                        </Col>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </Row>
            <h1 className="h1Text">News Tests</h1>
            <Row gutter={16}>
                {loading ? (
                    <p>Loading...</p>
                ) : Array.isArray(dataSource3) && dataSource3.length > 0 ? (
                    dataSource3.map(item => (
                        <Col sm={3} key={item._id}>
                            <Link to={`/study/testv2/${item._id}`}>
                                <Card
                                    hoverable
                                    style={{ marginBottom: '16px' }}
                                    cover={<img alt={item.name} src={Image} />}
                                >
                                    <Meta title={item.title} description={item.description} />
                                </Card>
                            </Link>
                        </Col>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </Row>
        </Container>
    );
}
