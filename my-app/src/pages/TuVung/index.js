import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TuVungPage from "../../component/TuVungPage";
import Header from "../../component/LandingPageComponent/Header";
import Footer from "../../component/LandingPageComponent/Footer";
export default function TuVung() {
    return (
        <Container fluid>
            <Header />
            <TuVungPage />
            <Footer />
        </Container>
    )
}
