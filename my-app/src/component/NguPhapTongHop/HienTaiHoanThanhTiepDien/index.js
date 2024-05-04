import React from "react";
import Header from "../../LandingPageComponent/Header";
import HTHTTD from '../../../assets/HTHTTD.png'
import HTHTTD2 from '../../../assets/HTHTTD2.png'
import HTHTTD3 from '../../../assets/HTHTTD3.png'


import { Image } from "antd";
import { Container } from "react-bootstrap";
import '../../../css/NguPhap.css'
export default function HienTaiHoanThanhTiepDien() {
    return (
        <Container>
            <Header />
            <h1 style={{ color: '#FF6347' }}>HIỆN TẠI HOÀN THÀNH TIẾP DIỄN</h1>

            <div className="DIV">
                <h3>I.Cấu trúc</h3>
                <div className="image">
                    <Image preview={false} src={HTHTTD} alt="#" />
                </div>
            </div>
            <div className="DIV">

                <h3 >II.Cách sử dụng</h3>
                <div className="image">

                    <Image className="Imagee" preview={false} src={HTHTTD2} alt="#" />
                    <Image className="Imagee" preview={false} src={HTHTTD3} alt="#" />

                </div>
            </div>


        </Container>
    )
}