import React from "react";
import Header from "../../LandingPageComponent/Header";
import QKTD from '../../../assets/QKTD.png'
import QKTD2 from '../../../assets/QKTD2.png'
import QKTD3 from '../../../assets/QKTD3.png'
import { Image } from "antd";
import { Container } from "react-bootstrap";
import '../../../css/NguPhap.css'
export default function QuaKhuTiepDien() {
    return (
        <Container>
            <Header />
            <h1 style={{ color: '#FF6347' }}>QUÁ KHỨ TIẾP DIỄN</h1>

            <div className="DIV">
                <h3>I.Dấu hiệu nhận biết</h3>
                <div className="image">
                    <Image preview={false} src={QKTD3} alt="#" />
                </div>
            </div>
            <div className="DIV">

                <h3 >II.Cấu trúc</h3>
                <div className="image">

                    <Image className="Imagee" preview={false} src={QKTD} alt="#" />
                </div>
            </div>
            <div className="DIV">
                <h3 >III.Cách sử dụng</h3>
                <div className="image">

                    <Image className="Imagee" preview={false} src={QKTD2} alt="#" />
                </div>
            </div>

        </Container>
    )
}