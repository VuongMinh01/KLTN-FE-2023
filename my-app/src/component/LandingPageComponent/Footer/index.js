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
                    <a href='https://www.facebook.com/2minhvuong/' target='_blank' rel='noopener noreferrer' className='me-4 text-reset'>
                        <MDBIcon fab icon="facebook-f" />
                    </a>
                    <a href='https://www.facebook.com/profile.php?id=100008212694689' target='_blank' rel='noopener noreferrer' className='me-4 text-reset'>
                        <MDBIcon fab icon="facebook-f" />
                    </a>
                </div>
            </section>

            <section className=''>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <MDBIcon icon="gem" className="me-3" />
                                Toeic Testing 247
                            </h6>
                            <p>
                                Toeic Testing 247 là một website nhằm phục vụ mục đích học tập trong chương trình Khoá luận tốt nghiệp. Ngoài ra không phục vụ bất kì lợi ích thương mại nào khác.

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
                                <Link to='/tests' className='text-reset'>
                                    Đề kiểm tra
                                </Link>
                            </p>
                            <p>
                                <Link to='/' className='text-reset'>
                                    Ngữ pháp
                                </Link>
                            </p>
                            <p>
                                <Link to='/' className='text-reset'>
                                    Từ vựng
                                </Link>
                            </p>
                        </MDBCol>

                        <MDBCol md="4" lg="4" xl="4" className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Liên lạc</h6>
                            <p>
                                <MDBIcon icon="home" className="me-2" />
                                12 Nguyễn Văn Bảo, Gò Vấp, Tp.Hồ Chí Minh
                            </p>
                            <p>
                                <MDBIcon icon="envelope" className="me-3" />
                                minhvuong9a4@gmail.com
                            </p>
                            <p>
                                <MDBIcon icon="envelope" className="me-3" />
                                quangnguyen2001@gmail.com
                            </p>

                            <p>
                                <MDBIcon icon="phone" className="me-3" /> 0363681128
                            </p>
                            <p>
                                <MDBIcon icon="phone" className="me-3" /> 0366079538
                            </p>

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2024 Copyright:
                <a className='text-reset fw-bold' href='/'>
                    Toeic Testing 247                </a>
            </div>
        </MDBFooter>

    );
}