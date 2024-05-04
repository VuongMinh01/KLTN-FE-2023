import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NguPhapPage from "../../component/NguPhapPage";
import Header from "../../component/LandingPageComponent/Header";
import Footer from "../../component/LandingPageComponent/Footer";

export default function NguPhap() {
    return (
        <Container fluid>
            <Header />
            <NguPhapPage />
            <Footer />
        </Container>
    )
}
