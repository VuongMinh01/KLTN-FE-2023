import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';
export default function Footer() {
    // Footer
    return (

        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>

            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                <div className='me-5 d-none d-lg-block'>
                    <span>Liên lạc với tôi qua các trang mạng xã hội:</span>
                </div>

                <div>
                    <a href='https://www.facebook.com/MinMinMedia01?mibextid=LQQJ4d' target='_blank' rel='noopener noreferrer' className='me-4 text-reset'>
                        <MDBIcon fab icon="facebook-f" />
                    </a>
                    <a href='https://www.youtube.com/@thien_minweddingfilm6102' target='_blank' rel='noopener noreferrer' className='me-4 text-reset'>
                        <MDBIcon fab icon="youtube" />
                    </a>
                </div>
            </section>

            <section className=''>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <MDBIcon icon="gem" className="me-3" />
                                Min Media
                            </h6>
                            <p>
                                Min Media cung cấp dịch vụ Quay-Chụp Lễ - Tiệc đám cưới, Phóng sự cưới, Event, Tiệc sinh nhật, Lễ khai trương, TeamBuilding
                            </p>
                        </MDBCol>



                        <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Đường dẫn</h6>
                            <p>
                                <Link to='/' className='text-reset'>
                                    Trang chủ
                                </Link>
                            </p>
                            <p>
                                <Link to='/service' className='text-reset'>
                                    Dịch vụ
                                </Link>
                            </p>
                            <p>
                                <Link to='/videos' className='text-reset'>
                                    Videos
                                </Link>
                            </p>
                            <p>
                                <Link to='/albums' className='text-reset'>
                                    Albums
                                </Link>
                            </p>
                            <p>
                                <Link to='/contact' className='text-reset'>
                                    Liên lạc
                                </Link>
                            </p>
                        </MDBCol>

                        <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Liên lạc</h6>
                            <p>
                                <MDBIcon icon="home" className="me-2" />
                                Hóc Môn, Tp.Hồ Chí Minh
                            </p>
                            <p>
                                <MDBIcon icon="envelope" className="me-3" />
                                thienminmedia@ldg.edu.vn

                            </p>
                            <p>
                                <MDBIcon icon="phone" className="me-3" /> 0703427959
                            </p>

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2023 Copyright:
                <a className='text-reset fw-bold' href='/'>
                    MinMedia                </a>
            </div>
        </MDBFooter>

    );
}