import React, { useEffect, useState } from "react";
import PageContent from "../../component/UserPage/PageContent";
import SideMenu from "../../component/UserPage/SideMenu";
import { Container, Row, Col } from "react-bootstrap";
import "../../css/PageQuanTri.css"
import Header from '../../component/LandingPageComponent/Header';
import { useNavigate } from "react-router-dom";
export default function User() {

    // useEffect(() => {
    //     if (localStorage.getItem('user')) {
    //         navigate('/admin')
    //     }
    // }, [])
    // const navigate = useNavigate();
    // useEffect(() => {
    //     checkLogout()
    // }, []);
    // const checkLogout = async (e) => {
    //     try {

    //         const token = localStorage.getItem("user");
    //         if (
    //             token === null) {
    //             console.log(token);
    //             setLogout(true)
    //         }
    //     } catch (e) {
    //         setLogout(false)
    //     }
    //     if (setLogout)
    //         navigate("/login")

    // }
    // const [logOut, setLogout] = useState(false)

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