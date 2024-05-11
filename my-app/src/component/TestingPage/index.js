import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from '../LandingPageComponent/Header'
import { Card } from "antd"
import { getAllTestReading, getAllTestListening, getAllFullTest } from "../../utils/APIRoutes";
import axios from "axios";
import { Link } from 'react-router-dom'; // Import Link
import '../../css/TestingPage.css';
import Image from '../../assets/test.avif'
export default function TestsingPage() {
    const { Meta } = Card;
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true);
        getAllReadingTests();
        getAllListeningTests();
        getAllFullTests();
    }, [loading]);

    const calculateSpan = (length) => {
        // Define the number of items per row when there's only one item
        const itemsPerRowForSingleItem = 4;

        // Set the default span value for multiple items
        let span = 12; // This corresponds to 1/2 width when there are 2 items per row

        // If there's only one item, set the span to occupy the full width
        if (length === 1) {
            span = 24; // This corresponds to full width when there's only one item
        } else if (length === 2) {
            span = 12; // This corresponds to 1/2 width when there are 2 items per row
        } else if (length === 3) {
            span = 8; // This corresponds to 1/3 width when there are 3 items per row
        } // Add more conditions as needed for different scenarios

        return span;
    };

    const getAllReadingTests = () => {
        axios.get(getAllTestReading, {
            params: {
                limit: 10,
                page: 1,
            }
        }).then((response) => {
            setDataSource(response.data.result.tests);
        });
    }
    const getAllListeningTests = () => {
        axios.get(getAllTestListening, {
            params: {
                limit: 10,
                page: 1,
            }
        }).then((response) => {
            setDataSource1(response.data.result.tests);
        });
    }
    const getAllFullTests = () => {
        axios.get(getAllFullTest, {
            params: {
                limit: 10,
                page: 1,
            }
        }).then((response) => {
            setDataSource2(response.data.result.tests);
        });
    }
    const [dataSource, setDataSource] = useState([])
    const [dataSource1, setDataSource1] = useState([])

    const [dataSource2, setDataSource2] = useState([])



    return (

        <>



            <Container>
                <h1 className="h1Text">Reading Tests</h1>
                <Row gutter={16}>
                    {Array.isArray(dataSource) && dataSource.length > 0 ? (
                        dataSource.map(item => (
                            <Col span={8} key={item._id}>
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
                    {Array.isArray(dataSource1) && dataSource1.length > 0 ? (
                        dataSource1.map(item => (
                            <Col span={8} key={item._id}>
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
                    {Array.isArray(dataSource2) && dataSource2.length > 0 ? (
                        dataSource2.map(item => (
                            // <Col span={calculateSpan(dataSource2.length)} key={item._id}>
                            <Col span={24} key={item._id}>

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
            </Container>
        </>

    )
}
