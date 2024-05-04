import React from "react";
import Header from "../../LandingPageComponent/Header";
import { Container } from "react-bootstrap";
import QKHT from '../../../assets/QKHT.png'
import QKHT2 from '../../../assets/QKHT2.png'
import { Image } from "antd";
import '../../../css/NguPhap.css'
export default function QuaKhuHoanThanh() {
    return (
        <Container>
            <Header />
            <h1 style={{ color: '#FF6347' }}>QUÁ KHỨ HOÀN THÀNH</h1>

            <div className="DIV">

                <h3 >I.Cấu trúc</h3>
                <div className="image">

                    <Image className="Imagee" preview={false} src={QKHT} alt="#" />
                </div>
            </div>
            <div className="DIV">
                <h3 >II.Cách sử dụng</h3>
                <div className="image">

                    <Image className="Imagee" preview={false} src={QKHT2} alt="#" />
                </div>
            </div>

        </Container>
    )

}