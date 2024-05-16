import React, { useEffect, useState } from "react";
import PageContent from "../../component/UserPage/PageContent";
import SideMenu from "../../component/UserPage/SideMenu";
import { Container, Row, Col } from "react-bootstrap";
import "../../css/PageQuanTri.css"
import Header from '../../component/LandingPageComponent/Header';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUser } from "../../utils/APIRoutes";

export default function User() {
    const navigate = useNavigate();
    const [logOut, setLogout] = useState(false)
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        checkLogout();
        checkUser();

    }, []);
    const checkLogout = async () => {
        try {
            const token = await localStorage.getItem("user");
            if (token === null) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error checking logout:', error);
        }
    }
    const token = localStorage.getItem("user").replace(/"/g, '');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const checkUser = async () => {
        try {
            const token = localStorage.getItem("user").replace(/"/g, '');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const response = await axios.get(getUser, config);
            const userData = response.data.result;
            setUserData(userData);

        } catch (error) {
            // Handle error
            console.error('Error:', error);
            // Display a toast alert with the error message
        }
    }

    return (

        <Container fluid>
            <Header />

            <Row>
                <Col xs={3} sm={2}>
                    <SideMenu userData={userData} />
                </Col>
                <Col xs={9} sm={10}>
                    <PageContent></PageContent>
                </Col>
            </Row>

        </Container>
    )
}