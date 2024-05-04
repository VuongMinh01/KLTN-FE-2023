import React from "react";
import Header from "../../LandingPageComponent/Header";
import { Container } from "react-bootstrap";
import QKHTTD from '../../../assets/QKHTTD.png'
import QKHTTD2 from '../../../assets/QKHTTD2.png'
import { Image } from "antd";
import '../../../css/NguPhap.css'
export default function QuaKhuHoanThanhTiepDien() {
    return (
        <Container>
            <Header />
            <h1 style={{ color: '#FF6347' }}>QUÁ KHỨ HOÀN THÀNH TIẾP DIỄN</h1>

            <div className="DIV">

                <h3 >I.Cấu trúc</h3>
                <div className="image">

                    <Image className="Imagee" preview={false} src={QKHTTD} alt="#" />
                </div>
            </div>
            <div className="DIV">
                <h3 >II.Cách sử dụng</h3>
                <div className="image">

                    <Image className="Imagee" preview={false} src={QKHTTD2} alt="#" />
                </div>
            </div>

        </Container>
    )

}