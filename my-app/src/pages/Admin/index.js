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
    const [logOut, setLogout] = useState(false)
    const [userData, setUserData] = useState(null); // State to store user data

    useEffect(() => {
        checkLogout();
        checkAdmin();

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

    const checkAdmin = async () => {
        try {
            const token = localStorage.getItem("user").replace(/"/g, '');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const response = await axios.get(getUser, config);
            const rule = response.data.result.rule;
            const userData = response.data.result;
            setUserData(userData);
            if (rule === 1) {
                // If rule is 1, user shouldn't have access to /admin
                navigate('/user');
            }
        } catch (error) {
            // Handle error
            console.error('Error:', error);
            // Display a toast alert with the error message
            showToast('Bạn không có quyền truy cập admin ');
        }
    }


    axios.get(getUser, config)
        .then((response) => {
            localStorage.setItem("verify", JSON.stringify(response.data.result.verify));
        })
        .catch((error) => {
            // Handle error
            console.error('Error:', error);
            // Display a toast alert with the error message
            showToast('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại hoặc xác minh tài khoản.');
        });

    function showToast(message) {
        // Replace this with your toast alert implementation
        // For example, if you're using react-toastify:
        // toast.error(message);
        alert(message);
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