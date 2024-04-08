import React, { useEffect, useState } from "react";
import PageContent from "../../component/AdminPage/PageContent";
import SideMenu from "../../component/AdminPage/SideMenu";
import { Space } from "antd"
import { Container, Row, Col } from "react-bootstrap";
import "../../css/PageQuanTri.css"
import Header from '../../component/LandingPageComponent/Header';

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUser } from "../../utils/APIRoutes";
export default function Admin() {

    const navigate = useNavigate();
    // useEffect(() => {
    //     if (localStorage.getItem('user')) {
    //         navigate('/admin')
    //     }
    // }, [])
    // const navigate = useNavigate();
    useEffect(() => {
        checkLogout()
    }, []);
    const checkLogout = async (e) => {
        try {

            const token = localStorage.getItem("user");
            if (token === null)
                navigate('/login');

        } catch (e) {
            console.error();
        }

    }
    const [logOut, setLogout] = useState(false)
    let name1 = '';
    let verify1 = '';
    const token = localStorage.getItem("user").replace(/"/g, '');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    axios.get(getUser
        ,
        config
    ).then((response) => {
        const checkToken = response.data.result.name;
        console.log(checkToken);
        name1 = checkToken;
        localStorage.setItem("verify", JSON.stringify(response.data.result.verify));
        console.log(response.data);
        console.log(response.data.result.verify);

    });
    return (

        <Container fluid>
            <Header />

            <Row>
                <Col xs={3} sm={2}>
                    <SideMenu></SideMenu>
                </Col>
                <Col xs={9} sm={10}>
                    <PageContent></PageContent>
                </Col>
            </Row>
        </Container>
    )
}