import React from "react";
import { Container } from "react-bootstrap";
import TestingPage from '../../component/TestingPage'
import Header from "../../component/LandingPageComponent/Header";
import Footer from "../../component/LandingPageComponent/Footer";
export default function Tests() {
    return (
        <Container fluid>
            <Header />
            <TestingPage />
            <Footer />
        </Container>
    )
}