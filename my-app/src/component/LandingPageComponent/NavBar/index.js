import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import '../../../css/NavBar.css';
import '../../../css/Color.css';
import Logo from '../../../assets/ToeicTesting.png'

function NavBar() {
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true);
        checkLogin();
    }, [loading]);
    const checkLogin = async (e) => {
        try {

            const token = localStorage.getItem("user");
            if (token) {

                return setSignedIn(true)

            }
            return setSignedIn(false)



        } catch (e) {
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
                    alt="#"
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
                        <NavLink className='NavLinkCss' to="/tests">Đề thi thử</NavLink>
                        <NavLink className='NavLinkCss' to="/nguphap">Ngữ pháp</NavLink>
                        <NavLink className='NavLinkCss' to="/tuvung">Từ vựng</NavLink>
                    </Nav>
                    {signedIn && <NavLink className='NavLinkCss' to="/login" >Trang cá nhân</NavLink>}
                    {!signedIn && <NavLink className='NavLinkCss' to="/login">Đăng nhập</NavLink>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;