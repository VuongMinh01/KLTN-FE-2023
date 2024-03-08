import React from "react";
import PageContent from "../../component/AdminPage/PageContent";
import SideMenu from "../../component/AdminPage/SideMenu";
import { Space } from "antd"
import { Container, Row, Col } from "react-bootstrap";
import "../../css/PageQuanTri.css"
import Header from '../../component/LandingPageComponent/Header';
export default function Admin() {
    return (
        <div className="App">
            <Space className="SideMenuAndPageContent">
                <SideMenu></SideMenu>
                <PageContent></PageContent>
            </Space>
        </div>
        // <Container fluid>
        // <Header />

        //     <Row>
        //         <Col xs={4} sm={12}>
        //             <SideMenu></SideMenu>
        //         </Col>
        //         <Col xs={8} sm={12}>
        //             <PageContent></PageContent>
        //         </Col>
        //     </Row>
        // </Container>
    )
}