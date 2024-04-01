import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import '../../../css/NavBar.css';
import '../../../css/Color.css';
import Logo from '../../../assets/minmedia.png'
import axios from 'axios';

function NavBar() {
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true);
        checkLogin();
    }, [loading]);
    const checkLogin = async (e) => {
        try {

            const token = localStorage.getItem("user");
            if (
                token !== null) {

                setSignedIn(true)
            }
        } catch (e) {
            setSignedIn(false)
        }

    }

    const [signedIn, setSignedIn] = useState(false)
    return (
        <Navbar expand="lg" fixed='top' style={{ backgroundColor: 'burlywood' }}   >

            <Container fluid>
                <img
                    src={Logo}
                    width={'60px'}
                    height={'50px'}
                    className="d-inline-block align-center"

                />
                <Navbar.Brand
                    style={{ fontSize: '20px', color: 'white', padding: '5px' }}>

                    ToeicTesting247</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 navbar-nav ml-auto text-left"
                        style={{ fontSize: '20px' }}
                    >

                        <NavLink className='NavLinkCss' to="/"  >Trang chủ</NavLink>
                        <NavLink className='NavLinkCss' to="/test">Đề thi thử</NavLink>
                        <NavLink className='NavLinkCss' to="/test">Ngữ pháp</NavLink>
                        <NavLink className='NavLinkCss' to="/user/luyen-de">Từ vựng</NavLink>
                    </Nav>
                    {signedIn && <NavLink className='NavLinkCss' to="/login" >View profile</NavLink>}
                    {!signedIn && <NavLink className='NavLinkCss' to="/login">Đăng nhập</NavLink>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;